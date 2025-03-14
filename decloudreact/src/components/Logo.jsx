import logo from '../assets/images/logo.svg';

function Logo() {
    return (
        <a href="/main" className="logo">
            <img className="logo__image" src={logo} alt="Логотип" />
            <h1 className="logo__text">DeCloud</h1>
        </a>
    );
}

export default Logo;
