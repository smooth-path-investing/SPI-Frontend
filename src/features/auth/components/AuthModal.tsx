import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { isValidEmail } from '@/lib/emailValidation';
import type {
  AuthErrorMap,
  AuthModalProps,
  AuthMode,
  LoginFormValues,
  SignupFormValues,
} from '../types';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

const EMPTY_LOGIN_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

const EMPTY_SIGNUP_VALUES: SignupFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: false,
};

const AUTH_FIELD_CLASS_NAME =
  'h-11 border-[#3f4654] bg-black/35 text-[var(--foreground)] placeholder:text-[var(--muted-text)]';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [activeTab, setActiveTab] = useState<AuthMode>('login');
  const [loginValues, setLoginValues] = useState<LoginFormValues>(EMPTY_LOGIN_VALUES);
  const [signupValues, setSignupValues] = useState<SignupFormValues>(EMPTY_SIGNUP_VALUES);
  const [errors, setErrors] = useState<AuthErrorMap>({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setActiveTab('login');
    }
  }, [isOpen]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(loginValues.email, loginValues.password);
    setLoginValues(EMPTY_LOGIN_VALUES);
    onClose();
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: AuthErrorMap = {};

    if (!signupValues.firstName.trim()) {
      nextErrors.firstName = 'First name is required';
    }
    if (!signupValues.lastName.trim()) {
      nextErrors.lastName = 'Last name is required';
    }
    if (!signupValues.email.trim()) {
      nextErrors.email = 'Email is required';
    }
    if (!isValidEmail(signupValues.email)) {
      nextErrors.email = 'Invalid email format';
    }
    if (signupValues.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }
    if (signupValues.password !== signupValues.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }
    if (!signupValues.agreedToTerms) {
      nextErrors.terms = 'You must agree to the terms and conditions';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onSignup(
      signupValues.email,
      signupValues.password,
      signupValues.firstName,
      signupValues.lastName,
    );
    setSignupValues(EMPTY_SIGNUP_VALUES);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-[640px] max-h-[92vh] overflow-y-auto rounded-2xl border-2 border-[#3f4654] bg-[var(--card-bg)] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-5 pb-4 bg-gradient-to-r from-black/55 to-black/25">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted-text)] mb-1">
              Smooth Path Investing
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)]">
              Access Your Account
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close authentication modal"
            className="p-1.5 rounded-md text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="grid grid-cols-2 rounded-xl border border-[#3f4654] bg-black/25 p-1.5 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`h-10 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`h-10 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'
              }`}
            >
              Login
            </button>
          </div>

          {activeTab === 'signup' ? (
            <SignupForm
              values={signupValues}
              setValues={setSignupValues}
              errors={errors}
              fieldClassName={AUTH_FIELD_CLASS_NAME}
              onSubmit={handleSignup}
            />
          ) : (
            <LoginForm
              values={loginValues}
              setValues={setLoginValues}
              fieldClassName={AUTH_FIELD_CLASS_NAME}
              onSubmit={handleLogin}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
