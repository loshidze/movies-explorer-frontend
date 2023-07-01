import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MoviesCard({ movie, onSave, onDelete, savedMovies }) {
  const [isSaved, setIsSaved] = React.useState(false);
  const { pathname  } = useLocation();
  const url = 'https://api.nomoreparties.co/';

  // const isSaved = savedMovies.some(i => i.movieId === movie.id);

  // React.useEffect(() => {
  //   if (pathname === '/movies' && savedMovies.some((item) => item.movieId === movie.id)) {
  //     setIsSaved(true)
  //   }
  //   if (pathname === '/movies' && !savedMovies.some((item) => item.movieId === movie.id)) {
  //     setIsSaved(false)
  //   }
  // }, [savedMovies, movie.id])


  const convertTime = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`
  }
  
  const movieSaveButtonClassName = (
    `movie__button-save ${isSaved && 'movie__button-save_active'}`
  );

  function handleSavedMovie() {
    onSave(
      // movie
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
      }
    );
    // setIsSaved(true);
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
          ? (<button onClick={isSaved ? handleSavedMovie : handleDeleteMovie} aria-label="оценить" type="button" className={movieSaveButtonClassName}></button>)
          : (<button onClick={handleDeleteMovie} aria-label="удалить" type="button" className='movie__button-delete'></button>)}
      </figcaption>
      <a href={movie.trailerLink} target='_blank' rel="noreferrer">
        <img className="movie__image" src={pathname === '/movies' ? `${url}${movie.image.url}`: movie.image} alt={movie.nameRU}/>
      </a>
    </figure>
  )
}

export default MoviesCard;
