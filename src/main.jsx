import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BillProvider } from "./context/BillContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BillProvider>
      <App />
    </BillProvider>
  </StrictMode>
);