import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  return (
    <header className='header'>
      <Link to='/'>
        <img className="header__logo" src={logo} alt="логотип"/>
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}


export default Header;
