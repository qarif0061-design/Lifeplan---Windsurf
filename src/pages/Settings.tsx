import Layout from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, Moon, Sun, Zap, Bell, CreditCard, Shield, LogOut, ArrowLeft } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { showSuccess } from "@/utils/toast";
import { Link } from "react-router-dom";

const Settings = () => {
  const { user, isPremium, togglePremium, logout } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      showSuccess("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500">Manage your account and preferences</p>
          </div>
          <Button variant="ghost" className="rounded-full h-10 w-10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold dark:text-white">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user?.displayName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold dark:text-white">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-900 dark:text-white">Theme</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl h-10 w-10 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="rounded-xl h-10 w-10 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="rounded-xl h-10 w-10 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-900 dark:text-white">Notifications</Label>
              <Button variant="outline" className="rounded-xl h-10 w-10 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-900 dark:text-white">Reminder Frequency</Label>
              <Button variant="outline" className="rounded-xl h-10 w-10 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold dark:text-white">Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Premium</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unlock all features</p>
              </div>
              <Button 
                onClick={togglePremium} 
                variant={isPremium ? "default" : "outline"} 
                className="rounded-xl h-10 px-4"
              >
                {isPremium ? "Active" : "Upgrade"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Billing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage payment methods</p>
              </div>
              <Button variant="outline" className="rounded-xl h-10 px-4">
                <CreditCard className="w-4 h-4 mr-2" /> Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold dark:text-white">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
              </div>
              <Button variant="outline" className="rounded-xl h-10 px-4">
                Change
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Two-Factor Auth</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enable additional security</p>
              </div>
              <Button variant="outline" className="rounded-xl h-10 px-4">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold dark:text-white">Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Export Data</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download your data</p>
              </div>
              <Button variant="outline" className="rounded-xl h-10 px-4">
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Account</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account</p>
              </div>
              <Button variant="outline" className="rounded-xl h-10 px-4">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="rounded-xl h-12 px-8"
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Log Out"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;