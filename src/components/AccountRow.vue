<template>
  <v-row class="account-row">
    <v-col cols="3">
      <v-text-field
        v-model="localAccount.labelInput"
        label="Метка"
        hint="Разделяйте метки точкой с запятой (;)"
        :error="!localAccount.isLabelValid"
        @update:modelValue="handleUpdate"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        v-model="localAccount.type"
        :items="accountTypes"
        label="Тип записи"
        :error="!localAccount.isTypeValid"
        @update:modelValue="handleUpdate"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="localAccount.login"
        label="Логин"
        :error="!localAccount.isLoginValid"
        @update:modelValue="handleUpdate"
      />
    </v-col>
    <v-col cols="2" v-if="localAccount.type === 'Local'">
      <v-text-field
        v-model="localAccount.password"
        label="Пароль"
        type="password"
        :error="!localAccount.isPasswordValid"
        @update:modelValue="handleUpdate"
      />
    </v-col>
    <v-col cols="1">
      <v-btn color="error" @click="$emit('remove', localAccount.id)">Удалить</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAccountValidation } from '@/utils/useAccountValidation';
import type { Account, AccountForm, ValidationFields } from '@/types/types';

const props = defineProps<{
  account: Account;
  accountTypes: string[];
}>();

const emit = defineEmits<{
  (e: 'update', account: AccountForm): void;
  (e: 'remove', id: string): void;
}>();

const localAccount = reactive<AccountForm>({
  ...props.account,
  labelInput: props.account.labels.map((label) => label.text).join(';'),
  isLabelValid: true,
  isTypeValid: true,
  isLoginValid: true,
  isPasswordValid: true,
});

const validationRules = {
  labelInput: (value: string) => value.length <= 50,
  type: (value: string) => props.accountTypes.includes(value),
  login: (value: string) => value.length > 0 && value.length <= 100,
  password: (value: string | null, account: AccountForm) =>
    account.type === 'LDAP' || (value !== null && value.length > 0 && value.length <= 100),
};

const validationFields: (Exclude<keyof AccountForm, ValidationFields>)[] = [
  'labelInput',
  'type',
  'login',
  'password',
];

const { validate } = useAccountValidation(localAccount, validationRules, validationFields);

validate(); 

const handleUpdate = () => {
  validate();
  emit('update', { ...localAccount });
};
</script>

<style scoped>
.account-row {
  margin-bottom: 16px;
}
</style>