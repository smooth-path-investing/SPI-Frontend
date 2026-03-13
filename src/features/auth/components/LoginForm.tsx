import React from 'react';
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
        <Label htmlFor="login-email" className="text-[var(--foreground)]">
          Email
        </Label>
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
          placeholder="Enter your email"
          className={fieldClassName}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password" className="text-[var(--foreground)]">
          Password
        </Label>
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
          placeholder="Enter your password"
          className={fieldClassName}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full h-11 bg-[var(--accent)] text-black border border-[var(--accent)] hover:bg-[var(--accent-light)] font-semibold"
      >
        Login
      </Button>
    </form>
  );
};
