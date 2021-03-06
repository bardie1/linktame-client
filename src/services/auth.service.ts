import {UserSignUpLogin} from '../models/userSIgnUpLogin'
import jwt from 'jwt-decode';
import base64 from 'base-64';

const url = process.env.REACT_APP_API_END_POINT;

const login = async (user: UserSignUpLogin) => {
    let res = await fetch(url + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(user.email + ":" + user.password),
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data.successful) {
            data.message = "Login details are incorrect";
            return data;
        }
        const token = data.token;
        const user = jwt(token);
        data.user = user;
        return data;
    })
    .catch((error) => {
        return error;
    })
    return res;
}

const signUp = async (user: UserSignUpLogin) => {
    let res = await fetch(url + 'auth/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        if (!data.successful) {
            data.message = "An account with this email already exists";
            return data
        }
        const token = data.token;
        const user = jwt(token);
        data.user = user;
        return data;
    })
    .catch((error) => {
        return error;
    })

    return res;
}

export const authService = {
    login,
    signUp
}