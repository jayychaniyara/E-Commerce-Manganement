import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  tokenFromUI: string = "0123456789123456";
  encrypted: string | undefined;
  decrypted: string | undefined;

  // below ng model
  // request: string | undefined;
  // responce: string | undefined;
  constructor() {
    // this.encryptUsingAES256();
  }

  encryptUsingAES256(request: string) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(request), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decryptUsingAES256(responce: string) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    let decrypted = CryptoJS.AES.decrypt(
      responce, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    var removeQuotes = decrypted.replace(/['"]+/g, '');
    return removeQuotes;

  }

  // //The set method is use for encrypt the value.
  // set(keys: string, value: { toString: () => string; }) {
  //   var key = CryptoJS.enc.Utf8.parse(keys);
  //   var iv = CryptoJS.enc.Utf8.parse(keys);
  //   var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
  //     {
  //       keySize: 128 / 8,
  //       iv: iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7
  //     });

  //   return encrypted.toString();
  // }

  // //The get method is use for decrypt the value.
  // get(keys: string, value: string | CryptoJS.lib.CipherParams) {
  //   var key = CryptoJS.enc.Utf8.parse(keys);
  //   var iv = CryptoJS.enc.Utf8.parse(keys);
  //   var decrypted = CryptoJS.AES.decrypt(value, key, {
  //     keySize: 128 / 8,
  //     iv: iv,
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7
  //   });

  //   return decrypted.toString(CryptoJS.enc.Utf8);
  // }

}
