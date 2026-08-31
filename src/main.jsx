import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Google Verification Meta Tag ডাইনামিক্যালি যুক্ত করা
const meta = document.createElement("meta");
meta.name = "google-site-verification";
meta.content = "k02IoSwf94n2zzxPWIuTZ_F_APIg_KqYo5V4it6RlFM";
document.head.appendChild(meta);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);