import React, { useEffect, useState } from 'react';
import LinkDto from '../../models/link';
import { linkService } from "../../services/link.service";
import { LinksList } from "../linksList/LinksList";
import { Link } from "../link/Link";
import { EditLinkSlider } from "../edit-link-slider/EditLinkSlider";
import { LoadingWheel } from "../loading-wheel/LoadingWheel";
import "./Body.css";


export const Body = () => {

    const [editLinkOpen, setEditLinkOpen] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkDto[]>([]);
    const [currentLink, setCurrentLink] = useState<LinkDto | null>(null);
    const [linkListLoading, setLinkListLoading] = useState<boolean>(false);

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

    const editLink = (link: LinkDto) => {
        setEditLinkOpen(true);
        setCurrentLink(link);
    }

    const closeSlider = () => {
        setEditLinkOpen(false);
        setCurrentLink(null);
    }

    const getLinks = async() => {
        setLinkListLoading(true);
        return new Promise(async (resolve, reject) => {
            let res = await linkService.getLinks();
            if (res.successful === "true") {
                let resLinks = [...res.links];
                console.log(resLinks);
                setLinks(resLinks);
                setLinkListLoading(false);
                resolve(true)
                console.log(res)
                console.log(links, "HERE");
            } else {
                setLinkListLoading(false);
                reject(true);
                console.log(res);
            }
        })
    }

    return (
        <div className="body-container">

            {(linkListLoading) ? (
                <div className="body-link-list-loader-holder">
                    <LoadingWheel color="rgb(137, 0, 223)" size="100px" borderTickness="4px" />
                </div>
            ) : (
                <LinksList onNewLinkClick={newLinkClicked} >
                    { links.map(l => {
                        return <Link selected={(currentLink?.public_id === l.public_id) ? true : false} onClick={editLink} key={l.public_id} link={l}/>
                    })}
                    { (currentLink && !currentLink?.public_id) && <Link selected={false} onClick={editLink} link={currentLink} />}
                </LinksList>

            )}

            
        { currentLink && <EditLinkSlider close={closeSlider} setCurrentLinkName={setName} setCurrentLinkUrl={setUrl} createLink={createLink} currentLink={currentLink} open={editLinkOpen} />}
        </div>
    )
}