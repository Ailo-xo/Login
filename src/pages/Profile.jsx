import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  const displayName = user.displayName || "Колдонуучу";
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
  const creationDate = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "—";
  const providers = user.providerData
    .map(({ providerId }) => providerId === "password" ? "Email жана сырсөз" : providerId)
    .join(", ") || "—";

  return (
    <section className="profile-page">
      <header className="profile-heading">
        <span className="eyebrow">Жеке мейкиндик</span>
        <h1>Профилиңиз</h1>
        <p>Аккаунтуңуздун маалыматын бир жерден карап чыгыңыз.</p>
      </header>

      <article className="profile-card">
        <div className="profile-card__identity">
          <div className="profile-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt={`${displayName} — аватар`} referrerPolicy="no-referrer" />
            ) : initials}
          </div>
          <div>
            <h2 className="profile-card__name">{displayName}</h2>
            <p className="profile-card__email">{user.email || "Email көрсөтүлгөн эмес"}</p>
          </div>
        </div>

        <section className="profile-section" aria-labelledby="profile-details-title">
          <h3 className="profile-section__title" id="profile-details-title">Аккаунт маалыматы</h3>
          <div className="profile-details">
            <div className="profile-detail">
              <span className="profile-detail__label">Толук аты</span>
              <span className="profile-detail__value">{displayName}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail__label">Email дареги</span>
              <span className="profile-detail__value">{user.email || "—"}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail__label">Катталган күнү</span>
              <span className="profile-detail__value">{creationDate}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail__label">Кирүү ыкмасы</span>
              <span className="profile-detail__value">{providers}</span>
            </div>
          </div>
        </section>

        <div className="profile-card__actions">
          <button className="button button--secondary" type="button" onClick={handleLogout}>
            Аккаунттан чыгуу
          </button>
        </div>
      </article>
    </section>
  );
}
