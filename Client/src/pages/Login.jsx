import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import AuthContext from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("Server not running or network error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#060b1a] text-white lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-14%] top-[-10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(58,90,255,0.14)_0%,rgba(10,17,35,0)_72%)]" />
        <div className="absolute right-[-16%] top-[4%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(54,87,250,0.18)_0%,rgba(6,11,26,0)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0b1229_0%,#060b1a_50%,#10182d_100%)]" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1260px] flex-col items-center justify-center gap-5 px-5 py-8 sm:px-10 lg:h-full lg:min-h-0 lg:px-12 lg:py-8">
        <section className="grid h-auto w-full max-w-[1100px] grid-cols-1 items-center gap-6 overflow-hidden rounded-[28px] border border-[#2a3554] bg-[linear-gradient(160deg,rgba(28,36,57,0.86)_0%,rgba(20,28,46,0.76)_100%)] p-3 shadow-[0_26px_80px_rgba(4,8,18,0.62)] sm:p-4 lg:h-[clamp(560px,72vh,660px)] lg:grid-cols-[460px_460px] lg:justify-center lg:gap-12 lg:p-5">
          <aside className="mx-auto hidden h-full w-full max-w-[460px] overflow-hidden rounded-[3px] bg-[#050c1f] shadow-[0_26px_80px_rgba(0,0,0,0.52)] lg:block">
            <div className="h-[16%] w-full bg-[radial-gradient(circle_at_50%_70%,rgba(65,85,255,0.22),rgba(5,12,31,0.85)_70%)]" />

            <div className="relative flex h-[68%] w-full items-center justify-center bg-[radial-gradient(circle,#66e4e2_0%,#4cced1_34%,#35b5bf_62%,#2a9dac_100%)]">
              <div className="relative -left-3 top-2 h-[252px] w-[208px] rotate-[-12deg] rounded-b-[12px] rounded-t-[10px] bg-[#f0f4f6] shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <div className="h-[56px] rounded-t-[10px] bg-[#f18e63] px-4 pt-3">
                  <div className="flex items-center justify-between px-2">
                    {[1, 2, 3, 4, 5].map((ring) => (
                      <span
                        key={ring}
                        className="h-3.5 w-3.5 rounded-full border-2 border-[#9aa7b2] bg-transparent"
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1.5 px-4 py-4">
                  {Array.from({ length: 28 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-4 w-4 rounded-[2px] ${
                        idx % 8 === 0 || idx % 13 === 0
                          ? "bg-[#ef8b5a]"
                          : "bg-[#4fb8cc]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-[102px] right-[58px] rotate-[24deg] rounded-[14px] border border-[#384660] bg-[#253750] px-2.5 py-2.5 shadow-[0_18px_24px_rgba(0,0,0,0.35)]">
                <div className="mb-2 rounded bg-[#dfe7ef] px-2 py-0.5 text-right font-mono text-[10px] text-[#1f2d40]">
                  0.0000
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 16 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-3.5 w-3.5 rounded-[2px] ${
                        idx === 0
                          ? "bg-[#ff8e62]"
                          : idx % 5 === 0
                            ? "bg-[#6ca7cb]"
                            : "bg-[#9fbbd0]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[16%] w-full bg-[radial-gradient(circle_at_50%_30%,rgba(65,85,255,0.22),rgba(5,12,31,0.86)_70%)]" />
          </aside>

          <div className="mx-auto flex h-full w-full max-w-[460px]">
            <div className="h-full w-full rounded-[24px] border border-white/12 bg-[linear-gradient(155deg,rgba(17,24,47,0.96)_0%,rgba(13,20,41,0.9)_55%,rgba(20,33,70,0.84)_100%)] px-6 py-5 shadow-[0_40px_90px_rgba(2,8,24,0.82)] sm:px-10 sm:py-6">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[42px]">
                Welcome back
              </h1>
              <p className="mt-2 text-base leading-relaxed text-[#a8b1c6] sm:text-[16px] sm:leading-6">
                Enter your credentials to access your workspace.
              </p>

              {error && (
                <div className="mt-4 rounded-xl border border-red-400/45 bg-red-500/12 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email-address"
                    className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.17em] text-[#7f8cab]"
                  >
                    Email Address
                  </label>
                  <div className="flex h-[50px] items-center rounded-[16px] border border-[#d9dde5]/80 bg-[#f7f9fb] px-4 sm:h-[54px] sm:rounded-[18px] sm:px-5">
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="h-full w-full border-0 bg-transparent text-base text-[#39485f] outline-none placeholder:text-[#617088]"
                    />
                    <FiMail className="h-5 w-5 text-[#64748b]" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.17em] text-[#7f8cab]"
                  >
                    Password
                  </label>
                  <div className="flex h-[50px] items-center rounded-[16px] border border-[#d9dde5]/80 bg-[#f7f9fb] px-4 sm:h-[54px] sm:rounded-[18px] sm:px-5">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="........"
                      className="h-full w-full border-0 bg-transparent text-base text-[#39485f] outline-none placeholder:text-[#617088]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-[#64748b] transition hover:text-[#384860]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-[#a6afc2] sm:text-[15px]">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-[18px] w-[18px] rounded-full border border-[#3d4b6b] bg-transparent text-[#666cf6] accent-[#666cf6]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-[#b1bbcf] transition hover:text-white"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`h-[50px] w-full rounded-[16px] border border-[#7382ff] bg-gradient-to-r from-[#5f68df] to-[#5b63db] text-base font-semibold text-white shadow-[0_18px_34px_rgba(84,95,220,0.35)] transition hover:brightness-110 sm:h-[54px] sm:rounded-[18px] ${isLoading ? "cursor-not-allowed opacity-75" : ""}`}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>

                <button
                  type="button"
                  className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[16px] border border-white/10 bg-[#202b44] text-base font-medium text-[#dbe1ee] transition hover:bg-[#263452] sm:h-[54px] sm:rounded-[18px]"
                >
                  <FcGoogle className="h-5 w-5" />
                  Sign in with Google
                </button>

                <div className="pt-1">
                  <div className="h-px w-full bg-white/10" />
                </div>

                <p className="text-center text-sm text-[#8f9bb4] sm:text-[16px]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-white transition hover:text-[#c9d2ff]"
                  >
                    Sign up for free
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* <div className="shrink-0 pb-1 flex items-center justify-center gap-5 text-xs text-[#67738c] sm:text-[14px]">
          <button type="button" className="transition hover:text-[#b7c1d5]">
            Privacy Policy
          </button>
          <span className="text-[#3f4b63]">*</span>
          <button type="button" className="transition hover:text-[#b7c1d5]">
            Terms of Service
          </button>
        </div> */}
      </main>
    </div>
  );
}

export default Login;
