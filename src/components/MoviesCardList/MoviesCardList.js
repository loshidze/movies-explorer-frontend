import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import useResize from '../../hooks/useResize';

function MoviesCardList({ movies, onSave, onDelete, noResult, apiMovieErr, savedMovies }) {

  const { pathname } = useLocation();
  const size = useResize();
  const [moviesToAdd, setMoviesToAdd] = React.useState(0);

  React.useEffect(() => {
    setMoviesToAdd(0);
  }, [movies]);

  const moviesToRender = React.useMemo(() => {
    const countToRender = size.width < 768 ? 5 : size.width < 1280 ? 8 : 12;

    return movies.slice(0, countToRender + moviesToAdd);
  }, [movies, moviesToAdd, size]);

  const showMoreMovies = () => {
    setMoviesToAdd((prev) => prev + (size.width >= 1280 ? 3 : 2))
  }

  return (
    <div className='movies-container'>
      {noResult &&
        <span className='movies-container__no-result'>Ничего не найдено</span>
      }
      {apiMovieErr &&
        <span className='movies-container__error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
      }
      <div className='movies-container__list'>
        {moviesToRender.map((movie) => (
          <MoviesCard key={movie.id || movie._id} movie={movie} onSave={onSave} onDelete={onDelete} savedMovies={savedMovies}/>
        ))}
      </div>
      {pathname  === '/movies' &&
        movies.length > moviesToRender.length &&
        <button className='movies-container__button' onClick={showMoreMovies}>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;
