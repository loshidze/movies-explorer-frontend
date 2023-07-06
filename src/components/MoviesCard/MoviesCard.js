import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, onSave, onDelete, savedMovies }) {

  const { pathname  } = useLocation();
  const url = 'https://api.nomoreparties.co/';

  const isSaved = savedMovies
    ? savedMovies.some((i) => i.movieId === movie.id)
    : false;

  const convertTime = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`
  }
  
  const movieSaveButtonClassName = (
    `movie__button-save ${isSaved && 'movie__button-save_active'}`
  );

  const savedMovie = savedMovies
    ? savedMovies.find((i) => i.movieId === movie.id)
    : '';

  function handleSavedMovie() {
    onSave(
      {
        "country": movie.country,
        "director": movie.director,
        "duration": movie.duration,
        "year": movie.year,
        "description": movie.description,
        "image": `${url}${movie.image.url}`,
        "trailerLink": movie.trailerLink,
        "nameRU": movie.nameRU,
        "nameEN": movie.nameEN,
        "thumbnail": `${url}${movie.image.formats.thumbnail.url}`,
        "movieId": movie.id
      },
      isSaved,
      savedMovie?._id
    );
  }

  const handleDeleteMovie = () => {
    onDelete(movie._id);
  }

  return (
    <figure className="movie">
      <figcaption className="movie__caption">
        <div className='movie__description'>
          <p className='movie__name'>{movie.nameRU}</p>
          <p className='movie__duration'>{convertTime(movie.duration)}</p>
        </div>
        {pathname === '/movies'
          ? (<button onClick={handleSavedMovie} aria-label="оценить" type="button" className={movieSaveButtonClassName}></button>)
          : (<button onClick={handleDeleteMovie} aria-label="удалить" type="button" className='movie__button-delete'></button>)}
      </figcaption>
      <a href={movie.trailerLink} target='_blank' rel="noreferrer">
        <img className="movie__image" src={pathname === '/movies' ? `${url}${movie.image.url}`: movie.image} alt={movie.nameRU}/>
      </a>
    </figure>
  )
}

export default MoviesCard;
