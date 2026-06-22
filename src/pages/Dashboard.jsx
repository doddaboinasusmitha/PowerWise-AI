import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BillContext } from "../context/BillContext";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { records } = useContext(BillContext);

  const latestBill = records[records.length - 1];

  let units = "No Data";
  let amount = "No Data";
  let energyStatus = "Add a bill";

  if (latestBill) {
    units = `${latestBill.units} Units`;
    amount = `₹${latestBill.amount}`;

    if (latestBill.units <= 150) {
      energyStatus = "Excellent 🌱";
    } else if (latestBill.units <= 300) {
      energyStatus = "Good 👍";
    } else {
      energyStatus = "High Usage ⚠️";
    }
  }

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
          <h2>🔋 Latest Usage</h2>
          <p>{units}</p>
        </div>

        <div className="card">
          <h2>💰 Latest Bill</h2>
          <p>{amount}</p>
        </div>

        <div className="card">
          <h2>🌱 Energy Status</h2>
          <p>{energyStatus}</p>
        </div>
      </motion.div>

      <motion.div
        className="ai-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2>🤖 PowerWise AI Suggestion</h2>

        <p>
          {!latestBill
            ? "Add your first electricity bill to get AI suggestions."
            : latestBill.units > 300
            ? "Your consumption is high. Try reducing unnecessary appliance usage."
            : "Your electricity usage is under control. Keep following energy-saving habits."}
        </p>
      </motion.div>

      <motion.button
        className="add-bill-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/add-bill")}
      >
        ➕ Add New Electricity Bill
      </motion.button>
      <motion.button
  className="logout-btn"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/login")}
>
  🚪 Logout
</motion.button>
    </div>
  );
}

export default Dashboard;