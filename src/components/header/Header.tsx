import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import "./Header.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slicers/userSlicer';
import { SettingsPopup } from '../settings-popup/SettingsPopup';
export const Header = () => {

    const [openSettingPopup, setOpenSettingsPopup] = useState<boolean>(false);
    const [buttonText, setButtonText ] = useState<string>('Copy');
    const user = useSelector(selectUser)
    const [linkName, setLinkName ] = useState<string>(`linktame.herokuapp.com/${user.name}`);

    const onOutsideClick = () => {
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
            <div className="header-logo-container">
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
                <div className="header-account-icon-holder">
                    <AccountCircleIcon style={{color: "var(--purple)"}}/>
                </div>
                <div onClick={() => setOpenSettingsPopup(true)} className="header-arrow-icon-holder">
                    <ArrowDropDownIcon style={{color: "var(--purple)"}}/>
                </div>
                { openSettingPopup && (
                <div className="setting-popup-holder">
                    <SettingsPopup linkName={linkName} clickedOutside={onOutsideClick} />
                </div>) }
            </div>
        </div>
    )
}