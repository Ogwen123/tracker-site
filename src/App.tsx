import React from 'react'
import { User, AppOutletContext } from './global/types'
import { useOutletContext, Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

export const navBarExempt = ["/login"]
export const publicPaths = ["/login", "/register", "/", ""]
export const disabledWhenLoggedIn = ["/login", "/register"]

const App = () => {

    const [user, setUser] = React.useState<User>()
    const [width, setWidth] = React.useState<number>(window.innerWidth)

    window.addEventListener("resize", () => {
        setWidth(window.innerWidth)
    })

    React.useEffect(() => {
        const userData = localStorage.getItem("token")

        if (userData === null) {
            if (!publicPaths.includes(location.pathname)) {
                location.href = "/login"
            }
        } else {
            setUser({ token: userData })
            if (disabledWhenLoggedIn.includes(location.pathname)) {
                location.href = "/"
            }
        }
    }, [])

    return (
        <div className='min-h-[100vh] overflow-hidden'>
            {
                !navBarExempt.includes(location.pathname) &&
                <NavigationBar />
            }
            <Outlet context={{ user, width }} />
        </div>
    )
}

export const useData = () => {
    return useOutletContext<AppOutletContext>()
}

export default App