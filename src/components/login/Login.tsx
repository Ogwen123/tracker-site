import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../App'
import { url } from '../../utils/url'
import { _Alert } from '../../global/types'
import LoadingWheel from '../LoadingWheel'

const Login = () => {

    const { width } = useData()

    const [identifier, setIdentifier] = React.useState<string>()
    const [password, setPassword] = React.useState<string>()

    const [submitting, setSubmitting] = React.useState<boolean>()
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])

    const login = () => {
        setSubmitting(true)
        fetch(url("auth") + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier,
                password,
                service: "TRACKER"
            })
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error instanceof Array ? data.error[0] : data.error, "ERROR", true])
                    setSubmitting(false)
                })
            } else {
                res.json().then((data) => {
                    setAlert(["Successfully logged in", "SUCCESS", true])
                    setSubmitting(false)
                    localStorage.setItem("token", data.data.token)
                    setTimeout(() => {
                        location.href = "/"
                    }, 500)
                })
            }
        }).catch(() => {
            setAlert(["An unknown error occured whilst logging in.", "ERROR", true])
            setSubmitting(false)
        })
    }

    return (
        <div className={'page-full flex flex-row gradient ' + (width <= 650 && "justify-center")}>
            {
                width > 650 &&
                <div className='w-[60%] fc flex-col'>
                    <a href="/" className='text-7xl font-semibold'>
                        Tracker
                    </a>
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
            }
            <div className='w-[calc(40%-40px)] h-[calc(100%-40px)] min-w-[320px] m-[20px] bg-bg rounded-md shadow-3xl flex flex-col items-center justify-center pb-[80px]'>
                {
                    width <= 650 ?
                        <div className='gradienttext my-[60px] text-center text-4xl'>
                            Tracker
                        </div>
                        :
                        <div className='my-[60px] text-center text-4xl'>
                            Login
                        </div>
                }
                <input
                    type='text'
                    className='rounded-md bg-bgdark m-[5px] w-[60%] min-w-[300px] p-[10px]'
                    placeholder='Username or Email'
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />
                <input
                    type='password'
                    className='rounded-md bg-bgdark m-[5px] w-[60%] min-w-[300px] p-[10px]'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={() => login()}
                    className='bg-main rounded-md p-[10px] m-[15px] w-[60%] min-w-[300px]'
                >
                    {
                        submitting ?
                            <LoadingWheel size={24} />
                            :
                            "Login"
                    }
                </button>
            </div>
        </div>
    )
}

export default Login