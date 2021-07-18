import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { linkService } from '../../services/link.service';
import "./PublicLink.css";
import { PublicLinkLink } from "../public-link-link/PublicLinkLink";

export const PublicLink = () => {

    const [links, setLinks] = useState<Array<any>>([]);
    const { name }= useParams<{name: string}>();

    useEffect(() => {
        let mounted = true;
        linkService.getLinksByName(name)
            .then(response => {
                if (mounted) {
                    setLinks([...response.links])
                }
            })
            .catch(err => console.log(err));

        return () => {mounted = false};
    }, [name])


    return (
        <div className="full-page-public-link-container">
            <div className="public-link-intro">
                Hey, Welcome to my Linkta Me
            </div>
            <div className="public-link-container">
                {links.map((l) => {
                    return <PublicLinkLink key={l.public_id} link={l} />
                })}
            </div>
        </div>
    )
}