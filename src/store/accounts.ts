import { defineStore } from 'pinia';
import type { Account } from '@/types/types';

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),

  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'Local',
        login: '',
        password: '',
      });
    },

    removeAccount(id: string) {
      this.accounts = this.accounts.filter((account) => account.id !== id);
    },

    updateAccount(id: string, updatedAccount: Partial<Account>) {
      const index = this.accounts.findIndex((account) => account.id === id);
      if (index !== -1) {
        this.accounts[index] = {
          ...this.accounts[index],
          ...updatedAccount,
        };
      }
    },
  },

  persist: true, // Для сохранения в localStorage
});