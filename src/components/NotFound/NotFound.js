import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  function goBack() {
      navigate(-1);
  }

  return (
    <main className='not-found'>
      <div className='not-found__main'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <Link to={goBack} className='not-found__link'>Назад</Link>
    </main>
  )
}

export default NotFound;
