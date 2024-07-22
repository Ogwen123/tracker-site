import React from 'react'
import { User, AppOutletContext } from './global/types'
import { useOutletContext, Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import { publicPaths, disabledWhenLoggedIn, navBarExempt } from './main'

const App = () => {

    const [user, setUser] = React.useState<User>()
    const [width, setWidth] = React.useState<number>(window.innerWidth)

    window.addEventListener("resize", () => {
        setWidth(window.innerWidth)
    })

    React.useEffect(() => {
        if (user === undefined) {
            let token = localStorage.getItem("token")
            let userData
            const userDataRaw = localStorage.getItem("userData")
            console.log(userDataRaw)
            if (userDataRaw === null) token = null
            else userData = JSON.parse(userDataRaw)

            console.log(token)

            if (token === null) {
                console.log(location.pathname)
                console.log(publicPaths.includes(location.pathname))
                if (!publicPaths.includes(location.pathname)) {
                    location.href = "/login"
                }
            } else {
                setUser({ token: token, username: userData.username, name: userData.name })
                if (disabledWhenLoggedIn.includes(location.pathname)) {
                    location.href = "/"
                }
            }
        } else {
            if (disabledWhenLoggedIn.includes(location.pathname)) {
                location.href = "/"
            }
        }
    }, [])

    return (
        <div className='min-h-[100vh]'>
            {
                !navBarExempt.includes(location.pathname) ?
                    <NavigationBar context={{ user, width }} />
                    :
                    <div></div>
            }
            <div className={!navBarExempt.includes(location.pathname) ? 'p-[10px]' : ""}>
                <Outlet context={{ user, width }} />
            </div>
        </div>
    )
}

export const useData = () => {
    return useOutletContext<AppOutletContext>()
}

export default App