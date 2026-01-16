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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onTimeUpdate(video.currentTime);
    };

    const handlePlay = (e: Event) => {
      if (questionActive) {
        e.preventDefault();
        video.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
    };
  }, [onTimeUpdate, questionActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || seekTo === undefined) return;

    video.currentTime = seekTo;
  }, [seekTo]);

  return (
    <div className="relative w-full bg-black/90 aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full md:rounded-lg shadow-lg"
        controls // Always show controls for demo
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
