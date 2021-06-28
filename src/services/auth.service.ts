import { env } from '../environments/environment';
import {UserSignUpLogin} from '../models/userSIgnUpLogin'
import jwt from 'jwt-decode';
import base64 from 'base-64';

const login = async (user: UserSignUpLogin) => {
    let res = await fetch(env.url + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(user.email + ":" + user.password),
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.successful === "false") {
            data.message = "Login details are incorrect";
            return data;
        }
        const token = data.token;
        const user = jwt(token);
        data.user = user;
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        return error;
    })
    return res;
}

const signUp = async (user: UserSignUpLogin) => {
    let res = await fetch(env.url + 'auth/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        if (data.successful === "false") {
            throw new Error(data.message);
        }
        console.log(data);
        const token = data.token;
        const user = jwt(token);
        data.user = user;
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error;
    })

    return res;
}

export const authService = {
    login,
    signUp
}