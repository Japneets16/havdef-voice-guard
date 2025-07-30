import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Square, RotateCcw, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const AudioRecorder = ({
  onRecordingComplete,
  recordedAudio,
  isLoading
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);
  
  const { toast } = useToast();

  useEffect(() => {
    checkMicrophonePermission();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      setHasPermission(false);
      toast({
        title: "Microphone permission required",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' });
        const url = URL.createObjectURL(blob);
        
        setAudioBlob(blob);
        setAudioURL(url);
        onRecordingComplete(blob);
        
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      toast({
        title: "Recording stopped",
        description: `Recorded ${formatTime(recordingTime)} of audio.`,
      });
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL(null);
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
    onRecordingComplete(null);
    
    toast({
      title: "Recording cleared",
      description: "Ready to record new audio.",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasPermission === false) {
    return (
      <Card className="p-8 text-center border-2 border-dashed border-destructive/50 bg-destructive/5">
        <div className="space-y-4">
          <MicOff className="w-12 h-12 text-destructive mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-destructive">Microphone Access Required</h3>
            <p className="text-muted-foreground mt-2">
              Please allow microphone access to record audio for analysis.
            </p>
          </div>
          <Button onClick={checkMicrophonePermission} variant="outline">
            <Mic className="w-4 h-4 mr-2" />
            Grant Permission
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {!audioBlob ? (
        <Card className={`border-2 border-dashed transition-all duration-300 relative overflow-hidden
          ${isRecording 
            ? 'border-destructive bg-destructive/5 shadow-lg shadow-destructive/20' 
            : 'border-primary/50 bg-gradient-to-br from-primary/5 to-accent/10 hover:shadow-md'
          }
          ${isLoading ? 'pointer-events-none opacity-50' : ''}
        `}>
          {/* Background waveform pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="flex items-center justify-center h-full">
              <div className="flex items-end gap-1">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className={`${isRecording ? 'bg-destructive' : 'bg-primary'} ${isRecording ? 'animate-pulse' : ''}`}
                    style={{
                      width: '3px',
                      height: `${Math.random() * 40 + 10}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.8s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-8 text-center relative z-10">
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full transition-all duration-300 ${
                isRecording 
                  ? 'bg-destructive text-destructive-foreground shadow-lg animate-pulse' 
                  : 'bg-gradient-to-br from-primary/10 to-accent hover:from-primary/20 hover:to-accent/80'
              }`}>
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </div>
              
              {/* Waveform icon */}
              <div className="flex items-center gap-1 opacity-40">
                <Waves className={`w-8 h-8 ${isRecording ? 'text-destructive' : 'text-primary'}`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {isRecording ? 'Recording Audio...' : 'Record Audio Live'}
                </h3>
                <p className="text-muted-foreground">
                  {isRecording 
                    ? `Recording time: ${formatTime(recordingTime)}` 
                    : 'Click the button below to start recording your voice'
                  }
                </p>
                {!isRecording && (
                  <p className="text-sm text-primary font-medium">
                    Speak clearly for best analysis results
                  </p>
                )}
              </div>
              
              <div className="flex gap-3">
                {!isRecording ? (
                  <Button 
                    onClick={startRecording}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200" 
                    disabled={isLoading || hasPermission === false}
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button 
                    onClick={stopRecording}
                    variant="destructive"
                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 border-success/30 bg-success/5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10 border border-success/20">
                  <Mic className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Audio Recording</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Duration: {formatTime(recordingTime)}</span>
                    <span>•</span>
                    <span className="text-success font-medium">Ready for analysis</span>
                  </div>
                </div>
              </div>
              {!isLoading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetRecording}
                  className="text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
                  title="Clear recording"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {/* Audio player controls */}
            <div className="flex items-center gap-3">
              <audio
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="hidden"
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={isPlaying ? pauseAudio : playAudio}
                disabled={!audioURL}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <div className="flex-1 bg-muted rounded-full h-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-30"></div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
