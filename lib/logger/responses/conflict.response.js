"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflict = void 0;
var conflict = function (req, res) { return function (error) {
    res.emit("runtime-error", error);
    res.status(409);
    res.json(error);
}; };
exports.conflict = conflict;
