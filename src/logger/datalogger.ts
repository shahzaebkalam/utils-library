import { v4 as uuidv4 } from "uuid";
import { logger } from "./winston/index";

export type DataLoggerModel = {
  serviceName: string;
  type: string;
};

export type LoggerData = {
  message: string;
  payload: any;
  id?: string | undefined;
  pubSubName?: string | undefined;
};

export type LogData = {
  id: string;
  serviceInfo: string;
  message: string;
  payload: any;
  pubSubName?: string;
};

export interface DataLoggerInterface {
  info(data: LoggerData): string | undefined;
  error(data: LoggerData): string | undefined;
}

export const dataLogger = (
  loggerData: DataLoggerModel
): DataLoggerInterface => {
  const serviceName = loggerData.serviceName;
  const type = loggerData.type || "NOType";

  const generateLog = (data: LoggerData, methodName: string): LogData => {
    const messageId = data.id ? data.id : uuidv4();
    const payload = data.payload;
    const pubSubName = data.pubSubName;

    const buildLog: any = {};
    buildLog.id = messageId;
    buildLog.serviceInfo = `[${methodName}] [${serviceName}] [${type}] `;
    buildLog.message = `${data.message}`;
    buildLog.payload = payload;

    if (pubSubName) {
      buildLog.serviceInfo += `[${pubSubName}]`;
      buildLog.pubSubName = data.pubSubName;
    }

    return buildLog;
  };

  return {
    info: (data: LoggerData): string | undefined => {
      const log = generateLog(data, "Info");
      logger.info(log.message, { ...log });
      return log.id ? log.id : undefined;
    },
    error: (data: LoggerData): string | undefined => {
      const log = generateLog(data, "Info");
      logger.error(log.message, { ...log });
      return log.id ? log.id : undefined;
    },
  };
};
