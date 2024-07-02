import { Request, Response } from "express";
export declare const serverError: (req: Request, res: Response) => (error: Error) => void;
