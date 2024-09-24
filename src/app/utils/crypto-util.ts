import CryptoJS from 'crypto-js';

export const generateKey = () => {
  const randomKey = CryptoJS.lib.WordArray.random(8);
  return CryptoJS.enc.Hex.stringify(randomKey);
};

export function encrypt(data: string, secretKey: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decrypt(encryptedData: string, secretKey: string): any {
  if (encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      localStorage.removeItem('user');
      console.error('Error decrypting user details:', error);
    }
  } else {
    return encryptedData;
  }
}
