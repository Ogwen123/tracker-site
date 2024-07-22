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

export type Task = {

}

export type Details = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}