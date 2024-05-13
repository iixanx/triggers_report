import { createLogger, format, transports } from "winston";

export const WinstonInstance = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({ filename: "log/warn.log", level: "warn" }),
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/crit.log", level: "crit" }),
    new transports.Console({
      format: format.printf(
        ({ level, message }) =>
          `[${level}] ${new Date().toISOString()} [triggers_report] - ${message}`,
      ),
    }),
  ],
  format: format.printf(
    ({ level, message }) =>
      `[${level}] ${new Date().toISOString()} [triggers_report] - ${message}`,
  ),
});

// Syslog format refer : https://yeonfamily.tistory.com/22
// Syslog Format : RFC3164
// <priority>[timestamp] [hostname] [processname] [message]
