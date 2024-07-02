import { Request, Response } from "express";
export const notFound = (req: Request, res: Response) => (error: Error) => {
  res.emit("runtime-error", error);
  res.status(404);
  res.json(error);
};
