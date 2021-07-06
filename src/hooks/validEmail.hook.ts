import { useEffect, useState } from "react";
import { useDebounce } from '../hooks/debounce.hook';


export function useValidEmail(email: string): boolean {
    const [validEmail, setValidEmail] = useState<boolean>(true);
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const debouncedEmail = useDebounce(email, 1000);

    useEffect(() => {
       setValidEmail(emailRegex.test(debouncedEmail));
    },[debouncedEmail])

    return validEmail;
}