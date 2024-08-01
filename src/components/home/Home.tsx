import React from 'react'
import { useData } from '../../App'
import { ArrowRightEndOnRectangleIcon, BoltIcon, BookmarkIcon, PlusIcon } from '@heroicons/react/20/solid'
import { _Alert, Task } from '../../global/types'
import LoadingPinnedCard from './LoadingPinnedCard'
import { Link } from 'react-router-dom'
import { url } from '../../utils/url'
import LoadingWheel from '../LoadingWheel'
import Alert, { alertReset } from '../Alert'
import NewDialog from '../tasks/NewDialog'
import PinnedCard from './PinnedCard'

const Home = () => {

    const { user, width } = useData()

    const [pinnedTasks, setPinnedTasks] = React.useState<Task[]>()

    const [loggingOut, setLoggingOut] = React.useState<boolean>(false)
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [newDialog, setNewDialog] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (user === undefined || pinnedTasks !== undefined) return
        fetch(url("tracker") + "tasks/pinned", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + user.token
            }
        }).then((res) => {
            if (!res.ok) {
                setAlert(["An error occured while fetching your pinned tasks. Please try reloading the page.", "ERROR", true])
                setTimeout(() => {
                    setAlert(alertReset)
                }, 5000)
            } else {
                res.json().then((data) => {
                    setPinnedTasks(data.data)
                })
            }
        }).catch(() => {
            setAlert(["An error occured while fetching your tasks. Please try reloading the page.", "ERROR", true])
        })
    }, [user])

    const logout = () => {
        if (user === undefined) return
        setLoggingOut(true)
        fetch(url("auth") + "logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: user.token
            })
        }).then((res) => {
            if (res.ok) {
                localStorage.removeItem("token")
                localStorage.removeItem("userData")
                location.href = "/login"
                setLoggingOut(false)
            }
        }).catch(() => {
            setLoggingOut(false)
            setAlert(["Logging out failed as a connection to the server could not be made.", "ERROR", true])
            setTimeout(() => {
                setAlert(alertReset)
            }, 5000)
        })
    }

    return (
        <div className='fc flex-col'>
            {
                user ?
                    <div className='size-[80%] page-parent'>
                        <Alert
                            content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                            severity={alert[1]}
                            show={alert[2]}
                            title={alert[0] instanceof Array ? alert[0][0] : undefined}
                        />
                        <div>{user.username}'s account</div>
                        <div className='text-4xl mb-[50px]'>Account Home</div>
                        <div className={'flex ' + (width < 950 ? "flex-col" : "flex-row")}>

                            <div className={(width < 950 ? "pb-[10px] width-full" : "pr-[10px] w-[50%]")}> {/*left column*/}

                                <div className='border-[2px] border-hr rounded-md w-full p-[20px] h-[500px] flex flex-col'>
                                    <div className='text-2xl mb-[20px] flex items-center'>
                                        <BookmarkIcon className='size-7 fill-yellow-300' />
                                        <div className='font-bold ml-[5px]'>Pinned Tasks</div>
                                    </div>
                                    {
                                        pinnedTasks === undefined ?
                                            <div className='border border-hr rounded-md flex justify-between flex-col text-lg flex-grow p-[10px]'>
                                                <LoadingPinnedCard />
                                                <LoadingPinnedCard />
                                                <LoadingPinnedCard />
                                            </div>

                                            :

                                            pinnedTasks.length === 0 ?
                                                <div className='border border-solid border-hr rounded-md fc flex-col text-lg flex-grow p-[10px]'>
                                                    <BookmarkIcon className='size-20 fill-yellow-300 mb-[20px]' />
                                                    <div className='w-[60%] text-center'>Pinned tasks will appear here. You can pin tasks from the tasks page.</div>
                                                    <Link to="/tasks" reloadDocument className="underline mt-[20px] text-hyperlink">Go to tasks</Link>
                                                </div>

                                                :

                                                <div className='border border-hr rounded-md flex flex-col text-lg flex-grow p-[10px] overflow-y-auto'>
                                                    {
                                                        pinnedTasks.map((task, index) => {
                                                            return (
                                                                <PinnedCard
                                                                    key={index}
                                                                    task={task}
                                                                    setPinnedTasks={setPinnedTasks}
                                                                    setAlert={setAlert}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                    }
                                </div>
                            </div>

                            <div className={(width < 950 ? "pt-[10px] width-full" : "pl-[10px] w-[50%]")}>{/*right column*/}

                                <div className='border-[2px] border-hr rounded-md w-full p-[20px] h-[350px] flex flex-col'>
                                    <div className='text-2xl mb-[20px] flex items-center'>
                                        <BoltIcon className='size-7 fill-main' />
                                        <div className='font-bold ml-[5px]'>Quick Actions</div>
                                    </div>
                                    <div className='border border-hr rounded-md justify-evenly flex flex-col text-lg flex-grow p-[10px]'>
                                        <div className='w-full flex flex-row items-center'>
                                            Add a Task
                                            <div className='border-t-[3px] flex-grow border-dotted border-hr mx-[20px]'></div>
                                            <button
                                                className='bg-main h-[40px] rounded-md min-w-[50px] fc mr-[10px] px-[10px]'
                                                onClick={() => {
                                                    setNewDialog(true)
                                                }}
                                            >
                                                <PlusIcon className='size-7' /> {width > 800 && "Add task"}
                                            </button>
                                        </div>
                                        <div className='w-full flex flex-row items-center'>
                                            Logout
                                            <div className='border-t-[3px] flex-grow border-dotted border-hr mx-[20px]'></div>
                                            <button
                                                className='bg-warning h-[40px] rounded-md min-w-[50px] fc mr-[10px] px-[10px]'
                                                onClick={() => logout()}
                                            >
                                                <div className='mr-[5px]'>
                                                    {loggingOut ? <LoadingWheel size={20} /> : <ArrowRightEndOnRectangleIcon className='size-7' />}
                                                </div>
                                                {width > 800 && "Logout"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NewDialog open={newDialog} setOpen={setNewDialog} />

                    </div>
                    :
                    <div className='w-full fc flex-col mt-[20vh]'>
                        <div className='gradienttext text-8xl'>
                            Tracker
                        </div>
                        <div className='my-[20px] text-white/80'>
                            Track weekly and monthly tasks easily with this free-to-use tool.
                        </div>
                        <div className='bg-hr h-[3px] w-[400px]'></div>
                        <div className='text-white/80 flex flex-col items-center my-[20px]'>
                            <Link reloadDocument to="/login">
                                <button className='gradient rounded-full p-[10px] m-[5px] w-[235px] text-white'>
                                    Login
                                </button>
                            </Link>
                            <div>
                                to an existing account or
                            </div>
                            <Link reloadDocument to="/register">
                                <button className='gradient rounded-full p-[10px] m-[5px] w-[235px] text-white'>
                                    Sign Up
                                </button>
                            </Link>
                            <div>for a free account.</div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Home