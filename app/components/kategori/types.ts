// app/components/kategori/types.ts

export type Category = {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
};

export type BreadcrumbItem = {
  id: number;
  name: string;
  slug: string;
};

export type ListingItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  images: string[] | null;
  created_at: string;
};
