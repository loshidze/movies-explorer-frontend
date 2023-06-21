import React from 'react';
import { Link, useLocation } from 'react-router-dom';
function BurgerMenu({ onClose }) {
  const { pathname } = useLocation();

  return (
    <div className='burger'>
      <div className='burger__background'>
        <div className='burger__container'>
          <button type='button' className='burger__button' onClick={onClose}></button>
          <div className='burger__menu'>
            <Link to='/' className={pathname === '/' ? 'burger__link burger__link_active' : 'burger__link'}>Главная</Link>
            <Link to='/movies' className={pathname === '/movies' ? 'burger__link burger__link_active' : 'burger__link'}>Фильмы</Link>
            <Link to='/saved-movies' className={pathname === '/saved-movies' ? 'burger__link burger__link_active' : 'burger__link'}>Сохранённые фильмы</Link>
          </div>
          <Link to='/profile' className='burger__profile-link'>Аккаунт</Link>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu;
