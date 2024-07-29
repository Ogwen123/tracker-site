import React from "react"

import { ArrowLeftEndOnRectangleIcon, ArrowRightEndOnRectangleIcon, ClipboardIcon, CommandLineIcon, UserCircleIcon } from "@heroicons/react/20/solid"
import { NavigationBarContext } from "../global/types"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Link } from "react-router-dom"
import { url } from "../utils/url"
import LoadingWheel from "./LoadingWheel"

interface NavigationBarProps {
    context: NavigationBarContext
}

const NavigationBar = ({ context }: NavigationBarProps) => {

    const [loggingOut, setLoggingOut] = React.useState<boolean>()

    const logout = () => {
        if (context.user === undefined) return
        setLoggingOut(true)
        fetch(url("auth") + "logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: context.user.token
            })
        }).then((res) => {
            if (res.ok) {
                localStorage.removeItem("token")
                localStorage.removeItem("userData")
                location.href = "/login"
                setLoggingOut(false)
            }
        }).catch(() => {
            setLoggingOut(false)
        })
    }

    return (
        <div className='flex px-[20px] items-center h-[90px] bg-bgdark'>
            <a href="/" className="h-full">
                <div className='gradienttext text-5xl h-full flex items-center'>
                    Tracker
                </div>
            </a>
            <div className="flex-grow"></div>
            {
                context.user &&
                <div className="flex h-full items-center">
                    <Link reloadDocument to="/tasks" className="flex items-center">
                        View your tasks
                    </Link>
                    <div className="w-[1px] bg-hr h-[50%] mx-[10px]"></div>
                </div>
            }

            <Menu>
                <MenuButton className="size-[40px]">
                    <UserCircleIcon />
                </MenuButton>
                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-[300px] mt-[30px] rounded-md border border-white/5 bg-bg/75 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {
                        context.user === undefined ?
                            <div>
                                <MenuItem as="div">
                                    <div className="fc m-[10px]">
                                        Not logged in
                                    </div>
                                </MenuItem>
                                <div className="m-[5px] h-px bg-hr" />
                                <MenuItem>
                                    <Link reloadDocument to="/login" className="group flex w-full items-center gap-2 rounded-md py-1.5 px-3 data-[focus]:bg-white/10">
                                        <ArrowLeftEndOnRectangleIcon className="size-4" />
                                        Login
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link reloadDocument to="/register" className="group flex w-full items-center gap-2 rounded-md py-1.5 px-3 data-[focus]:bg-white/10">
                                        <ClipboardIcon className="size-4" />
                                        Register
                                    </Link>
                                </MenuItem>
                            </div>
                            :
                            <div>
                                <MenuItem as="div">
                                    <div className="fc m-[10px] flex-wrap">
                                        Logged in as
                                        <div className="font-bold ml-[5px]">{context.user.username} </div>
                                    </div>
                                </MenuItem>
                                <div className="m-[5px] h-px bg-hr" />
                                <MenuItem>
                                    <Link to="/dashboard" reloadDocument className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        <CommandLineIcon className="size-4" />
                                        Dashboard
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <button onClick={() => logout()} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        {
                                            loggingOut ?
                                                <LoadingWheel size={16} />
                                                :
                                                <ArrowRightEndOnRectangleIcon className="size-4 fill-white/30" />
                                        }
                                        Logout
                                    </button>
                                </MenuItem>
                            </div>
                    }
                </MenuItems>
            </Menu>
        </div>
    )
}

export default NavigationBar