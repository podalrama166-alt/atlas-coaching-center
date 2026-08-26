import { supabase } from "@/integrations/supabase/client";

export const GALLERY_BUCKET = "gallery";
const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days

export type GalleryImage = {
  id: string;
  title: string;
  category: string;
  storage_path: string;
  sort_order: number;
  created_at: string;
  url: string;
};

/** Downscale + re-encode an image in the browser for fast loading and good quality. */
export async function optimizeImage(file: File, maxSize = 1600, quality = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality),
  );
  return blob ?? file;
}

async function withSignedUrls(
  rows: Omit<GalleryImage, "url">[],
): Promise<GalleryImage[]> {
  if (rows.length === 0) return [];
  const { data } = await supabase.storage
    .from(GALLERY_BUCKET)
    .createSignedUrls(rows.map((r) => r.storage_path), SIGNED_URL_TTL);

  const map = new Map((data ?? []).map((d) => [d.path, d.signedUrl]));
  return rows
    .map((row) => ({ ...row, url: map.get(row.storage_path) ?? "" }))
    .filter((row) => row.url);
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, title, category, storage_path, sort_order, created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return withSignedUrls(data ?? []);
}

export async function uploadGalleryImage(input: {
  file: File;
  title: string;
  category: string;
  userId: string;
}): Promise<void> {
  const blob = await optimizeImage(input.file);
  const path = `${crypto.randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
  if (uploadError) throw uploadError;

  const { error } = await supabase.from("gallery_images").insert({
    title: input.title,
    category: input.category || "Gallery",
    storage_path: path,
    url: path,
    created_by: input.userId,
  });
  if (error) {
    await supabase.storage.from(GALLERY_BUCKET).remove([path]);
    throw error;
  }
}

export async function replaceGalleryImage(image: GalleryImage, file: File): Promise<void> {
  const blob = await optimizeImage(file);
  const path = `${crypto.randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
  if (uploadError) throw uploadError;

  const { error } = await supabase
    .from("gallery_images")
    .update({ storage_path: path, url: path })
    .eq("id", image.id);
  if (error) {
    await supabase.storage.from(GALLERY_BUCKET).remove([path]);
    throw error;
  }
  await supabase.storage.from(GALLERY_BUCKET).remove([image.storage_path]);
}

export async function deleteGalleryImage(image: GalleryImage): Promise<void> {
  const { error } = await supabase.from("gallery_images").delete().eq("id", image.id);
  if (error) throw error;
  await supabase.storage.from(GALLERY_BUCKET).remove([image.storage_path]);
}

export async function updateGalleryMeta(
  id: string,
  meta: { title?: string; category?: string },
): Promise<void> {
  const { error } = await supabase.from("gallery_images").update(meta).eq("id", id);
  if (error) throw error;
}
