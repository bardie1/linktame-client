import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slicers/userSlicer';
import { sessionService } from '../../services/session.service';
import { authService } from "../../services/auth.service";
import './Login.css';
import { UserSignUpLogin } from '../../models/userSIgnUpLogin';
import { ErrorPanel } from '../error-panel/ErrorPanel';
import { LoadingWheel } from '../loading-wheel/LoadingWheel';

type LoginProps = {
    formSwitch: Function,
}

export const Login = ({ formSwitch }: LoginProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    const [formValid, setFormValid] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (email && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }

        return () => {
            setFormValid(false);
        }
    }, [email, password])

    const loginToApp = async (e: any) => {
        setLoginLoading(true);
        setErrorMessage('');
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
            setErrorMessage(res.message);
        }
        setLoginLoading(false); 
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Welcome Back</h1>
            </div>

            <div className="login-form">
                <form action="submit">
                    {(errorMessage && errorMessage !== '') &&
                    (<div className="login-form-error-holder">
                        <ErrorPanel message={errorMessage} />
                    </div>)}
                    <div className="login-form-input-holder input-holder email">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => setEmail(e.target.value)} type="email"/>
                    </div>
                    <div className="login-form-input-holder input-holder password">
                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password"/>
                    </div>
                    <div className="login-btn-holder">
                        <button onClick={(e) => loginToApp(e) } disabled={!formValid} id="login-btn" className="filled" type="submit">
                            {
                                !loginLoading ? ('Login') : <LoadingWheel  color="white" size="18px" borderTickness="2px" />
                            }
                        </button>
                    </div>
                    <div className="already-account">
                        <p>Don't have an account with us? <span onClick={() => formSwitch(false)} className="login-clink">Sign Up</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}