import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Analyzing audio..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <div className="absolute inset-0 w-8 h-8 border-2 border-primary/20 rounded-full"></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium">{message}</p>
        <p className="text-sm text-muted-foreground mt-1">
          This may take a few moments
        </p>
      </div>
    </div>
  );
};