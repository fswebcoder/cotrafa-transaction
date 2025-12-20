import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CusEncryptionService {
  private readonly secretKey = 'COTRAFA_SECRET_KEY_CUS'; 

  generateCUS(userId: number, beneficiaryId: number, amount: number): string {
    const timestamp = new Date().getTime();
    const rawData = `${userId}-${beneficiaryId}-${amount}-${timestamp}`;
    return CryptoJS.SHA256(rawData).toString().substring(0, 16).toUpperCase();
  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(encryptedValue: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
