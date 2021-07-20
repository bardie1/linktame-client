import React from 'react';

import { Header } from '../header/Header';
import { Body } from '../body/Body';
import { SetName } from '../set-name/SetName';
import { Settings } from '../settings/Settings';
import "./Main.css";
import { selectUser } from '../../redux/slicers/userSlicer';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export const Main = () => {

    const user = useSelector(selectUser);

    return (
        <div className="main-container">
            { !user.name ? (
                <SetName />
            ) : (
                <div className="main-holder">
                    <Header />
                        <Route path="/" exact={true}>
                                <Body />
                        </Route>
                        <Route path="/user/settings" exact={true}>
                            <Settings />
                        </Route>
                </div>
            )}
        </div>
    )
}