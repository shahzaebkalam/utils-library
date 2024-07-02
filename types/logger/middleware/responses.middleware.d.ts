import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Response {
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
export declare const responsesMiddleware: (req: Request, res: Response, next: NextFunction) => void;
