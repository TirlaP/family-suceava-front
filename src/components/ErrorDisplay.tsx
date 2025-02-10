'use client';

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: Error;
  reset?: () => void;
}

export default function ErrorDisplay({ error, reset }: ErrorDisplayProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {error.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        {reset && (
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}