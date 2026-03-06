import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Eye, EyeOff, Github, Mail, Smartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { signIn, signUp } from "@/firebase/auth";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let userProfile;
      if (isSignUp) {
        userProfile = await signUp(email, password, name);
      } else {
        userProfile = await signIn(email, password);
      }
      
      // Store remember me preference
      if (rememberMe && !isSignUp) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
      }
      
      // Update context
      showSuccess(isSignUp ? "Account created successfully!" : "Welcome back!");
      navigate("/dashboard");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Authentication failed";
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1fr,320px] gap-8 items-start">
        <div className="w-full max-w-md mx-auto lg:mx-0 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Start achieving your goals today
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

          <TabsContent value="signin">
            <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleAuth(e, false)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      className="rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <button type="button" className="text-xs text-blue-600 hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        required 
                        className="rounded-xl pr-12"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-700">Remember me</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-11" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or continue with</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" className="rounded-xl h-11"><Mail className="mr-2 h-4 w-4" /> Google</Button>
                    <Button variant="outline" className="rounded-xl h-11"><Github className="mr-2 h-4 w-4" /> Github</Button>
                  </div>
                  <div className="text-xs text-center text-gray-500">
                    <Link to="/terms" className="underline">Terms</Link>
                    <span> · </span>
                    <Link to="/privacy" className="underline">Privacy</Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join Goal Planner and start your journey</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleAuth(e, true)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      className="rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      className="rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"}
                        required 
                        className="rounded-xl pr-12"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-11" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By clicking continue, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        </div>

        {/* Right side: Download section */}
        <div className="hidden lg:block">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Get the mobile app</h3>
            <p className="text-sm text-gray-600 mb-4">Plan on the go with Lifeplans.</p>
            <div className="grid grid-cols-1 gap-3">
              <Button asChild className="rounded-2xl bg-gray-900 hover:bg-black text-white h-12 justify-start">
                <a
                  href="https://apps.apple.com/us/app/goal-planner-lifeplans/id6756404940"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Apple className="w-5 h-5 mr-3" />
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[11px] opacity-80">Download on the</span>
                    <span className="text-sm font-bold">App Store</span>
                  </span>
                </a>
              </Button>
              <Button disabled className="rounded-2xl bg-white border border-gray-200 text-gray-700 h-12 justify-start">
                <span className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-3" />
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[11px] text-gray-500">Google Play</span>
                    <span className="text-sm font-bold">Coming soon</span>
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;