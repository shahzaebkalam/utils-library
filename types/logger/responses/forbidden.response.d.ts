import { Request, Response } from "express";
export declare const forbidden: (req: Request, res: Response) => (error: Error) => void;
