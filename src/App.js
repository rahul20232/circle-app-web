import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordRedirect from "./pages/ResetPasswordRedirect";
// import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordRedirect />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
