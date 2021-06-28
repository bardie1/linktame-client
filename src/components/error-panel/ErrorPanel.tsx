import React from 'react';

import "./ErrorPanel.css";
type ErrorPanelProps = {
    message: string,
    Icon?: any,
}

export const ErrorPanel = ({message, Icon}: ErrorPanelProps) => {

    return (
        <div className="error-panel-container">
            <div className="error-icon-holder">
                {/* <Icon /> */}
            </div>
            <div className="error-message-holder">
                {message}
            </div>
        </div>
    )
}