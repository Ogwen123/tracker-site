export const title = (str: string) => {
    let buffer = ""

    for (let i of str.split(" ")) {
        buffer += i[0].toUpperCase() + i.substring(1).toLowerCase()
    }

    return buffer
}