import { ExtendedTask } from "../global/types";

export const now = () => {
    return Math.floor(Date.now() / 1000);
};

export const formatTime = (
    hours: number,
    minutes: number,
    seconds?: number,
) => {
    const hourString = (hours < 10 ? "0" : "") + hours;
    const minuteString = (minutes < 10 ? "0" : "") + minutes;
    let secondString = "";

    if (seconds !== undefined) {
        secondString = (seconds < 10 ? "0" : "") + seconds;
    }

    return (
        hourString +
        ":" +
        minuteString +
        (seconds !== undefined ? ":" + secondString : "")
    );
};

export const secondsToTime = (secondsRemaining: number) => {
    if (secondsRemaining < 0) return "LOADING";

    const days = Math.floor(secondsRemaining / 86400);
    let remaining = secondsRemaining - days * 86400;
    const hours = Math.floor(remaining / 3600);
    remaining -= hours * 3600;
    const minutes = Math.floor(remaining / 60);
    remaining -= minutes * 60;
    const seconds = remaining % 60;

    return (
        days +
        " days " +
        hours +
        " hours " +
        minutes +
        " minutes and " +
        seconds +
        " seconds"
    );
};

export const ISOToTime = (iso: string) => {
    return new Date(iso).toLocaleString().replace(",", "");
};

export const completionPercent = (task: ExtendedTask) => {
    if (task.repeat_period === "WEEK") {
        const total_possible = Math.ceil(
            (Date.now() - Date.parse(task.created_at)) /
                1000 /
                (60 * 60 * 24 * 7),
        );
        return Math.round((task.completions / total_possible) * 100);
    } else if (task.repeat_period === "FORTNIGHT") {
        const total_possible = Math.ceil(
            (Date.now() - Date.parse(task.created_at)) /
                1000 /
                (60 * 60 * 24 * 7 * 2),
        );
        return Math.round((task.completions / total_possible) * 100);
    } else {
        const createdAt = new Date(task.created_at);
        const now = new Date();

        let months;
        months = (now.getFullYear() - createdAt.getFullYear()) * 12;
        months -= createdAt.getMonth();
        months += now.getMonth();
        months = months <= 0 ? 0 : months;

        return Math.round((task.completions / months) * 100);
    }
};

export const colourMap = [
    "#fbf8cc",
    "#fde4cf",
    "#ffcfd2",
    "#f1c0e8",
    "#cfbaf0",
    "#a3c4f3",
    "#90dbf4",
    "#8eecf5",
    "#98f5e1",
    "#b9fbc0",
];
