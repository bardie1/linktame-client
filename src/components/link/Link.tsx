import React, { useState } from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import linkDto from '../../models/link';

import "./Link.css";

type LinkProps = {
    link: linkDto,
    onClick: Function,
    selected: boolean,
    deleteLink?: Function,
}

export const Link = ({link, onClick, selected, deleteLink} : LinkProps) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
   
    const confirmDelete = (e: any, confirmed: boolean) => {
        e.stopPropagation();
        if (deleteLink && confirmed) {
            deleteLink(link.link_name, link.public_id);
        } else {
            setShowDeleteConfirmation(false);
        }
    }

    return (
        <div onMouseLeave={() => setShowDeleteConfirmation(false)} onClick={() => onClick(link)} className={selected ? 'link-container selected' : 'link-container'}>
            <div className="link-name-holder">
                {link.link_name}
            </div>
            <div className="link-delete-holder">
                <div className="delete-can-holder" onClick={(e) => {e.stopPropagation(); setShowDeleteConfirmation(true)}}><DeleteOutlineIcon /></div>
                {showDeleteConfirmation && (

                    <div className={(link.link_pos === 0 ? 'link-delete-tooltip bottom' : 'link-delete-tooltip')}>
                        { (link.link_pos === 0) && (<div className="tooltip-tail bottom"></div>) }
                        
                        <div className="link-delete-tooltip-interaction">
                            <p>Are you sure?</p>
                            <button onClick={(e) => confirmDelete(e, true)} className="green">Yes</button>
                            <button onClick={(e) => confirmDelete(e, false)} className="red">No</button>
                        </div>
                        { (link.link_pos !== 0) && (<div className="tooltip-tail"></div>) }
                    </div>
                )}
            </div>
        </div>
    )
}