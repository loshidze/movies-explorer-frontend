import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ onDelete, savedMovies }) {
  const [noResult, setNoResult] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [noSearch, setNoSearch] = React.useState(true);

  React.useEffect(() => {
      setMovies(savedMovies);
    }, [savedMovies])

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
  }

  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearch} filterMovies={filterMovies} getSearchSavedParams updateCheckboxParams/>
      <MoviesCardList movies={movies} onDelete={onDelete} noResult={noResult} savedMovies={savedMovies} />
    </main>
  )
}

export default SavedMovies;
