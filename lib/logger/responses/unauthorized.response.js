"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = void 0;
var unauthorized = function (req, res) { return function (error) {
    res.emit("runtime-error", error);
    res.status(401);
    res.json(error);
}; };
exports.unauthorized = unauthorized;
