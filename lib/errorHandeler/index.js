"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGraphQLError = void 0;
var uuid_1 = require("uuid");
var datalogger_1 = require("../logger/datalogger");
var logger = (0, datalogger_1.dataLogger)({
    serviceName: process.env.SERVICE_NAME,
    type: "INTERNAL_SERVER_ERROR",
});
var formatGraphQLError = function (error) {
    var id = (0, uuid_1.v4)();
    logger.error({ message: error.message, payload: error, id: id });
    var errorResponse = {
        id: id,
        message: error.message,
        code: error.extensions.code,
    };
    return errorResponse;
};
exports.formatGraphQLError = formatGraphQLError;
