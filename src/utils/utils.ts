import { ExpandedTask } from "../global/types"

export const now = () => {
    return Math.floor(Date.now() / 1000)
}

export const formatTime = (hours: number, minutes: number, seconds?: number) => {
    const hourString = (hours < 10 ? "0" : "") + hours
    const minuteString = (minutes < 10 ? "0" : "") + minutes
    let secondString = ""

    if (seconds !== undefined) {
        secondString = (seconds < 10 ? "0" : "") + seconds
    }

    return hourString + ":" + minuteString + (seconds !== undefined ? ":" + secondString : "")
}

export const secondsToTime = (secondsRemaining: number) => {
    if (secondsRemaining < 0) return "LOADING"

    const days = Math.floor(secondsRemaining / 86400)
    let remaining = secondsRemaining - (days * 86400)
    const hours = Math.floor(remaining / 3600)
    remaining -= hours * 3600
    const minutes = Math.floor((remaining) / 60)
    remaining -= minutes * 60
    const seconds = remaining % 60

    return days + ":" + formatTime(hours, minutes, seconds)
}

export const ISOToTime = (iso: string) => {
    const date = iso.split("T")[0].replace(/-/g, "/")

    const time = iso.split("T")[1].split(".")[0]

    return date + " " + time
}

export const completionPercent = (task: ExpandedTask) => {
    if (task.repeat_period === "WEEK") {
        const total_possible = Math.ceil(((Date.now() - Date.parse(task.created_at)) / 1000) / (60 * 60 * 24 * 7))
        return Math.round((task.completions / total_possible) * 100)
    } else if (task.repeat_period === "FORTNIGHT") {
        const total_possible = Math.ceil(((Date.now() - Date.parse(task.created_at)) / 1000) / (60 * 60 * 24 * 7 * 2))
        return Math.round((task.completions / total_possible) * 100)
    } else {
        const createdAt = new Date(task.created_at)
        const now = new Date()

        let months
        months = (now.getFullYear() - createdAt.getFullYear()) * 12
        months -= createdAt.getMonth()
        months += now.getMonth()
        months = (months <= 0 ? 0 : months)

        return Math.round((task.completions / months) * 100)
    }
}