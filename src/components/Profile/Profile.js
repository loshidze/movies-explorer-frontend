import React from 'react';

function Profile() {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');

  const handleChange = (e) => {
    const { value } = e.target
    setName(value)
    setEmail(value)
  }

  return (
    <section className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
          <div className='profile__inputs'>
            <div className='profile__input-container'>
              <label className='profile__label'>Имя</label>
              <input
                className='profile__input'
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className='profile__input-container'>
              <label className='profile__label'>E-mail</label>
              <input
                className='profile__input'
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='profile__buttons'>
            <button className='profile__button-edit'>Редактировать</button>
            <button className='profile__button-exit'>Выйти из аккаунта</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile;
