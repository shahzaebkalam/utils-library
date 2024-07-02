export declare type DataLoggerModel = {
    serviceName: string;
    type: string;
};
export declare type LoggerData = {
    message: string;
    payload: any;
    id?: string | undefined;
    pubSubName?: string | undefined;
};
export declare type LogData = {
    id: string;
    serviceInfo: string;
    message: string;
    payload: any;
    pubSubName?: string;
};
export interface DataLoggerInterface {
    info(data: LoggerData): string | undefined;
    error(data: LoggerData): string | undefined;
}
export declare const dataLogger: (loggerData: DataLoggerModel) => DataLoggerInterface;
