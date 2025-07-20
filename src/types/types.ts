export interface Account {
  id: string;
  labels: { text: string }[];
  type: 'LDAP' | 'Local';
  login: string;
  password: string | null;
}

export interface AccountForm extends Account {
  labelInput: string;
  isLabelValid: boolean;
  isTypeValid: boolean;
  isLoginValid: boolean;
  isPasswordValid: boolean;
}

export type ValidationFields = 'isLabelValid' | 'isTypeValid' | 'isLoginValid' | 'isPasswordValid';

export interface AccountStore {
  accounts: Account[];
  addAccount: () => void;
  updateAccount: (id: string, update: Partial<Account>) => void;
  removeAccount: (id: string) => void;
}