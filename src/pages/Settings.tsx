import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Gift, Users, Trophy, ArrowRight } from "lucide-react";

const SettingsPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" /> Refer & Earn
              </CardTitle>
              <CardDescription>
                Share your link — friends who sign up earn you free Premium.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/referrals">
                  Open Referrals <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Accountability Partners
              </CardTitle>
              <CardDescription>
                Invite someone to follow your progress on a plan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/accountability">
                  Open Accountability <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition sm:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" /> Challenges
              </CardTitle>
              <CardDescription>
                Join or start a challenge and track progress with others.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
                <Link to="/challenges">
                  Open Challenges <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
export default SettingsPage;
