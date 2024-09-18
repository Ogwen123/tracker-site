import React from 'react'
import { ExtendedTask } from '../../global/types'

interface TaskEditFormProps {
    updateTask: (task: ExtendedTask) => void,
    task: ExtendedTask,
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskEditForm = ({ updateTask, task, setShowEditForm }: TaskEditFormProps) => {

    const [taskBuffer, setTaskBuffer] = React.useState<ExtendedTask>(task)

    return (
        <div>
            <div>
                {task.name}
            </div>
            <div className='flex flex-row'>
                <button
                    onClick={() => updateTask(taskBuffer)}
                    className='bg-main rounded-md p-[5px] ml-[10px] w-[calc(50%-10px)] min-w-[100px] fc'
                >
                    Save Changes
                </button>
                <button
                    onClick={() => setShowEditForm(false)}
                    className='bg-warning rounded-md p-[5px] ml-[10px] w-[calc(50%-10px)] min-w-[100px] fc'
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default TaskEditForm