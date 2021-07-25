import React, {useRef, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import { useOutsideAlerter } from '../../hooks/outsideAlerter.hook';
import "./SettingsPopup.css"
import { logout } from '../../redux/slicers/userSlicer';
import { sessionService } from '../../services/session.service';

import { useHistory } from 'react-router-dom';
type SettingsPopupProps = {
    clickedOutside: Function,
    linkName: string,
    closePopup: Function,
}

export const SettingsPopup = ({clickedOutside, linkName, closePopup}: SettingsPopupProps) => {

    const [buttonText, setButtonText ] = useState<string>('Copy Link');
    const wrapperRef = useRef(null);
    const clickOutside = useOutsideAlerter(wrapperRef);
    const dispatch = useDispatch();
    let history = useHistory();

    const goTo = (internalUrl : string) => {
        closePopup();
        history.push(internalUrl);
    }

    const logoutOfApp = () => {
        dispatch(logout());
        sessionService.clearSession();
    }

    const copyToClipBoard = (text:string) => {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setButtonText("Copied!")
        setTimeout(() => {
            setButtonText("Copy Link");
        }, 3000);
    }

    useEffect(() => {
    }, [])
    useEffect(() => {
        if (clickOutside){
           clickedOutside()
        }
    }, [clickOutside])

    return (
        <div ref={wrapperRef} className="settings-popup-container">
            <ul className="settings-popup-list">
                <li onClick={() => copyToClipBoard(linkName)} className="settings-popup-list-item"><i><FilterNoneOutlinedIcon /></i>{buttonText}</li>
                <li onClick={() => goTo('/user/account')} className="settings-popup-list-item"><i><AccountBoxIcon /></i> Acccount</li>
                {/* <li onClick={() => goTo('/user/settings')} className="settings-popup-list-item"><i><SettingsIcon /></i> Settings</li> */}
                <li onClick={() => logoutOfApp()} className="settings-popup-list-item"><i><ExitToAppIcon /></i>  Logout</li>
            </ul>
        </div>
    )
}