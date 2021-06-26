import { env } from '../environments/environment';

const linkNameAvaliable = async (linkName: string) => {
    console.log(linkName);
    return await fetch(env.url + '', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

export const userService = {
    linkNameAvaliable
}