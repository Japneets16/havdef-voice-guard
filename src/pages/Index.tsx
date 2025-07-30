import React, { useState } from 'react';
import { AudioUpload } from '@/components/AudioUpload';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ResultDisplay } from '@/components/ResultDisplay';
import { DetectionLog } from '@/components/DetectionLog';
import { AboutSection } from '@/components/AboutSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Waves, Upload, Github, Linkedin, Mail } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Hero Section */}
        <section className="relative text-center space-y-6 py-12">
          {/* Background gradient blob */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-full blur-3xl opacity-50"></div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-12 h-12 text-primary animate-pulse" />
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                HAVDEF
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              AI against AI — real-time detection of synthetic Hinglish voices
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Protect yourself from AI-generated voice scams in real time.
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-accent/40 to-primary/10 border-primary/20 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Upload className="w-6 h-6 text-primary" />
              <p className="text-xl font-semibold text-center">
                Upload your audio file to check if it's AI-generated
              </p>
            </div>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isLoading}
              className="px-8 py-3 text-lg font-medium w-full sm:w-auto hover:scale-105 transition-transform duration-200"
              size="lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              {isLoading ? 'Analyzing...' : 'Analyze Audio'}
            </Button>
            
            {(selectedFile || result) && !isLoading && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="px-8 py-3 w-full sm:w-auto hover:scale-105 transition-transform duration-200"
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
      <footer className="bg-gradient-to-r from-secondary to-primary text-secondary-foreground mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Shield className="w-6 h-6" />
                <h3 className="text-xl font-bold">HAVDEF</h3>
              </div>
              <p className="text-sm opacity-80">
                Protecting against voice-based fraud with AI detection technology.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="text-center">
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex justify-center gap-4">
                <a href="#" className="hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Credits */}
            <div className="text-center md:text-right">
              <p className="text-sm opacity-80 mb-2">
                Built with ❤️ using React + Tailwind
              </p>
              <p className="text-xs opacity-60">
                © 2024 HAVDEF. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
