import React from 'react';

import { Header } from '../header/Header';
import { SetName } from '../set-name/SetName';
import "./Main.css";
export const Main = () => {

    const lll = true;

    return (
        <div className="main-container">
            { lll ? (
                <SetName />
            ) : (
            <div className="header-holder">
                <Header />
            </div>
            )}
        </div>
    )
}