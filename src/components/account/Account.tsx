import React, {useState, useEffect} from 'react';
import { selectUser } from '../../redux/slicers/userSlicer';
import { useSelector } from 'react-redux';
import "./Account.css";
export const Account = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const user = useSelector(selectUser)

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
    },[])

    return (
    <div className="account-container">
        <div className="account-data-container">
            <h2 className="account-form-header">Account Details</h2>
            <form className="account-form" action="submit">
                <div className="name-holder">
                    <div className="input-holder">
                        <label htmlFor="account-name">Name</label>
                        <div className="account-form-input-group">
                            <div className="account-input-prepend">
                                <div>linkta.me/</div> 
                            </div>
                            <input className="account-form" type="text" value={name}/>
                            <button className="unfilled check-name-availability">Check availability</button>
                        </div>
                    </div>
                </div>
                <div className="email-holder">
                    <div className="input-holder">
                        <label htmlFor="account-form">Email</label>
                        <input className="account-form" type="text" value={email}/>
                    </div>
                </div>
                <div className="account-form-buttons-holder">
                    <button className="account-form-cancel">Cancel</button>
                    <button className="account-form-save filled">Save</button>
                </div>
            </form>
        </div>
    </div>  
    )
}