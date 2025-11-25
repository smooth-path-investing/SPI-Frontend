// src/lib/emailValidation.ts
import validator from 'validator';

/**
 * Checks if an email is valid format (RFC-compliant)
 * @param email - the email string to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};
