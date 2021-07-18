import React, { useEffect, useRef, createRef } from 'react';

import "./LinksList.css";

import MoodBadIcon from '@material-ui/icons/MoodBad';

type LinksListProps = {
    children: any,
    onNewLinkClick: Function,
    noLinks: boolean
}

export const LinksList = ({children, onNewLinkClick, noLinks}: LinksListProps) => {

    const bottomRef = createRef<HTMLDivElement>();
    const firstUpdate = useRef(true);

    const scrollToBottom = () => {
       bottomRef.current?.scrollIntoView({
           behavior: "smooth",
           block: "end"
       })
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
       //scrollToBottom();
    }, [children])
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

                    <div ref={bottomRef} className="list-bottom"></div>
                </div>
            </div>
        </div>
    )
}