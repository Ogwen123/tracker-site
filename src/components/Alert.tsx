//import React from 'react'
import { _Alert } from '../global/types'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'

interface AlertProps {
    content: string
    severity: "SUCCESS" | "ERROR"
    show: boolean,
    title?: string,
    width?: string
}

const Alert = ({ content, severity, show, title, width = "100%" }: AlertProps) => {
    let colour1 = severity === "ERROR" ? "bg-error" : "bg-success"
    let colour2 = severity === "ERROR" ? "bg-error/60" : "bg-success/60"

    return (
        show ?

            <div
                className="flex items-center bg-bgdark rounded-md h-[87px] mb-[5px]"
                style={{
                    width: width
                }}
            >
                <div className={colour1 + " fc h-full w-[50px] p-[5px] rounded-tl-md rounded-bl-md"}>
                    {
                        severity === "ERROR" ?
                            <ExclamationCircleIcon className="size-7 m-[5px]" />
                            :
                            <CheckCircleIcon className="size-7 m-[5px]" />
                    }
                </div>
                <div className={colour2 + '  flex flex-col w-full items-center py-[5px] px-[10px] rounded-tr-md rounded-br-md'}>
                    <div className={"w-full h-[30px] text-xl"}>{title ? title : severity[0] + severity.slice(1).toLowerCase()}</div>
                    <div className={"w-full h-[47px] text-md overflow-hidden flex items-center"}>{content}</div>
                </div>
            </div>

            :
            <div className='hidden'></div>
    )
}

export default Alert

export const alertReset: _Alert = ["Alert", "ERROR", false]