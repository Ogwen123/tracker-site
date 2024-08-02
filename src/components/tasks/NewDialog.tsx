import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Select } from '@headlessui/react'
import React from 'react'
import Alert, { alertReset } from '../Alert'
import { _Alert, Day, RepeatOptions, _Task, TimeDetails, Week } from '../../global/types'
import LoadingWheel from '../LoadingWheel'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { url } from '../../utils/url'
import { useData } from '../../App'

interface NewDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateTasks?: (data: _Task[]) => void
    page?: number
}

const TIME_DETAILS_DEFAULT: TimeDetails = { day: "MONDAY", hour: 12, minute: 0, week: "FIRST" }

const NewDialog = ({ open, setOpen, updateTasks, page }: NewDialogProps) => {

    const { user } = useData()

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const [name, setName] = React.useState<string>("")
    const [repeat, setRepeat] = React.useState<RepeatOptions>("WEEK")
    const [dt, setDt] = React.useState<boolean>(false)
    const [timeDetails, setTimeDetails] = React.useState<TimeDetails>(TIME_DETAILS_DEFAULT)

    const create = () => {
        setSubmitting(true)
        const dtData = (dt === true ? timeDetails : {})

        fetch(url("tracker") + "task/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                name,
                repeatPeriod: repeat,
                dt,
                ...dtData,
                page: (page === undefined ? 0 : page)
            })
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error instanceof Array ? data.error[0] : data.error, "ERROR", true])
                    setSubmitting(false)
                })
            } else {
                res.json().then((data) => {
                    setAlert(["Successfully created task.", "SUCCESS", true])
                    setSubmitting(false)

                    if (updateTasks !== undefined) {
                        updateTasks(data.data)
                    }

                    setTimeout(() => {
                        close()
                    }, 250)
                })
            }
        }).catch((e) => {
            console.log(e)
            setAlert(["An unknown error occured whilst creating the task.", "ERROR", true])
            setSubmitting(false)
        })
    }

    const close = () => {
        setName("")
        setRepeat("WEEK")
        setDt(false)
        setTimeDetails(TIME_DETAILS_DEFAULT)
        setAlert(alertReset)
        setOpen(false)
    }

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" transition />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-[1000px] rounded-xl bg-bg/95 border-w p-6 duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <Alert
                            content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                            severity={alert[1]}
                            show={alert[2]}
                            title={alert[0] instanceof Array ? alert[0][0] : undefined}
                        />
                        <DialogTitle as="h3" className="flex items-center">
                            <div className='font-bold text-white text-2xl'>New Task</div>
                            <XMarkIcon className='ml-auto size-9 fill-white hover:fill-white/75 hover:cursor-pointer' onClick={() => close()} />
                        </DialogTitle>
                        <div className='my-[40px]'>
                            <input
                                type='text'
                                className='form-input w-full min-w-[300px]'
                                placeholder='Task Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className='flex justify-between items-center my-[10px]'>
                                <div>Repeat every</div>
                                <Select name="repeat-every" className="bg-bgdark rounded-md p-[10px] min-w-[200px]" value={repeat} onChange={(e) => setRepeat(e.target.value as RepeatOptions)}>
                                    <option value="WEEK">Week</option>
                                    <option value="FORTNIGHT">Fortnight</option>
                                    <option value="MONTH">Month</option>
                                </Select>
                            </div>
                            <div className='bg-bgdark p-[10px] rounded-md'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        Date & Time
                                    </div>
                                    <input
                                        type='checkbox'
                                        checked={dt}
                                        onChange={() => setDt(!dt)}
                                        className='accent-main size-5 rounded-md border-w outline-none text-sm'
                                    />
                                </div>
                                {
                                    dt &&
                                    <div>
                                        <div className='h-[1px] w-full bg-hrdark my-[10px]'></div>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                Day
                                            </div>
                                            <select
                                                name="repeat-every"
                                                className="bg-bg rounded-md p-[10px] min-w-[200px]"
                                                value={timeDetails.day}
                                                onChange={(e) => setTimeDetails((prev) => ({ ...prev, day: e.target.value as Day }))}
                                            >
                                                <option value="MONDAY">Monday</option>
                                                <option value="TUESDAY">Tuesday</option>
                                                <option value="WEDNESDAY">Wednesday</option>
                                                <option value="THURSDAY">Thursday</option>
                                                <option value="FRIDAY">Friday</option>
                                                <option value="SATURDAY">Saturday</option>
                                                <option value="SUNDAY">Sunday</option>
                                            </select>
                                        </div>
                                        <div className='h-[1px] w-full bg-hrdark my-[10px]'></div>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                Time
                                            </div>
                                            <div className='flex items-center'>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={24}
                                                    className='rounded-md p-[5px] bg-bg border-solid border-2 border-bgdark focus:border-solid focus:border-2 focus:border-main focus:outline-none'
                                                    value={timeDetails.hour}
                                                    onChange={(e) => setTimeDetails((prev) => ({ ...prev, hour: e.target.valueAsNumber }))}
                                                />
                                                <div className='mx-[2px]'>
                                                    :
                                                </div>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={60}
                                                    className='rounded-md p-[5px] bg-bg border-solid border-2 border-bgdark focus:border-solid focus:border-2 focus:border-main focus:outline-none'
                                                    value={timeDetails.minute}
                                                    onChange={(e) => setTimeDetails((prev) => ({ ...prev, minute: e.target.valueAsNumber }))}
                                                />
                                            </div>
                                        </div>
                                        {
                                            repeat !== "WEEK" &&
                                            <div>
                                                <div className='h-[1px] w-full bg-hrdark my-[10px]'></div>
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        On the
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <Select
                                                            name="repeat-every"
                                                            className="bg-bg rounded-md p-[10px] min-w-[50px]"
                                                            value={timeDetails.week}
                                                            onChange={(e) => setTimeDetails((prev) => ({ ...prev, week: e.target.value as Week }))}>
                                                            <option value="FIRST">first</option>
                                                            <option value="SECOND">second</option>
                                                            {
                                                                repeat === "MONTH" &&
                                                                <option value="THIRD">third</option>
                                                            }
                                                            {
                                                                repeat === "MONTH" &&
                                                                <option value="FOURTH">fourth</option>
                                                            }
                                                        </Select>
                                                        <div className='ml-[5px]'>
                                                            week of the {repeat.toLowerCase()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <button
                                onClick={() => create()}
                                className='bg-main rounded-md p-[10px] mr-[10px] flex-grow min-w-[100px]'
                            >
                                {
                                    submitting ?
                                        <LoadingWheel size={24} />
                                        :
                                        "Create"
                                }
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default NewDialog