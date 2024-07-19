import React from 'react'
import { User, AppOutletContext } from './global/types'
import { useOutletContext, Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

export const navBarExepmt = ["/login"]

const App = () => {

    const [user, setUser] = React.useState<User>()

    return (
        <div className='min-h-[100vh] overflow-hidden'>
            {
                !navBarExepmt.includes(location.pathname) &&
                <NavigationBar />
            }
            <Outlet context={{ user }} />
        </div>
    )
}

export const useUser = () => {
    return useOutletContext<AppOutletContext>()
}

export default App