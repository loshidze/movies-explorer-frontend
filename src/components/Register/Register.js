import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function Register() {
  const { values, handleChange, errors } = useFormAndValidation({});

  return (
    <section className='register'>
      <Link to='/' className='register__link'>
        <img className="register__logo" src={logo} alt="логотип"/>
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form' noValidate>
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
        />
        <span className='register__error'>{errors.password}</span>
        <button className='register__button'>Зарегистрироваться</button>
        <div className='register__question'>
          <span>Уже зарегистрированы?</span>
          <Link to='/signin' className='register__login-link'>Войти</Link>
        </div>  
      </form>
    </section>
  )
}

export default Register;
