import { useEffect, useState } from 'react'

export default function usePersist() {
    const [persist, setPersist] = useState<boolean>(() => {
        const storedPersist = localStorage.getItem("persist");
        // check if a value found in localStorage, return value true or false, else false
        return storedPersist ? JSON.parse(storedPersist) : true; 
    });

    useEffect(() => {
        // update the persist value when the persist state change
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist] as const;
}