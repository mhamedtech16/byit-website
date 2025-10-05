"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import EmblaCarousel from "@/components/EmblaCarousel";
import { APP_STORE, GOOGLE_APP } from "@/constants/downloadApps";
import { HOMEIMAGES } from "@/constants/imgs";
import { OPTIONS } from "@/constants/options";

function HomePageMobile() {
  const t = useTranslations();
  const containerRef = useRef(null);

  // Track scroll progress of the image container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // starts animating when it enters view
  });
  // Transform scroll progress to a scale value
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1.5]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeInOut", // ✅ correct type
      },
    }),
  };

  return (
    <div className="text-white min-h-screen pb-12">
      {/* Section 1: Full Width Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
        className="items-center justify-center flex relative h-[35vmin] w-full"
      >
        <Image
          src={
            "https://static.wixstatic.com/media/f5ca3f_0b209cbc4d354707b13642b0e47ddf8c~mv2.png/v1/fill/w_1362,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/f5ca3f_0b209cbc4d354707b13642b0e47ddf8c~mv2.png"
          }
          alt="Our mission"
          fill
          className="object-cover shadow-xl"
        />
      </motion.div>

      {/* Section 2: Text + Image */}
      <div className="text-center py-16 bg-[#f3f2f1] overflow-hidden">
        <motion.h1
          className="text-xl font-bold text-primary"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {t("yourPocketSizedBrokerageFirm")}
        </motion.h1>
        <motion.p
          className="text-md font-black mt-4 text-orangeApp"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {t("commissionForDevelopersEveryDeal")}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="space-y-4 mt-8"
        >
          <div>
            <button
              className="px-6 py-3 text-white  transition relative w-[50vmin] h-[14vmin] cursor-pointer"
              onClick={() => window.open(GOOGLE_APP)}
            >
              <Image
                src={
                  "https://static.wixstatic.com/media/f5ca3f_35de1512d031441e973b59d32c3289f2~mv2.png/v1/fill/w_188,h_56,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-1823979425_b.png"
                }
                alt="Google App"
                fill
                className="object-cover"
              />
            </button>
          </div>
          <div>
            <button
              className="px-6 py-3 text-white  transition relative w-[50vmin] h-[14vmin] cursor-pointer"
              onClick={() => window.open(APP_STORE)}
            >
              <Image
                src={
                  "https://static.wixstatic.com/media/f5ca3f_4016908648d445e48d80aee4699dc1b6~mv2.png/v1/fill/w_178,h_65,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-1823979425_b.png CUASOR"
                }
                alt="App Store"
                fill
                className="object-cover"
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={containerRef}
          style={{ scale }}
          className="relative w-[300px] h-[300px] mx-auto mt-20"
        >
          <Image
            src="https://static.wixstatic.com/media/f5ca3f_fb82543833494effb3848bd13bf34edf~mv2.png"
            alt="Mobile App Preview"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Section 3: Embla Carousel */}
      <motion.p
        className="text-4xl font-bold mt-12 text-primary text-center"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        {t("ourPartners")}
      </motion.p>
      <section className="mt-12">
        <EmblaCarousel slides={HOMEIMAGES} options={OPTIONS} />
      </section>
    </div>
  );
}

export default HomePageMobile;
