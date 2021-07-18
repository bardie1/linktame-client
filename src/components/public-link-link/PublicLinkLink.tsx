import React from 'react'
import linkDto from '../../models/link';
import "./PublicLinkLink.css";

type PublicLinkLinkProps = {
    link: linkDto,
}

export const PublicLinkLink = ({link}: PublicLinkLinkProps) => {


    const goToLink = () => {
        let url = link.link;
        if (!link.link.match(/^https?:\/\//i)){
            url = "http://" + url;
        }
        window.open(url);    
    }
    return (
        <div title={link.link} onClick={() => {goToLink()}} className="public-link-link-container">
            {link.link_name}
        </div>
    )
}