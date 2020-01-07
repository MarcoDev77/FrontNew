import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
const PASS = 'crypto_1234';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  // The set method is use for encrypt the value.
  set = (value, keys?) => {
    const encrypted = CryptoJS.AES.encrypt(value, PASS);
    return encrypted.toString();
  }
  // The get method is use for decrypt the value.
  get = (value, keys?) => {
    const decrypted = CryptoJS.AES.decrypt(value, PASS);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
