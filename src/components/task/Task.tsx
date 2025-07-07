import React from 'react'

import { useData } from "../../App"
import { _Alert, _Task, ExtendedTask } from '../../global/types'
import { url } from '../../utils/url'
import LoadingWheel from '../LoadingWheel'
import Alert from '../Alert'
import { BookmarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { completionPercent, formatTime, ISOToTime, now, secondsToTime } from '../../utils/utils'
import DeleteDialog from '../tasks/DeleteDialog'
import { title } from '../../utils/string'
import TaskEditForm from './TaskEditForm'

const Task = () => {

    const { user } = useData()

    const [task, setTask] = React.useState<ExtendedTask>()

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false)
    const [showEditForm, setShowEditForm] = React.useState<boolean>(false)
    const [timeRemaining, setTimeRemaining] = React.useState<number>(-1)

    React.useEffect(() => {
        if (task === undefined) return
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timerInterval);
                    return 0;
                } else {
                    return task?.threshold - now()
                }
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [task]);

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
                    setAlert([data.error instanceof Array ? data.error[0] : data.error, "ERROR", true])
                })
            } else {
                res.json().then((data) => {
                    setTask(data.data)
                    console.log(data.data)
                })
            }
        }).catch((err) => {
            console.error(err)
            setAlert(["An unknown error occured whilst fetching the tasks data.", "ERROR", true])
        })
    }, [user])

    const pinTask = () => {

    }

    const updateTask = (newData: ExtendedTask) => {
        setTask(newData)
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
                task !== undefined ?
                    <div>
                        <DeleteDialog
                            open={deleteDialog}
                            setOpen={setDeleteDialog}
                            id={task.id}
                            setTasks={() => { }}
                            useSuccessHandler={true}
                            successHandler={(_: any) => {
                                window.location.href = "/tasks"
                            }}
                        />
                        <div className='bg-bgdark rounded-md w-full p-[10px] flex mb-[20px]'>
                            <div className='text-2xl'>
                                {task.name}
                            </div>
                            <div className='flex flex-row items-center flex-grow justify-end'>
                                <BookmarkIcon className={'size-7 hover:fill-yellow-300/50 ' + (task.pinned && "fill-yellow-300 hover:fill-yellow-300")} onClick={pinTask} />
                                <TrashIcon className={'size-7 hover:fill-error/50'} onClick={() => setDeleteDialog(true)} />
                            </div>
                        </div>
                        <div className='text-2xl text-subtext'>
                            <div className='flex flex-row justify-between'>
                                <div>Task Information</div>
                                <PencilSquareIcon className='size-7' onClick={() => setShowEditForm(true)} />
                            </div>
                            <div className='bg-hr w-full h-[1px] my-[10px]'></div>
                        </div>
                        <div className='bg-bgdark rounded-md w-full p-[10px] flex mb-[20px] flex-col'>
                            {
                                showEditForm ?
                                    <TaskEditForm updateTask={updateTask} task={task} setShowEditForm={setShowEditForm} />
                                    :
                                    <div className='flex flex-row flex-wrap'>
                                        <div className='w-1/3'>
                                            <div className='text-subtext'>Name</div>
                                            <div>
                                                {task.name}
                                            </div>
                                        </div>
                                        <div className='w-1/3'>
                                            <div className='text-subtext'>Repeat Period</div>
                                            <div>
                                                {title(task.repeat_period)}
                                            </div>
                                        </div>
                                        <div className='w-1/3'>
                                            <div className='text-subtext'>Created At</div>
                                            <div>
                                                {ISOToTime(task.created_at)}
                                            </div>
                                        </div>

                                        {
                                            task.date_time &&
                                            <div className='flex flex-col w-full'>
                                                <div className='bg-hr w-full h-[1px] my-[10px]'></div>
                                                <div className='text-subtext text-sm mb-[15px]'>You aim to complete this task at: </div>
                                                <div className='flex flex-row flex-wrap w-full'>

                                                    <div className='w-1/3'>
                                                        <div className='text-subtext'>Week of Repeat Period</div>
                                                        <div>
                                                            {title(task.week_of_repeat_period as string)}
                                                        </div>
                                                    </div>
                                                    <div className='w-1/3'>
                                                        <div className='text-subtext'>Day</div>
                                                        <div>
                                                            {title(task.day as string)}
                                                        </div>
                                                    </div>
                                                    <div className='w-1/3'>
                                                        <div className='text-subtext'>Time</div>
                                                        <div>
                                                            {formatTime(task.hour!, task.minute!)}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        }
                                    </div>
                            }
                        </div>
                        <div className='bg-bgdark rounded-md w-full p-[10px] flex mb-[20px] flex-col'>
                            {
                                task.completed ?
                                    <div className='gradienttext text-lg font-bold w-[300px]'>
                                        You have completed this task
                                    </div>
                                    :
                                    <div className='text-error text-lg font-bold'>
                                        You have yet to complete this task.
                                    </div>
                            }
                            {
                                task.repeat_period !== "NEVER" ?
                                    task.completed ?
                                        <div className='text-lg font-bold text-subtext'>
                                            This task will reset in <span className='text-main'>{secondsToTime(timeRemaining)}</span>
                                        </div>
                                        :
                                        <div className='text-lg font-bold text-subtext'>
                                            You have <span className='text-main'>{secondsToTime(timeRemaining)}</span> to complete this task
                                        </div>
                                    :
                                    null
                            }
                        </div>
                        {
                            task.repeat_period !== "NEVER" &&
                            <div className='text-2xl text-subtext'>
                                <div>
                                    Task Completion data
                                </div>
                                <div className='bg-hr w-full h-[1px] my-[10px]'></div>
                            </div>
                        }
                        {
                            task.repeat_period !== "NEVER" &&

                            <div className='bg-bgdark rounded-md w-full p-[10px] flex mb-[20px] flex-row justify-evenly'>
                                <div className='white-border size-[250px] rounded-md border-[2px] flex flex-col'>
                                    <div className='w-full text-center text-subtext p-[10px]'>
                                        Total Completions
                                    </div>
                                    <div className='text-9xl fc flex-grow'>
                                        {task.completions}
                                    </div>
                                </div>
                                <div className='white-border size-[250px] rounded-md border-[2px] flex flex-col'>
                                    <div className='w-full text-center text-subtext pt-[10px]'>
                                        Completion Percent
                                    </div>
                                    <div className='w-full text-center text-subtext/70 pb-[10px] text-xs'>
                                        Total completions as a percentage of total possible completions
                                    </div>
                                    <div className='text-8xl fc flex-grow'>
                                        {completionPercent(task)}%
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            task.repeat_period !== "NEVER" &&

                            <div className='bg-bgdark rounded-md w-full p-[10px] mb-[20px]'>
                                {
                                    task.completions === 0 ?
                                        <div className='text-xl text-subtext'>
                                            You do not have any completions to show
                                        </div>
                                        :
                                        <div>
                                            <div className='text-xl'>
                                                Last {task.task_completions.length} task completions
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <div className='flex flex-row justify-evenly text-subtext w-[1000px]'>
                                                    <div className='w-[100px] text-center'>
                                                        Date Completed
                                                    </div>
                                                    <div className='w-[100px] text-center'>
                                                        Time Completed (UTC)
                                                    </div>
                                                </div>
                                                {
                                                    task.task_completions.map((completion, index) => {
                                                        const completed_at = new Date(completion.completed_at * 1000).toISOString()
                                                        const date = completed_at.split("T")[0]
                                                        const time = completed_at.split("T")[1].split(".")[0]
                                                        return (
                                                            <div key={index} className='flex flex-row justify-evenly rounded-md white-border w-[1000px] mt-[10px]'>
                                                                <div className='w-[100px] text-center'>{date}</div>
                                                                <div className='w-[100px] text-center'>{time}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                        }
                        <div>

                        </div>
                    </div>
                    :
                    <LoadingWheel />
            }
        </div>
    )
}

export default Task