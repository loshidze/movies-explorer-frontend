import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/MoviesApi'

function Movies({ onSave, onDelete, savedMovies }) {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [noResult, setNoResult] = React.useState(false);
  const [apiMovieErr, setApiMovieErr] = React.useState(false);

  // React.useEffect(() => {
  //   const showSearchedMovies = () => {
  //     const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
  //     setMovies(searchedMovies);
  //   }

  //   showSearchedMovies();
  // }, [])

  const search = (movies, values) => {
    return movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()))
  }

  const filter = (searchResult) => {
    return searchResult.filter((movie) => movie.duration <= 40)
  }

  const handleNoResult = (res) => {
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
        if (isChecked) {
          const searchResult = search(moviesApi, values);
          const filterResult = filter(searchResult);
          localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
          setMovies(filterResult);
          handleNoResult(filterResult);
        }
        if (!isChecked) {
          const searchResult = search(moviesApi, values);
          localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
          setMovies(searchResult);
          handleNoResult(searchResult);
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
    const movies = JSON.parse(localStorage.getItem('searchedMovies'));
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    if (isChecked && movies) {
      const filterResult = filter(searchedMovies);
      setMovies(filterResult);
      handleNoResult(filterResult);
    }
    if (!isChecked && movies) {
      setMovies(movies);
      setNoResult(false);
    }
  }


  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearch} getSearchParams={getSearchParams} updateCheckboxParams={updateCheckboxParams} filterMovies={filterMovies} />
      {isLoading &&
      <Preloader />}
      {!isLoading &&
      <MoviesCardList onSave={onSave} onDelete={onDelete} movies={movies} noResult={noResult} apiMovieErr={apiMovieErr} savedMovies={savedMovies} />}
    </main>
  )
}

export default Movies;
