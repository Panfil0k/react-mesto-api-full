import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password })
      .then(resetForm)
  }

  return (
    <div className="auth">
      <AuthForm
        name={"registration"}
        title={"Регистрация"}
        btnTitle={"Зарегистрироваться"}
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <Link className="auth__signin" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default Register
