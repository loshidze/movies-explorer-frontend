import React from 'react';
import { Link } from 'react-router-dom';
import profilePhoto from '../../images/profile.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title' id='student'>Студент</h2>
      <div className='about-me__profile'>
        <div className='about-me__profile-text'>
          <h3 className='about-me__name'>Сергей</h3>
          <p className='about-me__occupation'>Фронтенд-разработчик, 34 года</p>
          <p className='about-me__text'>Я родился в Подмосковье, закончил факультет экономики по специальности
            "Менеджмент организации". В свободное время люблю заниматься спортом, кататься на лыжах,
            сноуборде, играть в большой теннис. Заниматься программирование начал недавно, до этого работал
            аналитиком и менеджером.
          </p>
          <Link className='about-me__link' to='https://github.com/loshidze'>Github</Link>
        </div>
        <img className='about-me__photo' src={profilePhoto} alt='фото профиля'/>
      </div>
    </section>
  )
}

export default AboutMe;
