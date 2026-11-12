import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getErrorMessage } from "../utils/authErrors";
import GoogleButton from "../components/GoogleButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  }

  async function handlePasswordReset() {
    setResetMessage("");
    setResetError("");
    if (!email.trim()) {
      setResetError("Сырсөздү калыбына келтирүү үчүн email дарегиңизди жазыңыз.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Калыбына келтирүү шилтемеси email дарегиңизге жөнөтүлдү.");
    } catch (err) {
      setResetError(getErrorMessage(err.code));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-intro">
        <span className="eyebrow">Кайра кош келиңиз</span>
        <h1>Өзүңүздүн <span>мейкиндигиңизге</span> кириңиз.</h1>
        <p className="auth-intro__copy">
          Аккаунтуңузга коопсуз кирип, жеке маалыматыңызды бир жерден башкарыңыз.
        </p>
        <p className="auth-intro__note">Жөнөкөй. Коопсуз. Сиз үчүн.</p>
      </div>

      <div className="auth-card">
        <h2 className="auth-card__heading">Кирүү</h2>
        <p className="auth-card__subtitle">Улантуу үчүн аккаунтуңузга кириңиз.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            Email дареги
            <input
              className="input"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="field">
            Сырсөз
            <input
              className="input"
              type="password"
              placeholder="Сырсөзүңүздү жазыңыз"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="button button--quiet auth-reset__trigger" type="button" onClick={handlePasswordReset}>
            Сырсөздү унуттуңузбу?
          </button>
          {error && <p className="status-message" role="alert">{error}</p>}
          {resetError && <p className="status-message" role="alert">{resetError}</p>}
          {resetMessage && <p className="status-message status-message--success" role="status">{resetMessage}</p>}
          <button className="button button--primary auth-form__submit" type="submit">Кирүү</button>
        </form>
        <div className="auth-divider">же</div>
        <GoogleButton />
        <p className="auth-card__footer">
          Аккаунтуңуз жокпу? <Link to="/register">Катталуу</Link>
        </p>
      </div>
    </section>
  );
}
