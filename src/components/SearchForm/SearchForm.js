import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <div className='search'>
      <form className='search__form'>
        <input
          className='search__input'
          type='text'
          placeholder='Фильм' 
          required
          id='search'
          name='search'
          minLength="1"
        />
        <button className='search__button'>Поиск</button>
      </form>
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm;
