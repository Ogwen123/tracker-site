import React from 'react'
import { useData } from '../../App'
import { BookmarkIcon } from '@heroicons/react/20/solid'
import { Task } from '../../global/types'
import LoadingCard from '../tasks/LoadingCard'
import LoadingPinnedCard from './LoadingPinnedCard'

const Home = () => {

    const { user } = useData()

    const [pinnedTasks, setPinnedTasks] = React.useState<Task[]>()

    return (
        <div className='fc flex-col'>
            <div>
                Home {user !== undefined ? "logged in" : "not logged in"}
            </div>
            {
                user ?
                    <div className='w-[80%] h-[80%]'>
                        <div>{user.username}'s account</div>
                        <div className='text-4xl mb-[50px]'>Account Home</div>
                        <div className='flex flex-row'>
                            <div className='w-[50%] pr-[10px]'> {/*left column*/}
                                <div className='border-[2px] border-hr rounded-md w-full p-[20px] h-[500px] flex flex-col'>
                                    <div className='text-2xl mb-[20px] flex items-center'><BookmarkIcon className='size-7 fill-yellow-300' /><div className='font-bold ml-[5px]'>Pinned Tasks</div></div>
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
                                                    <BookmarkIcon className='size-20 fill-yellow-300' />
                                                    When you pin a task it will appear here
                                                </div>
                                                :
                                                <div className='border border-solid border-hr rounded-md fc flex-col text-lg flex-grow p-[10px] overflow-y-auto'>
                                                    display tasks
                                                </div>
                                    }
                                </div>
                            </div>
                            <div className='w-[50%] pl-[10px]'>{/*right column*/}

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