import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, CreditCard, Palette, LogOut } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { showSuccess } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleSave = () => {
    showSuccess("Profile settings updated successfully!");
  };

  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully");
    navigate("/");
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your account and application preferences.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="space-y-2">
            {[
              { name: "Profile", icon: User, active: true },
              { name: "Notifications", icon: Bell, active: false },
              { name: "Appearance", icon: Palette, active: false },
              { name: "Billing", icon: CreditCard, active: false },
              { name: "Security", icon: Shield, active: false },
            ].map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
            <div className="pt-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Profile Section */}
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Public Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xl">
                      {user.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="rounded-full">Change Avatar</Button>
                    <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue={user.displayName} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user.email} className="rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] rounded-2xl border-gray-100 p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" 
                    placeholder="Tell us about your journey..."
                  />
                </div>

                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Preferences Section */}
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive weekly progress reports and reminders.</p>
                  </div>
                  <Switch defaultChecked={user.preferences.notifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Public Profile</Label>
                    <p className="text-sm text-gray-500">Allow others to see your completed goals and streaks.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Dark Mode</Label>
                    <p className="text-sm text-gray-500">Switch between light and dark theme.</p>
                  </div>
                  <Switch defaultChecked={user.preferences.theme === 'dark'} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;