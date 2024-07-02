"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noContent = void 0;
var noContent = function (res) {
    return function (data) {
        if (data === void 0) { data = {}; }
        res.status(204);
    };
};
exports.noContent = noContent;
