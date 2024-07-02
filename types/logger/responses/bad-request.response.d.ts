import { Request, Response } from "express";
export declare const badRequest: (req: Request, res: Response) => (error: Error) => void;
