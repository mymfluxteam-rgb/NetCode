import { isSupabaseConfigured, supabase } from "./supabaseClient";

const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "source-code";
const signedUrlLifetimeSeconds = 10 * 60;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSourceCodeStoragePath(productId: number, productName: string) {
  return `${productId}/${slugify(productName)}.zip`;
}

export async function getProtectedDownloadUrl(productId: number, productName: string) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable downloads.");
  }

  const path = getSourceCodeStoragePath(productId, productName);
  const { data, error } = await supabase.storage
    .from(storageBucket)
    .createSignedUrl(path, signedUrlLifetimeSeconds);

  if (error || !data?.signedUrl) {
    throw new Error(error?.message || "This source code download is not available yet.");
  }

  return data.signedUrl;
}