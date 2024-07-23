import React from 'react'
import LoadingCard from './LoadingCard'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useData } from '../../App'
import LoadingWheel from '../LoadingWheel'
import { Link } from 'react-router-dom'

const Tasks = () => {

    const { user, width } = useData()

    const [query, setQuery] = React.useState<string>("")

    const search = () => {

    }

    return (
        <div className='page-parent'>
            {
                user ?
                    <div>
                        <div className='flex flex-row'>
                            <Link
                                to="/tasks/new"
                                className='bg-main h-[50px] rounded-md w-[10%] min-w-[50px] fc mr-[10px]'
                            >
                                <PlusIcon className='size-7' /> {width > 1400 && "Add task"}
                            </Link>
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
                                Clear
                            </button>
                        </div>
                        <LoadingCard />
                    </div>
                    :
                    <LoadingWheel />
            }
        </div>
    )
}

export default Tasks