import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-5">
      <form
        onSubmit={handleSubmit}
        className="bg-sand rounded-none p-10 max-w-sm w-full"
      >
        <p className="font-display text-2xl mb-1">UNIWÊ</p>
        <p className="text-sm text-ink/50 mb-8">Espace administration</p>

        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wide text-ink/50">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input mt-2"
          />
        </label>

        <label className="block mb-6">
          <span className="text-xs uppercase tracking-wide text-ink/50">Mot de passe</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input mt-2"
          />
        </label>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-none bg-ink text-sand hover:bg-accent transition-colors py-3.5 text-sm disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
