import { createLogger, format, transports } from "winston";

export const WinstonInstance = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({ filename: "warn.log", level: "warn" }),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "crit.log", level: "crit" }),
    new transports.Console({
      format: format.printf(
        ({ level, message }) =>
          `[${level}] ${new Date().toISOString()} [DAUTH] - ${message}`,
      ),
    }),
  ],
  format: format.printf(
    ({ level, message }) =>
      `[${level}] ${new Date().toISOString()} [DAUTH] - ${message}`,
  ),
});

// Syslog format refer : https://yeonfamily.tistory.com/22
// Syslog Format : RFC3164
// <priority>[timestamp] [hostname] [processname] [message]
