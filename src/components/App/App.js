import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

function App() {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = React.useState({});
  const [apiAnswerSuccess, setApiAnswerSuccess] = React.useState(false);
  const [apiAnswerErr, setApiAnswerErr] = React.useState({});
  const [apiLoginErr, setApiLoginErr] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isFormLoading, setIsFormLoading] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    handleCheckToken();
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getMyMovies()
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem('savedMovies', JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getProfileInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  React.useEffect(() => {
    loggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);
  

  function handleCheckToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      mainApi.checkToken(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          localStorage.removeItem('jwt');
          navigate('/signin', {replace: true});
          console.log(err);
        })
    }
  }

  function handleRegister(values) {
    setIsFormLoading(true);
    mainApi.register(values.name, values.email, values.password)
      .then((res) => {
        handleLogin(values)
      })
      .catch((err) => {
        console.log(err);
        setApiAnswerErr(err);
      })
      .finally(() => {
        setIsFormLoading(false);
      })
  }

  function handleLogin(values) {
    setIsFormLoading(true);
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
      .finally(() => {
        setIsFormLoading(false);
      })
  }

  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
  }

  function handleUpdateUser(data) {
    setIsFormLoading(true);
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
      .finally(() => {
        setIsFormLoading(false);
      })
  }

  const handleSaveMovie = (movie, isSaved, id) => {
    if (isSaved) {
      handleDeleteMovie(id);
    } else {
      mainApi.saveMovie(movie)
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteMovie = (id) => {
    const searchedSavedMovies = JSON.parse(
      localStorage.getItem('searchedSavedMovies')
    );
    mainApi.deleteMovie(id)
      .then((res) => {
        const newSavedMovies = savedMovies.filter(
          (movie) => movie._id !== id
        );
        setSavedMovies(newSavedMovies);
        if (searchedSavedMovies) {
          const newSearchedSavedMovies = searchedSavedMovies.filter(
            (movie) => movie._id !== id
          );
          localStorage.setItem(
            'searchedSavedMovies',
            JSON.stringify(newSearchedSavedMovies)
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header loggedIn={loggedIn}/> : null}
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/movies' element={<ProtectedRoute element={Movies} loggedIn={loggedIn} onSave={handleSaveMovie} savedMovies={savedMovies} isFormLoading={isFormLoading} setIsFormLoading={setIsFormLoading}/>} />
          <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} onDelete={handleDeleteMovie} savedMovies={savedMovies}/>} />
          <Route path='/profile' element={<ProtectedRoute element={Profile} loggedIn={loggedIn} onLogout={handleLogout} onUpdateUser={handleUpdateUser} apiAnswerSuccess={apiAnswerSuccess} apiAnswerErr={apiAnswerErr} isFormLoading={isFormLoading} />} />
          <Route path='/signup' element={<Register onRegister={handleRegister} apiAnswerErr={apiAnswerErr} loggedIn={loggedIn} isFormLoading={isFormLoading} />}/>
          <Route path='/signin' element={<Login onLogin={handleLogin} apiLoginErr={apiLoginErr} loggedIn={loggedIn} isFormLoading={isFormLoading} />}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer/> : null}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
