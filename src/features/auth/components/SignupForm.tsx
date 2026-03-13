import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AuthErrorMap, SignupFormValues } from '../types';

interface SignupFormProps {
  values: SignupFormValues;
  setValues: React.Dispatch<React.SetStateAction<SignupFormValues>>;
  errors: AuthErrorMap;
  fieldClassName: string;
  onSubmit: (event: React.FormEvent) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  values,
  setValues,
  errors,
  fieldClassName,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="signup-firstname" className="text-[var(--foreground)]">
            First Name
          </Label>
          <Input
            id="signup-firstname"
            type="text"
            value={values.firstName}
            onChange={(event) =>
              setValues((previousValues) => ({
                ...previousValues,
                firstName: event.target.value,
              }))
            }
            placeholder="John"
            className={fieldClassName}
            required
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-lastname" className="text-[var(--foreground)]">
            Last Name
          </Label>
          <Input
            id="signup-lastname"
            type="text"
            value={values.lastName}
            onChange={(event) =>
              setValues((previousValues) => ({
                ...previousValues,
                lastName: event.target.value,
              }))
            }
            placeholder="Doe"
            className={fieldClassName}
            required
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-[var(--foreground)]">
          Email Address
        </Label>
        <Input
          id="signup-email"
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((previousValues) => ({
              ...previousValues,
              email: event.target.value,
            }))
          }
          placeholder="john.doe@example.com"
          className={fieldClassName}
          required
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-[var(--foreground)]">
          Password
        </Label>
        <Input
          id="signup-password"
          type="password"
          value={values.password}
          onChange={(event) =>
            setValues((previousValues) => ({
              ...previousValues,
              password: event.target.value,
            }))
          }
          placeholder="At least 8 characters"
          className={fieldClassName}
          required
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password" className="text-[var(--foreground)]">
          Confirm Password
        </Label>
        <Input
          id="signup-confirm-password"
          type="password"
          value={values.confirmPassword}
          onChange={(event) =>
            setValues((previousValues) => ({
              ...previousValues,
              confirmPassword: event.target.value,
            }))
          }
          placeholder="Re-enter your password"
          className={fieldClassName}
          required
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={values.agreedToTerms}
          onCheckedChange={(checked) =>
            setValues((previousValues) => ({
              ...previousValues,
              agreedToTerms: Boolean(checked),
            }))
          }
          className="mt-0.5 border-[#3f4654] data-[state=checked]:border-[var(--accent)] data-[state=checked]:bg-[var(--accent)] data-[state=checked]:text-black"
        />
        <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed text-[var(--muted-text)]">
          I agree to the{' '}
          <a
            href="/terms"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </Label>
      </div>
      {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}

      <Button
        type="submit"
        className="w-full h-11 bg-[var(--accent)] text-black border border-[var(--accent)] hover:bg-[var(--accent-light)] font-semibold"
      >
        Create Account
      </Button>
    </form>
  );
};
