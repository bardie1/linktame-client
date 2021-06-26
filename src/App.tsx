import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Auth } from "./components/auth/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { sessionService } from './services/session.service';
import { login, selectUser } from './redux/slicers/userSlicer';

function App() {

  const userStorage = sessionService.getUser();
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
  useEffect(() => {
    if (userStorage) {
      let user = JSON.parse(userStorage);
      dispatch(login({
        email: user.email,
        password: user.password
      }));
    }
  }, [])

  return (
    <div className="App">
      {
        user ? (
          <div>This</div>
        ) : (
          
          <Auth />
        )
      }
    </div>
  );
}

export default App;
