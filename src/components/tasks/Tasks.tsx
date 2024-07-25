import React from 'react'
import LoadingCard from './LoadingCard'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useData } from '../../App'
import LoadingWheel from '../LoadingWheel'
import { Link } from 'react-router-dom'
import NewDialog from './NewDialog'

const Tasks = () => {

    const { user, width } = useData()

    const [query, setQuery] = React.useState<string>("")
    const [newDialog, setNewDialog] = React.useState<boolean>(false)

    const search = () => {

    }

    return (
        <div className='page-parent'>
            {
                user ?
                    <div>
                        <div className='flex flex-row'>
                            <button
                                className='bg-main h-[50px] rounded-md w-[10%] min-w-[50px] fc mr-[10px]'
                                onClick={() => {
                                    setNewDialog(true)
                                }}
                            >
                                <PlusIcon className='size-7' /> {width > 1400 && "Add task"}
                            </button>
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
                        <NewDialog open={newDialog} setOpen={setNewDialog} />
                        <LoadingCard />
                    </div>
                    :
                    <LoadingWheel />
            }
        </div>
    )
}

export default Tasks