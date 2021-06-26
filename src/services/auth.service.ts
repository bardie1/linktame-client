import { env } from '../environments/environment';

type UserSignUpLogin = {
    email: string,
    password: string
}


export const login = async (user: UserSignUpLogin) => {
    return await fetch(env.url + '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

export const signUp = async (user: UserSignUpLogin) => {
    return await fetch(env.url + '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}