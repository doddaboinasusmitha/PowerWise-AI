import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignup() {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("powerwiseUsers")) || [];

    const userExists = users.find(
      (user) => user.email === email
    );

    if (userExists) {
      alert("Email already exists. Please login.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "powerwiseUsers",
      JSON.stringify(users)
    );

    alert("Account created successfully!");

    navigate("/login");
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

        <h2>Create Account</h2>

        <p>Start your smart energy saving journey</p>

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Create Account
        </button>

        <span onClick={() => navigate("/login")}>
          Already have an account? Login
        </span>
      </motion.div>
    </div>
  );
}

export default Signup;