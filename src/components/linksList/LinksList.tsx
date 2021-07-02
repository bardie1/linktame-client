import React from 'react';

import "./LinksList.css";

type LinksListProps = {
    children: any,
    onNewLinkClick: Function,
}

export const LinksList = ({children, onNewLinkClick}: LinksListProps) => {

    return (
        <div className="links-list-container">
            <div className="link-list-holder">
                <div className="links-list-header-holder">
                    <h2 className="links-list-header">
                        Your Links
                    </h2>
                    <div className="links-list-new-link-holder">
                        <button onClick={() => onNewLinkClick()} className="unfilled">New Link</button>
                    </div>
                </div>
                <div className="link-children-holder">
                    {children}
                </div>
            </div>
        </div>
    )
}