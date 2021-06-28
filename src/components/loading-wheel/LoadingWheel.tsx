import { BorderColor } from '@material-ui/icons';
import React from 'react';

import './LoadingWheel.css';

type LoadingWheelProp = {
    color: string,
    size: string,
    borderTickness: string
}

export const LoadingWheel = ({color, size, borderTickness}: LoadingWheelProp) => {
    return (
        <div className="loading-wheel-container">
            <div className="loading-wheel-loader" style={{borderTopColor: color, borderTopWidth: borderTickness, height: size, width: size}}>

            </div>
        </div>
    )
}