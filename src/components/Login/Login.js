import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function Login({ onLogin, apiLoginErr }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
    resetForm();
  }

  return (
    <main className='login'>
      <Link to='/' className='login__link'>
        <img className="login__logo" src={logo} alt="логотип"/>
      </Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <form className='login__form' noValidate onSubmit={handleSubmit}>
        <label className='login__label'>E-mail</label>
        <input
          className='login__input'
          type='email'
          id='email'
          name='email'
          required
          value={values.email || ''}
          onChange={handleChange}
          placeholder='Введите e-mail'
        />
        <span className='login__error'>{errors.email}</span>
        <label className='login__label'>Пароль</label>
        <input
          className='login__input'
          type='password'
          id='password'
          name='password'
          required
          value={values.password || ''}
          onChange={handleChange}
          minLength="8"
          placeholder='Введите пароль'
        />
        <span className='login__error'>{errors.password}</span>
        <span className='login__api-error'>{apiLoginErr.errorText}</span>
        <button className='login__button' disabled={!isValid}>Войти</button>
        <div className='login__question'>
          <span>Ещё не зарегистрированы?</span>
          <Link to='/signup' className='login__register-link'>Регистрация</Link>
        </div>  
      </form>
    </main>
  )
}

export default Login;
