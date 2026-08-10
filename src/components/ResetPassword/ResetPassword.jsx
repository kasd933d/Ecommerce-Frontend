import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Read token from URL params (?token=XYZ)
    const token = searchParams.get("token");

    if (!token) {
      setErrorMessage("Invalid or missing reset token in URL.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          token: token,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const apiError = data?.error?.message || data?.message || "Password reset failed";
        console.error("Reset Password Error:", data);
        setErrorMessage(apiError);
        return;
      }

      setSuccessMessage("Password reset successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      console.error("Network error:", err);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10 border border-gray-100">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Set New Password
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Please enter your new password below.
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Success Alert Box */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-medium rounded-xl">
            ✓ {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition-all"
              value={newPassword}
              onChange={(e) => {
                setErrorMessage("");
                setNewPassword(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              placeholder="Repeat new password"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition-all"
              value={confirmPassword}
              onChange={(e) => {
                setErrorMessage("");
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all mt-2 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

      </div>
    </div>
  );
}