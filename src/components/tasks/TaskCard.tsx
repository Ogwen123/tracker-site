import React from 'react'
import { _Alert, _Task } from '../../global/types'
import RepeatPeriodBadge from './RepeatPeriodBadge'
import CompletionDateBadge from './CompletionDateBadge'
import { Link } from 'react-router-dom'
import { BookmarkIcon, TrashIcon } from '@heroicons/react/20/solid'
import DeleteDialog from './DeleteDialog'
import { useData } from '../../App'
import { url } from '../../utils/url'
import { formatTaskName, title } from '../../utils/string'

interface TaskCardProp {
    task: _Task,
    setTasks: React.Dispatch<React.SetStateAction<_Task[] | undefined>>,
    page: number,
    setAlert: React.Dispatch<React.SetStateAction<_Alert>>,
    updateTasks: (data: _Task[]) => void
}

const TaskCard = ({ task, setTasks, page, setAlert, updateTasks }: TaskCardProp) => {

    const { user } = useData()

    const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false)

    const pinTask = () => {
        if (!user) return
        console.log("here")
        fetch(url("tracker") + "task/pin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                id: task.id,
                page
            })
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error, "ERROR", true])
                })
            } else {
                res.json().then((data) => {
                    updateTasks(data.data)
                })
            }
        })
    }

    const completeTask = () => {
        if (!user) return
        console.log("here")
        fetch(url("tracker") + "task/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                id: task.id,
                page,
                return_updated_tasks: true
            })
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error, "ERROR", true])
                })
            } else {
                res.json().then((data) => {
                    updateTasks(data.data)
                })
            }
        })
    }

    return (
        <div className={'size-[294px] rounded-md  p-[10px] flex flex-col ' + (task.completed ? "darkgradient" : "bg-bgdark border-w")}>
            <DeleteDialog
                open={deleteDialog}
                setOpen={setDeleteDialog}
                id={task.id}
                setTasks={setTasks}
                page={page} updateTasks={updateTasks}
            />
            <div className='flex-grow'>
                <div className='flex flex-wrap'>
                    <RepeatPeriodBadge type={task.repeat_period} />
                    {
                        task.date_time &&
                        <CompletionDateBadge />
                    }
                </div>
                <div className='mt-[10px] text-2xl h-[26px] flex flex-row'>
                    <div className='flex-grow' title={task.name}>
                        {formatTaskName(task.name)}
                    </div>
                    <div className='flex flex-row items-center'>
                        <BookmarkIcon className={'size-4 hover:fill-yellow-300/50 ' + (task.pinned && "fill-yellow-300 hover:fill-yellow-300")} onClick={pinTask} />
                        <TrashIcon className={'size-4 hover:fill-error/50'} onClick={() => setDeleteDialog(true)} />
                    </div>
                </div>
                <div className='mb-[10px] text-xs text-hr my-[5px]'>
                    {task.id}
                </div>
                <div className='text-subtext'>
                    {
                        task.date_time === true ?
                            <div className='flex flex-col mt-[20px]'>
                                <div className='text-lg text-white'>
                                    Completion Date and Time:
                                </div>
                                <div className=''>
                                    Completion Day: {task.day !== null ? title(task.day) : "ERROR"}
                                </div>
                                <div className=''>
                                    Completion Time: {task.hour !== null && task.minute !== null ? task.hour + ":" + (task.minute < 10 ? "0" + task.minute : task.minute) : "ERROR"}
                                </div>
                                {
                                    task.week_of_repeat_period !== null && task.week_of_repeat_period !== "FIRST" &&
                                    <div className=''>
                                        Completion Week: {title(task.week_of_repeat_period)}
                                    </div>
                                }
                            </div>
                            :
                            <div className='flex flex-col mt-[20px]'>
                                <div className='text-lg text-white'>
                                    Completion Date and Time:
                                </div>
                                <div className='fc text-xl mt-[20px]'>
                                    N/A
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className='flex flex-row h-[40px]'>
                <Link
                    to={"/task/" + task.id}
                    className='bg-main rounded-md p-[5px] mr-[10px] w-[calc(50%-10px)] min-w-[100px] fc'
                >
                    View Task
                </Link>
                <button
                    onClick={() => completeTask()}
                    className='bg-main rounded-md p-[5px] ml-[10px] w-[calc(50%-10px)] min-w-[100px] fc'
                >
                    {
                        task.completed ?
                            <div className='text-sm'>
                                Undo Completion
                            </div>
                            :
                            <div>
                                Complete
                            </div>
                    }
                </button>
            </div>
        </div>
    )
}

export default TaskCard