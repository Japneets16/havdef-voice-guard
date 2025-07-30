import React from 'react';
import { Brain, Shield, Smartphone, Zap, Mic } from 'lucide-react';
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
    <div className="w-full max-w-6xl mx-auto space-y-16">
      <div className="text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">How HAVDEF Works</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          HAVDEF uses cutting-edge machine learning technology to analyze audio characteristics 
          and detect artificial voice generation, specifically optimized for Hinglish conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group border-primary/10 hover:border-primary/30"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Why It Matters section */}
      <div className="relative bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/10 rounded-2xl p-12 text-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4">
            <Mic className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Shield className="w-16 h-16 text-secondary" />
          </div>
          <div className="absolute top-1/3 right-1/4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Deepfake Detection Matters
          </h2>
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground/90 italic leading-relaxed">
            "Scams speak your language. Let HAVDEF speak truth to them."
          </blockquote>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            With the rise of AI-generated voices, protecting against voice-based fraud has become critical. 
            HAVDEF provides an essential layer of security for phone calls, especially in regions where 
            Hinglish communication is prevalent.
          </p>
        </div>
      </div>
    </div>
  );
};