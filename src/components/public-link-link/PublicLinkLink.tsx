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
        <div className="public-link-link-container">
            <input title={link.link} type="button" className="public-link-button" onClick={() => {goToLink()}} value={link.link_name}/>
        </div>
    )
}