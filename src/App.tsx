import React, { useEffect } from 'react';
import './App.css';

import { Main } from './components/main/Main';
import { Auth } from "./components/auth/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { sessionService } from './services/session.service';
import { login, logout, selectUser } from './redux/slicers/userSlicer';
import { useValidSession } from './hooks/validSession.hook';

function App() {

  const userStorage = sessionService.getUser();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const validSession = useValidSession(user);

  useEffect(() => {
    let mounted = true;
    console.log(validSession);
    if (validSession) {
      if (userStorage) {
        let user2 = JSON.parse(userStorage);
        if (mounted) {
          dispatch(login({
            public_id: user2.public_id,
            token: user2.token,
            name: user2.name,
            email: user2.email,
            exp: user2.exp
          }));
        }
      }
    } else {
      if (mounted) {
        dispatch(logout());
      }
    }

    return () => { mounted = false}
  }, [validSession])


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
