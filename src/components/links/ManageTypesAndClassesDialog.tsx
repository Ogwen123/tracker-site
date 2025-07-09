import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { ChangeEvent } from 'react'
import Alert, { alertReset } from '../Alert'
import { _Alert, _Task, LinkClass, LinkType } from '../../global/types'
import LoadingWheel from '../LoadingWheel'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useData } from '../../App'
import ColourPicker from './ColourPicker'

interface NewDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    types: LinkType[],
    setTypes: React.Dispatch<React.SetStateAction<LinkType[] | undefined>>
    classes: LinkClass[],
    setClasses: React.Dispatch<React.SetStateAction<LinkClass[] | undefined>>
}

const ManageTypesAndClassesDialog = ({ open, setOpen, types, setTypes, classes, setClasses }: NewDialogProps) => {

    const { user } = useData()

    const newClassCount = React.useRef(0) // doesn't need to rerender when updated
    const newTypeCount = React.useRef(0)

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const [tab, setTab] = React.useState<"TYPE" | "CLASS">("TYPE")

    const [editedTypes, setEditedTypes] = React.useState<LinkType[]>()
    const [editedClasses, setEditedClasses] = React.useState<LinkClass[]>()

    React.useEffect(() => {
        if (types === undefined || editedTypes !== undefined) return

        setEditedTypes(types)
    }, [types])

    React.useEffect(() => {
        if (classes === undefined || editedClasses !== undefined) return

        setEditedClasses(classes)
    }, [classes])

    const updateColour = (id: string, colour: number, type: "CLASS" | "TYPE") => {
        if (editedClasses === undefined || editedTypes === undefined) return
        if (type === "CLASS") {
            setEditedClasses((prev) => prev?.map((val) => {
                if (val.id === id) {
                    return {
                        id: val.id,
                        name: val.name,
                        colour: colour
                    }
                } else {
                    return val
                }
            }))
        } else if (type === "TYPE") {
            setEditedTypes((prev) => prev?.map((val) => {
                if (val.id === id) {
                    return {
                        id: val.id,
                        name: val.name,
                        colour: colour
                    }
                } else {
                    return val
                }
            }))
        }
    }

    React.useEffect(() => {
        console.log(editedTypes)
    }, [editedTypes])

    const save = () => {
        if (editedClasses === undefined || editedTypes === undefined) return
        setSubmitting(true)

        // basic client side validation
        editedClasses.forEach((val) => {
            if (val.name.length === 0) {
                setAlert(["Minimum length for a class name is 1 character.", "ERROR", true])
                setSubmitting(false)
            }
        })
        editedTypes.forEach((val) => {
            if (val.name.length === 0) {
                setAlert(["Minimum length for a type name is 1 character.", "ERROR", true])
                setSubmitting(false)
            }
        })
    }

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
                                                editedTypes !== undefined ?
                                                    editedTypes.map((type_, index) => {
                                                        return (
                                                            <div key={index} className={
                                                                "p-[5px] flex flex-row h-[34px] " +
                                                                (index % 2 === 0 ? "bg-bgdark/50" : "bg-bgdark") + " " +
                                                                (index === 0 ? "rounded-t-lg" : "") + " " +
                                                                (index === editedTypes.length - 1 ? "rounded-b-lg" : "")
                                                            }>
                                                                <input
                                                                    className='w-5/6'
                                                                    value={type_.name}
                                                                    onChange={(e) => {
                                                                        setEditedTypes((prev) => prev?.map((val) => {
                                                                            if (val.id === type_.id) {
                                                                                return {
                                                                                    id: val.id,
                                                                                    name: e.target.value,
                                                                                    colour: val.colour
                                                                                }
                                                                            } else {
                                                                                return val
                                                                            }
                                                                        }))
                                                                    }}
                                                                />

                                                                <div className="w-[1px] bg-hr h-full "></div>
                                                                <div className='w-1/6 fc'>
                                                                    <ColourPicker
                                                                        id={type_.id}
                                                                        colour={type_.colour}
                                                                        type="TYPE"
                                                                        setColour={updateColour}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <LoadingWheel />
                                            }
                                            <div className='rounded-lg bg-bgdark fc p-[5px] mt-[10px]' onClick={() => {
                                                setEditedTypes((prev) => ([...prev!, { id: "TEMPID" + newTypeCount.current, name: "", colour: 0 }]))
                                                newTypeCount.current = newTypeCount.current + 1
                                            }}>
                                                <PlusIcon className='size-5' /> Add
                                            </div>
                                        </div>
                                        : tab === "CLASS" ?
                                            <div>
                                                {
                                                    editedClasses !== undefined ?
                                                        editedClasses.map((class_, index) => {
                                                            return (
                                                                <div key={index} className={
                                                                    "p-[5px] flex flex-row " +
                                                                    (index % 2 === 0 ? "bg-bgdark/50" : "bg-bgdark") + " " +
                                                                    (index === 0 ? "rounded-t-lg" : "") + " " +
                                                                    (index === editedClasses.length - 1 ? "rounded-b-lg" : "")
                                                                }>
                                                                    <input
                                                                        className='w-5/6'
                                                                        value={class_.name}
                                                                        onChange={(e) => {
                                                                            setEditedClasses((prev) => prev?.map((val) => {
                                                                                if (val.id === class_.id) {
                                                                                    return {
                                                                                        id: val.id,
                                                                                        name: e.target.value,
                                                                                        colour: val.colour
                                                                                    }
                                                                                } else {
                                                                                    return val
                                                                                }
                                                                            }))
                                                                        }}
                                                                    />
                                                                    <div className='w-1/6 fc'>
                                                                        <ColourPicker
                                                                            id={class_.id}
                                                                            colour={class_.colour}
                                                                            type="CLASS"
                                                                            setColour={updateColour}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        <LoadingWheel size={20} />
                                                }
                                                <div className='rounded-lg bg-bgdark fc p-[5px] mt-[10px]' onClick={() => {
                                                    setEditedClasses((prev) => ([...prev!, { id: "TEMPID" + newClassCount.current, name: "", colour: 0 }]))
                                                    newClassCount.current = newClassCount.current + 1
                                                }}>
                                                    <PlusIcon className='size-5' /> Add
                                                </div>
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
                                onClick={() => { save() }}
                                className='bg-main rounded-md p-[10px] mr-[10px] flex-grow min-w-[100px]'
                            >
                                {
                                    submitting ?
                                        <LoadingWheel size={24} />
                                        :
                                        "Save Changes"
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