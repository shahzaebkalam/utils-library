import { Request, Response } from "express";

export const serverError = (req: Request, res: Response) => (error: Error) => {
  res.status(500);
  res.emit("runtime-error", error);
  res.json(error);
};
