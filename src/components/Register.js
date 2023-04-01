import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";


const Register = ({ onRegister }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = React.useState(defaultValues);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  const navigate = useNavigate();

  return (
    <>
      <Header>
        <p onClick={() => navigate('/sign-in', { replace: true })}
          className="header__menu-item"
        >
          Войти
        </p>
      </Header>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="popup__content auth__form"
          onSubmit={(e) => {
            e.preventDefault();
            onRegister(inputs);
          }}>
          <input
            id="email"
            className='auth__form_input'
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email || ""}
            onChange={handleChange}
            required
          />
          <input
            className='auth__form_input'
            id="password"
            name="password"
            type="password"
            minLength="8"
            placeholder="Пароль"
            autoComplete="password"
            value={inputs.password || ""}
            onChange={handleChange}
            required
          />
          <button className='auth__form_button' type="submit">Зарегистрироваться</button>
        </form>
        <p className="auth__extra-text">
          Уже зарегистрированы?{" "}
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;