import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/MoviesApi';

function Movies({ onSave, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [noResult, setNoResult] = React.useState(false);
  const [apiMovieErr, setApiMovieErr] = React.useState(false);

  const search = (movies, values) => {
    return movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()))
  }

  const filter = (searchResult) => {
    return searchResult.filter((movie) => movie.duration <= 40)
  }

  const showNoResult = (res) => {
    if (res.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }

  const handleSearch = (isChecked, values) => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        if (!localStorage.getItem('movies')) {
          localStorage.setItem('movies', JSON.stringify(res));
        }
        const moviesApi = JSON.parse(localStorage.getItem('movies'));
        const searchResult = search(moviesApi, values);
        localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
        if (isChecked) {
          const filterResult = filter(searchResult);
          setFilteredMovies(filterResult);
          showNoResult(filterResult);
        }
        if (!isChecked) {
          setFilteredMovies(searchResult);
          showNoResult(searchResult);
        }
        setSearchParams(isChecked, values);
        setApiMovieErr(false)
      })
      .catch((err) => {
        console.log(err);
        setApiMovieErr(true)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const setSearchParams = (isChecked, values) => {
    localStorage.setItem('searchParams', JSON.stringify({ value: values.movie, checkbox: isChecked}));
  }

  const getSearchParams = (setValues, setIsChecked) => {
    if (localStorage.getItem('searchParams')) {
      const params = JSON.parse(localStorage.getItem('searchParams'));
      setValues({movie: params.value});
      setIsChecked(params.checkbox);
    }
  }

  const updateCheckboxParams = (isChecked) => {
    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
    searchParams.checkbox = isChecked;
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
  }

  const filterMovies = (isChecked) => {
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    if (isChecked && searchedMovies) {
      const filterResult = filter(searchedMovies);
      setFilteredMovies(filterResult);
      showNoResult(filterResult);
    }
    if (!isChecked && searchedMovies) {
      setFilteredMovies(searchedMovies);
      showNoResult(searchedMovies);
    }
  }

  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearch} getSearchParams={getSearchParams} updateCheckboxParams={updateCheckboxParams} filterMovies={filterMovies} />
      {isLoading &&
      <Preloader />}
      {!isLoading &&
      <MoviesCardList onSave={onSave} movies={filteredMovies} noResult={noResult} apiMovieErr={apiMovieErr} savedMovies={savedMovies} />}
    </main>
  )
}

export default Movies;
