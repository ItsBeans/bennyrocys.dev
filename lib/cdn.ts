/** Cloudflare R2 public bucket (same host as CV). */
export const IMG_CDN = 'https://img.bennyrocys.dev';

/** Build URL for a file in the bucket (handles spaces/special chars in filenames). */
export function imgUrl(filename: string): string {
  return `${IMG_CDN}/${encodeURIComponent(filename)}`;
}
