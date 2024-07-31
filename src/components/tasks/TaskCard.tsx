import React from 'react'
import { Task } from '../../global/types'
import RepeatPeriodBadge from './RepeatPeriodBadge'
import CompletionDateBadge from './CompletionDateBadge'
import { Link } from 'react-router-dom'
import { BookmarkIcon, TrashIcon } from '@heroicons/react/20/solid'
import DeleteDialog from './DeleteDialog'

interface TaskCardProp {
    task: Task,
    setTasks: React.Dispatch<React.SetStateAction<Task[] | undefined>>
}

const TaskCard = ({ task, setTasks }: TaskCardProp) => {

    const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false)

    const markComplete = () => {

    }

    const pinTask = () => {

    }

    return (
        <div className='size-[300px] bg-bgdark rounded-md border-w p-[10px] flex flex-col'>
            <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} id={task.id} setTasks={setTasks} />
            <div className='flex-grow'>
                <div className='flex flex-wrap'>
                    <RepeatPeriodBadge type={task.repeat_period} />
                    {
                        task.date_time &&
                        <CompletionDateBadge />
                    }
                </div>
                <div className='mt-[10px] text-2xl h-[26px] flex flex-row'>
                    <div className='flex-grow'>
                        {task.name}
                    </div>
                    <div className='flex flex-row items-center'>
                        <BookmarkIcon className={'size-4 hover:fill-yellow-300/50 ' + (task.is_pinned && "fill-yellow-300")} onClick={pinTask} />
                        <TrashIcon className={'size-4 hover:fill-error/50'} onClick={() => setDeleteDialog(true)} />
                    </div>
                </div>
                <div className='mb-[10px] text-xs text-hr'>
                    {task.id}
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
                    onClick={() => markComplete()}
                    className='bg-main rounded-md p-[5px] ml-[10px] w-[calc(50%-10px)] min-w-[100px] fc'
                >
                    Complete
                </button>
            </div>
        </div>
    )
}

export default TaskCard