'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, type Variants, type TargetAndTransition } from 'framer-motion';

type CustomVariantFunction = (custom: "left" | "right") => TargetAndTransition;

interface SplitVariants extends Variants {
  hoverState: CustomVariantFunction;
  fullScreen: CustomVariantFunction;
  hiddenOnAnimate: TargetAndTransition;
}

const MotionSection = motion.div as any;

const InteractiveSplitSection = () => {
  const router = useRouter();
  const [activeSide, setActiveSide] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const variants: SplitVariants = useMemo(() => ({
    initial: {
      flexGrow: 1,
      transition: { duration: 0.25 },
    },
    hoverState: (side) => ({
      flexGrow: activeSide === side ? 1.25 : 0.75,
      transition: { duration: 0.25, ease: "easeOut" },
    }),
    fullScreen: (side) => ({
      width: "100vw",
      height: "100vh",
      left: side === "left" ? 0 : "auto",
      right: side === "right" ? 0 : "auto",
      top: 0,
      position: "fixed",
      zIndex: 50,
      transition: { duration: 0.35, ease: [0.6, 0.01, -0.05, 0.9] },
    }),
    hiddenOnAnimate: {
      opacity: 0,
      filter: "blur(4px)",
      pointerEvents: "none",
      transition: { duration: 0.15 },
    },
  }), [activeSide]);

  const handleClick = (side: "left" | "right") => {
    setActiveSide(side);
    setIsAnimating(true);

    setTimeout(() => {
      router.push(side === "left" ? "/kategori/makineler" : "/kategori/hammaddeler");
    }, 350);
  };

  return (
    <section className="relative w-full h-[80vh] rounded-2xl overflow-hidden px-4">
      <div
        className="flex flex-col lg:flex-row w-full h-full overflow-hidden rounded-2xl border border-slate-800"
        onMouseLeave={() => !isAnimating && setActiveSide(null)}
      >
        {/* SOL */}
        <MotionSection
          className="relative h-full cursor-pointer bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url(/img/onurhan-makina-3.jpg)" }}  // ✨ Karartma kaldırıldı
          onMouseEnter={() => !isAnimating && setActiveSide("left")}
          onClick={() => handleClick("left")}
          initial="initial"
          animate={
            !isAnimating ? (activeSide ? "hoverState" : "initial") :
            activeSide === "left" ? "fullScreen" : "hiddenOnAnimate"
          }
          custom="left"
          variants={variants}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-black/20 px-10 py-4 rounded-lg backdrop-blur-sm ">
            Makine ilanları için tıklayınız
          </h2>
        </MotionSection>

        {/* SAĞ */}
        <MotionSection
          className="relative h-full cursor-pointer bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url(/img/mainbg1.webp)" }}  // ✨ Karartma kaldırıldı
          onMouseEnter={() => !isAnimating && setActiveSide("right")}
          onClick={() => handleClick("right")}
          initial="initial"
          animate={
            !isAnimating ? (activeSide ? "hoverState" : "initial") :
            activeSide === "right" ? "fullScreen" : "hiddenOnAnimate"
          }
          custom="right"
          variants={variants}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-black/20 px-10 py-4 rounded-lg backdrop-blur-sm ">
            Hammadde ilanları için tıklayınız
          </h2>
        </MotionSection>
      </div>
    </section>
  );
};

export default InteractiveSplitSection;
