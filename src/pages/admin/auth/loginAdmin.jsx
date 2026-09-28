/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("aduh, email atau password salah");
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen ">
      {/* Konten */}
      <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center px-4 py-16">
        {/* Card */}
        <div className="w-full max-w-[377px] rounded-[28px] bg-white/40 backdrop-blur-xl px-10 pb-10 pt-11 border border-black/20">
          <h1 className="text-center font-medium text-xl">
            yuhuu, mau login ya?
          </h1>
          <p className="mt-2 text-center text-sm text-[#6c6c6c]">
            masuk pake email n password yg udah ak kasih
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[11px] font-semibold text-neutral-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan email"
                required
                className="h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-biru focus:outline-none focus:ring-2 focus:ring-biru/20"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[11px] font-semibold text-neutral-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="masukkan password"
                  required
                  className="h-11 w-full rounded-xl border border-neutral-200 px-3 pr-11 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-biru focus:outline-none focus:ring-2 focus:ring-biru/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <path d="M1 1l22 22" />
                    </svg>
                  )}
                </button>
              </div>
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </div>
            {/* Sign in */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-11 w-full rounded-xl bg-linear-to-r from-biru to-hijau text-sm font-medium text-white hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
            >
              {loading ? "sabarr otw masuk..." : "masukkkkkk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
