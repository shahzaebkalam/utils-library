import { Request, Response, NextFunction } from "express";
export declare const getLogId: (req: Request) => string | null;
export declare const generateLogIdMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const loggerConfig: (name: string) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
