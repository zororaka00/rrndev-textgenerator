import { defineStore } from 'pinia';
import { Notify } from 'quasar';

export const useGeneralStore = defineStore('general', {
  state: () => ({
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()'
  }),
  actions: {
    showNotification(type: 'positive' | 'negative' | 'warning', message: string) {
      Notify.create({
        type: type,
        message: message,
        position: 'top',
      });
    },
    copyClipboard(text: string, customMessage?: string) {
      const textCopy = document.createElement("textarea");
      textCopy.value = text;
      document.body.appendChild(textCopy);
      textCopy.select();
      document.execCommand("copy");
      document.body.removeChild(textCopy);
      this.showNotification('positive', customMessage ? customMessage : `Text copied`);
    },
    generateCharacters(length: number, allowedCharacters: string): string {
      const charactersLength = allowedCharacters.length;
  
      return Array.from({ length }, () => {
          const randomIndex = Math.floor(Math.random() * charactersLength);
          return allowedCharacters.charAt(randomIndex);
      }).join('');
    },
    generateRandomNumber(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
});
