import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import { showError, showSuccess } from "@/utils/toast";
import { type PublishedTemplate, getTemplates, cloneTemplate } from "@/firebase/templates";
import { Search, Copy, Clock, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<PublishedTemplate[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cloningId, setCloningId] = useState<string | null>(null);

  useEffect(() => {
    getTemplates().then((t) => {
      setTemplates(t);
      setLoading(false);
    });
  }, []);

  const filtered = templates.filter((t) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      t.title.toLowerCase().includes(s) ||
      t.description.toLowerCase().includes(s) ||
      t.tags.some((tag) => tag.toLowerCase().includes(s))
    );
  });

  const handleClone = async (template: PublishedTemplate) => {
    if (!user) {
      showError("Sign in to clone templates");
      return;
    }
    setCloningId(template.id);
    try {
      const id = await cloneTemplate(template, user.id);
      showSuccess("Template cloned! Opening custom planner...");
      navigate("/custom-planner");
    } catch (e) {
      showError("Failed to clone template");
    } finally {
      setCloningId(null);
    }
  };

  const categories = [...new Set(templates.map((t) => t.category))];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Plan Templates</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Browse community-created plans. Clone one and make it yours.
          </p>
        </div>

        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            className="pl-10 rounded-2xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="cursor-pointer rounded-full"
                onClick={() => setSearch(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading templates...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No templates found. Be the first to publish one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <Card key={t.id} className="border-none shadow-sm rounded-[2rem] hover:shadow-md transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold text-gray-900">{t.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 line-clamp-2">
                        {t.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="secondary" className="rounded-full text-xs">{t.category}</Badge>
                    {t.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.dayCount} days</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {t.cloneCount} clones</span>
                    <span>by {t.userName}</span>
                  </div>
                  <Button
                    onClick={() => handleClone(t)}
                    disabled={cloningId === t.id || !user}
                    className="w-full rounded-full"
                  >
                    {cloningId === t.id ? "Cloning..." : "Use Template"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Templates;
