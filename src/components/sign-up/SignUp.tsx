import React, { useEffect, useState } from 'react';
import './SignUp.css'

import { login } from '../../redux/slicers/userSlicer';

import { useDispatch } from 'react-redux';

import { sessionService }  from '../../services/session.service';


type SignUpProps = {
    formSwitch: Function,
}


export const SignUp = ({ formSwitch }: SignUpProps) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [formValid, setFormValid] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("this");
        if (email && password && password2 && password === password2) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [email, password, password2])


    const signUp = (e: any) => {
        e.preventDefault()
        dispatch(login({
            email: email,
            password: password
        }));
        sessionService.setUser({email: email, password: password});
    }

    return (
        <div className="sign-up-container">
            <div className="sign-up-header">
                <h1>Welcome to LinktaMe</h1>
            </div>

            <div className="sign-up-form">
                <form action="submit">
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
                        <button onClick={(e) => signUp(e) } disabled={!formValid} id="sign-up-btn" className="filled" type="submit">Sign Up</button>
                    </div>
                    <div className="already-account">
                        <p>Already have an accont? <span onClick={() => formSwitch(true)} className="login-clink">Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}