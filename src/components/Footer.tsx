const Footer = () => {
  const links = [
    { label: "Facebook", href: "https://www.facebook.com/goalplannerlifeplans" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/goal-planner-lifeplans/" },
    { label: "Instagram", href: "https://www.instagram.com/goalplannerlifeplans/" },
    { label: "YouTube", href: "https://www.youtube.com/@goalplannerlifeplans" },
    { label: "TikTok", href: "https://www.tiktok.com/@goalplannerlifeplans" },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} Lifeplans</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
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
