import { get, put } from "@vercel/blob";
import { env } from "@/lib/env";

function requireBlobToken() {
  if (!env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Vercel Blob is not configured.");
  }

  return env.BLOB_READ_WRITE_TOKEN;
}

export async function uploadPublicBlob(pathname: string, file: File) {
  return put(pathname, file, {
    token: requireBlobToken(),
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || undefined,
  });
}

export async function uploadPrivateBlob(pathname: string, file: File) {
  return put(pathname, file, {
    token: requireBlobToken(),
    access: "private",
    addRandomSuffix: true,
    contentType: file.type || undefined,
  });
}

export async function getPrivateDownload(urlOrPathname: string) {
  return get(urlOrPathname, {
    token: requireBlobToken(),
    access: "private",
  });
}
