const Footer = () => {
  const links = [
    { label: "Facebook", href: "https://www.facebook.com/goalplannerlifeplans" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/goal-planner-lifeplans/" },
    { label: "Instagram", href: "https://www.instagram.com/goalplannerlifeplans/" },
    { label: "YouTube", href: "https://www.youtube.com/@goalplannerlifeplans" },
    { label: "TikTok", href: "https://www.tiktok.com/@goalplannerlifeplans" },
  ];

  return (
    <footer className="border-t border-gray-100 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-sm text-gray-500 dark:text-slate-400">© {new Date().getFullYear()} Lifeplans</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="/about" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="/career" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a>
            <a href="/contact" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            <a href="/terms" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="/refund" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Refund Policy</a>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
