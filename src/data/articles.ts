import { getCollection, type CollectionEntry } from "astro:content";

export interface Article {
  id: string;
  slug: string;
  title: string;
  /** Shorter headline for the <title> tag, so it doesn't get truncated in
   * Google search results. Falls back to `title` when not set. */
  seoTitle?: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const WORDS_PER_MINUTE = 200;

function estimateReadTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function toArticle(entry: CollectionEntry<"blog">): Article {
  const { data, body, slug } = entry;
  return {
    id: slug,
    slug,
    title: data.title,
    seoTitle: data.seoTitle,
    excerpt: data.description,
    content: body,
    category: data.category,
    author: data.author,
    date: data.pubDate.toISOString().slice(0, 10),
    readTime: data.readTime ?? estimateReadTime(body),
    image: data.heroImage ?? "",
    tags: data.tags,
  };
}

/** All posts from src/content/blog, newest first. */
export async function getAllArticles(): Promise<Article[]> {
  const entries = await getCollection("blog");
  return entries.map(toArticle).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlugFrom(articles: Article[], slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticlesFrom(
  articles: Article[],
  currentSlug: string,
  limit = 3
): Article[] {
  const currentArticle = getArticleBySlugFrom(articles, currentSlug);
  if (!currentArticle) return [];

  return articles
    .filter((article) => article.slug !== currentSlug)
    .filter(
      (article) =>
        article.category === currentArticle.category ||
        article.tags.some((tag) => currentArticle.tags.includes(tag))
    )
    .slice(0, limit);
}
