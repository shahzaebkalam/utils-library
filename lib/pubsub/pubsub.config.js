"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubSingleton = exports.setupPubSub = void 0;
var pubsub_1 = require("@google-cloud/pubsub");
var datalogger_1 = require("../logger/datalogger");
var subscribers = [];
var privateKey = "";
var serviceAccount = "";
var projectId = "";
var setupPubSub = function (config) {
    subscribers = config.subs;
    privateKey = config.privateKey;
    serviceAccount = config.serviceAccount;
    projectId = config.projectId;
};
exports.setupPubSub = setupPubSub;
var PubSubSingleton = /** @class */ (function () {
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    function PubSubSingleton() {
        var _this = this;
        this.privateKey = privateKey;
        this.message = function (data) { return ({ json: data }); };
        this.dataLogger = (0, datalogger_1.dataLogger)({
            serviceName: process.env.SERVICE_NAME,
            type: "PUB/SUB CLIENT",
        });
        this.client = new pubsub_1.PubSub({
            projectId: projectId,
            credentials: this.getCredentials(),
        });
        subscribers.forEach(function (sub) {
            _this.subscribeMessage(sub.topic, sub.cb, sub.onErrorCallback);
        });
    }
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    PubSubSingleton.getInstance = function () {
        if (!PubSubSingleton.instance) {
            PubSubSingleton.instance = new PubSubSingleton();
        }
        return PubSubSingleton.instance;
    };
    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    PubSubSingleton.prototype.publishMessage = function (data, topic) {
        return __awaiter(this, void 0, void 0, function () {
            var messageId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageId = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client
                                .topic(topic)
                                .publishMessage(this.message(data))];
                    case 2:
                        messageId = _a.sent();
                        this.dataLogger.info({
                            message: "",
                            payload: data,
                            pubSubName: topic,
                            id: messageId,
                        });
                        return [2 /*return*/, messageId];
                    case 3:
                        error_1 = _a.sent();
                        this.dataLogger.error({
                            message: "Received error while publishing",
                            payload: error_1,
                            pubSubName: topic,
                            id: messageId,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PubSubSingleton.prototype.subscribeMessage = function (topic, cb, onErrorCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var subscription, messageHandler;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    subscription = this.client.subscription(topic, {
                        flowControl: { maxExtensionMinutes: 0 },
                    });
                    messageHandler = function (message) {
                        var logId = _this.dataLogger.info({
                            message: "subscription",
                            payload: message,
                            pubSubName: topic,
                            id: message.id,
                        });
                        // console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
                        cb(JSON.parse(message.data))
                            .then(function () {
                            // "Ack" (acknowledge receipt of) the message
                            message.ack();
                        })
                            .catch(function (error) {
                            _this.dataLogger.error({
                                message: "subscritpion callback error",
                                payload: error,
                                id: logId,
                                pubSubName: topic,
                            });
                            onErrorCallback(message);
                        });
                    };
                    subscription.on("message", messageHandler);
                    console.info("Subscriberd to:", topic);
                }
                catch (error) {
                    this.dataLogger.error({
                        pubSubName: topic,
                        message: "Received error while subscribing",
                        payload: error,
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    PubSubSingleton.prototype.getCredentials = function () {
        return {
            client_email: serviceAccount,
            private_key: this.privateKey.replace(/\\n/g, "\n"),
        };
    };
    return PubSubSingleton;
}());
exports.PubSubSingleton = PubSubSingleton;
