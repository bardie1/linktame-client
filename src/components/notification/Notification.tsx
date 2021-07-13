import React, { useState, useEffect } from 'react';

import "./Notification.css";
type NotificationProps = {
    Icon: any,
    message: string,
    type: string,
}

export const Notification = ({Icon, message, type}: NotificationProps) => {
    const [showClass, setShowClass] = useState<string>('');
    
    useEffect(() => {
        setTimeout(() => {
            setShowClass("show")
            setTimeout(() => {
                setShowClass("finish");
            }, 2000)
        }, 1000)
    }, [])

    return (
        <div className={"notification-container " + type + " " +showClass}>
            <div className="notification-icon-holder">
                <Icon />

            </div>
            <div className="notification-message-holder">
                {message}
            </div>
        </div>
    )
}