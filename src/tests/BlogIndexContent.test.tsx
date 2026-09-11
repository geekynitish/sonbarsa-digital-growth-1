import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogIndexContent } from "@/components/blog/BlogIndexContent";
import type { Article } from "@/data/articles";

// Minimal article factory for tests
const makeArticle = (overrides: Partial<Article>): Article => ({
  id: overrides.slug ?? "test",
  slug: "test",
  title: "Test Article",
  excerpt: "Test excerpt",
  content: "Test content",
  category: "Technology",
  author: "Author",
  date: "2024-01-01",
  readTime: "3 min read",
  image: "https://example.com/image.jpg",
  tags: ["tag1"],
  ...overrides,
});

const articles: Article[] = [
  makeArticle({ id: "a1", slug: "a1", title: "AI Article 1", category: "Artificial Intelligence", tags: ["ai"] }),
  makeArticle({ id: "a2", slug: "a2", title: "Web Article 1", category: "Web Development", tags: ["react"] }),
  makeArticle({ id: "a3", slug: "a3", title: "AI Article 2", category: "Artificial Intelligence", tags: ["ml"] }),
  makeArticle({ id: "a4", slug: "a4", title: "Cloud Article 1", category: "Cloud", tags: ["aws"] }),
];

describe("BlogIndexContent", () => {
  it("renders the page heading", () => {
    render(<BlogIndexContent articles={articles} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Knowledge hub for");
  });

  it("renders category filter buttons for each unique category plus 'All'", () => {
    render(<BlogIndexContent articles={articles} />);
    expect(screen.getByRole("button", { name: /^All$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Artificial Intelligence/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Web Development/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cloud/i })).toBeInTheDocument();
  });

  it("shows the first article as featured", () => {
    render(<BlogIndexContent articles={articles} />);
    expect(screen.getByText("Featured Article")).toBeInTheDocument();
    // The featured article is articles[0] = "AI Article 1"
    expect(screen.getByRole("heading", { level: 3, name: "AI Article 1" })).toBeInTheDocument();
  });

  it("shows remaining articles in the 'Latest Articles' grid", () => {
    render(<BlogIndexContent articles={articles} />);
    // articles[1..3] = Web Article 1, AI Article 2, Cloud Article 1
    expect(screen.getByText("Web Article 1")).toBeInTheDocument();
    expect(screen.getByText("AI Article 2")).toBeInTheDocument();
    expect(screen.getByText("Cloud Article 1")).toBeInTheDocument();
  });

  it("clicking a category button filters articles to that category", async () => {
    const user = userEvent.setup();
    render(<BlogIndexContent articles={articles} />);

    await user.click(screen.getByRole("button", { name: /Artificial Intelligence/i }));

    // Should show only AI articles
    expect(screen.getByText("AI Article 1")).toBeInTheDocument();
    expect(screen.getByText("AI Article 2")).toBeInTheDocument();
    // Web and Cloud articles should NOT appear
    expect(screen.queryByText("Web Article 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Cloud Article 1")).not.toBeInTheDocument();
  });

  it("active category button has aria-pressed=true", async () => {
    const user = userEvent.setup();
    render(<BlogIndexContent articles={articles} />);

    const aiButton = screen.getByRole("button", { name: /Artificial Intelligence/i });
    await user.click(aiButton);

    expect(aiButton).toHaveAttribute("aria-pressed", "true");
  });

  it("All button resets the filter", async () => {
    const user = userEvent.setup();
    render(<BlogIndexContent articles={articles} />);

    // Filter to AI first
    await user.click(screen.getByRole("button", { name: /Artificial Intelligence/i }));
    expect(screen.queryByText("Web Article 1")).not.toBeInTheDocument();

    // Click All to reset
    await user.click(screen.getByRole("button", { name: /^All$/i }));
    expect(screen.getByText("Web Article 1")).toBeInTheDocument();
    expect(screen.getByText("Cloud Article 1")).toBeInTheDocument();
  });

  it("clicking an active category again deselects it (shows all)", async () => {
    const user = userEvent.setup();
    render(<BlogIndexContent articles={articles} />);

    const aiButton = screen.getByRole("button", { name: /Artificial Intelligence/i });
    await user.click(aiButton); // select
    await user.click(aiButton); // deselect

    // All articles should be visible again
    expect(screen.getByText("Web Article 1")).toBeInTheDocument();
  });

  it("shows 'Clear' button when a category is active", async () => {
    const user = userEvent.setup();
    render(<BlogIndexContent articles={articles} />);

    expect(screen.queryByRole("button", { name: /Clear/i })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Artificial Intelligence/i }));
    expect(screen.getByRole("button", { name: /Clear/i })).toBeInTheDocument();
  });

  it("'Clear' button resets filter", async () => {
    const user = userEvent.setup();
    render(<BlogIndexContent articles={articles} />);

    await user.click(screen.getByRole("button", { name: /Artificial Intelligence/i }));
    await user.click(screen.getByRole("button", { name: /Clear/i }));

    expect(screen.getByText("Web Article 1")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Clear/i })).not.toBeInTheDocument();
  });

  it("shows empty state message when category has no articles", () => {
    const noMatchArticles: Article[] = [
      makeArticle({ id: "b1", slug: "b1", title: "Only Web Article", category: "Web Development" }),
    ];
    // Render with only Web articles but simulate filtering for AI (not possible directly without state)
    // We can test the empty state by providing an empty articles array
    render(<BlogIndexContent articles={[]} />);
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
  });

  it("renders article links with correct href", () => {
    render(<BlogIndexContent articles={articles} />);
    // Featured article link (articles[0] = "a1")
    const links = screen.getAllByRole("link");
    const featuredLink = links.find(link => link.getAttribute("href") === "/blog/a1");
    expect(featuredLink).toBeDefined();
  });
});
