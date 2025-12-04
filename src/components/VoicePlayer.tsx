"use client";
import { Play, Pause, AudioLines } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";

type Props = {
  src: string;
  title: string;
};

export default function VoicePlayer({ src, title }: Props) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  return (
    <Dialog onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <button className="w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center">
          <AudioLines className="text-gray-500" size={28} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Button size="icon" onClick={togglePlay}>
            {playing ? <Pause /> : <Play />}
          </Button>
          <audio ref={audioRef} src={src} preload="auto" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            step="0.1"
            onChange={handleSeek}
            className="flex-1 accent-primary"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
