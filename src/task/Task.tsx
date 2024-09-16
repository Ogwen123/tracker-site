import React from 'react'

import { useData } from "../App"
import { _Alert, _Task, ExpandedTask } from '../global/types'
import { url } from '../utils/url'
import LoadingWheel from '../components/LoadingWheel'
import Alert from '../components/Alert'
import { BookmarkIcon, TrashIcon } from '@heroicons/react/20/solid'
import { completionPercent, now, secondsToTime } from '../utils/utils'
import DeleteDialog from '../components/tasks/DeleteDialog'

const Task = () => {

    const { user } = useData()

    const [task, setTask] = React.useState<ExpandedTask>()

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false)
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
                    setAlert([data.error, "ERROR", true])
                })
            } else {
                res.json().then((data) => {
                    setTask(data.data)
                    console.log(data.data)
                })
            }
        })
    }, [user])

    const pinTask = () => {

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
                                task.completed ?
                                    <div className='text-lg font-bold text-subtext'>
                                        This task will reset in {secondsToTime(timeRemaining)}
                                    </div>
                                    :
                                    <div className='text-lg font-bold text-subtext'>
                                        You have {secondsToTime(timeRemaining)} to complete this task
                                    </div>
                            }
                        </div>
                        <div className='bg-bgdark rounded-md w-full p-[10px] flex mb-[20px] flex-row justify-evenly'>
                            <div className='border-w size-[250px] rounded-md border-[2px] flex flex-col'>
                                <div className='w-full text-center text-subtext p-[10px]'>
                                    Total Completions
                                </div>
                                <div className='text-9xl fc flex-grow'>
                                    {task.completions}
                                </div>
                            </div>
                            <div className='border-w size-[250px] rounded-md border-[2px] flex flex-col'>
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