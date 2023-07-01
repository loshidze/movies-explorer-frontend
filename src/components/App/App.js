import React from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi'

function App() {
  // const [isRegistered, setIsRegistered] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = React.useState({});
  const [apiAnswerSuccess, setApiAnswerSuccess] = React.useState(false);
  const [apiAnswerErr, setApiAnswerErr] = React.useState({});
  const [apiLoginErr, setApiLoginErr] = React.useState({});
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [savedMovies, setSavedMovies] = React.useState([]);
  // const [savedMyMovies, setSavedMyMovies] = React.useState([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     mainApi
  //       .checkToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setLoggedIn(true);
  //           navigate('/movies');
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  React.useEffect(() => {
    handleCheckToken();
  }, [loggedIn])

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     Promise.all([mainApi.getProfileInfo(), mainApi.getMyMovies()])
  //       .then(([userData, moviesData]) => {
  //         setCurrentUser(userData);
  //         setSavedMovies(moviesData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // }, [loggedIn])

  function handleCheckToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      mainApi.checkToken(jwt)
        .then((res) => {
          if(res) {
            setCurrentUser(res)
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleRegister(values) {
    mainApi.register(values.name, values.email, values.password)
      .then((res) => {
        handleLogin(values)
      })
      .catch((err) => {
        console.log(err);
        setApiAnswerErr(err);
      })
  }

  function handleLogin(values) {
    // if (!!values.email || !values.password ) {
    //   return;
    // }
    mainApi.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
        setApiLoginErr(err);
      })
  }

  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
  }

  function handleUpdateUser(data) {
    mainApi.updateProfileInfo(data)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          email: data.email
        });
        setApiAnswerSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setApiAnswerErr(err);
        setApiAnswerSuccess(false);
      })
  }

  // const onSave = (movie) => {
  //   mainApi.saveMovie(movie)
  //     .then((res) => {
  //       setSavedMovies([res, ...savedMovies]);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // const deleteSavedMovie = (id) => {
  //   const savedMovie = savedMovies.find((movie) => movie.movieId === id)
  //   deleteMovie(savedMovie._id);
  // }

  // const deleteMovie = (id) => {
  //   mainApi.deleteMovie(id)
  //   .then((res) => {
  //     setSavedMovies((state) => state.filter((currentMovie) => currentMovie._id !== id));
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  //   // try {
  //   //   await MainApi.deleteMovie(id);
  //   //   setSavedMovies((state) => state.filter((currentMovie) => currentMovie._id !== id));
  //   // } catch {
  //   //   setIsPopupOpen(true);
  //   //   setApiMessage(DELETE_MOVIE_ERROR_MESSAGE);
  //   // }
  // }


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header loggedIn={loggedIn}/> : null}
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/movies' element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />} />
          <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />} />
          <Route path='/profile' element={<ProtectedRoute element={Profile} loggedIn={loggedIn} onLogout={handleLogout} onUpdateUser={handleUpdateUser} apiAnswerSuccess={apiAnswerSuccess} apiAnswerErr={apiAnswerErr}/>} />
          <Route path='/signup' element={<Register onRegister={handleRegister} apiAnswerErr={apiAnswerErr} />}/>
          <Route path='/signin' element={<Login onLogin={handleLogin} apiLoginErr={apiLoginErr} />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer/> : null}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
