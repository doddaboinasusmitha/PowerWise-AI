import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
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
        <h2>Welcome Back</h2>
        <p>
          Analyze your electricity usage smartly and save energy
        </p>

        <input type="email" placeholder="Enter your email" />
        
        <input 
          type="password" 
          placeholder="Enter your password"
        />

        <button onClick={() => navigate("/dashboard")}>
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