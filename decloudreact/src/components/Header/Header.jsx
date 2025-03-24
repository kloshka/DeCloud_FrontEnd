import Logo from "./Logo";
import Nav from "./Nav";
import Authentication from "./Authentication";
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;