"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, printf = winston_1.format.printf, colorize = winston_1.format.colorize, errors = winston_1.format.errors, json = winston_1.format.json;
var buildDevLogger = function () {
    var logFormat = printf(function (args) {
        var level = args.level, message = args.message, timestamp = args.timestamp, stack = args.stack;
        return "".concat(timestamp, " ").concat(level, " ").concat(message, " ").concat(stack);
    });
    var loggerConsole = (0, winston_1.createLogger)({
        format: combine(colorize(), winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), winston_1.format.simple()),
        transports: [new winston_1.transports.Console()],
    });
    return loggerConsole;
};
var buildProdLogger = function () {
    var loggerProd = (0, winston_1.createLogger)({
        format: combine(json(), winston_1.format.timestamp(), errors({ stack: true })),
        defaultMeta: { service: process.env.SERVICE_NAME },
        transports: [new winston_1.transports.Console()],
    });
    return loggerProd;
};
var loggerExport;
if (process.env.NODE_ENV === "local") {
    loggerExport = buildDevLogger();
}
else {
    loggerExport = buildProdLogger();
}
exports.logger = loggerExport;
