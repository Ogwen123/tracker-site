import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Alert from '../Alert'
import { _Alert, _Task } from '../../global/types'
import { url } from '../../utils/url'
import { useData } from '../../App'

interface DeleteDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
    setTasks: React.Dispatch<React.SetStateAction<_Task[] | undefined>>,
    page?: number,
    useSuccessHandler?: boolean,
    successHandler?: (data: _Task[]) => void
}

const DeleteDialog = ({ open, setOpen, id, setTasks, page, useSuccessHandler, successHandler }: DeleteDialogProps) => {

    const { user } = useData()

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])

    const close = () => {
        setOpen(false)
    }

    const deleteTask = () => {
        if (!user) return
        fetch(url("tracker") + "task/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                id,
                page: (page !== undefined ? page : 0)
            })
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error, "ERROR", true])
                })
            } else {
                res.json().then((data) => {
                    close()
                    if (useSuccessHandler === true) {
                        if (successHandler === undefined) return
                        successHandler(data.data)
                    } else {
                        setTasks((prev) => (prev?.filter((pinned, _) => {
                            if (id === pinned.id) {
                                return false
                            } else {
                                return true
                            }
                        })))
                    }
                })
            }
        })
    }

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" transition />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-[600px] rounded-xl bg-error/50 white-border p-6 duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <Alert
                            content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                            severity={alert[1]}
                            show={alert[2]}
                            title={alert[0] instanceof Array ? alert[0][0] : undefined}
                        />
                        <DialogTitle as="h3" className="flex items-center">
                            <div className='font-bold text-text text-2xl'>Delete Task</div>
                            <XMarkIcon className='ml-auto size-9 fill-white hover:fill-white/75 hover:cursor-pointer' onClick={() => close()} />
                        </DialogTitle>
                        <div className='my-[40px]'>
                            Are you sure you want to delete this task? You will be deleting the task as well as all of its associated completion data.
                        </div>
                        <div className='flex flex-row'>
                            <button
                                className='bg-main rounded-md p-[10px] mr-[15px] w-[80%] min-w-[200px]'
                                onClick={close}
                            >
                                No, I am not!
                            </button>
                            <button
                                className='bg-error rounded-md p-[10px] ml-[15px] w-[80%] min-w-[200px]'
                                onClick={deleteTask}
                            >
                                Yes, I am!
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default DeleteDialog