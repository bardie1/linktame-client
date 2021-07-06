import React from 'react';

import "./LinksList.css";

import MoodBadIcon from '@material-ui/icons/MoodBad';

type LinksListProps = {
    children: any,
    onNewLinkClick: Function,
    noLinks: boolean
}

export const LinksList = ({children, onNewLinkClick, noLinks}: LinksListProps) => {

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
                    {noLinks && (
                        <div className="no-links-holder">
                            <MoodBadIcon fontSize="large" /> <p>Your link list is empty. Go ahead and create your first link!</p>
                        </div>
                    )}
                    
                    {children}
        
        
                </div>
            </div>
        </div>
    )
}