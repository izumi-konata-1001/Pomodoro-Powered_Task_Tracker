import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-4 px-4 py-2 border border-brand-dark bg-brand-dark text-brand-light rounded hover:bg-brand-light hover:text-brand-dark transition"
    >
      Back
    </button>
  );
}

export default BackButton;