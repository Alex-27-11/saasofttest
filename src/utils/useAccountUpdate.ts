import type { Account, AccountForm, AccountStore } from '@/types/types';

export const useAccountUpdate = (store: AccountStore, formAccounts: AccountForm[]) => {
  const handleAccountUpdate = (updatedAccount: AccountForm) => {
    const update: Partial<Account> = {};

    if (updatedAccount.isLabelValid) {
      update.labels = updatedAccount.labelInput
        .split(';')
        .filter((text) => text.trim())
        .map((text) => ({ text: text.trim() }));
    }

    if (updatedAccount.isTypeValid) {
      update.type = updatedAccount.type;
      if (updatedAccount.type === 'LDAP') {
        update.password = null;
      }
    }

    if (updatedAccount.isLoginValid) {
      update.login = updatedAccount.login;
    }

    if (updatedAccount.isPasswordValid && updatedAccount.type === 'Local') {
      update.password = updatedAccount.password;
    }

    if (Object.keys(update).length > 0) {
      store.updateAccount(updatedAccount.id, update);
    }

    const index = formAccounts.findIndex((acc) => acc.id === updatedAccount.id);
    if (index !== -1) {
      formAccounts[index] = { ...updatedAccount };
    }
  };

  return { handleAccountUpdate };
};