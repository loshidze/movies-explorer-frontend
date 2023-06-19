import React from 'react';

function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <ul className='promo__links'>
        <li className='promo__link'><a className='promo__link-text' href='#about-project'>О проекте</a></li>
        <li className='promo__link'><a className='promo__link-text' href='#techs'>Технологии</a></li>
        <li className='promo__link'><a className='promo__link-text' href='#student'>Студент</a></li>
      </ul>
    </section>
  )
}

export default Promo;