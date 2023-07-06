import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { TIME } from '../../utils/constants';

function SavedMovies({ onDelete, savedMovies }) {
  const [noResult, setNoResult] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [noSearch, setNoSearch] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(false);
  


  React.useEffect(() => {  
    if (noSearch) {
      if (isChecked) {
        let a = filter(savedMovies)
        setMovies(a)
      }
      if (!isChecked) {
        setMovies(savedMovies)
      }
    } else {
      if (isChecked) {
        let b = filter(JSON.parse(localStorage.getItem('searchedSavedMovies')))
        setMovies(b)
      }
      if (!isChecked) {
        setMovies(JSON.parse(localStorage.getItem('searchedSavedMovies')))
      }
    }  
  }, [savedMovies])

  const search = (movies, values) => {
    return movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()))
  }

  const filter = (searchResult) => {
    return searchResult.filter((movie) => movie.duration <= TIME)
  }

  const showNoResult = (res) => {
    if (res.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }

  const filterMovies = (isChecked) => {
    const searchedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));
    const noSearchMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (isChecked && searchedMovies) {
      const filterResult = filter(searchedMovies);
      setMovies(filterResult);
      showNoResult(filterResult);
    }
    if (!isChecked && searchedMovies) {
      setMovies(searchedMovies);
      showNoResult(searchedMovies);
    }
    if (isChecked && noSearch) {
      const filterResult = filter(noSearchMovies);
      setMovies(filterResult);
      showNoResult(filterResult);
    }
    if (!isChecked && noSearch) {
      setMovies(noSearchMovies);
      showNoResult(noSearchMovies);
    }
  }

  const handleSearch = (isChecked, values) => {
    setNoSearch(false);
    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    const searchResult = search(saved, values);
    localStorage.setItem('searchedSavedMovies', JSON.stringify(searchResult));
    if (isChecked) {
      const filterResult = filter(searchResult);
      setMovies(filterResult);
      showNoResult(filterResult);
    }
    if (!isChecked) {
      setMovies(searchResult);
      showNoResult(searchResult);
    }
    setSearchParams(isChecked, values);
  }

  const setSearchParams = (isChecked, values) => {
    localStorage.setItem('searchSavedParams', JSON.stringify({ checkbox: isChecked}));
  }

  const getSearchParams = (setIsChecked) => {
    if (localStorage.getItem('searchSavedParams')) {
      const params = JSON.parse(localStorage.getItem('searchSavedParams'));
      setIsChecked(params.checkbox);
    }
  }

  const updateCheckboxParams = (isChecked) => {
    const searchParams = JSON.parse(localStorage.getItem('searchSavedParams'));
    searchParams.checkbox = isChecked;
    localStorage.setItem('searchSavedParams', JSON.stringify(searchParams));
  }

  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearch} filterMovies={filterMovies} isChecked={isChecked} setIsChecked={setIsChecked} getSearchParams={getSearchParams} updateCheckboxParams={updateCheckboxParams} />
      <MoviesCardList movies={movies} onDelete={onDelete} noResult={noResult} savedMovies={savedMovies} />
    </main>
  )
}

export default SavedMovies;
