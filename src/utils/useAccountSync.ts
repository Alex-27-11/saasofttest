import { reactive, watch } from 'vue';
import type { AccountForm, AccountStore } from '@/types/types';

export const useAccountSync = (store: AccountStore, accountTypes: string[]) => {
  const formAccounts = reactive<AccountForm[]>([]);

  const syncFormAccounts = () => {
    formAccounts.length = 0;
    store.accounts.forEach((account) => {
      const labelInput = account.labels.map((label) => label.text).join(';');
      formAccounts.push({
        ...account,
        labelInput,
        isLabelValid: labelInput.length <= 50,
        isTypeValid: accountTypes.includes(account.type),
        isLoginValid: account.login.length > 0 && account.login.length <= 100,
        isPasswordValid:
          account.type === 'LDAP' ||
          (account.password !== null && account.password.length > 0 && account.password.length <= 100),
      });
    });
  };

  syncFormAccounts();

  watch(() => store.accounts, syncFormAccounts, { deep: true });

  return { formAccounts, syncFormAccounts };
};