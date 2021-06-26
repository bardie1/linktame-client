import React from 'react';

import { Header } from '../header/Header';
import { Body } from '../body/Body';
import { SetName } from '../set-name/SetName';
import "./Main.css";
import { selectUser } from '../../redux/slicers/userSlicer';
import { useSelector } from 'react-redux';
export const Main = () => {

    const user = useSelector(selectUser);

    return (
        <div className="main-container">
            { !user.name ? (
                <SetName />
            ) : (
                <div className="main-holder">
                    <Header />
                    <Body />
                </div>
            )}
        </div>
    )
}