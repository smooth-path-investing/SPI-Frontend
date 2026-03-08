import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthModalProps } from '@/types';
import { isValidEmail } from '@/lib/emailValidation';
import { X } from 'lucide-react';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fieldClassName =
    'h-11 border-[#3f4654] bg-black/35 text-[var(--foreground)] placeholder:text-[var(--muted-text)]';

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
    setLoginEmail('');
    setLoginPassword('');
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validation
    if (!signupFirstName.trim()) newErrors.firstName = 'First name is required';
    if (!signupLastName.trim()) newErrors.lastName = 'Last name is required';
    if (!signupEmail.trim()) newErrors.email = 'Email is required';
    if (!isValidEmail(signupEmail)) newErrors.email = 'Invalid email format';

    if (signupPassword.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (signupPassword !== signupConfirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSignup(signupEmail, signupPassword, signupFirstName, signupLastName);
    setSignupFirstName('');
    setSignupLastName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setAgreedToTerms(false);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
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
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="signup-firstname" className="text-[var(--foreground)]">
                    First Name
                  </Label>
                  <Input
                    id="signup-firstname"
                    type="text"
                    value={signupFirstName}
                    onChange={(e) => setSignupFirstName(e.target.value)}
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
                    value={signupLastName}
                    onChange={(e) => setSignupLastName(e.target.value)}
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
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
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
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
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
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={fieldClassName}
                  required
                />
                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))}
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
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-[var(--foreground)]">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
