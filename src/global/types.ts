export type User = {
    token: string
}

export type AppOutletContext = {
    user: User,
    width: number
}

export type _Alert = [string | [string, string], "SUCCESS" | "ERROR", boolean]