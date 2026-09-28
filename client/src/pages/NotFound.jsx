import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-5xl mb-4">404</h1>
      <p className="text-mocha mb-8">This page could not be found.</p>
      <Button to="/">Back to Home</Button>
    </div>
  );
}
