import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    /** Shorter headline for the <title> tag, so it doesn't get truncated in
     * Google search results. Falls back to `title` when not set. */
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    category: z.string().default("General"),
    author: z.string().default("SonBarsa Team"),
    /** Manual override; auto-estimated from word count when omitted. */
    readTime: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
