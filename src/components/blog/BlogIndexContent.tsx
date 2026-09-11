import { useState, useMemo } from "react";
import { Link } from "@/lib/router-shim";
import type { Article } from "@/data/articles";
import { Calendar, Clock, ArrowRight, Tag, X, Search } from "lucide-react";

export const BlogIndexContent = ({ articles }: { articles: Article[] }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => [...new Set(articles.map((a) => a.category))], [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory = !activeCategory || a.category === activeCategory;
      const matchesTag = !activeTag || a.tags.includes(activeTag);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [articles, activeCategory, activeTag, searchQuery]);

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  const resetAllFilters = () => {
    setActiveCategory(null);
    setActiveTag(null);
    setSearchQuery("");
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-10 text-center">
        <div className="tg-container max-w-[640px]">
          <p className="text-sm font-medium text-muted-foreground mb-4">Industry Insights</p>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] tracking-tight">
            Knowledge hub for <span className="text-accent-word">digital growth</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Expert articles on FinTech, AI, digital marketing, web development, cloud computing, and
            business transformation strategies.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-[480px] mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by keyword, topic, or tag..."
              className="w-full h-11 pl-11 pr-10 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="py-6 border-y border-border">
        <div className="tg-container max-w-[840px]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                setActiveCategory(null);
                setActiveTag(null);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === null && activeTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-primary hover:text-primary-foreground"
              }`}
              aria-pressed={activeCategory === null && activeTag === null}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(activeCategory === category ? null : category);
                  setActiveTag(null);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-primary hover:text-primary-foreground"
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
            {(activeCategory || activeTag || searchQuery) && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors duration-300"
                aria-label="Clear all filters"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Active Tag Indicator */}
          {activeTag && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Filtered by Tag:</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                <Tag className="w-3 h-3" />
                {activeTag}
                <button
                  onClick={() => setActiveTag(null)}
                  className="hover:text-destructive ml-1"
                  aria-label="Remove tag filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle ? (
        <section className="py-10 md:py-12">
          <div className="tg-container max-w-[720px]">
            <h2 className="text-2xl mb-8 text-center">
              {activeCategory
                ? `Category: "${activeCategory}"`
                : activeTag
                ? `Tag: "${activeTag}"`
                : searchQuery
                ? `Search: "${searchQuery}"`
                : "Featured Article"}
            </h2>
            <Link
              to={`/blog/${featuredArticle.slug}`}
              className="group block rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                  width={800}
                  height={450}
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                  {featuredArticle.category}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredArticle.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                  Read full article
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {featuredArticle.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveTag(tag);
                      }}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        activeTag === tag
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-primary/20 hover:text-primary text-muted-foreground"
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-10 md:py-12">
          <div className="tg-container max-w-[720px] text-center">
            <p className="text-muted-foreground mb-4">
              No articles found matching your current filter or search criteria.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </section>
      )}

      {/* Article Grid */}
      {otherArticles.length > 0 && (
        <section className="py-10 md:py-12 border-t border-border">
          <div className="tg-container max-w-[840px]">
            <h2 className="text-2xl mb-8 text-center">Latest Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      width={800}
                      height={450}
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveTag(tag);
                          }}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors ${
                            activeTag === tag
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-primary/20 hover:text-primary text-muted-foreground"
                          }`}
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter / Contact CTA */}
      <section className="py-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Looking for custom FinTech or AI solutions?{" "}
          <Link to="/contact" className="text-primary font-medium hover:underline">
            Talk to our team
          </Link>
        </p>
      </section>
    </>
  );
};
