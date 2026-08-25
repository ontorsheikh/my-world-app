import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton({ fallback = "/" }) {
  const navigate = useNavigate();
  const location = useLocation();

  function goBack() {
    if (location.key !== "default") {
      navigate(-1);
      return;
    }
    navigate(fallback);
  }

  return (
    <button className="back-button" onClick={goBack} type="button">
      <span aria-hidden="true">←</span> Back
    </button>
  );
}
