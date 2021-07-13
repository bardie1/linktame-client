import React, { useState, useEffect } from 'react';
import linkDto from '../../models/link';
import { LoadingWheel } from "../loading-wheel/LoadingWheel"
import CloseIcon from '@material-ui/icons/Close';

import "./EditLinkSlider.css"

type EditLinkSliderProp = {
    open: boolean,
    currentLink: linkDto,
    createLink: Function,
    setCurrentLinkUrl: Function,
    setCurrentLinkName: Function,
    close: Function,
    linkLoading: boolean,
    valid: boolean
}

export const EditLinkSlider = ({valid, linkLoading, open, currentLink, createLink, setCurrentLinkUrl, setCurrentLinkName, close}: EditLinkSliderProp) => {

    const [sliderClass, setSliderClass ] = useState<string>("edit-link-slider-container");

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (open) {
                setSliderClass("edit-link-slider-container open");
            } else {
                setSliderClass("edit-link-slider-container");
            }
        }

        return () => {
            mounted = false;
        }
    }, [open])

    const submitLink = (e: any) => {
        e.preventDefault();
        createLink()
    }

    return (
        <div className={sliderClass}>
            <div onClick={() => close()} className="edit-slider-close-button">
                <CloseIcon />
            </div>
            <div className="edit-link-slider-form-container">
                <form onSubmit={(e) => submitLink(e)} className="flex-column">
                    <div className="input-holder">
                        <label htmlFor="linkName">Link Name</label>
                        <input onChange={e => setCurrentLinkName(e.target.value)} value={currentLink.link_name} className="edit-link-slider-form-input" type="text" placeholder="E.g. My Youtube Channel"/>
                    </div>
                    <div className="input-holder">
                        <label htmlFor="linkLink">Link URL</label>
                        <input value={currentLink.link} onChange={e => setCurrentLinkUrl(e.target.value)} className="edit-link-slider-form-input" type="text" placeholder="E.g. My Youtube Channel"/>
                    </div>
                    <div className="edit-link-slider-button-holder">
                        <button disabled={!valid} className="filled">{(linkLoading) ? <LoadingWheel color="white" size="18px" borderTickness="2px"  /> : (currentLink.public_id) ? 'Update Link' : 'Create Link'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}