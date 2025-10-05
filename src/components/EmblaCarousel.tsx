"use client";

import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";

import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const isRTL = useIsRTL();
  const isMobile = useMobile();
  const { slides, options } = props;

  // Use [emblaApi] To Use prev/next buttons or other plugins
  const [emblaRef] = useEmblaCarousel(
    { ...options, direction: isRTL ? "rtl" : "ltr" },
    [
      AutoScroll({
        playOnInit: true,
        speed: isMobile ? 2 : 3,
        startDelay: 0,
        stopOnInteraction: false,
      }),
    ]
  );

  // Here if we want to use the prev/next buttons
  //   const {
  //     prevBtnDisabled,
  //     nextBtnDisabled,
  //     onPrevButtonClick,
  //     onNextButtonClick,
  //   } = usePrevNextButtons(emblaApi);

  //   const onButtonAutoplayClick = useCallback(
  //     (callback: () => void) => {
  //       const autoScroll = emblaApi?.plugins()?.autoScroll;
  //       if (!autoScroll) return;

  //       const resetOrStop =
  //         autoScroll.options.stopOnInteraction === false
  //           ? autoScroll.reset
  //           : autoScroll.stop;

  //       resetOrStop();
  //       callback();
  //     },
  //     [emblaApi]
  //   );

  return (
    <div>
      {isMobile ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides?.map((image, index) => (
              <div key={index} className="min-w-[150px] p-4">
                <div className="relative w-[20vmin] h-[20vmin] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides?.map((image, index) => (
              <div key={index} className="min-w-[500px] p-4">
                <div className="relative w-[40vmin] h-[40vmin] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Here If we want to use the prev/next buttons */}
      {/* <div className="relative">
        <PrevButton
          onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
          className="absolute left-4 bottom-24 -translate-y-1/2 z-50 flex items-center justify-center w-6 h-10 rounded-full bg-primary hover:bg-primary/80 text-white shadow-lg transition cursor-pointer"
          disabled={prevBtnDisabled}
        />
        <NextButton
          onClick={() => onButtonAutoplayClick(onNextButtonClick)}
          className="absolute right-4 bottom-24 -translate-y-1/2 z-50 flex items-center justify-center w-6 h-10 rounded-full bg-primary hover:bg-primary/80 text-white shadow-lg transition cursor-pointer"
          disabled={nextBtnDisabled}
        />
      </div> */}
    </div>
  );
};

export default EmblaCarousel;
