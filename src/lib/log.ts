
let DEBUG_MODE = process.env.DEBUG_MODE

if (!DEBUG_MODE) {
    DEBUG_MODE = 'true'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logMe(...msg: any): void {
    if (DEBUG_MODE == "true") {
        console.log(`[*] ${msg}`)
    }
}