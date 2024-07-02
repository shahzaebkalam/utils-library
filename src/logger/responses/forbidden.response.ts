import { Request, Response } from "express";

export const forbidden = (req: Request, res: Response) => (error: Error) => {
  res.emit("runtime-error", error);
  res.status(403);
  res.json(error);
};
