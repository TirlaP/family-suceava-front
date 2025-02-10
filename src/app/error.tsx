'use client';

import ErrorDisplay from "@/components/ErrorDisplay";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorDisplay error={error} reset={reset} />
      </div>
    </div>
  );
}