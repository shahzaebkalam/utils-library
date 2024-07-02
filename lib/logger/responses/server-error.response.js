"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = void 0;
var serverError = function (req, res) { return function (error) {
    res.status(500);
    res.emit("runtime-error", error);
    res.json(error);
}; };
exports.serverError = serverError;
