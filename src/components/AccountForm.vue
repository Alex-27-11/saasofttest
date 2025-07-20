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
		:account-types="accountTypes"
      @update="handleAccountUpdate"
      @remove="removeAccount"
    />
  </v-container>
</template>

<script setup lang="ts">
import { useAccountStore} from '@/store/accounts';
import AccountRow from '@/components/AccountRow.vue';
import type { AccountForm } from '@/types/types';
import {useAccountUpdate} from '@/utils/useAccountUpdate.ts';
import { useAccountSync } from '@/utils/useAccountSync'

const props = defineProps<{
  accountTypes: string[];
}>();

const store = useAccountStore();
const {formAccounts, syncFormAccounts} = useAccountSync(store, props.accountTypes);
const { handleAccountUpdate } = useAccountUpdate(store, formAccounts);

const addAccount = () => {
  store.addAccount();
  syncFormAccounts();
};

const removeAccount = (id: string) => {
  store.removeAccount(id);
  syncFormAccounts();
};
</script>