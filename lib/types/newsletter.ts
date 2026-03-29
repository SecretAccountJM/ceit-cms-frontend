export interface Newsletter {
  id: string;
  title: string;
  volume: string;
  issue: string;
  month_year: string;
  summary: string | null;
  highlights: string | null;
  tags: string | null;
  pages: number;
  cover_url: string | null;
  pdf_url: string | null;
  flipbook_url: string | null;
  is_latest: number;
  created_at: string;
  updated_at: string;
}
