import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movie1 from '../../images/movie1.png';

function SavedMovies() {
  const movies = [
    {
      _id: 1,
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: movie1,
      isSaved: false
    },
    {
      _id: 2,
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: movie1,
      isSaved: false
    },
    {
      _id: 3,
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: movie1,
      isSaved: false
    }
  ];

  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList movies={movies}/>
    </section>
  )
}

export default SavedMovies;
