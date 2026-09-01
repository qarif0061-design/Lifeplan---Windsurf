import Logomark from "@/components/Logomark";

const Footer = () => {
  const links = [
    { label: "Facebook", href: "https://www.facebook.com/goalplannerlifeplans" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/goal-planner-lifeplans/" },
    { label: "Instagram", href: "https://www.instagram.com/goalplannerlifeplans/" },
    { label: "YouTube", href: "https://www.youtube.com/@goalplannerlifeplans" },
    { label: "TikTok", href: "https://www.tiktok.com/@goalplannerlifeplans" },
  ];

  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Logomark className="w-5 h-5" />
            <span>© {new Date().getFullYear()} Lifeplans</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="/career" className="text-muted-foreground hover:text-primary transition-colors">Careers</a>
            <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/refund" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</a>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
