import { Link } from "@/lib/router-shim";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.svg";

const footerLinks = {
  about: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile Apps", href: "/services/mobile-apps" },
    { name: "Cloud & AWS", href: "/services/cloud-aws" },
  ],
  more: [
    { name: "WhatsApp Bots", href: "/services/chatbots" },
    { name: "CMS Solutions", href: "/services/cms" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/sonbarsa", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/sonbarsa", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/sonbarsa", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="tg-container max-w-[720px]">
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-8">
          {/* Brand */}
          <div className="w-full sm:w-[200px]">
            <Link to="/" className="inline-flex items-center gap-2 mb-2.5">
              <img src={logo} alt="SonBarsa" className="h-6 w-auto" width={84} height={24} />
            </Link>
            <p className="text-muted-foreground text-[13px] leading-relaxed">
              A global digital agency since 2008, delivering AI, web, mobile and
              cloud solutions across India, the UK &amp; the Middle East.
            </p>
            <div className="flex gap-1 -ml-2 mt-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold mb-2.5">About</p>
            <ul>
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block py-1.5 text-[14px] leading-[23px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold mb-2.5">Services</p>
            <ul>
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block py-1.5 text-[14px] leading-[23px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold mb-2.5">More</p>
            <ul>
              {footerLinks.more.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block py-1.5 text-[14px] leading-[23px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} SonBarsa. All rights reserved.
          </p>
          <div className="flex gap-3 text-xs">
            <a href="mailto:lali@sonbarsa.com" className="py-2 text-muted-foreground hover:text-primary transition-colors">
              lali@sonbarsa.com
            </a>
            <Link to="/terms" className="py-2 text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
