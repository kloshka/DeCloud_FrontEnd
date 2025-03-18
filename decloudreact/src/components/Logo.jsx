import logo from '../assets/images/logo.svg';
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/" className="logo">
                <img className="logo__image" src={logo} alt="Логотип" />
                <h1 className="logo__text">DeCloud</h1>
        </Link>
    );
}

export default Logo;
