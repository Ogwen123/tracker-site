import React from 'react'
import { useData } from '../App'

interface ShowUserProps {
    children: React.ReactNode,
    className?: string
}

interface ShowGuestProps {
    children: React.ReactNode
}


export const ShowUser = ({ children, className }: ShowUserProps) => {
    const isLoggedIn = useData().user !== undefined
    return isLoggedIn ? (className ? <div className={className}>{children}</div> : <>{children}</>) : null;
}

export const ShowGuest = ({ children }: ShowGuestProps) => {
    const isLoggedIn = useData().user !== undefined
    return isLoggedIn ? null : <>{children}</>
}
