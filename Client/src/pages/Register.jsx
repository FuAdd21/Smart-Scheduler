import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiGrid } from "react-icons/fi";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register({ name, email, password });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0E14] text-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        .register-font { font-family: 'Inter', sans-serif; }
        .register-serif { font-family: 'Playfair Display', serif; }

        @keyframes wave {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-14px) scale(1.03); }
        }

        .mesh-gradient {
          background-color: #0B0E14;
          background-image:
            radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
            radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
            radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%);
          background-size: 150% 150%;
          animation: wave 15s ease infinite;
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .float-slow { animation: float-slow 20s infinite ease-in-out; }
        .float-medium { animation: float-medium 15s infinite ease-in-out reverse; }

        .glass-shell {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            inset 0 0 40px rgba(255, 255, 255, 0.02);
        }
        .input-pill {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border-radius: 9999px;
        }
        .input-pill:focus-within {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(99, 102, 241, 0.6);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }
        .prism-image {
          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkLy0IscZRcZCCbu2crmV7PdpG58j6Z_IYUQZss2LCdV0pEFr-2D6u14CnvrmQAHDhY6gPLSZYFcEwsyeK98TCzF8uf9EdPHFcGDN5HV-Mg_-yujbzmn92S4ZwD_iCJYzo4KuxjNSirYvNguxD49lmZd4uugtOqEmmS2oo5NtsWrBxEAG2gBMIM_V2_PrnWZGEMITDSLEMuoEJk3rXQ_OcBmbnihT5EPBkuMu-v3HGtA8ib_3QK_vA6y3prmZjCvpVfmmCOUx5SF8');
          background-size: cover;
          background-position: center;
        }
      `}</style>

      <div className="mesh-gradient fixed inset-0 z-[-2]" />
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[1] opacity-[0.04]" />
      <div className="float-slow fixed left-[-10%] top-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-900/20 blur-[120px]" />
      <div className="float-medium fixed bottom-[-10%] right-[-10%] h-[800px] w-[800px] rounded-full bg-purple-900/20 blur-[120px]" />

      <main className="register-font relative z-10 flex min-h-screen w-full items-center justify-center p-4 lg:p-8">
        <section className="glass-shell grid w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-[28px] lg:min-h-[680px] lg:grid-cols-2">
          <aside className="relative hidden h-full overflow-hidden lg:block">
            <div className="prism-image absolute inset-0 scale-110 transition-transform duration-[20s] ease-out hover:scale-100" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.2),rgba(11,14,20,0.6))]" />
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent mix-blend-overlay" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-12 text-center">
              <div className="flex max-w-lg flex-col items-center">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md">
                  <FiGrid className="h-5 w-5 text-white" />
                </div>
                <h2 className="register-serif text-4xl font-light italic leading-snug tracking-wide text-white">
                  "Efficiency is the
                  <br />
                  ultimate sophistication."
                </h2>
                <div className="mb-8 mt-8 h-px w-16 bg-white/30" />
                <p className="text-sm font-light uppercase tracking-[0.2em] text-white/60">
                  SmartScheduler (c) 2024
                </p>
              </div>
            </div>
          </aside>

          <div className="relative flex items-center justify-center bg-[#0B0E14]/40 p-8 backdrop-blur-xl lg:p-12 xl:p-16">
            <div className="w-full max-w-md">
              <header className="space-y-2 text-center lg:text-left">
                <h1 className="register-serif text-4xl tracking-tight text-white">
                  Begin Your Journey
                </h1>
                <p className="text-sm font-light text-gray-400">
                  Join the ecosystem of elite scheduling.
                </p>
              </header>

              {error && (
                <div className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="fullname" className="ml-4 block text-xs font-medium text-gray-400">
                    Full Name
                  </label>
                  <div className="input-pill px-6 py-3.5">
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="ml-4 block text-xs font-medium text-gray-400">
                    Email Address
                  </label>
                  <div className="input-pill px-6 py-3.5">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="password" className="ml-4 block text-xs font-medium text-gray-400">
                    Password
                  </label>
                  <div className="input-pill flex items-center px-6 py-3.5">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-gray-500 transition-colors hover:text-gray-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full rounded-full bg-[#6366F1] px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 active:scale-[0.98] ${isLoading ? "cursor-not-allowed opacity-75" : ""}`}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="group flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <FcGoogle className="mr-2 h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100" />
                    Google
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-xs text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-400 underline decoration-indigo-400/30 underline-offset-4 transition-colors hover:text-indigo-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
