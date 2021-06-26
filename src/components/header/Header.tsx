import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import "./Header.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slicers/userSlicer';
import { SettingsPopup } from '../settings-popup/SettingsPopup';
export const Header = () => {

    const [openSettingPopup, setOpenSettingsPopup] = useState<boolean>(false);
    const user = useSelector(selectUser)

    const onOutsideClick = () => {
        setOpenSettingsPopup(false);
    }

    return (
        <div className="header-container">
            <div className="header-logo-container">
                LinktaMe
            </div>
            <div className="header-settings-container">
                <div className="header-user-name-holder">
                    {user.email}
                </div>
                <div className="header-account-icon-holder">
                    <AccountCircleIcon style={{color: "var(--purple)"}}/>
                </div>
                <div onClick={() => setOpenSettingsPopup(true)} className="header-arrow-icon-holder">
                    <ArrowDropDownIcon style={{color: "var(--purple)"}}/>
                </div>
                { openSettingPopup && (
                <div className="setting-popup-holder">
                    <SettingsPopup clickedOutside={onOutsideClick} />
                </div>) }
            </div>
        </div>
    )
}