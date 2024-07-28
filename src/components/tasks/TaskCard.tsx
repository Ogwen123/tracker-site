import { Task } from '../../global/types'
import RepeatPeriodBadge from './RepeatPeriodBadge'
import CompletionDateBadge from './CompletionDateBadge'

interface TaskCardProp {
    task: Task
}

const TaskCard = ({ task }: TaskCardProp) => {
    return (
        <div className='size-[300px] bg-bgdark rounded-md border-w p-[10px] flex flex-col'>
            <div className='flex flex-wrap'>
                <RepeatPeriodBadge type={task.repeat_period} />
                {
                    !task.date_time &&
                    <CompletionDateBadge />
                }
            </div>
            <div className='mt-[10px] text-2xl h-[26px]'>
                {task.name}
            </div>
            <div className='mb-[10px] text-xs text-hr'>
                {task.id}
            </div>
        </div>
    )
}

export default TaskCard