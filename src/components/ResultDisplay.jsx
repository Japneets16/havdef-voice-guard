import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ResultDisplay = ({ 
  result, 
  confidence, 
  error 
}) => {
  if (error) {
    return (
      <Card className="p-6 border-danger">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-danger" />
          <div>
            <h3 className="font-semibold text-danger">Analysis Failed</h3>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!result) return null;

  const isHuman = result === 'human';
  const icon = isHuman ? CheckCircle : AlertTriangle;
  const IconComponent = icon;
  
  return (
    <Card className={`p-6 border-2 transition-all duration-300 ${
      isHuman ? 'border-success bg-success-light' : 'border-danger bg-danger-light'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${
            isHuman ? 'bg-success text-success-foreground' : 'bg-danger text-danger-foreground'
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {isHuman ? 'Human Voice Detected' : 'AI-Generated Voice Detected'}
            </h3>
            <p className="text-muted-foreground mt-1">
              {isHuman 
                ? 'This audio appears to be from a real human speaker'
                : 'This audio appears to be artificially generated'
              }
            </p>
          </div>
        </div>
        
        {confidence && (
          <div className="text-right">
            <Badge 
              variant="outline" 
              className={`text-lg px-3 py-1 ${
                isHuman ? 'border-success text-success' : 'border-danger text-danger'
              }`}
            >
              {confidence}% Confidence
            </Badge>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-background/50">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Security Assessment:</span>
          <span className={`text-sm font-medium ${
            isHuman ? 'text-success' : 'text-danger'
          }`}>
            {isHuman ? 'SAFE' : 'POTENTIALLY FRAUDULENT'}
          </span>
        </div>
      </div>
    </Card>
  );
};
