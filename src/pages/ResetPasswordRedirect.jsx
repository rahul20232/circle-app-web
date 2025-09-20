import { useEffect } from "react";

export default function ResetPasswordRedirect() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            // Try to redirect to the app
            window.location.href = `timeleftclone://reset-password?token=${token}`;

            // Fallback message if app doesn't open
            setTimeout(() => {
                alert("If the app didn't open automatically, please copy this token and paste it in the app: " + token);
            }, 3000);
        }
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
            <h1>Redirecting to App...</h1>
            <p>If the app doesn't open automatically, please open the TimeLeft app manually.</p>
            <p>Token: {new URLSearchParams(window.location.search).get("token")}</p>
            <button onClick={() => {
                const token = new URLSearchParams(window.location.search).get("token");
                navigator.clipboard.writeText(token);
                alert("Token copied to clipboard!");
            }}>
                Copy Token
            </button>
        </div>
    );
}