import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

// Google Verification Meta Tag
const meta = document.createElement("meta");
meta.name = "google-site-verification";
meta.content = "k02IoSwf94n2zzxPWIuTZ_F_APIg_KqYo5V4it6RlFM";
document.head.appendChild(meta);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      {/* ফিউচার ফ্ল্যাগগুলো এখানে যুক্ত করে দিন */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);