import { format, createLogger, transports, Logger } from "winston";
const { combine, printf, colorize, errors, json } = format;

const buildDevLogger = () => {
  const logFormat = printf((args) => {
    const { level, message, timestamp, stack } = args;
    return `${timestamp} ${level} ${message} ${stack}`;
  });

  const loggerConsole = createLogger({
    format: combine(
      colorize(),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      format.simple()
    ),
    transports: [new transports.Console()],
  });
  return loggerConsole;
};

const buildProdLogger = () => {
  const loggerProd = createLogger({
    format: combine(json(), format.timestamp(), errors({ stack: true })),
    defaultMeta: { service: process.env.SERVICE_NAME },
    transports: [new transports.Console()],
  });
  return loggerProd;
};

let loggerExport: Logger;
if (process.env.NODE_ENV === "local") {
  loggerExport = buildDevLogger();
} else {
  loggerExport = buildProdLogger();
}

export const logger = loggerExport;
