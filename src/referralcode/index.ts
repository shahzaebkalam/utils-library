import CryptoJS from "crypto-js";

let secret = "SAjlksaLSijdls";

// Encrypt
const encrypt = (text: string) => {
  const ciphertext = CryptoJS.AES.encrypt(text, secret).toString();
  const urlEncode = encodeURIComponent(ciphertext);
  return urlEncode;
};

// Decrypt
const decrypt = (encryptText: string) => {
  const urlDecode = decodeURIComponent(encryptText);
  const bytes = CryptoJS.AES.decrypt(urlDecode, secret);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export const referralCodeCoder = (secretphrase?: string) => {
  if (secretphrase) secret = secretphrase;
  return {
    encrypt,
    decrypt,
  };
};
