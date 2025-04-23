
import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const AuthPage = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const didRedirect = useRef(false);

  // If logged in, redirect away (prevents flicker on first render)
  if (!loading && user && !didRedirect.current) {
    didRedirect.current = true;
    navigate("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let result;
    if (mode === "login") {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }
    if (result.error) {
      setError(result.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Login" : "Create Account"}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              value={email}
              type="email"
              required
              placeholder="Email address"
              autoComplete="username"
              onChange={e => setEmail(e.target.value)}
              disabled={submitting}
            />
            <Input
              value={password}
              type="password"
              required
              placeholder="Password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              onChange={e => setPassword(e.target.value)}
              disabled={submitting}
            />
            {error && (
              <div className="text-destructive font-semibold text-sm">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              disabled={submitting}
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
            >
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
