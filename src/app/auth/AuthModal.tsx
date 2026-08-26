import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, LockKeyhole, Mail, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useAuth } from "./AuthProvider";

type AuthMode = "signIn" | "signUp";

export function AuthModal({
  open,
  onOpenChange,
  initialMode = "signIn",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: AuthMode;
}) {
  const { isConfigured, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMode(initialMode);
    setEmail("");
    setPassword("");
    setMessage(null);
    setError(null);
  }, [initialMode, open]);

  const isSignUp = mode === "signUp";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const result = await signUp(email.trim(), password);
        setMessage(
          result.needsEmailConfirmation
            ? "Account created. Check your email to confirm your account, then sign in."
            : "Account created successfully.",
        );
        if (!result.needsEmailConfirmation) onOpenChange(false);
      } else {
        await signIn(email.trim(), password);
        onOpenChange(false);
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to complete that request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-200 bg-white p-0 text-slate-900 shadow-2xl sm:max-w-md">
        <DialogHeader className="border-b border-slate-200 px-6 py-6 sm:px-7">
          <div className="flex items-start gap-4 pr-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
              {isSignUp ? <UserPlus className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                {isSignUp ? "Create your account" : "Welcome back"}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-6 text-slate-500">
                {isSignUp
                  ? "Register to securely access source code downloads."
                  : "Log in to access your protected source code downloads."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-7">
          {!isConfigured && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800" role="alert">
              Authentication is waiting for the Supabase deployment variables to be added.
            </div>
          )}

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
              />
            </span>
          </label>

          {error && <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm leading-5 text-rose-700" role="alert">{error}</p>}
          {message && <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm leading-5 text-emerald-700" role="status">{message}</p>}

          <Button type="submit" disabled={submitting || !isConfigured} className="h-11 w-full bg-indigo-600 text-white hover:bg-indigo-700">
            {submitting ? "Please wait..." : isSignUp ? "Create account" : "Log in"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </Button>

          <p className="text-center text-sm text-slate-500">
            {isSignUp ? "Already have an account?" : "New to NetCodeShop?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(isSignUp ? "signIn" : "signUp"); setError(null); setMessage(null); }}
              className="font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              {isSignUp ? "Log in" : "Create an account"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}