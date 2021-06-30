import React, {useRef, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import { useOutsideAlerter } from '../../hooks/outsideAlerter.hook';
import "./SettingsPopup.css"
import { logout } from '../../redux/slicers/userSlicer';
import { sessionService } from '../../services/session.service';
type SettingsPopupProps = {
    clickedOutside: Function,
    linkName: string,
}

export const SettingsPopup = ({clickedOutside, linkName}: SettingsPopupProps) => {

    const [buttonText, setButtonText ] = useState<string>('Copy Link');
    const wrapperRef = useRef(null);
    const clickOutside = useOutsideAlerter(wrapperRef);
    const dispatch = useDispatch();


    const logoutOfApp = () => {
        dispatch(logout());
        sessionService.clearSession();
    }

    const copyToClipBoard = () => {
        setButtonText("Copied!")
        navigator.clipboard.writeText(linkName);
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
                <li onClick={() => copyToClipBoard()} className="settings-popup-list-item"><i><FilterNoneOutlinedIcon /></i>{buttonText}</li>
                <li className="settings-popup-list-item"><i><SettingsIcon /></i> Settings</li>
                <li onClick={() => logoutOfApp()} className="settings-popup-list-item"><i><ExitToAppIcon /></i>  Logout</li>
            </ul>
        </div>
    )
}