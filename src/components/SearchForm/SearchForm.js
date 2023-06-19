import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <input className='search__input' type='text' placeholder='Фильм'/>
        <button className='search__button'>Поиск</button>
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;
