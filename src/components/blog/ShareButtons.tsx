import { Share2, Twitter, Linkedin, Facebook } from "lucide-react";

export const ShareButtons = ({ slug, title }: { slug: string; title: string }) => {
  const shareUrl = `https://sonbarsa.com/blog/${slug}`;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
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
  );
};
