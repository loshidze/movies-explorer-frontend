import React from 'react';

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='about-project__title' id='about-project'>О проекте</h2>
      <div className='about-project__container'>
        <div className='about-project__description'>
          <h2 className='about-project__description-title'>Дипломный проект включал 5 этапов</h2>
          <p className='about-project__description-info'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__description'>
          <h2 className='about-project__description-title'>На выполнение диплома ушло 5 недель</h2>
          <p className='about-project__description-info'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__duration'>
        <div className='about-project__time-1'>1 неделя</div>
        <div className='about-project__time-2'>4 недели</div>
      </div>
      <div className='about-project__duration-info'>
        <div className='about-project__time-info-1'>Back-end</div>
        <div className='about-project__time-info-2'>Front-end</div>
      </div>
    </section>
  )
}

export default AboutProject;
