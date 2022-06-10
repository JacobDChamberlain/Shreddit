import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LoadAllCommunities from './components/Communities/LoadAllCommunities';
import LoadOneCommunity from './components/Communities/LoadOneCommunity';
import Home from './components/Home/Home';
import SubmitPostPage from './components/SubmitPostPage/SubmitPost';
import SubmitPostFromCommunity from './components/SubmitPostPage/SubmitPostFromCommunity';
import LandingPage from './components/LandingPage/LandingPage';
import SearchResultsPage from './components/Search/SearchResultsPage';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  console.log("current user --->", currentUser)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar className='navigation-bar' />
      <Switch>
        <Route path='/search' exact={true}>
          <SearchResultsPage />
        </Route>
        <Route path='/login' exact={true}>
          <LandingPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/user/:username/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/sh' exact={true}>
          <LoadAllCommunities />
        </ProtectedRoute>
        <ProtectedRoute path='/sh/:name/:communityId' exact={true}>
          <LoadOneCommunity />
        </ProtectedRoute>
        <ProtectedRoute path='/submit' exact={true} >
          <SubmitPostPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/sh/:name/:communityId/submit' exact={true} >
          <SubmitPostFromCommunity/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
