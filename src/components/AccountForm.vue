<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <h2>Учетные записи</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="addAccount">+</v-btn>
      </v-col>
    </v-row>

    <AccountRow
      v-for="account in formAccounts"
      :key="account.id"
      :account="account"
      @update="handleAccountUpdate"
      @remove="removeAccount"
    />
  </v-container>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useAccountStore, type Account} from '@/store/accounts';
import AccountRow from '@/components/AccountRow.vue';

interface AccountForm extends Account {
  labelInput: string;
  isLabelValid: boolean;
  isTypeValid: boolean;
  isLoginValid: boolean;
  isPasswordValid: boolean;
}

const store = useAccountStore();

const formAccounts = reactive<AccountForm[]>(
  store.accounts.map((account) => ({
    ...account,
    labelInput: account.labels.map((label) => label.text).join(';'),
    isLabelValid: account.labels.map((label) => label.text).join(';').length <= 50,
    isTypeValid: ['LDAP', 'Local'].includes(account.type),
    isLoginValid: account.login.length > 0 && account.login.length <= 100,
    isPasswordValid:
      account.type === 'LDAP' ||
      (account.password !== null && account.password.length > 0 && account.password.length <= 100),
  }))
);

const syncFormAccounts = () => {
  formAccounts.length = 0;
  store.accounts.forEach((account) => {
    const labelInput = account.labels.map((label) => label.text).join(';');
    formAccounts.push({
      ...account,
      labelInput,
      isLabelValid: labelInput.length <= 50,
      isTypeValid: ['LDAP', 'Local'].includes(account.type),
      isLoginValid: account.login.length > 0 && account.login.length <= 100,
      isPasswordValid:
        account.type === 'LDAP' ||
        (account.password !== null && account.password.length > 0 && account.password.length <= 100),
    });
  });
};

watch(
  () => store.accounts,
  () => syncFormAccounts(),
  { deep: true }
);

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

const addAccount = () => {
  store.addAccount();
  syncFormAccounts();
};

const removeAccount = (id: string) => {
  store.removeAccount(id);
  syncFormAccounts();
};
</script>