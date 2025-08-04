import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/20/solid";
import React from "react";
import { ShowUser } from "../../utils/Auth";
import NewLinkDialog from "./NewLinkDialog";
import ManageTypesAndClassesDialog from "./ManageTypesAndClassesDialog";
import { _Alert, Link, LinkClass, LinkType } from "../../global/types";
import { useData } from "../../App";
import { url } from "../../utils/url";
import Alert, { alertReset } from "../Alert";
import LoadingWheel from "../LoadingWheel";

const Links = () => {
    const { user } = useData();

    const [newDialog, setNewDialog] = React.useState<boolean>(false);
    const [manageDialog, setManageDialog] = React.useState<boolean>(false);
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false]);

    const [links, setLinks] = React.useState<Link[]>();
    const [types, setTypes] = React.useState<LinkType[]>();
    const [classes, setClasses] = React.useState<LinkClass[]>();

    React.useEffect(() => {
        if (user === undefined) return;
        fetch(url("tracker") + "links/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    setAlert([
                        "An error occured while fetching your tasks. Please try reloading the page.",
                        "ERROR",
                        true,
                    ]);
                    setTimeout(() => {
                        setAlert(alertReset);
                    }, 5000);
                } else {
                    res.json().then((data) => {
                        setLinks(data.data.links);
                        setTypes(data.data.types);
                        setClasses(data.data.classes);
                    });
                }
            })
            .catch(() => {
                setAlert([
                    "An error occured while fetching your tasks. Please try reloading the page.",
                    "ERROR",
                    true,
                ]);
                setTimeout(() => {
                    setAlert(alertReset);
                }, 5000);
            });
    }, [user]);

    return (
        <div className="page-parent">
            <Alert
                content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                severity={alert[1]}
                show={alert[2]}
                title={alert[0] instanceof Array ? alert[0][0] : undefined}
            />
            <ShowUser>
                <div className="flex flex-row">
                    <button
                        className="bg-main h-[50px] rounded-md flex-grow min-w-[150px] fc mr-[10px] hover:bg-maindark mb-[10px]"
                        onClick={() => {
                            setNewDialog(true);
                        }}
                    >
                        <PlusIcon className="size-7" /> Add link
                    </button>
                    <button
                        className="bg-main h-[50px] rounded-md flex-grow min-w-[150px] fc mr-[10px] hover:bg-maindark mb-[10px]"
                        onClick={() => {
                            setManageDialog(true);
                        }}
                    >
                        <Cog6ToothIcon className="size-6 mr-[5px]" /> Manage
                        link types and classes
                    </button>
                    filtering options go here
                </div>
                <NewLinkDialog open={newDialog} setOpen={setNewDialog} />
                {classes !== undefined && types !== undefined && (
                    <ManageTypesAndClassesDialog
                        open={manageDialog}
                        setOpen={setManageDialog}
                        types={types}
                        setTypes={setTypes}
                        classes={classes}
                        setClasses={setClasses}
                    />
                )}
                <div>
                    {links !== undefined ? (
                        links.map((link, index) => {
                            return <div key={index}>{link.link}</div>;
                        })
                    ) : (
                        <LoadingWheel />
                    )}
                </div>
            </ShowUser>
        </div>
    );
};

export default Links;
