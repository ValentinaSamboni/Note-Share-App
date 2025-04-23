import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotesProvider } from "@/context/NotesContext";
import Index from "./pages/Index";
import SharePage from "./pages/SharePage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

const queryClient = new QueryClient();

// Wrapper for protected routes
function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const navigate = window.location;

  if (loading) return null; // Show nothing (or spinner) while checking auth
  if (!user) {
    window.location.href = "/auth";
    return null;
  }
  return children;
}

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NotesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Index />
                  </RequireAuth>
                }
              />
              <Route path="/share/:id" element={<SharePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
