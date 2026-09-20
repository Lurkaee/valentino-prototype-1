"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ValentineSkyProps {
  className?: string;
}

/**
 * ValentineSky:
 * A dreamy, romantic Valentine's sky with blush pink, peach, cream,
 * soft lavender hues, and distinctly visible volumetric layered clouds.
 * Creates an unmistakable romantic atmosphere immediately in the first viewport.
 */
export function ValentineSky({ className = "" }: ValentineSkyProps) {
  const shouldReduceMotion = useReducedMotion();
  const id = useId();

  // Exactly 5 delicate, subtle floating hearts (tiny, soft, low-opacity)
  const hearts = [
    { x: "12%", y: "18%", size: 13, opacity: 0.35, delay: 0, duration: 8.5 },
    { x: "86%", y: "16%", size: 15, opacity: 0.32, delay: 1.2, duration: 9.5 },
    { x: "16%", y: "45%", size: 11, opacity: 0.28, delay: 2.5, duration: 7.5 },
    { x: "84%", y: "48%", size: 13, opacity: 0.3, delay: 1.8, duration: 8.0 },
    { x: "32%", y: "78%", size: 10, opacity: 0.22, delay: 3.2, duration: 10.0 },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Base Luminous Valentine Sky: Dreamy Blush Pink, Sunset Peach & Cream */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -10%, #FFF5F7 0%, #FFE6EF 30%, #FED4E4 55%, #F7BED5 75%, #F0A3C4 90%, #DE82AA 100%)
          `,
        }}
      />

      {/* 2. Soft Golden Peach Sunset Glow (Center) */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1250px] h-[580px] rounded-full blur-[80px] opacity-75"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255, 240, 220, 0.95) 0%, rgba(254, 218, 205, 0.6) 40%, rgba(253, 195, 215, 0.25) 70%, transparent 100%)",
        }}
      />

      {/* 3. Soft Lavender Atmospheric Light (Right Horizon) */}
      <div
        className="absolute top-[4%] right-[-8%] w-[680px] h-[520px] rounded-full blur-[80px] opacity-55"
        style={{
          background:
            "radial-gradient(circle, rgba(235, 218, 252, 0.75) 0%, rgba(246, 205, 230, 0.35) 50%, transparent 80%)",
        }}
      />

      {/* 4. Warm Peach Sunlight Horizon Wash (Left) */}
      <div
        className="absolute top-[8%] left-[-10%] w-[620px] h-[480px] rounded-full blur-[75px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 225, 210, 0.8) 0%, rgba(255, 198, 215, 0.4) 50%, transparent 80%)",
        }}
      />

      {/* ========================================================================= */}
      {/* 5. BACKGROUND CLOUDS: Expansive soft dreamy clouds across the sky          */}
      {/* ========================================================================= */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-15, 15, -15],
              }
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[5%] inset-x-[-10%] h-[350px] rounded-[100%] blur-[45px] opacity-75"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.85) 0%, rgba(255, 238, 246, 0.6) 45%, rgba(254, 215, 232, 0.25) 70%, transparent 85%)",
        }}
      />

      {/* ========================================================================= */}
      {/* 6. MIDDLE LAYER: Volumetric Pink & Cream Clouds Framing Hero Scene        */}
      {/* ========================================================================= */}

      {/* Left Volumetric Cloud Bank */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-8, 8, -8],
                y: [-4, 4, -4],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] sm:top-[16%] left-[-6%] sm:left-[-2%] w-[420px] sm:w-[560px] h-[320px] will-change-transform opacity-90"
      >
        <svg
          viewBox="0 0 560 320"
          fill="none"
          className="w-full h-full filter drop-shadow-[0_16px_30px_rgba(235,140,170,0.22)]"
        >
          <defs>
            <linearGradient id={`${id}-cloud-left`} x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
              <stop offset="40%" stopColor="#FFF3F7" stopOpacity="0.88" />
              <stop offset="75%" stopColor="#FBD7E5" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#F5BFD6" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id={`${id}-cloud-highlight-left`} cx="40%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#FFFDF6" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FFEBF2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFEBF2" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Main cumulus cloud body */}
          <path
            d="M 90 260 
               C 50 260, 20 220, 30 175 
               C 40 130, 95 120, 125 140 
               C 145 80, 225 60, 285 100 
               C 335 60, 420 75, 450 130 
               C 505 140, 535 195, 500 245 
               C 470 270, 410 260, 380 260 
               Z"
            fill={`url(#${id}-cloud-left)`}
          />
          {/* Volumetric sunlit highlight puff */}
          <ellipse cx="280" cy="110" rx="100" ry="55" fill={`url(#${id}-cloud-highlight-left)`} />
        </svg>
      </motion.div>

      {/* Right Volumetric Cloud Bank */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [8, -8, 8],
                y: [4, -4, 4],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] sm:top-[17%] right-[-8%] sm:right-[-3%] w-[440px] sm:w-[580px] h-[330px] will-change-transform opacity-90"
      >
        <svg
          viewBox="0 0 580 330"
          fill="none"
          className="w-full h-full filter drop-shadow-[0_16px_30px_rgba(235,140,170,0.22)]"
        >
          <defs>
            <linearGradient id={`${id}-cloud-right`} x1="80%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
              <stop offset="45%" stopColor="#FFF4F8" stopOpacity="0.88" />
              <stop offset="80%" stopColor="#FBD4E4" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#F5BED5" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id={`${id}-cloud-highlight-right`} cx="60%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#FFFDF6" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FFEBF2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFEBF2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M 110 265 
               C 70 265, 40 225, 55 180 
               C 75 130, 140 125, 175 145 
               C 205 85, 290 70, 345 110 
               C 395 75, 480 90, 500 145 
               C 550 160, 565 220, 515 265 
               Z"
            fill={`url(#${id}-cloud-right)`}
          />
          <ellipse cx="340" cy="115" rx="105" ry="58" fill={`url(#${id}-cloud-highlight-right)`} />
        </svg>
      </motion.div>

      {/* Center Background Cloud Bank (nestled right behind the 3D letter) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.03, 1],
                y: [0, -5, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] sm:top-[38%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[320px] will-change-transform opacity-85"
      >
        <svg
          viewBox="0 0 950 320"
          fill="none"
          className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(240,150,180,0.25)]"
        >
          <defs>
            <radialGradient id={`${id}-cloud-center`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
              <stop offset="35%" stopColor="#FFF2F7" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#FCD5E4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F8BFD6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M 160 270 
               C 100 270, 70 210, 110 160 
               C 130 110, 200 90, 260 120 
               C 310 60, 420 40, 500 80 
               C 560 45, 660 55, 710 110 
               C 760 80, 830 110, 840 160 
               C 880 200, 850 270, 790 270 
               Z"
            fill={`url(#${id}-cloud-center)`}
          />
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* 7. FOREGROUND CLOUD MIST: Translucent Vapor Cushioning the Letter         */}
      {/* ========================================================================= */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -6, 0],
                opacity: [0.75, 0.9, 0.75],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[52%] sm:top-[50%] inset-x-[-8%] h-[240px] rounded-[100%] blur-[35px] will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 235, 245, 0.6) 45%, rgba(254, 215, 232, 0.25) 70%, transparent 85%)",
        }}
      />

      {/* Lower Cloud Drift (transitioning towards lower content) */}
      <div
        className="absolute top-[68%] sm:top-[65%] inset-x-[-12%] h-[220px] rounded-[100%] blur-[45px] opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 248, 252, 0.85) 0%, rgba(252, 220, 235, 0.5) 50%, transparent 85%)",
        }}
      />

      {/* ========================================================================= */}
      {/* 8. SEAMLESS DUSK TO VELVET GRADIENT TRANSITION (FOR SCROLL DOWN)          */}
      {/* ========================================================================= */}
      <div
        className="absolute bottom-0 inset-x-0 h-[280px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(235, 160, 190, 0.2) 30%, rgba(120, 30, 65, 0.5) 70%, rgba(35, 8, 22, 0.95) 92%, #12030A 100%)",
        }}
      />

      {/* ========================================================================= */}
      {/* 9. SUBTLE FLOATING HEARTS (Restrained & Low Opacity)                     */}
      {/* ========================================================================= */}
      {hearts.map((h, i) => (
        <motion.div
          key={`${id}-heart-${i}`}
          style={{
            left: h.x,
            top: h.y,
            opacity: h.opacity,
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -14, 0],
                  rotate: [-3, 3, -3],
                  opacity: [h.opacity * 0.8, h.opacity, h.opacity * 0.8],
                }
          }
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeInOut",
          }}
          className="absolute will-change-transform"
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-rose-400/80 drop-shadow-[0_2px_6px_rgba(244,63,94,0.3)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
