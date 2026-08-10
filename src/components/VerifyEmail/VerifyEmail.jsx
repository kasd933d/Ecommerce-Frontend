import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    const verifyUserEmail = async () => {
      // URL se sirf token extract kar rahe hain (e.g., /verify-email?token=xyz123)
      const token = searchParams.get("token");

      console.log("Verification Token Received:", token);

      // Agar URL me token hi nahi hai toh aage request nahi jayegi
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing in the URL.");
        return;
      }

      try {
        // Backend ko SIRF token bhej rahe hain POST request me
        const response = await fetch("http://localhost:3000/api/v1/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        console.log("Backend Response Object:", data);

        if (response.ok && (data.success || data.status === "success" || data.statusCode === 200)) {
          setStatus("success");
          setMessage(data.message || "Your email has been successfully verified!");
        } else {
          setStatus("error");
          const errorMsg =
            data?.error?.message ||
            data?.message ||
            data?.error ||
            "Verification failed or link has expired.";
          setMessage(errorMsg);
        }
      } catch (error) {
        console.error("Fetch Network Failure:", error);
        setStatus("error");
        setMessage("Server connection failed. Please check if your backend server is running.");
      }
    };

    verifyUserEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center px-4 selection:bg-black selection:text-white">
      <div className="max-w-md w-full border border-black p-8 sm:p-12 text-center space-y-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* TOP BRANDING / HEADER */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 block">
            Account Security
          </span>
          <h1 className="text-2xl font-black uppercase tracking-wider text-black">
            Email Verification
          </h1>
        </div>

        {/* DYNAMIC CONTENT BASED ON STATE */}
        {status === "verifying" && (
          <div className="space-y-6 py-6">
            <div className="w-12 h-12 border-2 border-black border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
              {message}
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 py-4">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto text-2xl font-black">
              ✓
            </div>
            <div className="space-y-2">
              <p className="text-sm font-black uppercase tracking-wider text-black">
                Verified!
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {message}
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/login"
                className="block w-full py-4 bg-black text-white hover:bg-neutral-800 text-xs font-black uppercase tracking-[0.2em] transition-all"
              >
                Proceed To Login
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 py-4">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center mx-auto text-2xl font-black text-black">
              ✕
            </div>
            <div className="space-y-2">
              <p className="text-sm font-black uppercase tracking-wider text-black">
                Verification Failed
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {message}
              </p>
            </div>
            <div className="pt-4 space-y-3">
              <Link
                to="/login"
                className="block w-full py-4 bg-black text-white hover:bg-neutral-800 text-xs font-black uppercase tracking-[0.2em] transition-all"
              >
                Back To Login
              </Link>
            </div>
          </div>
        )}

        {/* FOOTER NOTE */}
        <div className="border-t border-neutral-200 pt-6 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          Official Verification Portal
        </div>

      </div>
    </div>
  );
}