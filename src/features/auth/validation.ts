import { isValidEmail } from '@/lib/emailValidation';
import type { AuthErrorMap, SignupFormValues } from './types';

const MIN_PASSWORD_LENGTH = 8;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

const formatDisplayNameWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getDisplayNameFromEmail = (email: string) => {
  const emailPrefix = normalizeEmail(email).split('@')[0] ?? '';
  const displayName = emailPrefix
    .split(/[._+\-\s]+/)
    .filter(Boolean)
    .map(formatDisplayNameWord)
    .join(' ');

  return displayName || 'Demo User';
};

export const validateSignupValues = (values: SignupFormValues): AuthErrorMap => {
  const nextErrors: AuthErrorMap = {};
  const normalizedEmail = normalizeEmail(values.email);

  if (!values.fullName.trim()) {
    nextErrors.fullName = 'Name is required';
  }

  if (!normalizedEmail) {
    nextErrors.email = 'Email is required';
  } else if (!isValidEmail(normalizedEmail)) {
    nextErrors.email = 'Invalid email format';
  }

  if (values.password.length < MIN_PASSWORD_LENGTH) {
    nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return nextErrors;
};
