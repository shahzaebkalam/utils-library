"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataLogger = void 0;
var uuid_1 = require("uuid");
var index_1 = require("./winston/index");
var dataLogger = function (loggerData) {
    var serviceName = loggerData.serviceName;
    var type = loggerData.type || "NOType";
    var generateLog = function (data, methodName) {
        var messageId = data.id ? data.id : (0, uuid_1.v4)();
        var payload = data.payload;
        var pubSubName = data.pubSubName;
        var buildLog = {};
        buildLog.id = messageId;
        buildLog.serviceInfo = "[".concat(methodName, "] [").concat(serviceName, "] [").concat(type, "] ");
        buildLog.message = "".concat(data.message);
        buildLog.payload = payload;
        if (pubSubName) {
            buildLog.serviceInfo += "[".concat(pubSubName, "]");
            buildLog.pubSubName = data.pubSubName;
        }
        return buildLog;
    };
    return {
        info: function (data) {
            var log = generateLog(data, "Info");
            index_1.logger.info(log.message, __assign({}, log));
            return log.id ? log.id : undefined;
        },
        error: function (data) {
            var log = generateLog(data, "Info");
            index_1.logger.error(log.message, __assign({}, log));
            return log.id ? log.id : undefined;
        },
    };
};
exports.dataLogger = dataLogger;
