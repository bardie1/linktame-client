import React, {useState} from 'react'

import "./Auth.css"

import { Login } from '../login/Login';
import { SignUp } from '../sign-up/SignUp';

export const Auth = () => {

    const [ loginScreen, setLoginScreen ] = useState<Boolean>(true);

    const changeScreen = (setLoginValue: boolean) => {
        setLoginScreen(setLoginValue);
    }

    return (
        <div className="auth-container">
            {
                loginScreen ? (<Login formSwitch={changeScreen} />) : (<SignUp formSwitch={changeScreen}/>)
            }
        </div>
    )
}
