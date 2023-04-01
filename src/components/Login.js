import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/auth";

const Login = ({ handleShowInfoMessage, onLogin }) => {
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
            .authorize(inputs)
            .then(res => {
                if (res.token) localStorage.setItem('token', res.token);
                resetForm();
                onLogin();
                navigate("/");
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
                <Link to="/sign-up" className="header__menu-item">
                    Регистрация
                </Link>
            </Header>
            <div className="auth">
                <h2 className="auth__title">Вход</h2>
                <form className="popup__content auth__form" onSubmit={handleSubmit} noValidate>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className='auth__form_input'
                        id="email"
                        autoComplete="email"
                        value={inputs.email}
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
                        value={inputs.password}
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