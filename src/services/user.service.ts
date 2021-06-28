import { env } from '../environments/environment';
import { User } from '../models/user';
import { sessionService } from './session.service';
import jwt from 'jwt-decode';



const linkNameAvaliable = async (linkName: string) => {
    const res = await fetch(env.url + '', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error;
    })

    return res;
}

const updateUser = async (user: User) => {
    const userState = sessionService.getUserAsObj();
    let res = await fetch(env.url + 'auth/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': userState.token
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {

        if (data.successful === "false") {
            data.message = "Unfortunately this link is unavailable. Please choose another one.";
            return data;
        }
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

export const userService = {
    linkNameAvaliable,
    updateUser
}