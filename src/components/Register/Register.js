import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function Register({ onRegister, apiAnswerErr, loggedIn, isFormLoading }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <main className='register'>
      <Link to='/' className='register__link'>
        <img className="register__logo" src={logo} alt="логотип"/>
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form' noValidate onSubmit={handleSubmit} action="#">
        <label className='register__label'>Имя</label>
        <input
          className='register__input'
          type='text'
          id='name'
          name='name'
          required
          value={values.name || ''}
          onChange={handleChange}
          minLength="2"
          placeholder='Введите имя'
          pattern='^[a-zA-Zа-яА-Я\s\-]+$'
          disabled={isFormLoading}
        />
        <span className='register__error'>{errors.name}</span>
        <label className='register__label'>E-mail</label>
        <input
          className='register__input'
          type='email'
          id='email'
          name='email'
          required
          value={values.email || ''}
          onChange={handleChange}
          placeholder='Введите e-mail'
          pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          disabled={isFormLoading}
        />
        <span className='register__error'>{errors.email}</span>
        <label className='register__label'>Пароль</label>
        <input
          className='register__input'
          type='password'
          id='password'
          name='password'
          required
          value={values.password || ''}
          onChange={handleChange}
          minLength="8"
          placeholder='Введите пароль'
          disabled={isFormLoading}
        />
        <span className='register__error'>{errors.password}</span>
        {apiAnswerErr && <span className='register__api-error'>{apiAnswerErr.errorText}</span>}
        <button className='register__button' disabled={!isValid || isFormLoading}>Зарегистрироваться</button>
        <div className='register__question'>
          <span>Уже зарегистрированы?</span>
          <Link to='/signin' className='register__login-link'>Войти</Link>
        </div>  
      </form>
    </main>
  )
}

export default Register;
