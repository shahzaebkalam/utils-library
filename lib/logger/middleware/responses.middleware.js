"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsesMiddleware = void 0;
var responses_1 = require("../responses");
var responsesMiddleware = function (req, res, next) {
    res.ok = (0, responses_1.ok)(res);
    res.created = (0, responses_1.created)(res);
    res.noContent = (0, responses_1.noContent)(res);
    res.badRequest = (0, responses_1.badRequest)(req, res);
    res.conflict = (0, responses_1.conflict)(req, res);
    res.notFound = (0, responses_1.notFound)(req, res);
    res.unauthorized = (0, responses_1.unauthorized)(req, res);
    res.forbidden = (0, responses_1.forbidden)(req, res);
    res.serverError = (0, responses_1.serverError)(req, res);
    next();
};
exports.responsesMiddleware = responsesMiddleware;
