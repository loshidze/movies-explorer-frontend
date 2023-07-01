import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as mainApi from '../../utils/MainApi';

function SavedMovies() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <main className='movies'>
      <SearchForm  />
      {/* <Preloader /> */}
      <MoviesCardList  />
    </main>
  )
}

export default SavedMovies;
