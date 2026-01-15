import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { routes } from "@/_lib/routes";
import useGetApisV2 from "@/Apis/v2/useGetApis";
import { useIsRTL } from "@/hooks/useRTL";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/components/ui/carousel";
import { Images } from "@/types/Images";

const HomeImagesCarousel = () => {
  const isRTL = useIsRTL();
  const router = useRouter();
  const { getHomeImagesApi } = useGetApisV2();
  const [images, setImages] = useState<Images | null>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const getAllImages = useCallback(async () => {
    try {
      const res = await getHomeImagesApi();
      setImages(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  }, [getHomeImagesApi]);

  useEffect(() => {
    getAllImages();
  }, [getAllImages]);

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className="w-full max-w-2xl overflow-hidden"
    >
      <CarouselContent>
        {isRTL ? (
          <>
            {images?.ar_images.map((el, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card>
                    <CardContent className="flex">
                      <Image
                        src={el.image}
                        className="cursor-pointer"
                        alt={el.image}
                        width={100}
                        height={100}
                        onClick={() => {
                          if (el.type === "New Launch") {
                            router.push(
                              routes.NewLaunches.id(encodeURIComponent(el.id))
                            );
                          } else if (el.type === "Project Category") {
                            router.push(routes.PropertiesList.slug(el.id));
                          }
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </>
        ) : (
          <>
            {images?.en_images.map((el, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card>
                    <CardContent className="flex">
                      <Image
                        className="cursor-pointer"
                        src={el.image}
                        alt={el.image}
                        width={1000}
                        height={800}
                        onClick={() => {
                          if (el.type === "New Launch") {
                            router.push(routes.NewLaunches.id(el.id));
                          } else if (el.type === "Project Category") {
                            router.push(routes.PropertiesList.slug(el.id));
                          }
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeImagesCarousel;
