import React, { useEffect, useState } from 'react';
import "./SetName.css";
import { useDebounce } from '../../hooks/debounce.hook';
import { userService } from '../../services/user.service'
import { LoadingWheel } from '../loading-wheel/LoadingWheel'
import { login, selectUser } from '../../redux/slicers/userSlicer';
import { useSelector, useDispatch} from 'react-redux';
import { User } from '../../models/user';
import { sessionService } from '../../services/session.service';
import { ErrorPanel } from '../error-panel/ErrorPanel';


export const SetName = () => {

    const [link, setLink] = useState<string>('');
    const [linkAvailable, setLinkAvailable] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const debouncedLinkName = useDebounce(link, 500);

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const isLinkValid = async (linkName: string) => {
        // setLoading(true);
        // //let res = await userService.linkNameAvaliable(debouncedLinkName);
        // //setLinkAvailable();
        // setTimeout(() => {
        //     setLoading(false);
        // }, 3000); 
    }

    const claimLink = async(e: any) =>{
        e.preventDefault()
        setLoading(true);
        setErrorMessage('');
        let u: User = {
            public_id: user.name,
            email: user.email,
            name: link
        }
        let res = await userService.updateUser(u);
        if (res.successful) {
            dispatch(login({
                public_id: res.user.public_id,
                token: res.token,
                email: res.user.email,
                name: link,
                exp: user.exp
            }))
            sessionService.setUser({
                public_id: res.user.public_id,
                token: res.token,
                email: res.user.email,
                name: link,
                exp: user.exp
            });
            setLoading(false);
        } else {
            setErrorMessage(res.message)
            setLoading(false);
        }
    }

    const formatLink = (text: string): string =>  {
        return text.replace(" ","-").toLowerCase();
    }

    useEffect(() => {
        let mounted = true;
        if (valid) {
            if (mounted) {
                setErrorMessage('');
            }
        } else {
            if (link !== '') {
                if (mounted) {
                    setErrorMessage("Your link may only contain numbers, letters and dashes");
                }
            }
        }

        return () => {mounted = false};
    }, [valid])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (/^([a-zA-Z0-9 -]+)$/.test(debouncedLinkName)) {
                setValid(true)
            } else {
                setValid(false);
            }
        }

        return () => {mounted = false};
    }, [debouncedLinkName])


    return (
        <div className="set-name-container">
            <div className="set-name-form-holder">
                <form className="set-name-form" action="submit">
                    <div className="set-name-header-holder">
                        <h1>Claim your <span>LinktaMe</span> link</h1> 
                    </div>
                    {(errorMessage && errorMessage !== '') &&
                    (<div className="claim-name-form-error-holder">
                        <ErrorPanel message={errorMessage} />
                    </div>)}
                    <div className="set-name-input-holder">
                        <div className="input-group">
                            <div className="input-item input-group-prefix">
                                linkta.me/
                            </div>
                            <input value={link || ''} onChange={e => setLink(formatLink(e.target.value))} pattern="/^([a-zA-Z0-9 -]+)$/" className="input-item set-name-input" type="text" placeholder="example"/>
                            <div className="input-item input-group-suffix">
                                {loading && <LoadingWheel color="grey" size="18px" borderTickness="2px" />}
                            </div>
                        </div>
                    </div>
                    <div className="set-name-button-holder">
                        <button disabled={!valid} onClick={ e => claimLink(e)} className="filled" type="submit">
                            {
                                !loading ? ('Claim LinktaMe') : <LoadingWheel  color="white" size="18px" borderTickness="2px" />
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}