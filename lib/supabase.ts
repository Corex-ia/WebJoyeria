import { createClient as _createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function createClient() {
  return _createClient(url, anon);
}

export function supabaseAdmin() {
  return _createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY ?? anon);
}

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  regular_price: number | null;
  sale_price: number | null;
  sku: string;
  stock: number;
  status: "publish" | "draft";
  category_id: number | null;
  thumbnail_url: string;
  images: string[];
  wp_id: number | null;
  created_at: string;
  updated_at: string;
  category?: Category;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
};

export type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  recurrente_id: string;
  notes: string;
  created_at: string;
};

export type OrderItem = {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  thumbnail_url: string;
};
