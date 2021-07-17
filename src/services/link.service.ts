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

const httpDeleteConfig = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': (sessionService.getUserAsObj()) ? sessionService.getUserAsObj().token: null
    },
    body: '',
}

const httpGetConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Og==',
        'x-access-token': ''
    }
}


const createLink = async (link: LinkDto[], token:string) => {
    let b = {
        links : link,
    }
    httpPostConfig.headers["x-access-token"] = token;
    console.log(b);
    httpPostConfig.body = JSON.stringify(b);
    let res = await fetch(env.url + "user/link", httpPostConfig)
                .then(response => response.json())
                .catch(err => {
                    return err
                })
    return res;

}

const getLinks = async (token?: string) => {
    console.log(httpGetConfig);
    if (token) {
        httpGetConfig.headers["x-access-token"] = token;
    }
    let res = await fetch(env.url + "user/link", httpGetConfig)
                .then(response => {
                    return response.json()})
                .catch(err => err);
    console.log(res);
    return res;
}

const deleteLink = async (linkPublicId: string, linkName: string, token: string) => {
    let body = {
        link_name: linkName,
        public_id: linkPublicId,
    }
    httpDeleteConfig.headers["x-access-token"] = token;
    httpDeleteConfig.body = JSON.stringify(body);
    let res = await fetch(env.url + "user/link", httpDeleteConfig)
                .then(response => response.json())
                .then(data => {
                    if (!data.successsful){
                        data.message = "Unable to delete link";
                        return data;
                    }

                    return data;
                })
                .catch(err => err);
    return res;
}

const updateLink = async () => {
    let res = await fetch(env.url + "user/link", httpPutConfig)
                .then(response => response.json())
                .then(data => {
                    if (!data.successsful) {
                        data.message = "Unable to update Link";
                    }
                    return data;
                })
                .catch(err => err);
}

const getLinksByName = async (name: string) => {
    let res = await fetch(env.url + `links/${name}`, httpGetConfig)
                .then(response => (response.json()))
                .catch(err => (err.message))
    
    return res;
}

export const linkService = {
    createLink,
    getLinks,
    deleteLink,
    getLinksByName
}

