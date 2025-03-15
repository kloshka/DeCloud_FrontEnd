import { Link } from "react-router-dom";

const Authentication = () => {
  return (
    <div className="authentication">
      <Link to="/login" className="authentication__link">Вход</Link>
      <Link to="/registration" className="authentication__link authentication__link_colored">Регистрация</Link>
    </div>
  );
};

export default Authentication;