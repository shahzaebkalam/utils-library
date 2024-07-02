export declare const referralCodeCoder: (secretphrase?: string | undefined) => {
    encrypt: (text: string) => string;
    decrypt: (encryptText: string) => string;
};
