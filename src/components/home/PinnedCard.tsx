//import React from 'react'

import { Link } from "react-router-dom"
import { Task } from "../../global/types"
import CompletionDateBadge from "../tasks/CompletionDateBadge"
import RepeatPeriodBadge from "../tasks/RepeatPeriodBadge"

interface PinnedCardProps {
    task: Task
}

const PinnedCard = ({ task }: PinnedCardProps) => {
    return (
        <div
            className='bg-bgdark rounded-md p-[10px] flex flex-row w-full border-w flex-grow max-h-[123px] min-h-[95px]'
        >
            <div className="w-[80%]">
                <div className='flex flex-wrap'>
                    <RepeatPeriodBadge type={task.repeat_period} />
                    {
                        task.date_time &&
                        <CompletionDateBadge />
                    }
                </div>
                <div>
                    {task.name}
                </div>
            </div>
            <div className='flex flex-col w-[20%]'>
                <Link
                    to={"/task/" + task.id}
                    className='rounded-md bg-main h-[50%] flex-grow mt-[5px] fc'
                >
                    View Task
                </Link>
                <button className='rounded-md bg-main h-[50%] flex-grow mt-[5px] fc'>
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

export default PinnedCard