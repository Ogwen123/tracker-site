import React from 'react'
import { useData } from '../../App'

const Home = () => {

    const { user } = useData()

    return (
        <div>Home {user !== undefined ? "logged in" : "not logged in"}</div>
    )
}

export default Home