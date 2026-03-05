import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";
import { updateDisplayName } from "@/firebase/profile";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "@/firebase/config";

const Profile = () => {
  const { user } = useUser();

  const [newName, setNewName] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const initialName = useMemo(() => user?.displayName ?? "", [user]);

  const handleSaveName = async () => {
    if (!user) return;
    const next = newName.trim();
    if (!next) {
      showError("Please enter a username.");
      return;
    }
    setSavingName(true);
    try {
      await updateDisplayName(user.id, next);
      showSuccess("Username updated.");
      setNewName("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update username";
      showError(message);
    } finally {
      setSavingName(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    if (!currentPassword || !newPassword) {
      showError("Please enter your current password and a new password.");
      return;
    }
    if (newPassword.length < 6) {
      showError("New password must be at least 6 characters.");
      return;
    }

    const firebaseUser = auth.currentUser;
    if (!firebaseUser?.email) {
      showError("No authenticated user found.");
      return;
    }

    setSavingPassword(true);
    try {
      const cred = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
      await reauthenticateWithCredential(firebaseUser, cred);
      await updatePassword(firebaseUser, newPassword);
      showSuccess("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to change password";
      showError(message);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!user ? (
          <p className="text-gray-600">You are not logged in.</p>
        ) : (
          <>
            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-lg font-semibold text-gray-900">{user.displayName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="text-lg font-semibold text-gray-900">{user.isPremium ? "Premium" : "Free"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Change username</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-name">New username</Label>
                  <Input
                    id="new-name"
                    placeholder={initialName || "Your name"}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <Button onClick={handleSaveName} disabled={savingName} className="rounded-full bg-blue-600 hover:bg-blue-700">
                  {savingName ? "Saving..." : "Save username"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Change password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <Button
                  onClick={handleChangePassword}
                  disabled={savingPassword}
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  {savingPassword ? "Updating..." : "Update password"}
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
