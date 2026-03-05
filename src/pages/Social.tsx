import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Social = () => {
  const links = [
    { label: "Facebook", href: "https://www.facebook.com/goalplannerlifeplans" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/goal-planner-lifeplans/" },
    { label: "Instagram", href: "https://www.instagram.com/goalplannerlifeplans/" },
    { label: "YouTube", href: "https://www.youtube.com/@goalplannerlifeplans" },
    { label: "TikTok", href: "https://www.tiktok.com/@goalplannerlifeplans" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Media</h1>
          <p className="text-gray-500">Follow Lifeplans and stay updated.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {links.map((l) => (
            <Card key={l.label} className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-lg font-bold">{l.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {l.href}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Social;
