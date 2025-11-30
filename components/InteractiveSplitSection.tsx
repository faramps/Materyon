'use client'; 

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, type Variants, type TargetAndTransition } from 'framer-motion';

type CustomVariantFunction = (custom: 'left' | 'right') => TargetAndTransition;

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
      transition: { duration: 0.2 }
    },
    hoverState: (side) => ({
      flexGrow: activeSide === side ? 1.2 : 0.8,
      transition: { duration: 0.2, ease: "easeOut" }
    }),
    fullScreen: (side) => ({
      width: "100vw",
      height: "100vh",
      left: side === 'left' ? 0 : 'auto',
      right: side === 'right' ? 0 : 'auto',
      top: 0,
      position: "fixed",
      zIndex: 50,
      transition: { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] }
    }),
    hiddenOnAnimate: {
      opacity: 0,
      pointerEvents: 'none',
      transition: { duration: 0.1 }
    }
  }), [activeSide]);

  const handleImageClick = (side: 'left' | 'right') => {
    setActiveSide(side);
    setIsAnimating(true);

    setTimeout(() => {
      router.push(side === 'left' ? '/projeler' : '/hammaddeler');
    }, 300);
  };

  return (
    <section className="relative w-full h-screen">
      <div
        className="flex flex-col lg:flex-row w-full h-full overflow-hidden"
        onMouseLeave={() => !isAnimating && setActiveSide(null)}
      >
        {/* SOL - PROJELER */}
        <MotionSection
          className="relative h-full cursor-pointer bg-cover bg-left flex items-center justify-center transition-all duration-0 bg-black"
          style={{ backgroundImage: "url(/img/mainbg1.webp)" }}
          onMouseEnter={() => !isAnimating && setActiveSide('left')}
          onClick={() => handleImageClick('left')}
          initial="initial"
          animate={
            (activeSide === null && !isAnimating) ? "initial" :
            (isAnimating && activeSide === 'left') ? "fullScreen" :
            (isAnimating && activeSide !== 'left') ? "hiddenOnAnimate" :
            "hoverState"
          }
          custom="left"
          variants={variants}
        >
          <div className="text-white font-bold text-5xl text-center z-20 p-8 bg-black bg-opacity-80">
            Makineler
          </div>
          <div className="absolute right-0 top-0 h-full w-0.5 bg-black z-10 hidden lg:block"></div>
        </MotionSection>

        {/* SAĞ - HAMMADDELER */}
        <MotionSection
          className="relative h-full cursor-pointer bg-cover bg-right flex items-center justify-center transition-all duration-0 bg-black"
          style={{ backgroundImage: "url(/img/onurhan-makina-3.jpg)" }}
          onMouseEnter={() => !isAnimating && setActiveSide('right')}
          onClick={() => handleImageClick('right')}
          initial="initial"
          animate={
            (activeSide === null && !isAnimating) ? "initial" :
            (isAnimating && activeSide === 'right') ? "fullScreen" :
            (isAnimating && activeSide !== 'right') ? "hiddenOnAnimate" :
            "hoverState"
          }
          custom="right"
          variants={variants}
        >
          <div className="text-white font-bold text-5xl text-center z-20 p-8 bg-black bg-opacity-80">
            Hammaddeler
          </div>
          <div className="absolute left-0 top-0 h-full w-0.5 bg-black z-10 hidden lg:block"></div>
        </MotionSection>
      </div>
    </section>
  );
};

export default InteractiveSplitSection;
