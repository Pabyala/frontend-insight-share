import { useEffect, useState } from 'react'

export default function usePersist() {
    const [persist, setPersist] = useState<boolean>(() => {
        const storedPersist = localStorage.getItem("persist");
        return storedPersist ? JSON.parse(storedPersist) : false
    })

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]
}