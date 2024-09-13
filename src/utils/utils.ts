export const now = () => {
    return Math.floor(Date.now() / 1000)
}

export const secondsToTime = (secondsRemaining: number) => {
    const days = Math.floor(secondsRemaining / 86400)
    let remaining = secondsRemaining - (days * 86400)
    const hours = Math.floor(remaining / 3600)
    remaining -= hours * 3600
    const minutes = Math.floor((remaining) / 60)
    remaining -= minutes * 60
    const seconds = remaining % 60

    const hourString = (hours < 10 ? "0" : "") + hours
    const minuteString = (minutes < 10 ? "0" : "") + minutes
    const secondString = (seconds < 10 ? "0" : "") + seconds

    return days + ":" + hourString + ":" + minuteString + ":" + secondString
} 