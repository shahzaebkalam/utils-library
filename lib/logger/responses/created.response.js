"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.created = void 0;
var created = function (res) {
    return function (data) {
        if (data === void 0) { data = {}; }
        res.status(201);
        res.json(data);
    };
};
exports.created = created;
