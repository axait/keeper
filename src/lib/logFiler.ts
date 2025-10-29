import fs from "fs";
import path from "path";
import { logErrorSerious } from "./log";

type categoryType = "info" | "success" | "warning" | "error";

// ⁡⁢⁣⁢​‌‍‌UPDATE IT TO save logs in database but not continuously. It maintains a queue which get saved after specific time.​⁡

/**
 * Writes logs to a file inside the project's `/logs` folder.
 * Automatically creates the folder if it doesn't exist.
 *
 * @param {string} message - The message to log.
 * @param {string} [category="general"] - Log category (e.g., "auth", "db", "error").
 */
export function logFiler(message: string, category: categoryType = "info") {
    try {
        let sign = '[>_<]'
        switch (category) {
            case "info":
                sign = '[?]'
                break;

            case "success":
                sign = '[*]'
                break;

            case "warning":
                sign = '[_]'
                break;

            case "error":
                sign = '[!!]'
                break;

            default:
                sign = '[_]'
                break;
        }

        const date = new Date();
        const timeString = date.toTimeString().split(" ")[0]; // e.g., "17:30:12"

        // ✅ Save inside project root, not system root
        const projectRoot = process.cwd();
        const logsDir = path.join(projectRoot, "logs");

        // Create the logs directory and all its parent directories if they don't already exist. (recusively)
        fs.mkdirSync(logsDir, { recursive: true });

        // File path: logs/{category}.log
        const logFile = path.join(logsDir, `${category}.log`);

        // Append log message with timestamp
        const logEntry = `${timeString} ${sign} ${message}\n`;
        fs.appendFileSync(logFile, logEntry, "utf-8");

        // Optional: also show in console
        // logMe(`📝 [${sign}] ${message}`);

    } catch (err) {
        console.error("❌ Failed to write log:", err);
        logErrorSerious("❌ Failed to write log:", err);
    }
}
