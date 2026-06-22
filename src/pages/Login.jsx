import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("powerwiseUsers")) || [];

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      user.email
    );

    alert("Login successful!");

    navigate("/dashboard");
  }

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>⚡ PowerWise AI</h1>

        <h2>Welcome Back</h2>

        <p>
          Analyze your electricity usage smartly and save energy
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <span onClick={() => navigate("/signup")}>
          Don't have an account? Sign Up
        </span>
      </motion.div>
    </div>
  );
}

export default Login;