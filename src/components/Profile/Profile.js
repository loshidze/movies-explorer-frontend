import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'; 

function Profile({ onLogout, onUpdateUser, apiAnswerSuccess, apiAnswerErr }) {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [editButton, setEditButton] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation({});

  React.useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser, setValues])

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
    setEditButton(false);
    setIsDisabled(true);
    setValues(currentUser);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setIsDisabled(false);
    setEditButton(true);
  }
  
  const handleNotSave = () => {
    setEditButton(false);
    setIsDisabled(true);
    setValues(currentUser);
  }

  return (
    <main className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__inputs'>
            <div className='profile__input-container'>
              <label className='profile__label'>Имя</label>
              <input
                className='profile__input'
                type='text'
                id='name'
                name='name'
                value={values.name || ''}
                onChange={handleChange}
                disabled={isDisabled}
                required
                minLength="2"
                pattern='^[a-zA-Zа-яА-Я\s\-]+$'
              />
            </div>
            <span className='profile__error'>{errors.name}</span>
            <div className='profile__input-container'>
              <label className='profile__label'>E-mail</label>
              <input
                className='profile__input'
                type='email'
                id='email'
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                disabled={isDisabled}
                required
                pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
              />
            </div>
            <span className='profile__error'>{errors.email}</span>
          </div>
          <div className='profile__buttons'>
            {apiAnswerSuccess ? <span className='profile__success-messege'>Профиль изменен</span>
            : <span className='profile__error-messege'>{apiAnswerErr.errorText}</span>}
            {!editButton
            ? (<button className='profile__button-edit' onClick={handleEdit}>Редактировать</button>)
            : (<div className='profile__save-container'>
                <button className='profile__button-save' disabled={!isValid || (values.name === currentUser.name && values.email === currentUser.email)}>Сохранить</button>
                <button className='profile__button-not-save' onClick={handleNotSave}>Отмена</button>
              </div>)
            }           
            <button className='profile__button-exit' onClick={onLogout}>Выйти из аккаунта</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Profile;
