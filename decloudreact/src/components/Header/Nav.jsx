import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/processing" className="nav__item">Обработка</Link>
      <Link to="/about" className="nav__item">О нас</Link>
      <Link to="/history" className="nav__item">История</Link>
    </nav>
  );
};

export default Nav;