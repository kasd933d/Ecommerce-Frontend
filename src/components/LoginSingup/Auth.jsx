import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";


export default function Auth() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  // Mode: "signup" | "login" | "forgot"
  const [authMode, setAuthMode] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showResendBtn, setShowResendBtn] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    setShowResendBtn(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModeChange = (mode) => {
    setErrorMessage("");
    setSuccessMessage("");
    setShowResendBtn(false);
    setAuthMode(mode);
  };

  const handleResendVerification = async () => {
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email first.");
      return;
    }

    setResendLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: formData.email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        const apiError = data?.error?.message || data?.message || "Failed to resend email.";
        setErrorMessage(apiError);
        return;
      }

      setSuccessMessage("Verification email sent! Please check your inbox.");
      setShowResendBtn(false);
    } catch (err) {
      console.error("Resend error:", err);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setShowResendBtn(false);

    // Validation for Signup
    if (authMode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match!");
        return;
      }
      if (formData.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }
    }

    setLoading(true);

    // Dynamic Endpoints
    let endpoint = "http://localhost:3000/api/v1/auth/register";
    if (authMode === "login") {
      endpoint = "http://localhost:3000/api/v1/auth/login";
    } else if (authMode === "forgot") {
      endpoint = "http://localhost:3000/api/v1/auth/forgot-password";
    }

    // Dynamic Payload
    let payload = {};
    if (authMode === "signup") {
      payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };
    } else if (authMode === "login") {
      payload = {
        email: formData.email.trim(),
        password: formData.password,
      };
    } else if (authMode === "forgot") {
      payload = {
        email: formData.email.trim(),
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const apiError = data?.error?.message || data?.message || "Operation failed";
      
        setErrorMessage(apiError);

        // Agar user login karne ki koshish kar raha hai bina verify kiye
        if (apiError.toLowerCase().includes("verify your email")) {
          setShowResendBtn(true);
        }
        return;
      }

      if (authMode === "forgot") {
        setSuccessMessage("Password reset link has been sent to your email!");
      } else if (authMode === "signup") {
        // 🛑 SIGNUP SUCCESS: Redirect nahi karenge! Email verification notice dikhayenge.
        setSuccessMessage("Account created! We've sent a verification email to your inbox. Please verify your email before logging in.");
        setShowResendBtn(true);
      } else if (authMode === "login") {
        // ✅ LOGIN SUCCESS: Sirf Login hone par redirect karenge
        const userObj = data?.data?.user || {
          name: data?.user?.name || formData.email.split("@")[0],
          email: formData.email,
        };

        loginUser(userObj);
        navigate("/home");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative">

        {/* Top Back/Close Button */}
        <button 
          onClick={() => navigate("/home")}
          className="absolute top-6 left-6 md:left-[47%] z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-all cursor-pointer"
        >
          ←
        </button>

        {/* LEFT SIDE: FORM SECTION */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {authMode === "signup" && "Create your account"}
                {authMode === "login" && "Log into your account"}
                {authMode === "forgot" && "Reset your password"}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {authMode === "signup" && "Sign up and get access to premium audio gear"}
                {authMode === "login" && "Welcome back to AURA.LAB"}
                {authMode === "forgot" && "Enter your email to receive a password reset link"}
              </p>
            </div>

            {/* Toggle Switch */}
            {authMode !== "forgot" && (
              <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
                <button
                  type="button"
                  onClick={() => handleModeChange("signup")}
                  className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all ${
                    authMode === "signup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("login")}
                  className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all ${
                    authMode === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Log in
                </button>
              </div>
            )}

            {/* Error Alert Box */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl flex flex-col gap-2">
                <div>⚠️ {errorMessage}</div>
                {showResendBtn && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendLoading}
                    className="self-start text-xs font-bold text-blue-600 hover:underline disabled:opacity-50"
                  >
                    {resendLoading ? "Sending..." : "→ Resend Verification Email"}
                  </button>
                )}
              </div>
            )}

            {/* Success Alert Box (Email Verification Notice) */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-medium rounded-xl flex flex-col gap-2">
                <div>✓ {successMessage}</div>
                {showResendBtn && authMode === "signup" && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendLoading}
                    className="self-start text-xs font-bold text-blue-600 hover:underline disabled:opacity-50"
                  >
                    {resendLoading ? "Sending..." : "→ Didn't receive email? Resend"}
                  </button>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 transition-all"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 transition-all"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {authMode !== "forgot" && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-700">Password</label>
                    {authMode === "login" && (
                      <button
                        type="button"
                        onClick={() => handleModeChange("forgot")}
                        className="text-[11px] font-semibold text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition-all"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              )}

              {authMode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Repeat the password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 transition-all"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all mt-2 disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : authMode === "signup"
                  ? "Sign up"
                  : authMode === "login"
                  ? "Log in"
                  : "Send Reset Link"}
              </button>
            </form>

            {/* Back to Login Link */}
            {authMode === "forgot" && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => handleModeChange("login")}
                  className="text-xs font-semibold text-gray-600 hover:text-black transition-colors"
                >
                  ← Back to Log in
                </button>
              </div>
            )}

            {/* Social Logins */}
            {authMode !== "forgot" && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="py-2.5 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all text-xs font-medium text-gray-700">
                  <span className="mr-2 font-bold text-red-500">G</span> Google
                </button>
                <button className="py-2.5 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all text-xs font-medium text-gray-700">
                  <span className="mr-2 font-bold text-gray-900"></span> Apple
                </button>
              </div>
            )}
          </div>

          {/* Footer Terms */}
          <p className="text-[11px] text-gray-400 text-center mt-6">
            By signing up, you agree to the{" "}
            <a href="#" className="underline hover:text-gray-600">Terms of Service</a> and{" "}
            <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>
          </p>
        </div>

        {/* RIGHT SIDE: IMAGE & AURA.LAB DESCRIPTION */}
        <div className="relative hidden md:block min-h-[550px] bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
            alt="AURA LAB Headphones"
            className="w-full h-full object-cover grayscale opacity-90"
          />

          <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white">
            <p className="text-xs text-gray-200 leading-relaxed">
              "AURA.LAB has completely redefined my sound experience. The acoustic precision, deep bass clarity, and minimalist design make it an absolute essential for sound enthusiasts!"
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <div>
                <h4 className="text-xs font-bold text-white">AURA.LAB Audio Series</h4>
                <p className="text-[10px] text-gray-400">Next-Gen Sound & Design</p>
              </div>

              <div className="flex gap-1.5">
                <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-all">
                  ←
                </button>
                <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-all">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}