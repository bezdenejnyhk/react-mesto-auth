import React from "react";

const Login = ({ onLogin }) => {
    const [enteredValues, setEnteredValues] = React.useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setEnteredValues({
            ...enteredValues,
            [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!enteredValues.email || !enteredValues.password) {
            return;
        }
        onLogin(enteredValues);
    };

    return (
        <>
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
                        value={enteredValues.email || ''}
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
                        value={enteredValues.password || ''}
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