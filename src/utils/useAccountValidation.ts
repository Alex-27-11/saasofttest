import type { AccountForm, ValidationFields } from '@/types/types';

export const useAccountValidation = (
  account: AccountForm,
  validationRules: Record<string, (value: any, account: AccountForm) => boolean>,
  fields: (Exclude<keyof AccountForm, ValidationFields>)[]
) => {
  const validateField = (field: keyof AccountForm, value: any) => {
    return validationRules[field]?.(value, account) ?? true;
  };

  const validate = () => {
    fields.forEach((field) => {
      const validField = `is${field.charAt(0).toUpperCase() + field.slice(1)}Valid` as ValidationFields;
      account[validField] = validateField(field, account[field]);
    });
  };

  return { validate };
};