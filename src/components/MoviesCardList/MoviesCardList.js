import React from 'react';
import { useLocation } from 'react-router-dom';
// import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  const { pathname  } = useLocation();

  return (
    <div className='movies-container'>
      <div className='movies-container__list'>
        {movies.map((movie) => (
          <MoviesCard key={movie._id} movie={movie}/>
        ))}
      </div>
      {pathname  === '/movies' && <button className='movies-container__button'>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;
