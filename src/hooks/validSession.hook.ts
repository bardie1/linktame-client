import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slicers/userSlicer";

export function useValidSession(user: any) : boolean {
    const [validSession, setValidSession ] = useState<boolean>(true);

    console.log(user);
    useEffect(() => {
        if (user && user.exp) {
            let d = new Date().getTime() / 1000;
            console.log(d, user.exp);
            console.log(d - user.exp);
            if (d > user.exp) {
                setValidSession(false);
            } else {
                setValidSession(true);
            }
        }

        return () => {
            setValidSession(false);
        }
    }, [user])

    return validSession;
}