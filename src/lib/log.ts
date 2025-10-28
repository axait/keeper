/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";


let DEBUG_MODE = process.env.DEBUG_MODE

// only for developing
if (!DEBUG_MODE) {
    DEBUG_MODE = 'true'
}

/**
 * Logs a message to the console, prefixed with a gray "[.] " string,
 * only if DEBUG_MODE is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logMe(...msg: any): void {
    if (DEBUG_MODE == "true") {
        console.log(chalk.gray("[.] "), ...msg);
    }
}

/**
 * Logs a message to the console, prefixed with a gray "[?]" string,
 * only if DEBUG_MODE is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logInfo(...msg: any): void {
    if (DEBUG_MODE == "true") {
        console.log(chalk.gray("[?] "), ...msg);

    }
}

/**
 * Logs a message to the console, prefixed with a green "[*]" string,
 * only if DEBUG_MODE is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logSuccess(...msg: any): void {
    if (DEBUG_MODE == "true") {
        console.log(chalk.greenBright("[*] "), ...msg);

    }
}

/**
 * Logs a message to the console, prefixed with a blue "[~]" string,
 * only if DEBUG_MODE is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logProcessing(...msg: any): void {
    if (DEBUG_MODE == "true") {
        console.log(chalk.blueBright("[~] "), ...msg);

    }
}

/**
 * Logs an error message to the console, prefixed with a red "[_]" string,
 * only if DEBUG_MODE is set to "true".
 * @param {...msg} The error message(s) to log.
 */
export function logError(...msg: any): void {
    if (DEBUG_MODE == "true") {
        console.log(chalk.redBright("[_] "), ...msg);

    }
}

/**
 * Logs a message to the console, prefixed with a yellow "[!]" string,
 * only if DEBUG_MODE is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logWarning(...msg: any): void {
    if (DEBUG_MODE == "true") {
        console.log(chalk.yellowBright("[!] "), ...msg);

    }
}

/**
 * Decorates a given text with a color based on the given mode.
 * 
 * @param {string} mode The mode to decorate the text with. Can be one of "success", "processing", "info", "warning", or "error".
 * @param {string} text The text to decorate.
 * @returns {string} The decorated text.
 */
function decorateText(mode: string, text: string) {
    switch (mode) {
        case "success":
            return chalk.greenBright(text);

        case "processing":
            return chalk.blueBright(text);

        case "info":
            return chalk.cyanBright(text);

        case "warning":
            return chalk.yellowBright(text);

        case "error":
            return chalk.redBright(text);

        default:
            return text;
    }
}
