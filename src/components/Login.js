import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = ({ onLogin }) => {
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
                <p onClick={() => navigate('/sign-up', { replace: true })}
                    className="header__menu-item"
                >
                    Регистрация
                </p>
            </Header>
            <div className="auth">
                <h2 className="auth__title">Вход</h2>
                <form className="popup__content auth__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onLogin(inputs);
                    }} noValidate>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className='auth__form_input'
                        id="email"
                        autoComplete="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        minLength="8"
                        name="password"
                        className='auth__form_input'
                        id="password"
                        placeholder="Пароль"
                        autoComplete="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        required
                    />
                    <button className='auth__form_button' type="submit">Войти</button>
                </form>
            </div>
        </>
    );
};

export default Login;