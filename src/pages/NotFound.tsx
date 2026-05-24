import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-4 rounded-3xl border border-rose-200 bg-white/80 p-8 shadow-soft backdrop-blur-sm">
        <p className="text-4xl">💌</p>
        <h1 className="font-romantic text-4xl text-gradient-love">Page not found</h1>
        <p className="text-sm text-foreground/70">
          The love note you are looking for moved somewhere sweeter.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-300 to-rose-300 px-5 py-2.5 text-sm font-semibold text-rose-800 shadow-lg transition-transform hover:scale-105"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
