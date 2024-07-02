"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.referralCodeCoder = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var secret = "SAjlksaLSijdls";
// Encrypt
var encrypt = function (text) {
    var ciphertext = crypto_js_1.default.AES.encrypt(text, secret).toString();
    var urlEncode = encodeURIComponent(ciphertext);
    return urlEncode;
};
// Decrypt
var decrypt = function (encryptText) {
    var urlDecode = decodeURIComponent(encryptText);
    var bytes = crypto_js_1.default.AES.decrypt(urlDecode, secret);
    var originalText = bytes.toString(crypto_js_1.default.enc.Utf8);
    return originalText;
};
var referralCodeCoder = function (secretphrase) {
    if (secretphrase)
        secret = secretphrase;
    return {
        encrypt: encrypt,
        decrypt: decrypt,
    };
};
exports.referralCodeCoder = referralCodeCoder;
