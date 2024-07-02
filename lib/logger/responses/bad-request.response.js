"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = void 0;
var badRequest = function (req, res) { return function (error) {
    res.emit("runtime-error", error);
    res.status(400);
    res.json(error);
}; };
exports.badRequest = badRequest;
