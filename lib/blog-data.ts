// Blog posts are defined here as TypeScript modules so they are bundled at
// build time and do not require filesystem access at runtime (Cloudflare Workers).
//
// To add a new post: add an entry to this array.

export interface PostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  tags: string[];
  content: string;
}

export const posts: PostData[] = [];
