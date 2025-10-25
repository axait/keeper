

export function logMe(msg: string): void {
    if (process.env.DEBUG_MODE == "true") {
        console.log(msg)
    }
}