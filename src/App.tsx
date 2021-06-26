import React, { useEffect } from 'react';
import './App.css';

import { Main } from './components/main/Main';
import { Auth } from "./components/auth/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { sessionService } from './services/session.service';
import { login, selectUser } from './redux/slicers/userSlicer';

function App() {

  const userStorage = sessionService.getUser();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (userStorage) {
      let user2 = JSON.parse(userStorage);
      dispatch(login({
        email: user2.email,
        password: user2.password
      }));
    }
  }, [])

  return (
    <div className="App">
      {
        user ? (
          <Main />
        ) : (
          <Auth />
        )
      }
    </div>
  );
}

export default App;
