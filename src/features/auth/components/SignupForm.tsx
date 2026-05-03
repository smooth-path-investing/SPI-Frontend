import React from 'react';
import { Lock, Mail, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-sm text-[var(--foreground)]">
          Name
        </Label>
        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-text)]" />
          <Input
            id="signup-name"
            type="text"
            value={values.fullName}
            onChange={(event) =>
              setValues((previousValues) => ({
                ...previousValues,
                fullName: event.target.value,
              }))
            }
            placeholder="Your name"
            className={fieldClassName}
            autoComplete="name"
            required
          />
        </div>
        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-sm text-[var(--foreground)]">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-text)]" />
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
            placeholder="you@example.com"
            className={fieldClassName}
            autoComplete="email"
            required
          />
        </div>
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-sm text-[var(--foreground)]">
          Password
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-text)]" />
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
            autoComplete="new-password"
            required
          />
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl border border-[var(--accent)] bg-[var(--accent)] text-sm font-semibold text-black shadow-[0_16px_34px_rgba(250,204,21,0.18)] hover:bg-[var(--accent-light)]"
      >
        Continue
      </Button>
    </form>
  );
};
