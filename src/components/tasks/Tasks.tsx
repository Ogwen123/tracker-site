import React from 'react'
import LoadingCard from './LoadingCard'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useData } from '../../App'
import LoadingWheel from '../LoadingWheel'
import NewDialog from './NewDialog'
import { TabGroup, TabList, Tab } from '@headlessui/react'
import { _Alert, RepeatOptions, Task } from '../../global/types'
import { url } from '../../utils/url'
import Alert, { alertReset } from '../Alert'
import TaskCard from './TaskCard'

const Tasks = () => {

    const { user, width } = useData()

    const [tasks, setTasks] = React.useState<Task[]>([])

    const [query, setQuery] = React.useState<string>("")
    const [repeatPeriodFilter, setRepeatPeriodFilter] = React.useState<RepeatOptions | "ALL">("ALL")
    const [newDialog, setNewDialog] = React.useState<boolean>(false)
    const [page, setPage] = React.useState<number>(0)
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])

    React.useEffect(() => {
        if (user === undefined) return
        fetch(url("tracker") + "tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                page: 0
            })
        }).then((res) => {
            if (!res.ok) {
                setAlert(["An error occured while fetching your tasks. Please try reloading the page.", "ERROR", true])
                setTimeout(() => {
                    setAlert(alertReset)
                }, 5000)
            } else {
                res.json().then((data) => {
                    setTasks(data.data)
                })
            }
        }).catch(() => {
            setAlert(["An error occured while fetching your tasks. Please try reloading the page.", "ERROR", true])
        })
    }, [user])

    const loadMore = () => {
        setPage(page)
    }

    const search = () => {
        loadMore()
    }

    return (
        <div className='page-parent'>
            <Alert
                content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                severity={alert[1]}
                show={alert[2]}
                title={alert[0] instanceof Array ? alert[0][0] : undefined}
            />
            {
                user ?
                    <div>
                        <div className='flex flex-row'>
                            <button
                                className='bg-main h-[50px] rounded-md w-[10%] min-w-[50px] fc mr-[10px] hover:gradient'
                                onClick={() => {
                                    setNewDialog(true)
                                }}
                            >
                                <PlusIcon className='size-7' /> {width > 1400 && "Add task"}
                            </button>
                            <input
                                className='form-input flex-grow min-w-[300px] h-[50px] my-0 mr-[10px]'
                                placeholder='Search tasks'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                className='bg-main h-[50px] rounded-md w-[10%] min-w-[50px] fc mr-[10px]'
                                onClick={search}
                            >
                                <MagnifyingGlassIcon className='size-7' />
                            </button>
                            <button
                                className='bg-warning h-[50px] rounded-md w-[10%] min-w-[50px] fc'
                            >
                                Reset all filters
                            </button>
                        </div>
                        <NewDialog open={newDialog} setOpen={setNewDialog} />
                        <div className='w-[50%] my-[20px]'>
                            <TabGroup
                                className="w-full bg-bgdark rounded-md p-[5px]"
                                onChange={(index) => {
                                    switch (index) {
                                        case 0:
                                            setRepeatPeriodFilter("ALL")
                                            break;
                                        case 1:
                                            setRepeatPeriodFilter("WEEK")
                                            break;
                                        case 2:
                                            setRepeatPeriodFilter("FORTNIGHT")
                                            break;
                                        case 3:
                                            setRepeatPeriodFilter("MONTH")
                                            break;
                                        default:
                                            setRepeatPeriodFilter("ALL")
                                            break;
                                    }
                                }}>
                                <TabList className="flex w-full justify-between flex-wrap">
                                    <Tab className="rounded-md py-1 px-3 text-white focus:outline-none data-[selected]:gradient data-[hover]:bg-main/50 data-[selected]:border-w hover:border-w w-[10%] min-w-[120px] h-[50px]">All</Tab>
                                    <Tab className="rounded-md py-1 px-3 text-white focus:outline-none data-[selected]:gradient data-[hover]:bg-main/50 data-[selected]:border-w hover:border-w w-[10%] min-w-[120px] h-[50px]">Weekly</Tab>
                                    <Tab className="rounded-md py-1 px-3 text-white focus:outline-none data-[selected]:gradient data-[hover]:bg-main/50 data-[selected]:border-w hover:border-w w-[10%] min-w-[120px] h-[50px]">Fortnightly</Tab>
                                    <Tab className="rounded-md py-1 px-3 text-white focus:outline-none data-[selected]:gradient data-[hover]:bg-main/50 data-[selected]:border-w hover:border-w w-[10%] min-w-[120px] h-[50px]">Monthly</Tab>
                                </TabList>
                            </TabGroup>
                        </div>
                        {
                            tasks.length === 0 ?
                                <div className='task-grid'>
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                </div>
                                :
                                <div className='task-grid'>
                                    {
                                        tasks.map((task, index) => {
                                            if (repeatPeriodFilter !== "ALL") {
                                                if (task.repeat_period === repeatPeriodFilter) {
                                                    return (
                                                        <TaskCard key={index} task={task} />
                                                    )
                                                }
                                            } else {
                                                return (
                                                    <TaskCard key={index} task={task} />
                                                )
                                            }
                                        })
                                    }
                                </div>
                        }
                    </div>
                    :
                    <LoadingWheel />
            }
        </div>
    )
}

export default Tasks