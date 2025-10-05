"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  img: string;
};

const BackgroundImage = ({ img }: Props) => {
  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Image
        src={img}
        alt="Our mission"
        fill
        className="object-cover shadow-xl"
        priority
      />
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.5)]" />
    </motion.div>
  );
};

export default BackgroundImage;
