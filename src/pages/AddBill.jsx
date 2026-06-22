import { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./AddBill.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BillContext } from "../context/BillContext";

function AddBill() {
  const [month, setMonth] = useState("");
  const [units, setUnits] = useState("");
  const [amount, setAmount] = useState("");
  const [predictedBill, setPredictedBill] = useState(null);
  const [billDifference, setBillDifference] = useState(null);
  const { records, setRecords } = useContext(BillContext);
  const totalUnits = records.reduce(
  (sum, record) => sum + Number(record.units),
  0
);

const totalAmount = records.reduce(
  (sum, record) => sum + Number(record.amount),
  0
);

const averageUnits =
  records.length > 0
    ? (totalUnits / records.length).toFixed(1)
    : 0;

let aiMessage = "";

if (averageUnits > 300) {
  aiMessage =
    "⚠️ High electricity consumption detected. Try reducing AC usage and switch off unused appliances.";
} else if (averageUnits > 150) {
  aiMessage =
    "👍 Your electricity usage is normal. Keep following good energy-saving habits.";
} else if (records.length > 0) {
  aiMessage =
    "🌱 Excellent! Your electricity consumption is low and energy efficient.";
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!month || !units || !amount) {
      alert("Please fill all the details");
      return;
    }
    
    try {
  const response = await axios.post(
    "http://127.0.0.1:5000/predict",
    {
      units: Number(units),
    }
  );

  const predicted = response.data.predicted_bill;

  setPredictedBill(predicted);

  setBillDifference(Number(amount) - predicted);

} catch (error) {
  alert("ML prediction failed");
  console.log(error);
}

    const newRecord = {
      month,
      units,
      amount,
    };

    setRecords([...records, newRecord]);

    setMonth("");
    setUnits("");
    setAmount("");
  };

  return (
    <div className="bill-container">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ⚡ Add Electricity Bill
      </motion.h1>

      <form onSubmit={handleSubmit} className="bill-form">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <input
          type="number"
          placeholder="Units Consumed"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        />

        <input
          type="number"
          placeholder="Bill Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">
          Add Bill
        </button>
      </form>

      <div className="summary-container">
  <div className="summary-card">
    <h3>⚡ Total Units</h3>
    <p>{totalUnits} Units</p>
  </div>

  <div className="summary-card">
    <h3>💰 Total Amount</h3>
    <p>₹{totalAmount}</p>
  </div>

  <div className="summary-card">
    <h3>📊 Average Usage</h3>
    <p>{averageUnits} Units/Month</p>
  </div>
</div>

<div className="chart-container">
  <h2>📈 Electricity Consumption Trend</h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={records}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="units"
        stroke="#0077b6"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

<div className="chart-container">
  <h2>💰 Electricity Bill Trend</h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={records}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#ff7b00"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

<div className="ai-analysis">
  <h2>🤖 PowerWise AI Analysis</h2>

  <p>{aiMessage || "Add some bills to get AI insights."}</p>

  {predictedBill !== null && (
  <div className="ml-result">
    <h3>
      🧠 ML Predicted Bill: ₹{predictedBill.toFixed(2)}
    </h3>

    {billDifference > 0 ? (
      <p>
        ⚠️ Your actual bill is ₹{billDifference.toFixed(2)} higher than the ML prediction. Check heavy appliance usage or tariff changes.
      </p>
    ) : billDifference < 0 ? (
      <p>
        🌱 Great! Your actual bill is ₹{Math.abs(billDifference).toFixed(2)} lower than the ML prediction. Your energy usage is efficient.
      </p>
    ) : (
      <p>
        ✅ Your actual bill matches the ML predicted bill.
      </p>
    )}
  </div>
)}
</div>

      <div className="records">
        <h2>📊 Previous Records</h2>

        {records.length === 0 ? (
          <p>No bills added yet</p>
        ) : (
          records.map((record, index) => (
            <div className="record-card" key={index}>
              <p>Month: {record.month}</p>
              <p>Units: {record.units}</p>
              <p>Amount: ₹{record.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AddBill;