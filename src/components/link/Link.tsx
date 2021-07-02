import React from 'react';
import linkDto from '../../models/link';

import "./Link.css";

type LinkProps = {
    link: linkDto,
}

export const Link = ({link} : LinkProps) => {

   
    return (
        <div className="link-container">
            {link.link_name}
        </div>
    )
}