/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";
import { logFiler } from "./logFiler";
import { debugMode } from "@/debugMode";


const debugVar: boolean = debugMode || false;

/**
 * Logs a message to the console, prefixed with a gray "[.] " string,
 * only if debugVar is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logMe(...msg: any): void {
    if (debugVar) {
        console.log(chalk.gray("[.] "), ...msg);
    }
}

/**
 * Logs data to the console, prefixed with a cyan "[+]" string,
 * only if debugVar is set to "true".
 * Useful for debugging data such as API responses, database queries, etc.
 * @param {...msg} The data to log.
 */
export function logData(...msg: any): void {
    if (debugVar) {
        console.log(chalk.cyanBright("[+] "), ...msg);

    }
}

/**
 * Logs a message to the console, prefixed with a gray "[?]" string,
 * only if debugVar is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logInfo(...msg: any): void {
    if (debugVar) {
        console.log(chalk.magenta("[?] "), ...msg);

    }
}

/**
 * Logs a message to the console, prefixed with a green "[*]" string,
 * only if debugVar is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logSuccess(...msg: any): void {
    logFiler(`${msg}`, "success")
    if (debugVar) {
        console.log(chalk.greenBright("[*] "), ...msg);

    }
}

/**
 * Logs a message to the console, prefixed with a blue "[~]" string,
 * only if debugVar is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logProcessing(...msg: any): void {
    if (debugVar) {
        console.log(chalk.blueBright("[~] "), ...msg);

    }
}

/**
 * Logs an error message to the console, prefixed with a red "[!]" string,
 * only if debugVar is set to "true".
 * @param {...msg} The error message(s) to log.
 */
export function logError(...msg: any): void {
    logFiler(`${msg}`, "error")
    if (debugVar) {
        console.log(chalk.redBright("[!] "), ...msg);

    }
}


/**
 * Logs an error message to the console, prefixed with a red "[!!] ERROR: " string,
 * only if debugVar is set to "true".
 * @param {...msg} The error message(s) to log.
 */
export function logErrorSerious(...msg: any): void {
    logFiler(`ERROR: ${msg}`, "error")

    if (debugVar) {
        console.log(chalk.redBright("[!!] ERROR: "), ...msg);

    }
}

/**
 * Logs a message to the console, prefixed with a yellow "[_]" string,
 * only if debugVar is set to "true".
 * @param {...msg} The message(s) to log.
 */
export function logWarning(...msg: any): void {
    logFiler(`${msg}`, "warning")
    if (debugVar) {
        console.log(chalk.yellowBright("[_] "), ...msg);

    }
}

/**
 * Decorates a given text with a color based on the given mode.
 * 
 * @param {string} mode The mode to decorate the text with. Can be one of "success", "processing", "info", "warning", or "error".
 * @param {string} text The text to decorate.
 * @returns {string} The decorated text.
 */
export function decorateText(mode: string, text: string): string {
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
