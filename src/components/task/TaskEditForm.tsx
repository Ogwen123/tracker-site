import React from "react";
import { _Alert, Day, ExtendedTask, Week } from "../../global/types";
import { Select } from "@headlessui/react";
import Alert from "../Alert";
import LoadingWheel from "../LoadingWheel";
import { useData } from "../../App";
import { url } from "../../utils/url";

interface TaskEditFormProps {
    updateTask: (task: ExtendedTask) => void;
    task: ExtendedTask;
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskEditForm = ({
    updateTask,
    task,
    setShowEditForm,
}: TaskEditFormProps) => {
    const { user } = useData();

    const [taskBuffer, setTaskBuffer] = React.useState<ExtendedTask>(task);

    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false]);
    const [submitting, setSubmitting] = React.useState<boolean>(false);

    const submit = () => {
        setSubmitting(true);
        if (task.date_time) {
            // validate the hours and minutes
            if (taskBuffer.hour! > 24 || taskBuffer.hour! < 0) {
                setAlert([
                    "Enter a suitable value for the hour.",
                    "ERROR",
                    true,
                ]);
                setSubmitting(false);
                return;
            }
            if (taskBuffer.minute! > 60 || taskBuffer.minute! < 0) {
                setAlert([
                    "Enter a suitable value for the minute.",
                    "ERROR",
                    true,
                ]);
                setSubmitting(false);
                return;
            }
        }

        let body: any = {
            id: taskBuffer.id,
            name: taskBuffer.name,
            repeat_period: taskBuffer.repeat_period,
            date_time: taskBuffer.date_time,
        };

        if (taskBuffer.date_time === true) {
            // if the date time is turned on then add the nessessary data to the body
            console.log("updating body");
            body = {
                ...body,
                day: taskBuffer.day,
                hour: taskBuffer.hour,
                minute: taskBuffer.minute,
                week_of_repeat_period: taskBuffer.week_of_repeat_period,
            };
        }

        fetch(url("tracker") + "task/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                if (!res.ok) {
                    res.json().then((data) => {
                        setAlert([
                            data.error instanceof Array
                                ? data.error[0]
                                : data.error,
                            "ERROR",
                            true,
                        ]);
                        setSubmitting(false);
                    });
                } else {
                    res.json().then((data) => {
                        setAlert([
                            data.error instanceof Array
                                ? data.error[0]
                                : data.error,
                            "ERROR",
                            true,
                        ]);
                        setSubmitting(false);
                        updateTask(data.data);
                        setShowEditForm(false);
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                setAlert([
                    "An unknown error occured whilst creating the task.",
                    "ERROR",
                    true,
                ]);
                setSubmitting(false);
            });

        console.log(taskBuffer);
    };

    return (
        <div>
            <Alert
                content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                severity={alert[1]}
                show={alert[2]}
                title={alert[0] instanceof Array ? alert[0][0] : undefined}
            />
            <div className="flex flex-row flex-wrap">
                <div className="w-1/3">
                    <div className="text-subtext">Name</div>
                    <div>
                        <input
                            value={taskBuffer.name}
                            onChange={(e) =>
                                setTaskBuffer((prevTask) => ({
                                    ...prevTask,
                                    name: e.target.value,
                                }))
                            }
                            className="form-input bg-bg"
                            placeholder="Name"
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="text-subtext">Repeat Period</div>
                    <div className="h-[50px] flex items-center">
                        {task.repeat_period}
                    </div>
                </div>
                <div className="bg-hr w-full h-[1px] my-[10px]"></div>
                <div className="w-1/3">
                    <div className="text-subtext">Date and Time</div>
                    <input
                        type="checkbox"
                        checked={taskBuffer.date_time}
                        disabled={task.repeat_period === "NEVER"}
                        onChange={(e) => {
                            setTaskBuffer((prevTask) => ({
                                ...prevTask,
                                date_time: e.target.checked,
                            }));

                            if (taskBuffer.day === null) {
                                console.log("setting day");
                                setTaskBuffer((prevTask) => ({
                                    ...prevTask,
                                    day: "MONDAY",
                                }));
                            }
                            if (taskBuffer.hour === null) {
                                console.log("setting hour");
                                setTaskBuffer((prevTask) => ({
                                    ...prevTask,
                                    hour: 12,
                                }));
                            }
                            if (taskBuffer.minute === null) {
                                console.log("setting minute");
                                setTaskBuffer((prevTask) => ({
                                    ...prevTask,
                                    minute: 0,
                                }));
                            }
                            if (taskBuffer.week_of_repeat_period === null) {
                                console.log("setting week");
                                setTaskBuffer((prevTask) => ({
                                    ...prevTask,
                                    week_of_repeat_period: "FIRST",
                                }));
                            }
                        }}
                        className="accent-main size-5 rounded-md white-border outline-none text-sm"
                    />
                </div>
                {taskBuffer.date_time && (
                    <div className="flex flex-col w-full">
                        <div className="bg-hr w-full h-[1px] my-[10px]"></div>
                        <div className="text-subtext text-sm mb-[15px]">
                            You aim to complete this task at:{" "}
                        </div>
                        <div className="flex flex-row flex-wrap w-full">
                            <div className="w-1/3">
                                <div className="text-subtext">
                                    Week of Repeat Period
                                </div>
                                <div>
                                    {task.repeat_period !== "WEEK" ? (
                                        <Select
                                            name="repeat-every"
                                            className="bg-bg rounded-md p-[10px] min-w-[50px]"
                                            value={
                                                taskBuffer.week_of_repeat_period as string
                                            }
                                            onChange={(e) =>
                                                setTaskBuffer((prevTask) => ({
                                                    ...prevTask,
                                                    week_of_repeat_period: e
                                                        .target.value as Week,
                                                }))
                                            }
                                        >
                                            <option value="FIRST">first</option>
                                            <option value="SECOND">
                                                second
                                            </option>
                                            {task.repeat_period === "MONTH" && (
                                                <option value="THIRD">
                                                    third
                                                </option>
                                            )}
                                            {task.repeat_period === "MONTH" && (
                                                <option value="FOURTH">
                                                    fourth
                                                </option>
                                            )}
                                        </Select>
                                    ) : (
                                        <div className="h-[50px] flex items-center">
                                            First
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="w-1/3">
                                <div className="text-subtext">Day</div>
                                <div>
                                    <select
                                        name="repeat-every"
                                        className="bg-bg rounded-md p-[10px] min-w-[200px]"
                                        value={taskBuffer.day as string}
                                        onChange={(e) =>
                                            setTaskBuffer((prevTask) => ({
                                                ...prevTask,
                                                day: e.target.value as Day,
                                            }))
                                        }
                                    >
                                        <option value="MONDAY">Monday</option>
                                        <option value="TUESDAY">Tuesday</option>
                                        <option value="WEDNESDAY">
                                            Wednesday
                                        </option>
                                        <option value="THURSDAY">
                                            Thursday
                                        </option>
                                        <option value="FRIDAY">Friday</option>
                                        <option value="SATURDAY">
                                            Saturday
                                        </option>
                                        <option value="SUNDAY">Sunday</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <div className="text-subtext">Time</div>
                                <div className="flex flex-row">
                                    <input
                                        className="form-input bg-bg w-[75px]"
                                        placeholder="00"
                                        type="number"
                                        value={taskBuffer.hour as number}
                                        onChange={(e) =>
                                            setTaskBuffer((prevTask) => ({
                                                ...prevTask,
                                                hour: e.target.valueAsNumber,
                                            }))
                                        }
                                        max={12}
                                        min={0}
                                    />
                                    <div className="h-[50px] flex items-center text-xl">
                                        :
                                    </div>
                                    <input
                                        className="form-input bg-bg w-[75px]"
                                        placeholder="00"
                                        type="number"
                                        value={taskBuffer.minute as number}
                                        onChange={(e) =>
                                            setTaskBuffer((prevTask) => ({
                                                ...prevTask,
                                                minute: e.target.valueAsNumber,
                                            }))
                                        }
                                        max={60}
                                        min={0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-row mt-[10px]">
                <button
                    onClick={submit}
                    className="bg-main rounded-md p-[10px] mr-[10px] w-[calc(50%-10px)] min-w-[100px] fc"
                >
                    {submitting ? <LoadingWheel size={24} /> : "Save Changes"}
                </button>
                <button
                    onClick={() => setShowEditForm(false)}
                    className="bg-warning rounded-md p-[5px] ml-[10px] w-[calc(50%-10px)] min-w-[100px] fc"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TaskEditForm;
