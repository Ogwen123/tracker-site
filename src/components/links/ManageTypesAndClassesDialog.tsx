import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import Alert, { alertReset } from '../Alert'
import { _Alert, _Task, LinkClass, LinkType } from '../../global/types'
import LoadingWheel from '../LoadingWheel'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useData } from '../../App'

interface NewDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    types: LinkType[],
    setTypes: React.Dispatch<React.SetStateAction<LinkType[]>>
    classes: LinkClass[],
    setClasses: React.Dispatch<React.SetStateAction<LinkClass[]>>
}

const ManageTypesAndClassesDialog = ({ open, setOpen, types, setTypes, classes, setClasses }: NewDialogProps) => {

    const { user } = useData()

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const [tab, setTab] = React.useState<"TYPE" | "CLASS">("TYPE")

    const close = () => {
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
                        className="w-full max-w-[1000px] rounded-xl bg-bg/95 white-border p-6 duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <Alert
                            content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                            severity={alert[1]}
                            show={alert[2]}
                            title={alert[0] instanceof Array ? alert[0][0] : undefined}
                        />
                        <DialogTitle as="h3" className="flex items-center">
                            <div className='font-bold text-text text-2xl'>Manage the types and classes for your links.</div>
                            <XMarkIcon className='ml-auto size-9 fill-text hover:fill-text/75 hover:cursor-pointer' onClick={() => close()} />
                        </DialogTitle>
                        <div className='my-[20px] flex flex-row h-[400px]'>
                            <div className='w-1/5'>
                                <button
                                    className={'button hover:bg-secondarydark ' + (tab !== "TYPE" ? "bg-bgdark" : "bg-secondary")}
                                    onClick={() => {
                                        setTab("TYPE")
                                    }}
                                >Types</button>
                                <button
                                    className={'button hover:bg-secondarydark ' + (tab !== "CLASS" ? "bg-bgdark" : "bg-secondary")}
                                    onClick={() => {
                                        setTab("CLASS")
                                    }}
                                >Classes</button>
                            </div>
                            <div className="w-[1px] bg-hr h-full m-[5px]"></div>
                            <div className='w-4/5'>
                                {
                                    tab === "TYPE" ?
                                        <div>
                                            {
                                                types.map((type_, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {type_.name}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        : tab === "CLASS" ?
                                            <div>
                                                {
                                                    classes.map((class_, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {class_.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            :
                                            <div>
                                                An error occured with the tab system. Please reload the page.
                                            </div>
                                }
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <button
                                onClick={() => { }}
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

export default ManageTypesAndClassesDialog