import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slicers/userSlicer';
import { sessionService } from '../../services/session.service';
import { authService } from "../../services/auth.service";
import './Login.css';
import { UserInfo } from 'os';
import { UserSignUpLogin } from '../../models/userSIgnUpLogin';

type LoginProps = {
    formSwitch: Function,
}

export const Login = ({ formSwitch }: LoginProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formValid, setFormValid] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("this");
        if (email && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [email, password])

    const loginToApp = async (e: any) => {
        e.preventDefault();
        let details: UserSignUpLogin = {
            email: email,
            password: password,
        }
        let res = await authService.login(details)

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
            console.log(res);
        }
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Welcome Back</h1>
            </div>

            <div className="login-form">
                <form action="submit">
                    <div className="login-form-input-holder input-holder email">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => setEmail(e.target.value)} type="email"/>
                    </div>
                    <div className="login-form-input-holder input-holder password">
                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password"/>
                    </div>
                    <div className="login-btn-holder">
                        <button onClick={(e) => loginToApp(e) } disabled={!formValid} id="login-btn" className="filled" type="submit">Login</button>
                    </div>
                    <div className="already-account">
                        <p>Don't have an account with us? <span onClick={() => formSwitch(false)} className="login-clink">Sign Up</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}