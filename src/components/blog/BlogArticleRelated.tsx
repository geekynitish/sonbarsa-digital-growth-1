import { Link } from "@/lib/router-shim";
import type { Article } from "@/data/articles";

export const BlogArticleRelated = ({ relatedArticles }: { relatedArticles: Article[] }) => (
  <>
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
                    width={800}
                    height={450}
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
  </>
);
