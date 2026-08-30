import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug, 3) : [];

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = `https://sonbarsa.com/blog/${article.slug}`;
  const shareText = article.title;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | SonBarsa Blog</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <link rel="canonical" href={`https://sonbarsa.com/blog/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={article.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": [article.image],
            "datePublished": article.date,
            "dateModified": article.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://sonbarsa.com/blog/${article.slug}`
            },
            "author": {
              "@type": "Organization",
              "name": article.author,
              "url": "https://sonbarsa.com/"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SonBarsa",
              "url": "https://sonbarsa.com/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://img.sonbarsa.com/img/logo-color.svg"
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
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
          />
        </div>

        {/* Article Content */}
        <section className="py-16">
          <div className="tg-container max-w-[640px]">
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({children}) => <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">{children}</h3>,
                  h4: ({children}) => <h4 className="text-lg font-semibold mt-6 mb-2 text-foreground">{children}</h4>,
                  p: ({children}) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
                  ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ol>,
                  li: ({children}) => <li className="text-muted-foreground">{children}</li>,
                  strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                  a: ({href, children}) => <a href={href} className="text-primary hover:underline">{children}</a>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{children}</blockquote>,
                  table: ({children}) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse">{children}</table></div>,
                  th: ({children}) => <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">{children}</th>,
                  td: ({children}) => <td className="border border-border px-4 py-2">{children}</td>,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </article>

            {/* Share & Tags */}
            <div className="mt-12 pt-8 border-t border-border grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3 flex items-center gap-2 text-sm">
                  <Share2 className="w-4 h-4" />
                  Share article
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2.5 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2.5 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2.5 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3 text-sm">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 border-t border-border">
            <div className="tg-container max-w-[720px]">
              <h2 className="text-2xl mb-8 text-center">Related Articles</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedArticles.map(related => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="group rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-muted-foreground">{related.category}</span>
                      <h3 className="font-bold text-sm mt-1 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-10 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Want help with your digital presence? <Link to="/contact" className="text-primary font-medium hover:underline">Get in touch</Link>.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogArticle;
