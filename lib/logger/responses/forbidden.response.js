"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidden = void 0;
var forbidden = function (req, res) { return function (error) {
    res.emit("runtime-error", error);
    res.status(403);
    res.json(error);
}; };
exports.forbidden = forbidden;
