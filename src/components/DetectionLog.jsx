import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, FileAudio } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const DetectionLog = ({ entries }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (entries.length === 0) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-0 h-auto"
        >
          <h3 className="text-lg font-semibold">Detection History ({entries.length})</h3>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileAudio className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{entry.filename}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      entry.result === 'human'
                        ? 'border-success text-success'
                        : 'border-danger text-danger'
                    }`}
                  >
                    {entry.result === 'human' ? 'Human' : 'AI'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {entry.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
