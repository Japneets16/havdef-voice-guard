import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AudioUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  isLoading: boolean;
}

export const AudioUpload: React.FC<AudioUploadProps> = ({
  onFileSelect,
  selectedFile,
  isLoading
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
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

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
          className={`border-2 border-dashed transition-all duration-200 cursor-pointer
            ${isDragActive 
              ? 'border-primary bg-accent' 
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
            }
            ${isLoading ? 'pointer-events-none opacity-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full transition-colors ${isDragActive ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Upload className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Upload Audio File</h3>
                <p className="text-muted-foreground">
                  Drag and drop your audio file here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports .wav and .mp3 files
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
                <Button variant="outline" className="cursor-pointer" disabled={isLoading}>
                  Choose File
                </Button>
              </label>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <File className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!isLoading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-muted-foreground hover:text-foreground"
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