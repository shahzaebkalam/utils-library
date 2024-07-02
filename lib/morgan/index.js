"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLogging = void 0;
var morgan_1 = __importDefault(require("morgan"));
var initLogging = function (app) {
    app.use((0, morgan_1.default)("combined"));
};
exports.initLogging = initLogging;
