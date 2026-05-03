import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, X } from 'lucide-react';
import { lockDocumentScroll, unlockDocumentScroll } from '@/lib/scrollLock';
import type {
  AuthErrorMap,
  AuthModalProps,
  AuthMode,
  LoginFormValues,
  SignupFormValues,
} from '../types';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { normalizeEmail, validateSignupValues } from '../validation';

const EMPTY_LOGIN_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

const EMPTY_SIGNUP_VALUES: SignupFormValues = {
  fullName: '',
  email: '',
  password: '',
};

const AUTH_FIELD_CLASS_NAME =
  'h-12 rounded-xl border-white/15 bg-black/30 pl-11 text-[var(--foreground)] shadow-inner shadow-black/20 placeholder:text-[var(--muted-text)] focus-visible:ring-[var(--accent)]/65';

const AUTH_HIGHLIGHTS = [
  'Quarterly stock picks',
  'Demo account access',
  'No payment required here',
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [activeTab, setActiveTab] = useState<AuthMode>('login');
  const [loginValues, setLoginValues] = useState<LoginFormValues>(EMPTY_LOGIN_VALUES);
  const [signupValues, setSignupValues] = useState<SignupFormValues>(EMPTY_SIGNUP_VALUES);
  const [errors, setErrors] = useState<AuthErrorMap>({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    lockDocumentScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      unlockDocumentScroll();
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
    onLogin(normalizeEmail(loginValues.email), loginValues.password);
    setLoginValues(EMPTY_LOGIN_VALUES);
    onClose();
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validateSignupValues(signupValues);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const [firstName = 'Demo', ...remainingNameParts] = signupValues.fullName.trim().split(/\s+/);
    const lastName = remainingNameParts.join(' ') || 'User';

    onSignup(
      normalizeEmail(signupValues.email),
      signupValues.password,
      firstName,
      lastName,
    );
    setSignupValues(EMPTY_SIGNUP_VALUES);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 text-[var(--foreground)] backdrop-blur-md sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative grid max-h-[92vh] w-full max-w-[820px] overflow-y-auto rounded-[28px] border border-white/15 bg-[var(--card-bg)] shadow-[0_28px_80px_rgba(0,0,0,0.58)] lg:grid-cols-[0.9fr_1.1fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/35 p-2 text-[var(--muted-text)] transition-colors hover:bg-white/10 hover:text-[var(--foreground)]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="hidden min-h-full border-r border-white/10 bg-[linear-gradient(145deg,rgba(250,204,21,0.12),rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.55))] p-7 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
              Smooth Path Investing
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
              Simple access for the SPI preview.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-text)]">
              Sign in with demo details for now. Real authentication can plug into this shell later.
            </p>
          </div>

          <div className="space-y-3">
            {AUTH_HIGHLIGHTS.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/85"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="mb-7 pr-10">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
              {activeTab === 'login' ? 'Welcome back' : 'Create preview access'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {activeTab === 'login' ? 'Login to continue' : 'Sign up in seconds'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-text)]">
              {activeTab === 'login'
                ? 'Use any email and password to enter the current mock flow.'
                : 'A short mock sign-up keeps the screen lightweight until real auth is ready.'}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-2xl border border-white/10 bg-black/30 p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`h-10 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`h-10 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'
              }`}
            >
              Sign up
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
