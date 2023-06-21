import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { pathname } = useLocation();

  function toggleMenuMode() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className='navigation'>
      {pathname === '/' ? (
        <div className='navigation__auth'>
          <Link to='/signup' className='navigation__signup-link'>Регистрация</Link>
          <Link to='/signin' className='navigation__signin-link'>Войти</Link>
        </div>
      ) : (
        <>
          <div className='navigation__logged-in'>
            <Link to='/movies' className={pathname === '/movies'
              ? 'navigation__link navigation__link_activ'
              : 'navigation__link'}>Фильмы</Link>
              <Link to='/saved-movies' className={pathname === '/saved-movies'
              ? 'navigation__link navigation__link_activ'
              : 'navigation__link'}>Сохранённые фильмы</Link>
              <Link to='/profile' className='navigation__profile-link'>Аккаунт</Link>
          </div>
          <div className='navigation__burger' onClick={toggleMenuMode}></div>
          {isMenuOpen && (
            <BurgerMenu onClose={toggleMenuMode}/>
          )}
        </> 
      )}
    </nav>
  )
}

export default Navigation;