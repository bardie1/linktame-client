import { sessionService } from "../services/session.service";
import { env } from '../environments/environment';
import LinkDto  from "../models/link";


const httpPostConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': (sessionService.getUserAsObj()) ? sessionService.getUserAsObj().token: null
    },
    body: '',
}

const httpPutConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': (sessionService.getUserAsObj()) ? sessionService.getUserAsObj().token: null
    }
}

const httpGetConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Og==',
        'x-access-token': (sessionService.getUserAsObj()) ? sessionService.getUserAsObj().token: null
    }
}


const createLink = async (link: LinkDto[]) => {
    let b = {
        links : link,
    }
    console.log(b);
    httpPostConfig.body = JSON.stringify(b);
    let res = await fetch(env.url + "user/link", httpPostConfig)
                .then(response => response.json())
                .catch(err => {
                    return err
                })
    return res;

}

const getLinks = async () => {
    console.log(httpGetConfig);
    let res = await fetch(env.url + "user/link", httpGetConfig)
                .then(response => response.json())
                .catch(err => err);

    return res;
}

export const linkService = {
    createLink,
    getLinks,
}

