import { Request, Response } from "express";
export declare const unauthorized: (req: Request, res: Response) => (error: Error) => void;
