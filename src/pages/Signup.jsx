import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {
    const navigate = useNavigate();
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
        <p>
          Start your smart energy saving journey
        </p>

        <input 
          type="text" 
          placeholder="Enter your full name"
        />

        <input 
          type="email" 
          placeholder="Enter your email"
        />

        <input 
          type="password" 
          placeholder="Create a password"
        />

        <input 
          type="password" 
          placeholder="Confirm your password"
        />

        <button onClick={() => navigate("/login")}>
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