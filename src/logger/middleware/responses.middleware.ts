import {
  badRequest,
  conflict,
  created,
  forbidden,
  noContent,
  notFound,
  ok,
  serverError,
  unauthorized,
} from "../responses";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    export interface Response {
      ok?: any;
      created?: any;
      noContent?: any;
      badRequest?: any;
      conflict?: any;
      notFound?: any;
      unauthorized?: any;
      forbidden?: any;
      serverError?: any;
    }
  }
}

export const responsesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.ok = ok(res);
  res.created = created(res);
  res.noContent = noContent(res);
  res.badRequest = badRequest(req, res);
  res.conflict = conflict(req, res);
  res.notFound = notFound(req, res);
  res.unauthorized = unauthorized(req, res);
  res.forbidden = forbidden(req, res);
  res.serverError = serverError(req, res);
  next();
};
