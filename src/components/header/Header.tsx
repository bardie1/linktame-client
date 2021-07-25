import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import "./Header.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slicers/userSlicer';
import { SettingsPopup } from '../settings-popup/SettingsPopup';
import { useHistory } from "react-router-dom";
export const Header = () => {

    const [openSettingPopup, setOpenSettingsPopup] = useState<boolean>(false);
    const [buttonText, setButtonText ] = useState<string>('Copy');
    const [settingPopupButtonClicked, setSettingPopupButtonClicked] = useState<boolean>(false);
    const user = useSelector(selectUser)
    const linkName = `linktame.herokuapp.com/${user.name}`;
    const history = useHistory();

    const onOutsideClick = () => {
        setTimeout(() => {
            setOpenSettingsPopup(false);
        }, 100)
    }

    const settingPopupShower = () => {
        if (openSettingPopup) {
            setSettingPopupButtonClicked(true);
        }

        setOpenSettingsPopup(!openSettingPopup);
    }

    const goHome = () => {
        history.push("/");
    }

    const closePopup = () => {
        setOpenSettingsPopup(false);
    }

    const copyToClipBoard = (text: string) => {
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
            setButtonText("Copy");
        }, 3000);
    }

    return (
        <div className="header-container">
            <div onClick={() => goHome()} className="header-logo-container">
                LinktaMe
            </div>
            <div className="header-link-copy-holder">
                <div className="header-link-holder">
                    {linkName}
                </div>
                <div className="header-copy-holder">
                    <button className="filled" onClick={() => copyToClipBoard(linkName)} type="submit">{buttonText}</button>
                </div>
            </div>
            <div className="header-settings-container">
                <div className="header-user-name-holder">
                    {user.email}
                </div>
                <div onClick={() => settingPopupShower()}  className="header-account-icon-holder">
                    <AccountCircleIcon style={{color: "var(--purple)"}}/>
                </div>
                <div onClick={() => settingPopupShower()} className="header-arrow-icon-holder">
                    <ArrowDropDownIcon style={{color: "var(--purple)"}}/>
                </div>
                { openSettingPopup && (
                <div className="setting-popup-holder">
                    <SettingsPopup closePopup={closePopup} linkName={linkName} clickedOutside={onOutsideClick} />
                </div>) }
            </div>
        </div>
    )
}