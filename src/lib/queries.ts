import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) { console.error('Error fetching categories:', error); return []; }
  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .order('created_at', { ascending: true });
  if (error) { console.error('Error fetching products:', error); return []; }
  return data;
}

export async function getBestsellers() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_bestseller', true)
    .limit(4);
  if (error) { console.error('Error fetching bestsellers:', error); return []; }
  return data;
}

export async function getProductImages(productId: string) {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching product images:', error); return []; }
  return data;
}

export async function getProductVariants(productId: string) {
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', productId)
    .eq('in_stock', true)
    .order('price', { ascending: true });
  if (error) { console.error('Error fetching product variants:', error); return []; }
  return data;
}