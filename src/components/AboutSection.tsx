import React from 'react';
import { Brain, Shield, Smartphone, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms trained to identify deepfake audio patterns in real-time.'
    },
    {
      icon: Smartphone,
      title: 'Hinglish Support',
      description: 'Specialized detection for Hindi-English mixed conversations, common in Indian phone calls.'
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Fast processing that can analyze audio files and provide results within seconds.'
    },
    {
      icon: Shield,
      title: 'Security Focused',
      description: 'Designed to protect against voice-based fraud and social engineering attacks.'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">How HAVDEF Works</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          HAVDEF uses cutting-edge machine learning technology to analyze audio characteristics 
          and detect artificial voice generation, specifically optimized for Hinglish conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-accent/50">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">Why Deepfake Detection Matters</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With the rise of AI-generated voices, protecting against voice-based fraud has become critical. 
            HAVDEF provides an essential layer of security for phone calls, especially in regions where 
            Hinglish communication is prevalent.
          </p>
        </div>
      </Card>
    </div>
  );
};