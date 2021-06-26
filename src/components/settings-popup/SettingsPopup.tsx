import React, {useRef, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { useOutsideAlerter } from '../../hooks/outsideAlerter.hook';
import "./SettingsPopup.css"
import { logout } from '../../redux/slicers/userSlicer';
import { sessionService } from '../../services/session.service';
type SettingsPopupProps = {
    clickedOutside: Function
}

export const SettingsPopup = ({clickedOutside}: SettingsPopupProps) => {

    const wrapperRef = useRef(null);
    const clickOutside = useOutsideAlerter(wrapperRef);
    const dispatch = useDispatch();


    const logoutOfApp = () => {
        dispatch(logout());
        sessionService.clearSession();
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
                <li className="settings-popup-list-item"><i><SettingsIcon /></i> Settings</li>
                <li onClick={() => logoutOfApp()} className="settings-popup-list-item"><i><ExitToAppIcon /></i>  Logout</li>
            </ul>
        </div>
    )
}