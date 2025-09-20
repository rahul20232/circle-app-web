import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyEmailPage() {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("pending"); // pending, success, already-verified, error
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get("token");
    setToken(t);
  }, []);

  const verifyEmail = async () => {
    try {
      await axios.post(
        "https://circle-app-production-0a7b.up.railway.app/api/auth/verify-email",
        { token },
        { headers: { "Content-Type": "application/json" } }
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      // Check backend message
      const msg = err.response?.data?.detail;
      if (msg === "Email already verified") {
        setStatus("already-verified");
      } else {
        setStatus("error");
      }
    } finally {
      // Collapse after 10 seconds in all cases
      setTimeout(() => setCollapsed(true), 10000);
    }
  };

  useEffect(() => {
    if (token) verifyEmail();
  }, [token]);

  if (!token) return <p>Invalid verification link.</p>;
  if (collapsed) return <p>Page closed automatically.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "pending" && <p>Verifying your email...</p>}
      {status === "success" && (
        <>
          <p>Email verified successfully! You can now login.</p>
        </>
      )}
      {status === "already-verified" && (
        <>
          <p>Email is already verified! You can login.</p>
        </>
      )}
      {status === "error" && <p>Verification failed or token expired.</p>}
    </div>
  );
}
