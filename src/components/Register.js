import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/auth";

const Register = ({ handleShowInfoMessage }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = React.useState(defaultValues);

  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    auth
      .register(inputs)
      .then((res) => {
        handleShowInfoMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
        resetForm();
        navigate("/sign-in");
      })
      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";
        handleShowInfoMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  function resetForm() {
    setInputs({ ...defaultValues });
  }

  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__menu-item">
          Войти
        </Link>
      </Header>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="popup__content auth__form" onSubmit={handleSubmit}>
          <input
            id="email"
            className='auth__form_input'
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
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
            value={inputs.password}
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