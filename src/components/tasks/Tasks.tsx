import React from 'react'
import LoadingCard from './LoadingCard'
import { InformationCircleIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useData } from '../../App'
import LoadingWheel from '../LoadingWheel'
import NewDialog from './NewDialog'
import { TabGroup, TabList, Tab } from '@headlessui/react'
import { _Alert, RepeatOptions, _Task } from '../../global/types'
import { url } from '../../utils/url'
import Alert, { alertReset } from '../Alert'
import TaskCard from './TaskCard'

const Tasks = () => {

    const { user, width } = useData()

    const [tasks, setTasks] = React.useState<_Task[]>()
    const [loadedTasks, setLoadedTasks] = React.useState<_Task[]>()

    const [query, setQuery] = React.useState<string>("")
    const [repeatPeriodFilter, setRepeatPeriodFilter] = React.useState<RepeatOptions | "ALL">("ALL")
    const [completionFilter, setCompletionFilter] = React.useState<"ALL" | "YES" | "NO">("ALL")
    const [dateFilter, setDateFilter] = React.useState<"ALL" | "DATE" | "NODATE">("ALL")

    const [newDialog, setNewDialog] = React.useState<boolean>(false)
    const [page, setPage] = React.useState<number>(0)
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [noTasksMessage, setNoTasksMessage] = React.useState<string>("You do not have any tasks. You can use the button in the top left to create new tasks.")
    const [searchActive, setSearchActive] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (user === undefined || tasks !== undefined) return
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
                    setLoadedTasks(data.data)
                })
            }
        }).catch(() => {
            setAlert(["An error occured while fetching your tasks. Please try reloading the page.", "ERROR", true])
        })
    }, [user])

    const checkFilter = (task: _Task) => {
        if (repeatPeriodFilter === "ALL" && completionFilter === "ALL" && dateFilter === "ALL") {
            return true
        }


        if (task.repeat_period !== repeatPeriodFilter && repeatPeriodFilter !== "ALL") {
            return false
        }

        console.log(task.completed, " ", completionFilter)

        if ((task.completed === true && completionFilter === "NO") || (task.completed === false && completionFilter === "YES")) {
            return false
        }

        if ((task.date_time === true && dateFilter === "NODATE") || (task.date_time === false && dateFilter === "DATE")) {
            return false
        }

        return true
    }

    const convertToValue = (type: "REPEAT" | "COMPLETION" | "DATE") => {
        if (type === "REPEAT") {
            switch (repeatPeriodFilter) {
                case "ALL": return 0
                case "NEVER": return 1
                case "WEEK": return 2
                case "FORTNIGHT": return 3
                case "MONTH": return 4
                default: return 0
            }
        } else if (type === "COMPLETION") {
            switch (completionFilter) {
                case "ALL": return 0
                case "YES": return 1
                case "NO": return 2
                default: return 0
            }
        } else if (type === "DATE") {
            switch (dateFilter) {
                case "ALL": return 0
                case "DATE": return 1
                case "NODATE": return 2
                default: return 0
            }
        } else {
            return 0
        }
    }

    const loadMore = () => {
        setPage(page)
    }

    const updateTasks = (data: _Task[]) => {
        loadMore() // ! remove this once loadmore is actually in use
        if (searchActive === false) {
            setTasks(data)
            setLoadedTasks(data)
        } else if (searchActive === true) {

            console.log("here")

            const ids = tasks?.map((task, _) => (task.id)) || []

            console.log(ids)

            const newTasks: _Task[] = []

            data.forEach((task, _) => {
                console.log(task.id)
                if (ids.includes(task.id)) {
                    newTasks.push(task)
                }
            })

            setTasks(newTasks)
            setLoadedTasks(data)
        }
    }

    const search = () => {
        if (query === "") {
            setNoTasksMessage("You do not have any tasks. You can use the button in the top left to create new tasks.")
            setTasks(loadedTasks)
            setSearchActive(false)
        } else {
            fetch(url("tracker") + "tasks/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.token
                },
                body: JSON.stringify({
                    query
                })
            }).then((res) => {
                if (!res.ok) {
                    res.json().then((data) => {
                        setAlert([data.error, "ERROR", true])
                        setTimeout(() => {
                            setAlert(alertReset)
                        }, 5000)
                    })
                } else {
                    setNoTasksMessage("You do not have any tasks that match that query.")
                    setSearchActive(true)
                    res.json().then((data) => {
                        setTasks(data.data)
                    })
                }
            }).catch(() => {
                setAlert(["An error occured while performing the search. Please try again.", "ERROR", true])
                setTimeout(() => {
                    setAlert(alertReset)
                }, 5000)
            })
        }
    }

    const resetFilter = () => {
        setQuery("")
        setCompletionFilter("ALL")
        setDateFilter("ALL")
        setRepeatPeriodFilter("ALL")
        setTasks(loadedTasks)
        setSearchActive(false)
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
                        <div className='flex flex-row flex-wrap'>
                            <button
                                className='bg-main h-[50px] rounded-md flex-grow min-w-[150px] fc mr-[10px] hover:gradient mb-[10px]'
                                onClick={() => {
                                    setNewDialog(true)
                                }}
                            >
                                <PlusIcon className='size-7' /> Add task
                            </button>
                            <input
                                className={'form-input min-w-[350px] h-[50px] my-0 mr-[10px] mb-[10px] ' + (width < 800 ? "flex-grow" : "w-[70%]")}
                                placeholder='Search tasks'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") {
                                        search()
                                    }
                                }}
                            />
                            <button
                                className='bg-main h-[50px] rounded-md flex-grow min-w-[150px] fc mr-[10px] mb-[10px]'
                                onClick={search}
                            >
                                <MagnifyingGlassIcon className='size-7' />
                            </button>
                            <button
                                className='bg-warning h-[50px] rounded-md flex-grow min-w-[150px] fc mb-[10px]'
                                onClick={resetFilter}
                            >
                                Reset all filters
                            </button>
                        </div>
                        <NewDialog open={newDialog} setOpen={setNewDialog} updateTasks={updateTasks} page={page} />
                        <div className='w-full mb-[20px] mt-[10px] flex'>
                            <TabGroup
                                title="Filter by how often the task repeats."
                                className="w-[calc(40%-14px)] bg-bgdark rounded-md p-[5px] mr-[20px]"
                                selectedIndex={convertToValue("REPEAT")}
                                onChange={(index) => {
                                    switch (index) {
                                        case 0:
                                            setRepeatPeriodFilter("ALL")
                                            break;
                                        case 1:
                                            setRepeatPeriodFilter("NEVER")
                                            break;
                                        case 2:
                                            setRepeatPeriodFilter("WEEK")
                                            break;
                                        case 3:
                                            setRepeatPeriodFilter("FORTNIGHT")
                                            break;
                                        case 4:
                                            setRepeatPeriodFilter("MONTH")
                                            break;
                                        default:
                                            setRepeatPeriodFilter("ALL")
                                            break;
                                    }
                                }}>
                                <TabList className="flex w-full justify-between flex-wrap" >
                                    <Tab className="tab">All</Tab>
                                    <Tab className="tab fc group">
                                        Never
                                        <InformationCircleIcon className='size-5 ml-[5px] text-subtext group-data-[selected]:text-hrdark' title="When a task that is set to never repeat is completed it will be removed from this page but you will be able to view it in your dashboard." />
                                    </Tab>
                                    <Tab className="tab">Weekly</Tab>
                                    <Tab className="tab">Fortnightly</Tab>
                                    <Tab className="tab">Monthly</Tab>
                                </TabList>
                            </TabGroup>



                            <TabGroup
                                title="Filter by whether the task is completed."
                                className="w-[calc(30%-12px)] bg-bgdark rounded-md p-[5px]"
                                selectedIndex={convertToValue("COMPLETION")}
                                onChange={(index) => {
                                    switch (index) {
                                        case 0:
                                            setCompletionFilter("ALL")
                                            break;
                                        case 1:
                                            setCompletionFilter("YES")
                                            break;
                                        case 2:
                                            setCompletionFilter("NO")
                                            break;
                                        default:
                                            setCompletionFilter("ALL")
                                            break;
                                    }
                                }}>
                                <TabList className="flex w-full justify-between flex-wrap">
                                    <Tab className="tab">All</Tab>
                                    <Tab className="tab">Completed</Tab>
                                    <Tab className="tab">Not Completed</Tab>
                                </TabList>
                            </TabGroup>



                            <TabGroup
                                title="Filter by whether the task has a completion date."
                                className="w-[calc(30%-14px)] bg-bgdark rounded-md p-[5px] ml-[20px]"
                                selectedIndex={convertToValue("DATE")}
                                onChange={(index) => {
                                    switch (index) {
                                        case 0:
                                            setDateFilter("ALL")
                                            break;
                                        case 1:
                                            setDateFilter("DATE")
                                            break;
                                        case 2:
                                            setDateFilter("NODATE")
                                            break;
                                        default:
                                            setDateFilter("ALL")
                                            break;
                                    }
                                }}>
                                <TabList className="flex w-full justify-between flex-wrap">
                                    <Tab className="tab">All</Tab>
                                    <Tab className="rounded-md py-1 px-3 text-white text-sm focus:outline-none data-[selected]:gradient data-[hover]:bg-main/50 data-[selected]:border-w hover:border-w flex-grow min-w-[120px] h-[50px]">Has Completion Date</Tab>
                                    <Tab className="rounded-md py-1 px-3 text-white text-sm focus:outline-none data-[selected]:gradient data-[hover]:bg-main/50 data-[selected]:border-w hover:border-w flex-grow min-w-[120px] h-[50px]">Doesn't Have Completion Date</Tab>
                                </TabList>
                            </TabGroup>
                        </div>
                        {
                            tasks === undefined ?
                                <div className='task-grid'>
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                    <LoadingCard />
                                </div>
                                :
                                tasks.length === 0 ?
                                    <div className='text-lg mt-[20px] text-center'>
                                        {noTasksMessage}
                                    </div>
                                    :
                                    <div className='task-grid'>
                                        {
                                            tasks.map((task, index) => {
                                                if (checkFilter(task) === true) {
                                                    return (
                                                        <TaskCard
                                                            key={index}
                                                            task={task}
                                                            setTasks={setTasks}
                                                            page={page}
                                                            setAlert={setAlert}
                                                            updateTasks={updateTasks}
                                                        />
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