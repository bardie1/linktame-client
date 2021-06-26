import React, { useEffect, useState } from 'react';
import "./SetName.css";
import { useDebounce } from '../../hooks/debounce.hook';
import { userService } from '../../services/user.service'
import { LoadingWheel } from '../loading-wheel/LoadingWheel'

export const SetName = () => {

    const [link, setLink] = useState<string>('');
    const [linkAvailable, setLinkAvailable] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const debouncedLinkName = useDebounce(link, 500);

    const isLinkValid = async (linkName: string) => {
        setLoading(true);
        let res = await userService.linkNameAvaliable(debouncedLinkName);
        //setLinkAvailable();
        setTimeout(() => {
            setLoading(false);
        }, 3000); 
    }

    useEffect(() => {

    }, [linkAvailable])

    useEffect(() => {
        if (debouncedLinkName) {
            isLinkValid(debouncedLinkName);
        }
    }, [debouncedLinkName])


    return (
        <div className="set-name-container">
            <div className="set-name-form-holder">
                <form className="set-name-form" action="submit">
                    <div className="set-name-header-holder">
                        <h1>Claim your <span>LinktaMe</span> link</h1> 
                    </div>
                    <div className="set-name-input-holder">
                        <div className="input-group">
                            <div className="input-item input-group-prefix">
                                linkta.me/
                            </div>
                            <input onChange={e => setLink(e.target.value)} className="input-item set-name-input" type="text" placeholder="example"/>
                            <div className="input-item input-group-suffix">
                                {loading && <LoadingWheel />}
                            </div>
                        </div>
                    </div>
                    <div className="set-name-button-holder">
                        <button className="filled" type="submit">Claim LinktaMe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}