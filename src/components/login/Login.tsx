import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='page-full flex flex-row'>
            <div className='gradient w-7/12 fc flex-col'>
                <div className='text-7xl font-semibold'>
                    Tracker
                </div>
                <div className='text-subtext flex flex-col items-center my-[40px]'>
                    <div>
                        Login to an existing account or
                    </div>
                    <Link to="/register">
                        <button className='bg-bgdark rounded-full p-[10px] m-[5px] w-[235px]'>
                            Sign Up
                        </button>
                    </Link>
                    <div>for a free account</div>
                </div>
            </div>
            <div className='w-5/12'>
                login form here
            </div>
        </div>
    )
}

export default Login