<!-- src/components/AccountRow.vue -->
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
import { type Account } from '@/store/accounts';

interface AccountForm extends Account {
  labelInput: string;
  isLabelValid: boolean;
  isTypeValid: boolean;
  isLoginValid: boolean;
  isPasswordValid: boolean;
}

const props = defineProps<{
  account: AccountForm;
}>();

const emit = defineEmits<{
  (e: 'update', account: AccountForm): void;
  (e: 'remove', id: string): void;
}>();

const accountTypes = ['LDAP', 'Local'];

const localAccount = reactive<AccountForm>({ ...props.account });

const validateField = (field: keyof AccountForm, value: any, account: AccountForm) => {
  switch (field) {
    case 'labelInput':
      return value.length <= 50;
    case 'type':
      return ['LDAP', 'Local'].includes(value);
    case 'login':
      return value.length > 0 && value.length <= 100;
    case 'password':
      return account.type === 'LDAP' || (value !== null && value.length > 0 && value.length <= 100);
    default:
      return true;
  }
};

const handleUpdate = () => {
  localAccount.isLabelValid = validateField('labelInput', localAccount.labelInput, localAccount);
  localAccount.isTypeValid = validateField('type', localAccount.type, localAccount);
  localAccount.isLoginValid = validateField('login', localAccount.login, localAccount);
  localAccount.isPasswordValid = validateField('password', localAccount.password, localAccount);

  emit('update', { ...localAccount });
};
</script>

<style scoped>
.account-row {
  margin-bottom: 16px;
}
</style>