"use client";

import React, { useEffect, useRef, useState } from "react";

import { SkeletonLoading } from "@/components/SkeletonComponent";
import { useGuideLines } from "@/hooks/useGuideLines";

export default function GuideLinesList() {
  const { guideLines, loading } = useGuideLines();
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video && !video.paused) {
        video.pause();
      }
    });
  };

  useEffect(() => {
    if (!loading && firstLoad) {
      setFirstLoad(false);
    }
  }, [loading, firstLoad]);

  if (firstLoad) {
    return <SkeletonLoading />;
  }

  return (
    <div className="bg-primary flex flex-col items-center py-10">
      {guideLines.map((item, index) => (
        <div key={index} className="mb-6 px-4">
          <h1
            className="text-4xl text-right text-white mb-4 font-medium"
            dir="rtl"
          >
            {item.title}
          </h1>

          <video
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            src={item.video}
            poster={item.thumbnail}
            controls
            className="rounded-2xl"
            onPlay={() => handlePlay(index)}
          />
        </div>
      ))}
    </div>
  );
}
