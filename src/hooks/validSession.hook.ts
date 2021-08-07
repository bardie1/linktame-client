import { useEffect, useState } from "react";

export function useValidSession(user: any) : boolean {
    const [validSession, setValidSession ] = useState<boolean>(true);
    useEffect(() => {
        if (user && user.exp) {
            let d = new Date().getTime() / 1000;
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