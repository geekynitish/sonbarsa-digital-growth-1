import { Link } from "@/lib/router-shim";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { Article } from "@/data/articles";

// Hero header + featured image — the fully static top of the article page.
// The article body itself (ArticleMarkdown), share buttons (ShareButtons,
// the only interactive piece), and tags are composed separately in
// blog/[slug].astro so the share buttons can be their own small client
// island without pulling the rest of the page's markup along with it.
export const BlogArticleBody = ({ article }: { article: Article }) => (
  <>
    {/* Hero */}
    <section className="pt-20 pb-10 text-center">
      <div className="tg-container max-w-[720px]">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <p className="text-sm font-medium text-muted-foreground mb-4">{article.category}</p>
        <h1 className="text-3xl sm:text-4xl leading-[1.15] tracking-tight mb-5">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
          <span>By {article.author}</span>
        </div>
      </div>
    </section>

    {/* Featured Image */}
    <div className="tg-container max-w-[720px]">
      <img
        src={article.image}
        alt={article.title}
        className="w-full aspect-video object-cover rounded-xl"
        width={800}
        height={450}
        fetchPriority="high"
      />
    </div>
  </>
);
