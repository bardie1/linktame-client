import React from 'react';
import linkDto from '../../models/link';

import "./Link.css";

type LinkProps = {
    link: linkDto,
    onClick: Function,
    selected: boolean,
}

export const Link = ({link, onClick, selected} : LinkProps) => {

   
    return (
        <div onClick={() => onClick(link)} className={selected ? 'link-container selected' : 'link-container'}>
            {link.link_name}
        </div>
    )
}