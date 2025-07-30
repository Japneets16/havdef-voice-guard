import React, { useState } from 'react';
import { AudioUpload } from '@/components/AudioUpload';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ResultDisplay } from '@/components/ResultDisplay';
import { DetectionLog } from '@/components/DetectionLog';
import { AboutSection } from '@/components/AboutSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Waves } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DetectionEntry {
  id: string;
  filename: string;
  result: 'human' | 'ai';
  confidence: number;
  timestamp: Date;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<'human' | 'ai' | null>(null);
  const [confidence, setConfidence] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [detectionHistory, setDetectionHistory] = useState<DetectionEntry[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload an audio file first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setResult(null);

    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock result - replace with actual API response
      const mockResult = Math.random() > 0.5 ? 'human' : 'ai';
      const mockConfidence = Math.floor(Math.random() * 20) + 80;
      
      setResult(mockResult);
      setConfidence(mockConfidence);

      // Add to history
      const newEntry: DetectionEntry = {
        id: Date.now().toString(),
        filename: selectedFile.name,
        result: mockResult,
        confidence: mockConfidence,
        timestamp: new Date()
      };
      setDetectionHistory(prev => [newEntry, ...prev]);

      toast({
        title: "Analysis complete",
        description: `Audio classified as ${mockResult === 'human' ? 'human' : 'AI-generated'}`,
      });

    } catch (err) {
      setError("Failed to analyze audio. Please try again.");
      toast({
        title: "Analysis failed",
        description: "An error occurred while processing your audio file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setConfidence(undefined);
    setError(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">HAVDEF</h1>
              <p className="text-sm text-muted-foreground">Hindi Audio-Visual Deepfake Defense</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Waves className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HAVDEF
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A real-time deepfake voice detection system for phone calls in Hinglish (Hindi + English)
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-accent/30 to-primary/5">
            <p className="text-lg font-medium text-center">
              Upload your audio file to check if it's AI-generated
            </p>
          </Card>
        </section>

        {/* Upload Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Audio Analysis</h3>
            <p className="text-muted-foreground">
              Upload a .wav or .mp3 file to detect if it contains AI-generated voice
            </p>
          </div>

          <AudioUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            isLoading={isLoading}
          />

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isLoading}
              className="px-8 py-3 text-lg font-medium"
              size="lg"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Audio'}
            </Button>
            
            {(selectedFile || result) && !isLoading && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="px-8 py-3"
              >
                Reset
              </Button>
            )}
          </div>
        </section>

        {/* Loading State */}
        {isLoading && (
          <section>
            <LoadingSpinner message="Analyzing audio for deepfake patterns..." />
          </section>
        )}

        {/* Results */}
        {(result || error) && !isLoading && (
          <section className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-6">Analysis Results</h3>
            <ResultDisplay result={result} confidence={confidence} error={error} />
          </section>
        )}

        {/* Detection History */}
        {detectionHistory.length > 0 && (
          <section>
            <DetectionLog entries={detectionHistory} />
          </section>
        )}

        {/* About Section */}
        <section>
          <AboutSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm opacity-80">
              © 2024 HAVDEF. Protecting against voice-based fraud with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
