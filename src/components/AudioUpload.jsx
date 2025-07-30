import React, { useCallback, useState } from 'react';
import { Upload, File, X, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const AudioUpload = ({
  onFileSelect,
  selectedFile,
  isLoading
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.includes('audio') || file.name.endsWith('.wav') || file.name.endsWith('.mp3')) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  const removeFile = useCallback(() => {
    onFileSelect(null);
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <Card 
          className={`border-2 border-dashed transition-all duration-300 cursor-pointer relative overflow-hidden
            ${isDragActive 
              ? 'border-primary bg-accent shadow-lg scale-105 shadow-primary/20' 
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50 hover:shadow-md'
            }
            ${isLoading ? 'pointer-events-none opacity-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Background waveform pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="flex items-center justify-center h-full">
              <div className="flex items-end gap-1">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-primary animate-pulse"
                    style={{
                      width: '3px',
                      height: `${Math.random() * 40 + 10}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1.5s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-8 text-center relative z-10">
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full transition-all duration-300 ${
                isDragActive 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'bg-gradient-to-br from-primary/10 to-accent hover:from-primary/20 hover:to-accent/80'
              }`}>
                <Upload className="w-8 h-8" />
              </div>
              
              {/* Waveform icon */}
              <div className="flex items-center gap-1 opacity-40">
                <Waves className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Upload Audio File</h3>
                <p className="text-muted-foreground">
                  Drag and drop your audio file here, or click to browse
                </p>
                <p className="text-sm text-warning font-medium">
                  Only .mp3/.wav files under 5MB
                </p>
              </div>
              <input
                type="file"
                accept=".wav,.mp3,audio/*"
                onChange={handleFileInput}
                className="hidden"
                id="audio-upload"
                disabled={isLoading}
              />
              <label htmlFor="audio-upload">
                <Button 
                  variant="outline" 
                  className="cursor-pointer hover:scale-105 transition-transform duration-200" 
                  disabled={isLoading}
                >
                  Choose File
                </Button>
              </label>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 border-success/30 bg-success/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10 border border-success/20">
                <File className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span>•</span>
                  <span className="text-success font-medium">Ready for analysis</span>
                </div>
              </div>
            </div>
            {!isLoading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
