import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Trash2, Upload, RefreshCw, LogOut, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteGalleryImage,
  fetchGalleryImages,
  replaceGalleryImage,
  uploadGalleryImage,
  type GalleryImage,
} from "@/lib/gallery";

const title = "Gallery Admin – ATLAS Coaching";
const description = "Private admin area for managing the ATLAS coaching gallery photos.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const uid = data.session?.user.id ?? null;
    setUserId(uid);
    if (uid) {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(Boolean(roles));
    } else {
      setIsAdmin(false);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    void refreshSession();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void refreshSession();
    });
    return () => sub.subscription.unsubscribe();
  }, [refreshSession]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-gradient-navy">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">ATLAS</p>
            <h1 className="font-display text-xl font-bold text-navy-foreground">Gallery Manager</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-navy-foreground hover:bg-navy-foreground/10">
              <Link to="/">
                <ArrowLeft className="size-4" /> Site
              </Link>
            </Button>
            {userId ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={async () => {
                  await supabase.auth.signOut();
                  toast.success("Signed out");
                }}
              >
                <LogOut className="size-4" /> Sign out
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {checking ? (
          <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" /> Checking access…
          </div>
        ) : !userId ? (
          <SignIn />
        ) : !isAdmin ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
            <h2 className="font-display text-xl font-bold">Admin access required</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This account is signed in but is not an administrator of the ATLAS gallery.
            </p>
          </div>
        ) : (
          <GalleryManager userId={userId} />
        )}
      </main>
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-card"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setBusy(false);
        if (error) toast.error(error.message);
        else toast.success("Welcome back!");
      }}
    >
      <h2 className="font-display text-2xl font-bold">Admin sign in</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to manage the gallery photos of ATLAS.
      </p>
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : null} Sign in
        </Button>
      </div>
    </form>
  );
}

function GalleryManager({ userId }: { userId: string }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [category, setCategory] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setImages(await fetchGalleryImages());
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    let ok = 0;
    for (const file of Array.from(files)) {
      try {
        await uploadGalleryImage({ file, title: titleValue, category, userId });
        ok += 1;
      } catch (e) {
        toast.error(`${file.name}: ${e instanceof Error ? e.message : "upload failed"}`);
      }
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    setTitleValue("");
    setCategory("");
    if (ok > 0) toast.success(`${ok} image${ok > 1 ? "s" : ""} uploaded`);
    await load();
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <h2 className="font-display text-xl font-bold">Upload photos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Images are resized and compressed automatically for fast loading.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="caption">Caption (optional)</Label>
            <Input
              id="caption"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="Class 10 board toppers"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category (optional)</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Results"
            />
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => void handleUpload(e.target.files)}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            {uploading ? "Uploading…" : "Choose images"}
          </Button>
          <Button variant="outline" onClick={() => void load()} disabled={loading}>
            <RefreshCw className="size-4" /> Refresh
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">
          Gallery photos <span className="text-muted-foreground">({images.length})</span>
        </h2>
        {loading ? (
          <div className="flex items-center gap-3 py-16 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" /> Loading…
          </div>
        ) : images.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No photos yet. Upload your first image above.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                <img
                  src={img.url}
                  alt={img.title || "Gallery photo"}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-3 p-4">
                  <div>
                    <p className="truncate font-semibold">{img.title || "Untitled"}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {img.category}
                    </p>
                  </div>
                  <input
                    ref={(el) => {
                      replaceRefs.current[img.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        await replaceGalleryImage(img, file);
                        toast.success("Image replaced");
                        await load();
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Replace failed");
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => replaceRefs.current[img.id]?.click()}
                    >
                      <RefreshCw className="size-4" /> Replace
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (!window.confirm("Delete this photo?")) return;
                        try {
                          await deleteGalleryImage(img);
                          toast.success("Photo deleted");
                          await load();
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : "Delete failed");
                        }
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
