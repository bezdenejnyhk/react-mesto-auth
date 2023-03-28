import React from "react";

const Register = ({ onRegister }) => {
  const { enteredValues, handleChange } = React.useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(enteredValues);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="popup__content auth__form" onSubmit={handleSubmit}>
          <input
            id="email"
            className='auth__form_input'
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={enteredValues.email}
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
            value={enteredValues.password}
            onChange={handleChange}
            required
          />
          <button className='auth__form_button' type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </>
  );
};

export default Register;