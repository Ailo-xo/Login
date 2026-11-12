import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="site-nav" aria-label="Негизги навигация">
      <div className="site-nav__inner">
        <NavLink className="site-brand" to="/" aria-label="Aira — башкы бет">
          <span className="site-brand__mark" aria-hidden="true">a.</span>
          <span>AIRA / ACCOUNT</span>
        </NavLink>
        <div className="site-nav__links">
          <NavLink className="site-nav__link" to="/" end>Башкы</NavLink>
          {user ? (
            <NavLink className="site-nav__link" to="/profile">Профиль</NavLink>
          ) : (
            <>
              <NavLink className="site-nav__link" to="/login">Кирүү</NavLink>
              <NavLink className="site-nav__link site-nav__link--accent" to="/register">
                Катталуу
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
