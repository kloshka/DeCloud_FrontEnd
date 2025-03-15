import Logo from "./Logo";
import Nav from "./Nav";
import Authentication from "./Authentication";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Nav />
      <Authentication />
    </header>
  );
};

export default Header;