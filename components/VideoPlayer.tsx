'use client';

import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  onTimeUpdate: (time: number) => void;
  isPlaying: boolean;
  questionActive?: boolean; // When true, prevent manual play during questions
  seekTo?: number; // Time to seek to when this changes
}

export function VideoPlayer({ videoSrc, onTimeUpdate, isPlaying, questionActive = false, seekTo }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    const playAudio = () => {
      audio.currentTime = video.currentTime;
      audio.play().catch(() => {
        const unlockAudio = () => {
          // Remove listeners immediately
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);

          // Only play if video is currently active
          if (!video.paused) {
            audio.currentTime = video.currentTime;
            audio.play().catch(console.error);
          }
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('keydown', unlockAudio);
      });
    };

    const handleTimeUpdate = () => {
      onTimeUpdate(video.currentTime);
      
      // Sync audio with video if they drift
      if (Math.abs(audio.currentTime - video.currentTime) > 0.2) {
        audio.currentTime = video.currentTime;
      }
    };

    const handlePlay = (e: Event) => {
      if (questionActive) {
        e.preventDefault();
        video.pause();
        audio.pause();
      } else {
        playAudio();
      }
    };

    const handlePause = () => {
      audio.pause();
    };

    const handleSeeking = () => {
      audio.currentTime = video.currentTime;
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('seeking', handleSeeking);

    // If already playing (e.g. via autoPlay), start audio
    if (!video.paused) {
      playAudio();
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('seeking', handleSeeking);
    };
  }, [onTimeUpdate, questionActive]);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    if (isPlaying) {
      video.play().catch(() => {});
      // The video play event will trigger audio play via handlePlay
    } else {
      video.pause();
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio || seekTo === undefined) return;

    video.currentTime = seekTo;
    audio.currentTime = seekTo;
  }, [seekTo]);

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-lg"
        controls // Always show controls for demo
        muted // Start muted to allow autoplay and use custom audio
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <audio
        ref={audioRef}
        src="/drum-and-flute.mp3"
        style={{ display: 'none' }}
        preload="auto"
      />
    </div>
  );
}
