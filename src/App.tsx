import React, { useEffect, useState } from 'react';
import './App.css';

import { Main } from './components/main/Main';
import { Auth } from "./components/auth/Auth";
import { PublicLink } from "./components/public-link/PublicLink";
import { useDispatch, useSelector } from 'react-redux';
import { sessionService } from './services/session.service';
import { login, logout, selectUser } from './redux/slicers/userSlicer';
import { setDevice } from "./redux/slicers/deviceSlicer";
import { useValidSession } from './hooks/validSession.hook';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const userStorage = sessionService.getUser();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const validSession = useValidSession(user);
  const [mobileClass, setMobileClass] = useState<string>('');


  useEffect(() => {
    console.log(process.env.REACT_APP_API_END_POINT);
    let d: string = sessionService.identifyDeviceType();
    if (d === 'mobile' || d === 'tablet'){
      setMobileClass('mobile')
    } else {
      setMobileClass('');
    }
    dispatch(setDevice(d));
  }, [])

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    })

    return () => {
      window.removeEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    }
  }, [])

  useEffect(() => {
    let mounted = true;
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
    <Router>
      <Switch>
        <Route path={["/", "/user/settings", "/user/account"]} exact={true}>
          <div className={"App " + mobileClass}>
            {
              user ? (
                <Main />
              ) : (
                <Auth />
              )
            }
          </div>
        </Route>
        <Route path="/:name" exact={true}>
            <PublicLink />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
