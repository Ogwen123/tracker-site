import React from 'react'
import { useData } from '../../App'
import { ArrowRightEndOnRectangleIcon, BoltIcon, BookmarkIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Task } from '../../global/types'
import LoadingPinnedCard from './LoadingPinnedCard'
import { Link } from 'react-router-dom'

const Home = () => {

    const { user, width } = useData()

    const [pinnedTasks, setPinnedTasks] = React.useState<Task[]>()

    return (
        <div className='fc flex-col'>
            {
                user ?
                    <div className='w-[80%] h-[80%]'>
                        <div>{user.username}'s account</div>
                        <div className='text-4xl mb-[50px]'>Account Home</div>
                        <div className='flex flex-row'>
                            <div className='w-[50%] pr-[10px]'> {/*left column*/}
                                <div className='border-[2px] border-hr rounded-md w-full p-[20px] h-[500px] flex flex-col'>
                                    <div className='text-2xl mb-[20px] flex items-center'>
                                        <BookmarkIcon className='size-7 fill-yellow-300' />
                                        <div className='font-bold ml-[5px]'>Pinned Tasks</div>
                                    </div>
                                    {
                                        pinnedTasks === undefined ?
                                            <div className='border border-hr rounded-md flex justify-between flex-col text-lg flex-grow p-[10px]'>
                                                <LoadingPinnedCard />
                                                <LoadingPinnedCard />
                                                <LoadingPinnedCard />
                                            </div>
                                            :
                                            pinnedTasks.length === 0 ?
                                                <div className='border border-solid border-hr rounded-md fc flex-col text-lg flex-grow p-[10px]'>
                                                    <BookmarkIcon className='size-20 fill-yellow-300 mb-[20px]' />
                                                    <div className='w-[60%] text-center'>Pinned tasks will appear here. You can pin tasks from the tasks page.</div>
                                                    <Link to="/tasks" reloadDocument className="underline mt-[20px] text-hyperlink">Go to tasks</Link>
                                                </div>
                                                :
                                                <div className='border border-solid border-hr rounded-md fc flex-col text-lg flex-grow p-[10px] overflow-y-auto'>
                                                    display tasks
                                                </div>
                                    }
                                </div>
                            </div>
                            <div className='w-[50%] pl-[10px]'>{/*right column*/}
                                <div className='border-[2px] border-hr rounded-md w-full p-[20px] h-[350px] flex flex-col'>
                                    <div className='text-2xl mb-[20px] flex items-center'>
                                        <BoltIcon className='size-7 fill-main' />
                                        <div className='font-bold ml-[5px]'>Quick Actions</div>
                                    </div>
                                    <div className='border border-hr rounded-md justify-evenly flex flex-col text-lg flex-grow p-[10px]'>
                                        <div className='w-full flex flex-row items-center'>
                                            Add a Task
                                            <div className='border-t-[3px] flex-grow border-dotted border-hr mx-[20px]'></div>
                                            <button
                                                className='bg-main h-[40px] rounded-md min-w-[50px] fc mr-[10px] px-[10px]'
                                            >
                                                <PlusIcon className='size-7' /> {width > 800 && "Add task"}
                                            </button>
                                        </div>
                                        <div className='w-full flex flex-row items-center'>
                                            Logout
                                            <div className='border-t-[3px] flex-grow border-dotted border-hr mx-[20px]'></div>
                                            <button
                                                className='bg-warning h-[40px] rounded-md min-w-[50px] fc mr-[10px] px-[10px]'
                                            >
                                                <ArrowRightEndOnRectangleIcon className='size-7' /> {width > 800 && "Logout"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>

                    </div>
            }

        </div>
    )
}

export default Home