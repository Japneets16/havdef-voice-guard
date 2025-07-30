import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ 
  message = "Analyzing audio..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
        {/* Center loader icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-xl font-semibold text-primary">{message}</p>
        <p className="text-sm text-muted-foreground">
          AI algorithms are analyzing voice patterns...
        </p>
        <div className="flex items-center justify-center gap-1 mt-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
