"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = exports.generateLogIdMiddleware = exports.getLogId = void 0;
var uuid_1 = require("uuid");
var loggerServiceName = "NO NAME";
var setLoggerServiceName = function (name) {
    loggerServiceName = name;
};
var getLoggerServiceName = function () {
    return loggerServiceName;
};
var getLogId = function (req) {
    var logId = null;
    if (req.headers.log_id) {
        logId = req.headers.log_id;
    }
    else {
        console.warn("log_id is missing in header");
    }
    return logId;
};
exports.getLogId = getLogId;
// TODO: !!!!!!!!!!!!!!! Check for all data that should not be printed in logs.
var excludeFromLog = function (req) {
    delete req.body.password;
    delete req.body.confirmPassword;
    delete req.file;
    if (req.body.buffer)
        delete req.body.buffer;
    return req;
};
var generateLogIdMiddleware = function (req, res, next) {
    req.headers.log_id = (0, uuid_1.v4)();
    next();
};
exports.generateLogIdMiddleware = generateLogIdMiddleware;
var loggerMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var startTime, originPath, url, method, body, query, logId, errorMessage;
    return __generator(this, function (_a) {
        startTime = new Date().getTime();
        originPath = req.headers.origin_path || "no origin path";
        url = req.url;
        method = req.method;
        body = req.body;
        query = req.query;
        logId = (0, exports.getLogId)(req);
        // EXCLUDE DATA
        req = excludeFromLog(req);
        errorMessage = null;
        req.on("error", function (error) {
            errorMessage = error;
        });
        res.on("runtime-error", function (error) {
            errorMessage = error;
        });
        res.on("finish", function () {
            var endTime = new Date().getTime();
            var log = {
                logId: logId,
                originPath: originPath,
                url: url,
                method: method,
                body: body,
                query: query,
                error: {},
                proccessedTime: endTime - startTime,
                status: res.statusCode,
                type: getLoggerServiceName(),
            };
            if (!errorMessage) {
                console.log(JSON.stringify(log));
            }
            else {
                log.error = errorMessage;
                console.error(JSON.stringify(log));
            }
        });
        next();
        return [2 /*return*/];
    });
}); };
var loggerConfig = function (name) {
    setLoggerServiceName(name);
    return loggerMiddleware;
};
exports.loggerConfig = loggerConfig;
