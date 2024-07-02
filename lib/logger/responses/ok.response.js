"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = void 0;
var ok = function (res) {
    return function (data) {
        if (data === void 0) { data = {}; }
        res.status(200);
        res.json(data);
    };
};
exports.ok = ok;
