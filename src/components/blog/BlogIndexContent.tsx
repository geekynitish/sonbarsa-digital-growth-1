import { Link } from "@/lib/router-shim";
import type { Article } from "@/data/articles";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export const BlogIndexContent = ({ articles }: { articles: Article[] }) => {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  const categories = [...new Set(articles.map(a => a.category))];

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 text-center">
        <div className="tg-container max-w-[640px]">
          <p className="text-sm font-medium text-muted-foreground mb-5">Industry Insights</p>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] tracking-tight">
            Knowledge hub for <span className="text-accent-word">digital growth</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Expert articles on digital marketing, web development, cloud computing, and
            business transformation strategies.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-y border-border">
        <div className="tg-container max-w-[840px]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="tg-container max-w-[720px]">
          <h2 className="text-2xl mb-8 text-center">Featured Article</h2>
          <Link to={`/blog/${featuredArticle.slug}`} className="group block rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors duration-300">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
                width={800}
                height={450}
                fetchPriority="high"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                {featuredArticle.category}
              </span>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredArticle.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
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
              <div className="flex items-center gap-2 text-primary font-semibold">
                Read full article
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 border-t border-border">
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
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
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
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Want more like this? <Link to="/contact" className="text-primary font-medium hover:underline">Get in touch</Link> and we'll keep you posted.
        </p>
      </section>
    </>
  );
};
