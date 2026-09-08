import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="h-11 w-11 rounded-md bg-primary flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-white" />
          </span>
          <div>
            <p className="text-page-title text-ink">Admin Automation System</p>
            <p className="text-body text-ink-muted mt-1">Sign in to manage administrative operations</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-border rounded-card shadow-card p-6 flex flex-col gap-4"
        >
          {error && (
            <div className="bg-status-errorBg border border-red-200 text-status-error text-body rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            icon={Mail}
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-body text-ink-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-body text-primary hover:text-primary-dark">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" loading={loading} className="w-full mt-1">
            Login
          </Button>
        </form>

        <p className="text-center text-body text-ink-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:text-primary-dark">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
