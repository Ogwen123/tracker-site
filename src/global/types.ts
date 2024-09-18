export type User = {
    token: string,
    username: string,
    name: string
}

export type AppOutletContext = {
    user: User,
    width: number
}

export type NavigationBarContext = {
    user: User | undefined,
    width: number
}

export type _Alert = [string | [string, string], "SUCCESS" | "ERROR", boolean]

export type RepeatOptions = "NEVER" | "WEEK" | "FORTNIGHT" | "MONTH"
export type Day = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
export type Week = "FIRST" | "SECOND" | "THIRD" | "FOURTH"

export type TaskCompletion = {
    id: string,
    task_id: string,
    completed_at: number
}

export type _Task = {
    id: string,
    name: string,
    repeat_period: RepeatOptions,
    date_time: boolean,
    day: Day | null,
    hour: number | null,
    minute: number | null,
    week_of_repeat_period: Week | null,
    user_id: string,
    pinned: boolean,
    completed: boolean,
    completions: number,
    created_at: string
}

export type ExpandedTask = {
    id: string,
    name: string,
    repeat_period: RepeatOptions,
    date_time: boolean,
    day: Day | null,
    hour: number | null,
    minute: number | null,
    week_of_repeat_period: Week | null,
    user_id: string,
    pinned: boolean,
    completed: boolean,
    completions: number,
    created_at: string,
    threshold: number,
    task_completions: TaskCompletion[]
}

export type Details = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

export type TimeDetails = {
    day: Day,
    hour: number,
    minute: number,
    week: Week
}
