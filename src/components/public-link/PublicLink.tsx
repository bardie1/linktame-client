import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { linkService } from '../../services/link.service';
import { LoadingWheel } from "../loading-wheel/LoadingWheel";
import "./PublicLink.css";
import { PublicLinkLink } from "../public-link-link/PublicLinkLink";

export const PublicLink = () => {

    const [linksLoading, setLinksLoading] =useState(false);
    const [links, setLinks] = useState<Array<any>>([]);
    const { name }= useParams<{name: string}>();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setLinksLoading(true);
        }
        linkService.getLinksByName(name)
            .then(response => {
                if (mounted) {
                    setLinks([...response.links])
                }
                setLinksLoading(false)
            })
            .catch(err => {
                setLinksLoading(false);
            });

        return () => {mounted = false};
    }, [name])


    return (
        <div className="full-page-public-link-container">
            <div className="public-link-intro">
                Hey, Welcome to my Linkta Me
            </div>
                {
                    linksLoading ? ( <div className="public-link-loader-holder"><LoadingWheel  color="white" size="50px" borderTickness="4px"/></div> )
                        :
                    (
                        <div className="public-link-container">
                            {links.map((l) => {
                                return <PublicLinkLink key={l.public_id} link={l} />
                            })}
                        </div>
                    )
                }
     

        </div>
    )
}