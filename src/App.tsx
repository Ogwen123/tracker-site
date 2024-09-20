import React from 'react'
import { User, AppOutletContext } from './global/types'
import { useOutletContext, Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import { publicPaths, disabledWhenLoggedIn, navBarExempt } from './main'

const App = () => {

    const [user, setUser] = React.useState<User>()
    const [width, setWidth] = React.useState<number>(window.innerWidth)
    const [enabled, setEnabled] = React.useState<boolean>(true)

    window.addEventListener("resize", () => {
        setWidth(window.innerWidth)
    })

    React.useEffect(() => {
        if (user === undefined) {
            let token = localStorage.getItem("token")
            let userData
            const userDataRaw = localStorage.getItem("userData")
            if (userDataRaw === null) token = null
            else userData = JSON.parse(userDataRaw)


            if (token === null) {
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

    React.useEffect(() => {
        let url
        if (location.href.includes("localhost") || location.href.includes("127.0.0.1")) {
            url = "http://localhost:3002/api/services/check"
        } else {
            url = "https://admin-api.owen-services.eu.org/api/services/check"
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: "b094d655-7252-4345-a4b1-40789b654687"
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    if (data.data.enabled !== undefined) {
                        setEnabled(data.data.enabled)
                    }
                })
            }
        })
    }, [])

    return (
        <div>
            {
                enabled ?
                    <div className='min-h-[100vh] overflow-y-hidden'>
                        {
                            !navBarExempt.includes(location.pathname) ?
                                <NavigationBar context={{ user, width }} />
                                :
                                <div></div>
                        }
                        < Outlet context={{ user, width }
                        } />
                    </div >
                    :
                    <div className='h-[200px] w-full flex justify-center items-center text-xl'>
                        This site has been disabled by an administrator.
                    </div>
            }
        </div>
    )
}

export const useData = () => {
    return useOutletContext<AppOutletContext>()
}

export default App