import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Eye, EyeOff, Github, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import {
  signIn,
  signInWithApple,
  signInWithGithub,
  signInWithGoogle,
  signUp,
  signInWithGoogleRedirect,
  signInWithGithubRedirect,
  signInWithAppleRedirect,
} from "@/firebase/auth";
import Logo from "@/components/Logo";
import { consumeWizardDraft } from "@/utils/wizardDraft";
import { useAuthModal } from "@/contexts/AuthModalContext";

const AuthModal = () => {
  const { state, closeAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleProviderSignIn = async (provider: "google" | "github" | "apple") => {
    setIsLoading(true);
    try {
      let profile;
      if (provider === "google") {
        profile = await signInWithGoogle();
      } else if (provider === "github") {
        profile = await signInWithGithub();
      } else {
        profile = await signInWithApple();
      }
      showSuccess("Welcome back!");
      closeAuthModal();
      const wentToGoal = await consumeWizardDraft(profile.id, navigate);
      if (!wentToGoal) navigate("/dashboard");
    } catch (error: unknown) {
      const err = error as { code?: string } | undefined;
      const code = err?.code ?? "";
      if (code === "auth/popup-blocked" || code === "auth/popup-closed-by-user") {
        try {
          if (provider === "google") {
            await signInWithGoogleRedirect();
          } else if (provider === "github") {
            await signInWithGithubRedirect();
          } else {
            await signInWithAppleRedirect();
          }
          // Page will fully reload when the provider redirects back — nothing more to do here.
          return;
        } catch {
          // Redirect also failed — fall through and show the original error
        }
      }
      const message = error instanceof Error ? error.message : "Authentication failed";
      showError(
        code === "auth/unauthorized-domain"
          ? "This domain is not authorized for sign-in. Please contact support."
          : code === "auth/operation-not-allowed"
          ? "This sign-in method is not enabled. Please contact support."
          : message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userProfile = isSignUp
        ? await signUp(email, password, name, state.referralCode || undefined)
        : await signIn(email, password);

      showSuccess(isSignUp ? "Account created successfully!" : "Welcome back!");
      closeAuthModal();
      const wentToGoal = await consumeWizardDraft(userProfile.id, navigate);
      if (!wentToGoal) navigate("/dashboard");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Authentication failed";
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={state.open} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <Logo variant="stacked" className="h-14 w-auto" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-foreground">Welcome back</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Start achieving your goals today</p>
          </div>

          <Tabs defaultValue={state.intent} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={(e) => handleAuth(e, false)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-email">Email</Label>
                  <Input
                    id="modal-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="modal-password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="rounded-xl pr-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 rounded-xl h-11" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="relative w-full pt-1">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Button type="button" variant="outline" className="rounded-xl h-11" onClick={() => handleProviderSignIn("google")} disabled={isLoading}>
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl h-11" onClick={() => handleProviderSignIn("github")} disabled={isLoading}>
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl h-11" onClick={() => handleProviderSignIn("apple")} disabled={isLoading}>
                    <Apple className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground pt-1">
                  <Link to="/terms" onClick={closeAuthModal} className="underline">Terms</Link>
                  <span> · </span>
                  <Link to="/privacy" onClick={closeAuthModal} className="underline">Privacy</Link>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleAuth(e, true)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-name">Full Name</Label>
                  <Input
                    id="modal-name"
                    placeholder="John Doe"
                    required
                    className="rounded-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-signup-email">Email</Label>
                  <Input
                    id="modal-signup-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="modal-signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="rounded-xl pr-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {state.referralCode && (
                  <p className="text-xs text-momentum bg-momentum/10 rounded-lg px-3 py-2">
                    Invite code <strong>{state.referralCode}</strong> will be applied after you sign up.
                  </p>
                )}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 rounded-xl h-11" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By clicking continue, you agree to our{" "}
                  <Link to="/terms" onClick={closeAuthModal} className="underline">Terms of Service</Link> and{" "}
                  <Link to="/privacy" onClick={closeAuthModal} className="underline">Privacy Policy</Link>.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
