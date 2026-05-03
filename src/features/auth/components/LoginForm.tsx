import React from 'react';
import { Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LoginFormValues } from '../types';

interface LoginFormProps {
  values: LoginFormValues;
  setValues: React.Dispatch<React.SetStateAction<LoginFormValues>>;
  fieldClassName: string;
  onSubmit: (event: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  values,
  setValues,
  fieldClassName,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-sm text-[var(--foreground)]">
          Email
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-text)]" />
          <Input
            id="login-email"
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password" className="text-sm text-[var(--foreground)]">
          Password
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-text)]" />
          <Input
            id="login-password"
            type="password"
            value={values.password}
            onChange={(event) =>
              setValues((previousValues) => ({
                ...previousValues,
                password: event.target.value,
              }))
            }
            placeholder="Password"
            className={fieldClassName}
            autoComplete="current-password"
            required
          />
        </div>
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
