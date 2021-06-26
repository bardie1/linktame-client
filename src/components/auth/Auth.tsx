import React, { useEffect, useState} from 'react'

import "./Auth.css"

import { Login } from '../login/Login';
import { SignUp } from '../sign-up/SignUp';

export const Auth = () => {

    const [ loginScreen, setLoginScreen ] = useState<Boolean>(true);

    useEffect(() => {

    }, [loginScreen])

    const changeScreen = (setLoginValue: boolean) => {
        console.log("Clicked");
        console.log(setLoginValue);
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
