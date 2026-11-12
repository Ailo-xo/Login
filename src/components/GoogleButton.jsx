import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { getErrorMessage } from "../utils/authErrors";

export default function GoogleButton() {
  const navigate = useNavigate();

  async function handleGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (err) {
      alert(getErrorMessage(err.code));
    }
  }

  return (
    <button className="button button--secondary google-button" type="button" onClick={handleGoogle}>
      <svg className="google-button__icon" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.24l7.76 6.02c4.53-4.18 7.08-10.33 7.08-17.73Z" />
        <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.94 23.94 0 0 0 0 21.56l7.98-6.19Z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.77l-7.76-6.02c-2.15 1.45-4.9 2.3-8.14 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
      </svg>
      Google менен улантуу
    </button>
  );
}
