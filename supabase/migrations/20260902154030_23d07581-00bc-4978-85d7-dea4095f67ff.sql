CREATE TABLE public.student_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rank integer NOT NULL,
  student_name text NOT NULL,
  score text NOT NULL,
  year_of_passing text NOT NULL DEFAULT '2025-26',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.student_results TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_results TO authenticated;
GRANT ALL ON public.student_results TO service_role;
ALTER TABLE public.student_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Student results are viewable by everyone"
ON public.student_results FOR SELECT
USING (true);

CREATE POLICY "Admins can insert student results"
ON public.student_results FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update student results"
ON public.student_results FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete student results"
ON public.student_results FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.student_results (rank, student_name, score, year_of_passing)
VALUES
  (1, 'Shreeya Sarchita Maharana', '93%', '2025-26'),
  (2, 'Shakti Prasad Behera', '91%', '2025-26'),
  (3, 'Shivjeet Sabat', '91%', '2025-26'),
  (4, 'Biswajeet Sabat', '81%', '2025-26');