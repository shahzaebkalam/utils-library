"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
var notFound = function (req, res) { return function (error) {
    res.emit("runtime-error", error);
    res.status(404);
    res.json(error);
}; };
exports.notFound = notFound;
