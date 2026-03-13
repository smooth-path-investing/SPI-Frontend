import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccentPill, FeatureSurface } from '@/components/ui/feature-surface';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 pt-20 text-foreground sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />

      <FeatureSurface className="relative z-10 w-full max-w-2xl">
        <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
          <AccentPill className="mb-5">404 Error</AccentPill>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--muted-text)] sm:text-lg">
            The page you requested does not exist or may have been moved to a different route.
          </p>

          <Button
            asChild
            className="mt-8 h-11 border border-[var(--accent)] bg-[var(--accent)] px-6 text-black hover:bg-[var(--accent-light)]"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </FeatureSurface>
    </div>
  );
};

export default NotFound;
