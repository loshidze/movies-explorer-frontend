import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function SearchForm({ onSearch, getSearchParams, filterMovies, updateCheckboxParams }) {
  const [isChecked, setIsChecked] = React.useState(false);
  const [noSearch, setNoSearch] = React.useState('');
  const { values, handleChange, setValues, errors, isValid } = useFormAndValidation({});
  const { pathname } = useLocation();

  React.useEffect(() => {
    if(pathname === '/movies') {
      getSearchParams(setValues, setIsChecked);
    }
  }, [])

  React.useEffect(() => {
    filterMovies(isChecked);
    if(pathname === '/movies' && values.movie && (localStorage.getItem('searchedMovies'))) {
      updateCheckboxParams(isChecked);
    }
  }, [isChecked])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.movie) {
      setNoSearch('Нужно ввести ключевое слово');
      return
    } else {
      onSearch(isChecked, values);
      setNoSearch('');
    }
  }

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div className='search'>
      <form className='search__form' name='search-form' onSubmit={handleSubmit} noValidate>
        <input
          className='search__input'
          onChange={handleChange}
          value={values.movie || ''}
          type='text'
          placeholder='Фильм' 
          required
          name='movie'
          id='movie'
          minLength="1"
        />
        <button className='search__button'>Поиск</button>
      </form>
      <FilterCheckbox isChecked={isChecked} toggleCheckbox={toggleCheckbox} />
      <span className='search__requirement'>{noSearch}</span>
    </div>
  )
}

export default SearchForm;
