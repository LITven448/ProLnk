import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Eye, EyeOff, Lock, AlertCircle } from "lucide-react";

export default function SetPassword() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Extract token and mode from URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? "";
  const isReset = params.get("mode") === "reset";

  const setPasswordMutation = trpc.partnerAuth.setPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    },
    onError: (err) => {
      setError(err.message || "Something went wrong. The link may have expired.");
    },
  });

  useEffect(() => {
    if (!token) {
      setError(isReset
        ? "Invalid or missing reset link. Please request a new one."
        : "Invalid or missing activation link. Please contact support.");
    }
  }, [token, isReset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setPasswordMutation.mutate({ token, password });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              {isReset ? "Password updated!" : "You're in!"}
            </h2>
            <p className="text-muted-foreground">
              {isReset
                ? "Your password has been reset. Redirecting to your dashboard..."
                : "Your account is active. Redirecting to your dashboard..."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">ProLnk</span>
          </div>
          <p className="text-muted-foreground text-sm">Partner Network</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isReset ? "Reset Your Password" : "Set Your Password"}</CardTitle>
            <CardDescription>
              {isReset
                ? "Enter a new password for your ProLnk partner account."
                : "Create a password to activate your ProLnk partner account. You'll use this to log in going forward."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!token ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-muted-foreground text-sm">
                  {isReset
                    ? "This reset link is invalid or has expired."
                    : "This activation link is invalid or has expired."}
                </p>
                {isReset ? (
                  <button
                    onClick={() => navigate("/partner/dashboard")}
                    className="text-amber-500 hover:underline text-sm"
                  >
                    Request a new reset link
                  </button>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Please contact{" "}
                    <a href="mailto:support@prolnk.io" className="text-amber-500 hover:underline">
                      support@prolnk.io
                    </a>
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="pr-10"
                      autoComplete="new-password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />
                </div>

                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            password.length >= level * 3
                              ? level <= 1 ? "bg-red-500" : level <= 2 ? "bg-yellow-500" : level <= 3 ? "bg-blue-500" : "bg-green-500"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {password.length < 8 ? "Too short" : password.length < 12 ? "Good" : "Strong"}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  disabled={setPasswordMutation.isPending || !token}
                >
                  {setPasswordMutation.isPending
                    ? (isReset ? "Resetting..." : "Activating...")
                    : (isReset ? "Reset Password" : "Activate My Account")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <button onClick={() => navigate("/partner/dashboard")} className="text-amber-500 hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
