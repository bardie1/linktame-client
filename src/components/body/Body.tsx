import React, { useEffect, useState } from 'react';
import LinkDto from '../../models/link';
import { linkService } from "../../services/link.service";
import { LinksList } from "../linksList/LinksList";
import { Link } from "../link/Link";
import { EditLinkSlider } from "../edit-link-slider/EditLinkSlider";
import "./Body.css";
import { current } from '@reduxjs/toolkit';
export const Body = () => {

    const [editLinkOpen, setEditLinkOpen] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkDto[]>([]);
    const [currentLink, setCurrentLink] = useState<LinkDto | null>(null);

    const newLink: LinkDto = {
        link: '',
        link_name: '',
        link_pos: links.length
    }

   const newLinkClicked = () => {
        setEditLinkOpen(true);
        setCurrentLink(newLink);

    }

    useEffect(() => {
        getLinks();
    }, [])

    useEffect(() => {
        console.log(currentLink);
    }, [currentLink]);

    useEffect(() => {
        if (currentLink) {
            setCurrentLink(links[links.length - 1]);
        }
    }, [links]);

    const setName = (name: string) => {
        if (currentLink) {
            let c: LinkDto = {...currentLink};
            c.link_name = name;
            setCurrentLink(c);
        }
    }
    const setUrl = (url: string) => {
        if (currentLink) {
            let c: LinkDto = {...currentLink};
            c.link = url;
            setCurrentLink(c);
        }
    }

    const createLink = async () => {
        if (currentLink) {
            let res = await linkService.createLink([currentLink]);
            console.log(res);
            if (res.successful === "true") {
                getLinks();
            }
        }
    }

    const getLinks = async() => {
        return new Promise(async (resolve, reject) => {
            let res = await linkService.getLinks();
            if (res.successful === "true") {
                let resLinks = [...res.links];
                console.log(resLinks);
                setLinks(resLinks);
                resolve(true)
                console.log(res)
                console.log(links, "HERE");
            } else {
                reject(true);
                console.log(res);
            }
        })
    }

    return (
        <div className="body-container">
            <LinksList onNewLinkClick={newLinkClicked} >
                { links.map(l => {
                    return <Link key={l.public_id} link={l}/>
                })}
                { (currentLink && !currentLink?.public_id) && <Link link={currentLink} />}
            </LinksList>
            { currentLink && <EditLinkSlider setCurrentLinkName={setName} setCurrentLinkUrl={setUrl} createLink={createLink} currentLink={currentLink} open={editLinkOpen} />}
            
        </div>
    )
}