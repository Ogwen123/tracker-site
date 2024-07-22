import React from 'react'
import LoadingCard from './LoadingCard'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useData } from '../../App'

const Tasks = () => {

    const { user, width } = useData()

    return (
        <div className='page-parent'>
            <div className='flex flex-row'>
                <button
                    className='bg-main h-[50px] rounded-md w-[10%] min-w-[50px] fc mr-[10px]'
                >
                    <PlusIcon className='size-7' /> {width > 1400 && "Add task"}
                </button>
                <input
                    className='form-input flex-grow min-w-[300px] h-[50px] my-0 mr-[10px]'
                    placeholder='Search tasks'
                />
                <button
                    className='bg-main h-[50px] rounded-md w-[10%] min-w-[50px] fc mr-[10px]'
                >
                    <MagnifyingGlassIcon className='size-7' />
                </button>
                <button
                    className='bg-warning h-[50px] rounded-md w-[10%] min-w-[50px] fc'
                >
                    Clear
                </button>
            </div>
            <LoadingCard />
        </div>
    )
}

export default Tasks