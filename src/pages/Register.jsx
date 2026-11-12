import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { getErrorMessage } from "../utils/authErrors";
import GoogleButton from "../components/GoogleButton";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth, email, password
      );
      await updateProfile(user, { displayName: name });
      navigate("/profile");
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-intro">
        <span className="eyebrow">Баштоо оңой</span>
        <h1>Жеке <span>аккаунтуңузду</span> түзүңүз.</h1>
        <p className="auth-intro__copy">
          Бир нече кадам менен катталып, өзүңүздүн жеке мейкиндигиңизди ачыңыз.
        </p>
        <p className="auth-intro__note">Сиздин мейкиндигиңиз. Сиздин эрежелериңиз.</p>
      </div>

      <div className="auth-card">
        <h2 className="auth-card__heading">Катталуу</h2>
        <p className="auth-card__subtitle">Жаңы аккаунт түзүү үчүн маалыматтарыңызды толтуруңуз.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            Атыңыз
            <input
              className="input"
              placeholder="Атыңызды жазыңыз"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
              placeholder="Кеминде 6 белги"
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="status-message" role="alert">{error}</p>}
          <button className="button button--primary auth-form__submit" type="submit">Аккаунт түзүү</button>
        </form>
        <div className="auth-divider">же</div>
        <GoogleButton />
        <p className="auth-card__footer">
          Аккаунтуңуз барбы? <Link to="/login">Кирүү</Link>
        </p>
      </div>
    </section>
  );
}
