import { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref:any): boolean {

    const [clickedOutside, setClickedOutside] = useState<boolean>(false)

    useEffect(() => { 
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setClickedOutside(true);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return clickedOutside;
}