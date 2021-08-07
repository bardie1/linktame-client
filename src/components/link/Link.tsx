import React, { useState, useEffect, useRef } from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import linkDto from '../../models/link';
import {useSelector} from 'react-redux';
import { selectDevice } from "../../redux/slicers/deviceSlicer";

import "./Link.css";

type LinkProps = {
    link: linkDto,
    onClick: Function,
    selected: boolean,
    deleteLink?: Function,
    handleDrag?: any,
    dragEnd?: any,
    draggedOver?: any,
    index?: number,
    draggedY?: number,
    lastDraggedOverPubId?: string,
}

export const Link = ({link, onClick, selected, deleteLink, handleDrag, dragEnd, draggedOver, index, draggedY, lastDraggedOverPubId} : LinkProps) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [dragging, setDragging] = useState<boolean>(false);
    const device = useSelector(selectDevice)
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!dragging) {
            if (element) {
                if (element.current?.offsetTop.toFixed() === draggedY?.toFixed()) {
                    draggedOver(link.public_id);
                }
            }
        }
    }, [draggedY])

    const confirmDelete = (e: any, confirmed: boolean) => {
        e.stopPropagation();
        if (deleteLink && confirmed) {
            deleteLink(link.link_name, link.public_id);
        } else {
            setShowDeleteConfirmation(false);
        }
    }

    return (
        <div draggable
            onTouchMove={(e) => {e.preventDefault(); setDragging(true); handleDrag(e)}}
            onTouchEnd={(e) => {setDragging(false); dragEnd(e)}}
            onDragOver={(e) => draggedOver(e)}
            onDragStart={(e) => {setDragging(true); handleDrag(e)}}
            onDragEnd = {(e) => {setDragging(false); dragEnd(e)}}
            id={link.public_id} 
            onMouseLeave={() => setShowDeleteConfirmation(false)} 
            onClick={() => onClick(link)} 
            className={selected ? 'link-container selected' : (lastDraggedOverPubId?.split("%")[0] === link.public_id) ? 'link-container ' + lastDraggedOverPubId?.split('%')[1] : 'link-container'}
            ref={element}>
            <div className="link-name-holder">
                {link.link_name}
            </div>
            <div className={(device === 'tablet' || device === 'mobile') ? 'link-delete-holder mobile' : 'link-delete-holder'}>
                <div className="delete-can-holder" onClick={(e) => {e.stopPropagation(); setShowDeleteConfirmation(true)}}><DeleteOutlineIcon /></div>
                {showDeleteConfirmation && (

                    <div className={(index === 0 ? 'link-delete-tooltip bottom' : 'link-delete-tooltip')}>
                        { (index === 0) && (<div className="tooltip-tail bottom"></div>) }
                        
                        <div className="link-delete-tooltip-interaction">
                            <p>Are you sure?</p>
                            <button onClick={(e) => confirmDelete(e, true)} className="green">Yes</button>
                            <button onClick={(e) => confirmDelete(e, false)} className="red">No</button>
                        </div>
                        { (index !== 0) && (<div className="tooltip-tail"></div>) }
                    </div>
                )}
            </div>
        </div>
    )
}