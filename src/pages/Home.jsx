import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0];

  return (
    <section className="home-page">
      <div className="home-page__copy">
        <span className="eyebrow">Жеке аккаунтуңуз үчүн</span>
        <h1>
          Санарип мейкиндигиңизге <span>кош келиңиз.</span>
        </h1>
        <p className="home-page__description">
          Кирүү жана аккаунтуңузду башкаруу — эми жөнөкөй, коопсуз жана сиз үчүн.
        </p>
        <div className="home-page__actions">
          {user ? (
            <Link className="button button--primary" to="/profile">Профилге өтүү</Link>
          ) : (
            <>
              <Link className="button button--primary" to="/register">Аккаунт түзүү</Link>
              <Link className="button button--secondary" to="/login">Аккаунтка кирүү</Link>
            </>
          )}
        </div>
      </div>
      <aside className="home-card" aria-label="Аккаунттун артыкчылыктары">
        <p className="home-card__label">Баары бир жерде</p>
        <p className="home-card__welcome">{firstName ? `Кош келиңиз, ${firstName}` : "Сиз үчүн жасалды"}</p>
        <div className="home-card__row">
          <span className="home-card__icon" aria-hidden="true">✦</span>
          <div><strong>Жеке мейкиндик</strong><span>Маалыматыңыз бир жерде</span></div>
        </div>
        <div className="home-card__row">
          <span className="home-card__icon" aria-hidden="true">↗</span>
          <div><strong>Ыңгайлуу кирүү</strong><span>Email же Google аккаунту</span></div>
        </div>
        <div className="home-card__row">
          <span className="home-card__icon" aria-hidden="true">◇</span>
          <div><strong>Коопсуз байланыш</strong><span>Firebase Authentication менен</span></div>
        </div>
      </aside>
    </section>
  );
}
