import React, {useState, useEffect} from 'react';
import { selectUser } from '../../redux/slicers/userSlicer';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingWheel } from '../loading-wheel/LoadingWheel';
import { ErrorPanel } from "../error-panel/ErrorPanel";
import { Notification } from "../notification/Notification";
import { login } from "../../redux/slicers/userSlicer";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import "./Account.css";
import { User } from '../../models/user';
import { userService } from '../../services/user.service';
import { sessionService } from '../../services/session.service';
import { NotificationConfig } from '../../models/notificationConfig';
export const Account = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [notificationConfig, setNotificationConfig ] = useState<NotificationConfig | null>(null)
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    const formatLink = (text: string): string =>  {
        return text.replace(" ","-").toLowerCase();
    }

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
    },[])

    useEffect(() => {
        if (/^([a-zA-Z0-9 -]+)$/.test(name) || name === '') {
            setErrorMessage('');
        } else {
            setErrorMessage('Your name can only contain number, letters and dashes');
        }
    }, [name])

    const cancelForm = (e:any) => {
        e.preventDefault();
        setName(user.name);
    }

    const claimLink = async(e: any) =>{
        e.preventDefault()
        setLoading(true);
        setErrorMessage('');
        let u: User = {
            public_id: user.name,
            email: user.email,
            name: name
        }
        let res = await userService.updateUser(u);
        if (res.successful) {
            setNotificationConfig({
                type: 'success',
                Icon: CheckCircleOutlineIcon,
                message: 'Update successful'
            })
            setTimeout(()  => {
                setNotificationConfig(null);
            }, 5000);
            dispatch(login({
                public_id: res.user.public_id,
                token: res.token,
                email: res.user.email,
                name: name,
                exp: user.exp
            }))
            sessionService.setUser({
                public_id: res.user.public_id,
                token: res.token,
                email: res.user.email,
                name: name,
                exp: user.exp
            });
            setLoading(false);
        } else {
            setErrorMessage(res.message)
            setLoading(false);
        }
    }

    return (
    <div className="account-container">
        <div className="account-data-container">
            <h2 className="account-form-header">Account Details</h2>
            <form className="account-form" action="submit" onSubmit={(e) => claimLink(e)}>
                <div className="name-holder">
                    <div className="input-holder">
                        <label htmlFor="account-name">Name</label>
                        <div className="account-form-input-group">
                            <div className="account-input-prepend">
                                <div>linkta.me/</div> 
                            </div>
                            <input className="account-form" type="text" value={name} onChange={(e) => setName(formatLink(e.target.value))}/>
                        </div>
                    </div>

                    {(errorMessage !== '') &&   <div className="account-name-error-message-holder"><ErrorPanel message={errorMessage} /></div>}
                
                </div>
                <div className="email-holder">
                    <div className="input-holder">
                        <label htmlFor="account-form">Email (read only)</label>
                        <input readOnly className="account-form" type="text" value={email}/>
                    </div>
                </div>
                <div className="account-form-buttons-holder">
                    <button type="button" onClick={(e) => cancelForm(e)} className="account-form-cancel">Cancel</button>
                    <button disabled={(name === '' || name === user.name) ? true : false} className="account-form-save filled">{ (loading) ? <LoadingWheel color="white" size="18px" borderTickness="2px" /> : 'Save'}</button>
                </div>
            </form>
        </div>

        { (notificationConfig) &&
                <Notification type={notificationConfig.type} Icon={notificationConfig.Icon} message={notificationConfig.message} />}
        </div>
    )
}