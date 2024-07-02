import { Request, Response } from "express";
export declare const conflict: (req: Request, res: Response) => (error: Error) => void;
