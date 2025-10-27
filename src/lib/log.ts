
let DEBUG_MODE = process.env.DEBUG_MODE

if (!DEBUG_MODE) {
    DEBUG_MODE = 'true'
}

export function logMe(msg: string): void {
    if (DEBUG_MODE == "true") {
        console.log(msg)
    }
}