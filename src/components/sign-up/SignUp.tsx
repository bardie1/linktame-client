import React, { useEffect, useState } from 'react';
import './SignUp.css'

import { login } from '../../redux/slicers/userSlicer';

import { useDispatch } from 'react-redux';
import { useValidEmail } from "../../hooks/validEmail.hook";
import { sessionService }  from '../../services/session.service';
import { authService }  from '../../services/auth.service';
import {UserSignUpLogin} from '../../models/userSIgnUpLogin'
import { ErrorPanel } from '../error-panel/ErrorPanel';
import { LoadingWheel } from '../loading-wheel/LoadingWheel';

type SignUpProps = {
    formSwitch: Function,
}


export const SignUp = ({ formSwitch }: SignUpProps) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [signupLoading, setSignupLoading] = useState(false);

    const [formValid, setFormValid] = useState<boolean>(false);

    const dispatch = useDispatch();

    const validEmail = useValidEmail(email);

    useEffect(() => {
        setErrorMessage('');
        if (email && validEmail && password && password2 && password === password2) {
            setFormValid(true);
        } else {
            if (!validEmail && email !== '') {
                setErrorMessage("Please enter in a valid email address");
            }
            setFormValid(false);
        }
    }, [email, password, password2, validEmail])


    const signUp = async (e: any) => {
        e.preventDefault()
        setSignupLoading(true);
        setErrorMessage('');
        let details: UserSignUpLogin = {
            name: null,
            email: email,
            password: password
        }


        let res = await authService.signUp(details)

        if (res.successful === "true") {
            dispatch(login({
                public_id: res.user.public_id,
                token: res.token,
                name: res.user.name,
                email: res.user.email
            }));
            sessionService.setUser({public_id: res.user.public_id, 
                token: res.token,
                name: res.user.name,
                email: res.user.email});
        } else {
            setErrorMessage(res.message)
        }

        setSignupLoading(false);
    }

    return (
        <div className="sign-up-container">
            <div className="sign-up-header">
                <h1>Welcome to LinktaMe</h1>
            </div>

            <div className="sign-up-form">
                <form action="submit">
                {(errorMessage && errorMessage !== '') &&
                    (<div className="signup-form-error-holder">
                        <ErrorPanel message={errorMessage} />
                    </div>)}
                    <div className="sign-up-form-input-holder input-holder email">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => setEmail(e.target.value)} type="email"/>
                    </div>
                    <div className="sign-up-form-input-holder input-holder password">
                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password"/>
                    </div>
                    <div className="sign-up-form-input-holder input-holder confirm-password">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input onChange={e => setPassword2(e.target.value)} type="password"/>
                    </div>
                    <div className="sign-up-btn-holder">
                        <button onClick={(e) => signUp(e) } disabled={!formValid} id="sign-up-btn" className="filled" type="submit">
                            {
                                !signupLoading ? ('Sign Up') : <LoadingWheel  color="white" size="18px" borderTickness="2px" />
                            }
                        </button>
                    </div>
                    <div className="already-account">
                        <p>Already have an accont? <span onClick={() => formSwitch(true)} className="login-clink">Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}