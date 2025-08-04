import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import React from "react";
import Alert, { alertReset } from "../Alert";
import { _Alert, _Task } from "../../global/types";
import LoadingWheel from "../LoadingWheel";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useData } from "../../App";

interface NewDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewLinkDialog = ({ open, setOpen }: NewDialogProps) => {
    const { user } = useData();

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false]);
    const [submitting, setSubmitting] = React.useState<boolean>(false);

    const close = () => {
        setAlert(alertReset);
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {}}
        >
            <DialogBackdrop
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                transition
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-[1000px] rounded-xl bg-bg/95 white-border p-6 duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <Alert
                            content={
                                alert[0] instanceof Array
                                    ? alert[0][1]
                                    : alert[0]
                            }
                            severity={alert[1]}
                            show={alert[2]}
                            title={
                                alert[0] instanceof Array
                                    ? alert[0][0]
                                    : undefined
                            }
                        />
                        <DialogTitle as="h3" className="flex items-center">
                            <div className="font-bold text-text text-2xl">
                                New Link
                            </div>
                            <XMarkIcon
                                className="ml-auto size-9 fill-white hover:fill-white/75 hover:cursor-pointer"
                                onClick={() => close()}
                            />
                        </DialogTitle>
                        <div className="my-[40px]"></div>
                        <div className="flex flex-row">
                            <button
                                onClick={() => {}}
                                className="bg-main rounded-md p-[10px] mr-[10px] flex-grow min-w-[100px]"
                            >
                                {submitting ? (
                                    <LoadingWheel size={24} />
                                ) : (
                                    "Create"
                                )}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default NewLinkDialog;
