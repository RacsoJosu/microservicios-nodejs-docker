import { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import type { ErrorLog } from "./types";

const transport = new DailyRotateFile({
  dirname: "logs",
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d'
});
export const errorLogger = createLogger({
  level: "error",
  format: format.json(),
  transports: [transport],
});


export function createErrorLogger<T>(params: ErrorLog) {
  return errorLogger.error(params)
}
