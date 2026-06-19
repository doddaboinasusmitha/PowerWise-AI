import { motion } from "framer-motion";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      
      <motion.h1
        className="dashboard-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        ⚡ PowerWise AI Dashboard
      </motion.h1>

      <motion.div 
        className="cards-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >

        <div className="card">
          <h2>🔋 This Month Usage</h2>
          <p>250 Units</p>
        </div>

        <div className="card">
          <h2>💰 Estimated Bill</h2>
          <p>₹1,850</p>
        </div>

        <div className="card">
          <h2>🌱 Energy Score</h2>
          <p>Good - 82%</p>
        </div>

      </motion.div>

      <motion.div
        className="ai-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2>🤖 AI Smart Suggestion</h2>
        <p>
          Your electricity consumption increased by 12% compared to last month.
          Try reducing unnecessary appliance usage during peak hours.
        </p>
      </motion.div>

    </div>
  );
}

export default Dashboard;