import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const [isSaved, setIsSaved] = React.useState(false);
  const { pathname  } = useLocation();
  
  const movieSaveButtonClassName = (
    `movie__button-save ${isSaved && 'movie__button-save_active'}`
  );

  function toggleSavedButton() {
    setIsSaved(!isSaved);
  }

  return (
    <figure className="movie">
      <figcaption className="movie__caption">
        <div className='movie__description'>
          <p className='movie__name'>{movie.nameRU}</p>
          <p className='movie__duration'>{movie.nameRU}</p>
        </div>
        {pathname === '/movies'
          ? (<button onClick={toggleSavedButton} aria-label="оценить" type="button" className={movieSaveButtonClassName}></button>)
          : (<button aria-label="удалить" type="button" className='movie__button-delete'></button>)}
      </figcaption>
      <img className="movie__image" src={movie.image} alt={movie.nameRU}/>
    </figure>
  )
}

export default MoviesCard;
