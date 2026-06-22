import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <motion.h1
        className="title"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        ⚡ PowerWise AI
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Smart Electricity Bill Analyzer powered by
        Artificial Intelligence and Machine Learning
      </motion.p>

      <motion.button
        className="start-btn"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        onClick={() => navigate("/login")}
      >
        Get Started
      </motion.button>
    </div>
  );
}

export default Welcome;