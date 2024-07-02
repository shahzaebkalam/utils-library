import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { buffer } from "stream/consumers";
let loggerServiceName = "NO NAME";

const setLoggerServiceName = (name: string) => {
  loggerServiceName = name;
};

const getLoggerServiceName = () => {
  return loggerServiceName;
};

export const getLogId = (req: Request) => {
  let logId: string | null = null;
  if (req.headers.log_id as string) {
    logId = req.headers.log_id as string;
  } else {
    console.warn("log_id is missing in header");
  }
  return logId;
};

// TODO: !!!!!!!!!!!!!!! Check for all data that should not be printed in logs.
const excludeFromLog = (req: any) => {
  delete req.body.password;
  delete req.body.confirmPassword;
  delete req.file;
  if (req.body.buffer) delete req.body.buffer;
  return req;
}
export const generateLogIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.headers.log_id = uuidv4();
  next();
};

const loggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = new Date().getTime();

  const originPath = req.headers.origin_path || "no origin path";
  const url = req.url;
  const method = req.method;
  const body = req.body;
  const query = req.query;
  const logId = getLogId(req);

  // EXCLUDE DATA
  req = excludeFromLog(req);
  
  let errorMessage: any = null;

  req.on("error", (error) => {
    errorMessage = error;
  });

  res.on("runtime-error", (error) => {
    errorMessage = error;
  });

  res.on("finish", () => {
    const endTime = new Date().getTime();

    const log = {
      logId,
      originPath,
      url,
      method,
      body,
      query,
      error: {},
      proccessedTime: endTime - startTime,
      status: res.statusCode,
      type: getLoggerServiceName(),
    };

    if (!errorMessage) {
      console.log(JSON.stringify(log));
    } else {
      log.error = errorMessage;
      console.error(JSON.stringify(log));
    }
  });

  next();
};

export const loggerConfig = (name: string) => {
  setLoggerServiceName(name);
  return loggerMiddleware;
};
