// app/components/ui/VideoHero.tsx
"use client";

import { useState, useEffect, useRef } from "react";

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  isMuted: () => boolean;
  destroy: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string;
          playerVars?: {
            autoplay?: number;
            mute?: number;
            controls?: number;
            loop?: number;
            playlist?: string;
            rel?: number;
            showinfo?: number;
            modestbranding?: number;
            iv_load_policy?: number;
            fs?: number;
            disablekb?: number;
            playsinline?: number;
          };
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void;
            onStateChange?: (event: { target: YouTubePlayer; data: number }) => void;
            onError?: (event: { target: YouTubePlayer; data: number }) => void;
          };
        }
      ) => YouTubePlayer;
    };
  }
}

export default function VideoHero() {
  const [isMuted, setIsMuted] = useState(true); // Start muted for mobile autoplay
  const [showButton, setShowButton] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    // Check if device is mobile
    isMobile.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      if (player) {
        player.destroy();
      }
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  const initializePlayer = () => {
    if (!playerRef.current || isInitialized.current) return;
    isInitialized.current = true;
    
    const newPlayer = new window.YT.Player(playerRef.current, {
      videoId: 'PZT1m6Svx7k',
      playerVars: {
        autoplay: 1,
        mute: 1, // Always start muted to ensure autoplay works on mobile
        controls: 0,
        loop: 1,
        playlist: 'PZT1m6Svx7k',
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        fs: 0,
        disablekb: 1,
        playsinline: 1, // Required for iOS autoplay
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          // If on mobile, stay muted (required for autoplay)
          // If on desktop, unmute and set volume
          if (!isMobile.current) {
            event.target.unMute();
            event.target.setVolume(100);
            setIsMuted(false);
          } else {
            // On mobile, keep muted but ensure video is playing
            event.target.mute();
            setIsMuted(true);
          }
        },
        onStateChange: (event) => {
          // If video is paused on mobile, try to play it again
          if (isMobile.current && event.data === 2) { // 2 = paused
            event.target.playVideo();
          }
        },
      },
    });
    setPlayer(newPlayer);
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        player.setVolume(100);
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowButton(false);
    }, 500);
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-white overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Fawkyumean brand hero video - streetwear and skate culture"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <div
            ref={playerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       w-[300%] sm:w-[200%] md:w-[177.78vh] 
                       min-w-full min-h-[56.25vw] 
                       h-auto"
          />
        </div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className={`fixed top-6 left-6 z-50 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 border border-white/20 ${
          showButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
        <span className="text-xs font-medium tracking-wider uppercase">
          {isMuted ? 'Unmute' : 'Mute'}
        </span>
      </button>
    </section>
  );
}