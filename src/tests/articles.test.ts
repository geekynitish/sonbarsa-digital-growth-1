import { describe, it, expect, vi } from "vitest";

// Mock astro:content before any imports that depend on it
vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
}));

// Now we can import the pure helper functions (which don't call getCollection)
import { getArticleBySlugFrom, getRelatedArticlesFrom } from "@/data/articles";
import type { Article } from "@/data/articles";

// --- Test Fixtures ---
const makeArticle = (overrides: Partial<Article>): Article => ({
  id: overrides.slug ?? "test",
  slug: "test",
  title: "Test Article",
  excerpt: "A test article excerpt",
  content: "Some content here",
  category: "Technology",
  author: "Test Author",
  date: "2024-01-01",
  readTime: "3 min read",
  image: "https://example.com/image.jpg",
  tags: ["ai", "ml"],
  ...overrides,
});

const articles: Article[] = [
  makeArticle({ id: "article-1", slug: "article-1", category: "AI", tags: ["ai", "ml"] }),
  makeArticle({ id: "article-2", slug: "article-2", category: "Web", tags: ["react", "astro"] }),
  makeArticle({ id: "article-3", slug: "article-3", category: "AI", tags: ["ml", "python"] }),
  makeArticle({ id: "article-4", slug: "article-4", category: "Cloud", tags: ["aws", "devops"] }),
  makeArticle({ id: "article-5", slug: "article-5", category: "Web", tags: ["react", "typescript"] }),
];

// --- getArticleBySlugFrom ---
describe("getArticleBySlugFrom()", () => {
  it("finds an article that exists by slug", () => {
    const result = getArticleBySlugFrom(articles, "article-2");
    expect(result).toBeDefined();
    expect(result?.slug).toBe("article-2");
  });

  it("returns undefined for a slug that doesn't exist", () => {
    const result = getArticleBySlugFrom(articles, "non-existent-slug");
    expect(result).toBeUndefined();
  });

  it("returns the first match when called on a single-item array", () => {
    const singleArticle = [makeArticle({ slug: "only-one" })];
    const result = getArticleBySlugFrom(singleArticle, "only-one");
    expect(result?.slug).toBe("only-one");
  });

  it("returns undefined on empty array", () => {
    const result = getArticleBySlugFrom([], "any-slug");
    expect(result).toBeUndefined();
  });
});

// --- getRelatedArticlesFrom ---
describe("getRelatedArticlesFrom()", () => {
  it("excludes the current article from results", () => {
    const related = getRelatedArticlesFrom(articles, "article-1");
    expect(related.every(a => a.slug !== "article-1")).toBe(true);
  });

  it("returns articles that share the same category", () => {
    // article-1 is in "AI" category. article-3 is also "AI".
    const related = getRelatedArticlesFrom(articles, "article-1");
    const slugs = related.map(a => a.slug);
    expect(slugs).toContain("article-3");
  });

  it("returns articles that share at least one tag", () => {
    // article-1 has tags ["ai", "ml"]. article-3 has ["ml", "python"] — shares "ml".
    const related = getRelatedArticlesFrom(articles, "article-1");
    const slugs = related.map(a => a.slug);
    expect(slugs).toContain("article-3");
  });

  it("respects the limit parameter", () => {
    const related = getRelatedArticlesFrom(articles, "article-1", 1);
    expect(related.length).toBeLessThanOrEqual(1);
  });

  it("returns at most `limit` articles (default 3)", () => {
    const manyArticles = Array.from({ length: 10 }, (_, i) =>
      makeArticle({ id: `a${i}`, slug: `a${i}`, category: "AI", tags: ["ai"] })
    );
    const related = getRelatedArticlesFrom(manyArticles, "a0");
    expect(related.length).toBeLessThanOrEqual(3);
  });

  it("returns empty array if the current slug doesn't exist", () => {
    const related = getRelatedArticlesFrom(articles, "non-existent");
    expect(related).toEqual([]);
  });

  it("returns empty array if no articles share category or tags", () => {
    const isolated = [
      makeArticle({ slug: "unique-article", category: "Niche", tags: ["rare-tag"] }),
      makeArticle({ slug: "other-article", category: "Web", tags: ["react"] }),
    ];
    const related = getRelatedArticlesFrom(isolated, "unique-article");
    expect(related).toEqual([]);
  });
});
