import React from 'react'

import { useData } from "../App"
import { _Alert, _Task } from '../global/types'
import { url } from '../utils/url'
import LoadingWheel from '../components/LoadingWheel'

const Task = () => {

    const { user } = useData()

    const [task, setTask] = React.useState<_Task>()

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])

    React.useEffect(() => {
        if (!user) return

        const splitPathname = location.pathname.split("/")
        const id = splitPathname[splitPathname.length - 1]

        fetch(url("tracker") + "task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                id
            })
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error, "ERROR", true])
                })
            } else {
                res.json().then((data) => {
                    setTask(data.data)
                })
            }
        })
    }, [user])

    return (
        <div className='page-parent'>
            {
                task !== undefined ?
                    <div>
                        {task.name}
                    </div>
                    :
                    <LoadingWheel />
            }
        </div>
    )
}

export default Task