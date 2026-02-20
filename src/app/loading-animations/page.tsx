"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, Moon, Sun, Copy, Check, Code, X, ChevronDown, ChevronLeft, ChevronRight, Shuffle, RotateCcw, Plus, Sparkles, ZoomIn } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

// Logo motif paths (nav / logo.svg viewBox 0 0 76 80)
const logoMotifPaths = [
  "M28.7891 0C32.5467 0 35.8415 0.739984 38.6734 2.21995C41.5052 3.63565 43.7381 5.69507 45.3718 8.39774C46.9511 11.1004 47.741 14.2856 47.741 17.9535C47.741 21.6214 47.0331 24.6462 45.6172 27.0272C44.2012 29.3437 42.2674 31.242 39.8168 32.722C37.3663 34.1376 34.589 35.3278 31.4851 36.293L26.9122 37.6646C24.2983 38.4368 22.0104 39.3053 20.0499 40.2706C18.1439 41.2358 16.646 42.5236 15.5568 44.1323C14.5223 45.741 14.0051 47.8967 14.0051 50.5992C14.0051 54.6532 15.285 57.7423 17.8446 59.8659C19.3528 61.1281 21.0881 62.0247 23.0496 62.5585C23.1637 64.645 23.5537 66.5638 24.2136 68.3168C21.8797 67.9922 19.7565 67.3319 17.8446 66.3327C15.0127 64.917 12.7799 62.8576 11.1461 60.1549C9.56679 57.4523 8.7769 54.2671 8.77688 50.5992C8.77688 46.9313 9.48483 43.9065 10.9008 41.5255C12.3167 39.209 14.2505 37.3107 16.7011 35.8307C19.1516 34.4151 21.9289 33.2249 25.0328 32.2597L29.6057 30.8881L30.5707 30.5939C32.7866 29.8971 34.7525 29.1267 36.468 28.2821C38.3741 27.3169 39.8719 26.0291 40.9611 24.4204C41.9956 22.8117 42.5128 20.656 42.5128 17.9535C42.5128 13.8995 41.2329 10.8103 38.6734 8.68682C36.0594 6.4991 32.7644 5.40578 28.7891 5.40578C28.0413 5.40578 27.3134 5.44356 26.6051 5.51815C26.4174 3.60974 25.9901 1.84892 25.3219 0.234176C26.4391 0.0781459 27.5949 6.56491e-06 28.7891 0Z",
  "M16.5459 10.7738C17.2142 12.3882 17.642 14.1489 17.83 16.0569C15.9076 16.2594 14.1303 16.7363 12.4988 17.4886C10.2663 18.5181 8.49604 20.1269 7.18912 22.3145C5.88221 24.5023 5.22825 27.3662 5.22822 30.9052V35.4421H0V30.9052C3.38659e-05 26.401 0.898995 22.6685 2.69603 19.7085C4.43857 16.6844 6.83497 14.4 9.88429 12.8557C11.9272 11.8023 14.1481 11.1088 16.5459 10.7738Z",
  "M51.8198 10.9591C54.1406 11.2853 56.2526 11.9444 58.1554 12.9389C60.9873 14.3546 63.2201 16.414 64.8539 19.1167C66.4332 21.8193 67.2231 25.0045 67.2231 28.6724C67.2231 32.3404 66.5152 35.3652 65.0992 37.7461C63.6833 40.0626 61.7495 41.9609 59.2989 43.4409C56.8484 44.8565 54.0711 46.0467 50.9672 47.0119L46.3943 48.3835C43.7803 49.1557 41.4925 50.0243 39.532 50.9895C37.6259 51.9547 36.1281 53.2425 35.0389 54.8512C34.0044 56.4599 33.4872 58.6156 33.4872 61.3181C33.4872 65.3721 34.7671 68.4613 37.3266 70.5848C39.9406 72.7725 43.2356 73.8658 47.2109 73.8658C47.4131 73.8658 47.6138 73.8618 47.8131 73.8564C47.9639 75.7878 48.3567 77.5714 48.9883 79.209C48.4055 79.2487 47.8132 79.2716 47.2109 79.2716C43.4533 79.2716 40.1585 78.5316 37.3266 77.0517C34.4948 75.636 32.2619 73.5765 30.6282 70.8739C29.0489 68.1712 28.259 64.986 28.259 61.3181C28.259 57.6502 28.9669 54.6254 30.3828 52.2444C31.7988 49.9279 33.7326 48.0296 36.1832 46.5496C38.6337 45.134 41.411 43.9438 44.5149 42.9786L49.0878 41.607L50.0528 41.3128C52.2687 40.616 54.2345 39.8456 55.9501 39.001C57.8561 38.0358 59.354 36.748 60.4432 35.1393C61.4777 33.5306 61.9949 31.3749 61.9949 28.6724C61.9949 24.6184 60.715 21.5293 58.1554 19.4057C56.6412 18.1385 54.8983 17.2393 52.9272 16.7063C52.827 14.6259 52.4585 12.7104 51.8198 10.9591Z",
  "M76 48.3629C76 52.8672 75.101 56.5996 73.304 59.5596C71.5614 62.5838 69.1651 64.8681 66.1157 66.4125C63.6009 67.7092 60.8167 68.4587 57.7643 68.6668C57.1328 67.0292 56.7408 65.2455 56.59 63.3142C59.1276 63.2445 61.4315 62.7339 63.5012 61.7796C65.7338 60.75 67.5039 59.1413 68.8109 56.9537C70.1178 54.7659 70.7718 51.902 70.7718 48.3629V43.8261H76V48.3629Z",
];

// Logo paths from the SVG (132 viewBox for animation grid)
const logoPaths = [
  "M105.875 74.3211C105.875 78.8255 104.976 82.5578 103.179 85.5178C101.436 88.542 99.0401 90.8263 95.9907 92.3707C93.4759 93.6674 90.6917 94.4169 87.6393 94.625C87.0078 92.9874 86.6158 91.2037 86.465 89.2724C89.0026 89.2027 91.3065 88.6922 93.3762 87.7378C95.6088 86.7083 97.3789 85.0995 98.6859 82.9119C99.9928 80.7241 100.647 77.8602 100.647 74.3211V69.7843H105.875V74.3211Z",
  "M42.6709 37.138C43.3392 38.7525 43.767 40.5131 43.955 42.4211C42.0326 42.6236 40.2553 43.1005 38.6238 43.8528C36.3913 44.8823 34.621 46.4911 33.3141 48.6787C32.0072 50.8665 31.3532 53.7304 31.3532 57.2695V61.8063H26.125V57.2695C26.125 52.7652 27.024 49.0328 28.821 46.0728C30.5636 43.0486 32.96 40.7643 36.0093 39.2199C38.0522 38.1665 40.2731 37.473 42.6709 37.138Z",
  "M79.1948 37.3233C81.5156 37.6495 83.6276 38.3086 85.5304 39.3031C88.3623 40.7188 90.5951 42.7782 92.2289 45.4809C93.8082 48.1835 94.5981 51.3687 94.5981 55.0366C94.5981 58.7046 93.8901 61.7294 92.4742 64.1103C91.0582 66.4268 89.1244 68.3251 86.6738 69.8052C84.2233 71.2207 81.4461 72.4109 78.3421 73.3761L73.7693 74.7477C71.1553 75.5199 68.8675 76.3885 66.907 77.3537C65.0009 78.3189 63.503 79.6067 62.4139 81.2154C61.3793 82.8242 60.8621 84.9798 60.8621 87.6823C60.8621 91.7363 62.142 94.8255 64.7016 96.949C67.3156 99.1367 70.6105 100.23 74.5859 100.23C74.7881 100.23 74.9888 100.226 75.188 100.221C75.3388 102.152 75.7317 103.936 76.3632 105.573C75.7805 105.613 75.1882 105.636 74.5859 105.636C70.8283 105.636 67.5334 104.896 64.7016 103.416C61.8697 102 59.6369 99.9407 58.0031 97.2381C56.4238 94.5354 55.6339 91.3502 55.6339 87.6823C55.6339 84.0144 56.3419 80.9896 57.7578 78.6086C59.1737 76.2921 61.1076 74.3938 63.5582 72.9138C66.0087 71.4982 68.7859 70.308 71.8898 69.3428L76.4627 67.9712L77.4277 67.677C79.6436 66.9802 81.6095 66.2099 83.325 65.3652C85.2311 64.4 86.7289 63.1122 87.8181 61.5035C88.8527 59.8948 89.3698 57.7391 89.3698 55.0366C89.3698 50.9826 88.09 47.8935 85.5304 45.7699C84.0162 44.5027 82.2733 43.6035 80.3022 43.0705C80.2019 40.9901 79.8334 39.0746 79.1948 37.3233Z",
  "M56.164 26.3642C59.9216 26.3642 63.2165 27.1042 66.0483 28.5842C68.8802 29.9998 71.113 32.0593 72.7468 34.7619C74.3261 37.4646 75.116 40.6498 75.116 44.3177C75.116 47.9856 74.4081 51.0104 72.9921 53.3914C71.5762 55.7079 69.6424 57.6062 67.1918 59.0862C64.7413 60.5018 61.964 61.692 58.8601 62.6572L54.2872 64.0288C51.6732 64.801 49.3854 65.6695 47.4249 66.6348C45.5188 67.6 44.021 68.8878 42.9318 70.4965C41.8972 72.1052 41.3801 74.2609 41.3801 76.9634C41.3801 81.0174 42.66 84.1065 45.2195 86.2301C46.7278 87.4923 48.4631 88.3889 50.4246 88.9227C50.5386 91.0092 50.9287 92.928 51.5886 94.681C49.2547 94.3564 47.1314 93.6961 45.2195 92.6969C42.3877 91.2812 40.1548 89.2218 38.5211 86.5191C36.9418 83.8165 36.1519 80.6313 36.1519 76.9634C36.1519 73.2955 36.8598 70.2706 38.2757 67.8897C39.6917 65.5732 41.6255 63.6749 44.0761 62.1949C46.5266 60.7793 49.3039 59.5891 52.4078 58.6239L56.9807 57.2523L57.9457 56.9581C60.1616 56.2613 62.1274 55.4909 63.843 54.6463C65.749 53.6811 67.2469 52.3933 68.3361 50.7846C69.3706 49.1759 69.8878 47.0202 69.8878 44.3177C69.8878 40.2637 68.6079 37.1745 66.0483 35.051C63.4343 32.8633 60.1394 31.77 56.164 31.77C55.4163 31.77 54.6884 31.8078 53.9801 31.8823C53.7924 29.9739 53.3651 28.2131 52.6969 26.5984C53.8141 26.4423 54.9698 26.3642 56.164 26.3642Z"
];

// Animation Component Props
interface LogoAnimationProps {
  variant: string;
  title: string;
  logoColor?: string;
  groupTitle?: string;
  allVariants?: { variant: string; title: string }[];
  currentIndex?: number;
  allGroups?: Array<{
    groupTitle: string;
    variants: Array<{ variant: string; title: string }>;
  }>;
  currentGroupIndex?: number;
  isMobile?: boolean;
}

// Modal Animation SVG Component
const ModalAnimationSVG = React.forwardRef<SVGSVGElement, {
  variant: string;
  logoColor?: string;
  customVariantCSS?: Record<string, string>;
}>(({ variant, logoColor, customVariantCSS }, ref) => {
  useEffect(() => {
    const svg = ref && 'current' in ref ? ref.current : null;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll("path")) as SVGPathElement[];
    
    if (paths.length === 0) return;

    // Remove all animation classes first
    paths.forEach((path) => {
      path.className.baseVal = path.className.baseVal
        .split(" ")
        .filter((cls: string) => !cls.startsWith("logo-anim-"))
        .join(" ");
      path.style.animation = "";
      path.style.animationDelay = "";
    });

    // Apply animations with delays
    const baseClass = `logo-anim-${variant}`;
    paths.forEach((path, index) => {
      let delay = 0;
      switch (variant) {
        case "sequential":
          delay = index * 0.15;
          break;
        case "scale":
          delay = index * 0.1;
          break;
        case "rotate":
          delay = index * 0.12;
          break;
        case "morph":
          delay = index * 0.15;
          break;
        case "wave":
          delay = index * 0.1;
          break;
        case "wave2":
          delay = index * 0.1;
          break;
        case "wave3":
          delay = index * 0.12;
          break;
        case "wave4":
          delay = index * 0.08;
          break;
        case "pulse":
          delay = index * 0.08;
          break;
        case "sequential2":
        case "sequential3":
        case "sequential4":
          delay = index * 0.15;
          break;
        case "scale2":
        case "scale3":
        case "scale4":
          delay = index * 0.1;
          break;
        case "rotate2":
        case "rotate3":
        case "rotate4":
          delay = index * 0.12;
          break;
        case "morph2":
        case "morph3":
        case "morph4":
          delay = index * 0.15;
          break;
        case "pulse2":
        case "pulse3":
        case "pulse4":
          delay = index * 0.08;
          break;
        case "float":
        case "float2":
        case "float3":
        case "float4":
          delay = 0;
          break;
        default:
          const baseName = variant.replace(/\d+$/, '').replace(/-.*$/, '');
          if (baseName === 'sequential' || variant.startsWith('sequential')) {
            delay = index * 0.15;
          } else if (baseName === 'scale' || variant.startsWith('scale')) {
            delay = index * 0.1;
          } else if (baseName === 'rotate' || variant.startsWith('rotate')) {
            delay = index * 0.12;
          } else if (baseName === 'morph' || variant.startsWith('morph')) {
            delay = index * 0.15;
          } else if (baseName === 'wave' || variant.startsWith('wave')) {
            delay = index * 0.1;
          } else if (baseName === 'pulse' || variant.startsWith('pulse')) {
            delay = index * 0.08;
          } else if (baseName === 'float' || variant.startsWith('float')) {
            delay = 0;
          } else if (variant.includes('custom-')) {
            delay = index * 0.1;
          } else {
            delay = index * 0.1;
          }
          break;
      }
      
      path.className.baseVal += ` ${baseClass}`;
      if (delay > 0) {
        path.style.animationDelay = `${delay}s`;
      }
    });
  }, [variant, ref]);

  return (
    <svg
      ref={ref}
      width="320"
      height="320"
      viewBox="0 0 132 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-foreground"
    >
      {logoPaths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill={logoColor || "currentColor"}
          className="logo-path"
        />
      ))}
    </svg>
  );
});

ModalAnimationSVG.displayName = "ModalAnimationSVG";

// Function to get CSS code for each animation variant
function getAnimationCSS(variant: string, customCSS?: Record<string, string>): string {
  // Check custom CSS first
  if (customCSS && customCSS[variant]) {
    return customCSS[variant];
  }
  
  const cssMap: Record<string, string> = {
    sequential: `.logo-anim-sequential {
  opacity: 0;
  animation: fadeInPathLoop 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes fadeInPathLoop {
  0% { opacity: 0; }
  15% { opacity: 1; }
  50% { opacity: 1; }
  65% { opacity: 0; }
  100% { opacity: 0; }
}`,
    sequential2: `.logo-anim-sequential2 {
  opacity: 0;
  animation: fadeInPathLoop2 2s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes fadeInPathLoop2 {
  0% { opacity: 0; }
  10% { opacity: 1; }
  45% { opacity: 1; }
  55% { opacity: 0; }
  100% { opacity: 0; }
}`,
    sequential3: `.logo-anim-sequential3 {
  opacity: 0;
  animation: fadeInPathLoop3 3.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes fadeInPathLoop3 {
  0% { opacity: 0; }
  20% { opacity: 1; }
  55% { opacity: 1; }
  70% { opacity: 0; }
  100% { opacity: 0; }
}`,
    sequential4: `.logo-anim-sequential4 {
  opacity: 0;
  animation: fadeInPathLoop4 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes fadeInPathLoop4 {
  0% { opacity: 0; }
  12% { opacity: 0.5; }
  15% { opacity: 1; }
  50% { opacity: 1; }
  65% { opacity: 0.5; }
  68% { opacity: 0; }
  100% { opacity: 0; }
}`,
    scale: `.logo-anim-scale {
  opacity: 0;
  transform: scale(0);
  animation: scaleInPathLoop 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s infinite;
  transform-origin: center;
}

@keyframes scaleInPathLoop {
  0% { opacity: 0; transform: scale(0); }
  15% { opacity: 1; transform: scale(1); }
  50% { opacity: 1; transform: scale(1); }
  65% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    scale2: `.logo-anim-scale2 {
  opacity: 0;
  transform: scale(0);
  animation: scaleInPathLoop2 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes scaleInPathLoop2 {
  0% { opacity: 0; transform: scale(0); }
  10% { opacity: 0.8; transform: scale(1.2); }
  15% { opacity: 1; transform: scale(1); }
  50% { opacity: 1; transform: scale(1); }
  65% { opacity: 0.8; transform: scale(1.1); }
  90% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    scale3: `.logo-anim-scale3 {
  opacity: 0;
  transform: scale(0);
  animation: scaleInPathLoop3 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes scaleInPathLoop3 {
  0% { opacity: 0; transform: scale(0); }
  20% { opacity: 1; transform: scale(1); }
  55% { opacity: 1; transform: scale(1); }
  70% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    scale4: `.logo-anim-scale4 {
  opacity: 0;
  transform: scale(0);
  animation: scaleInPathLoop4 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0s infinite;
  transform-origin: center;
}

@keyframes scaleInPathLoop4 {
  0% { opacity: 0; transform: scale(0); }
  8% { opacity: 1; transform: scale(1); }
  48% { opacity: 1; transform: scale(1); }
  58% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    rotate: `.logo-anim-rotate {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
  animation: rotateInPathLoop 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s infinite;
  transform-origin: center;
}

@keyframes rotateInPathLoop {
  0% { opacity: 0; transform: rotate(-180deg) scale(0.5); }
  15% { opacity: 1; transform: rotate(0deg) scale(1); }
  50% { opacity: 1; transform: rotate(0deg) scale(1); }
  65% { opacity: 0; transform: rotate(180deg) scale(0.5); }
  100% { opacity: 0; transform: rotate(180deg) scale(0.5); }
}`,
    rotate2: `.logo-anim-rotate2 {
  opacity: 0;
  transform: rotate(-360deg) scale(0.5);
  animation: rotateInPathLoop2 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s infinite;
  transform-origin: center;
}

@keyframes rotateInPathLoop2 {
  0% { opacity: 0; transform: rotate(-360deg) scale(0.5); }
  15% { opacity: 1; transform: rotate(0deg) scale(1); }
  50% { opacity: 1; transform: rotate(0deg) scale(1); }
  65% { opacity: 0; transform: rotate(360deg) scale(0.5); }
  100% { opacity: 0; transform: rotate(360deg) scale(0.5); }
}`,
    rotate3: `.logo-anim-rotate3 {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
  animation: rotateInPathLoop3 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes rotateInPathLoop3 {
  0% { opacity: 0; transform: rotate(-180deg) scale(0.5); }
  10% { opacity: 0.8; transform: rotate(-90deg) scale(0.8); }
  15% { opacity: 1; transform: rotate(0deg) scale(1); }
  50% { opacity: 1; transform: rotate(0deg) scale(1); }
  65% { opacity: 0.8; transform: rotate(90deg) scale(0.8); }
  90% { opacity: 0; transform: rotate(180deg) scale(0.5); }
  100% { opacity: 0; transform: rotate(180deg) scale(0.5); }
}`,
    rotate4: `.logo-anim-rotate4 {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
  animation: rotateInPathLoop4 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes rotateInPathLoop4 {
  0% { opacity: 0; transform: rotate(-180deg) scale(0.5); }
  20% { opacity: 1; transform: rotate(0deg) scale(1); }
  55% { opacity: 1; transform: rotate(0deg) scale(1); }
  70% { opacity: 0; transform: rotate(180deg) scale(0.5); }
  100% { opacity: 0; transform: rotate(180deg) scale(0.5); }
}`,
    morph: `.logo-anim-morph {
  opacity: 0;
  transform: scale(0.3);
  animation: morphInPathLoop 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes morphInPathLoop {
  0% { opacity: 0; transform: scale(0.3); }
  10% { opacity: 0.7; transform: scale(1.1); }
  15% { opacity: 1; transform: scale(1); }
  50% { opacity: 1; transform: scale(1); }
  65% { opacity: 0.7; transform: scale(1.1); }
  90% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 0; transform: scale(0.3); }
}`,
    morph2: `.logo-anim-morph2 {
  opacity: 0;
  transform: scale(0.3);
  animation: morphInPathLoop2 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes morphInPathLoop2 {
  0% { opacity: 0; transform: scale(0.3); }
  8% { opacity: 0.6; transform: scale(1.2); }
  12% { opacity: 0.9; transform: scale(0.95); }
  15% { opacity: 1; transform: scale(1); }
  50% { opacity: 1; transform: scale(1); }
  65% { opacity: 0.9; transform: scale(1.05); }
  75% { opacity: 0.6; transform: scale(1.15); }
  92% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 0; transform: scale(0.3); }
}`,
    morph3: `.logo-anim-morph3 {
  opacity: 0;
  transform: scale(0.3);
  animation: morphInPathLoop3 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes morphInPathLoop3 {
  0% { opacity: 0; transform: scale(0.3); }
  8% { opacity: 0.7; transform: scale(1.1); }
  12% { opacity: 1; transform: scale(1); }
  48% { opacity: 1; transform: scale(1); }
  58% { opacity: 0.7; transform: scale(1.1); }
  92% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 0; transform: scale(0.3); }
}`,
    morph4: `.logo-anim-morph4 {
  opacity: 0;
  transform: scale(0.3);
  animation: morphInPathLoop4 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes morphInPathLoop4 {
  0% { opacity: 0; transform: scale(0.3); }
  20% { opacity: 1; transform: scale(1); }
  55% { opacity: 1; transform: scale(1); }
  70% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 0; transform: scale(0.3); }
}`,
    wave: `.logo-anim-wave {
  opacity: 0;
  transform: translateY(20px);
  animation: waveInPathLoop 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes waveInPathLoop {
  0% { opacity: 0; transform: translateY(20px); }
  15% { opacity: 1; transform: translateY(-5px); }
  20% { opacity: 1; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(0); }
  65% { opacity: 1; transform: translateY(5px); }
  100% { opacity: 0; transform: translateY(20px); }
}`,
    wave2: `.logo-anim-wave2 {
  opacity: 0;
  transform: translateX(-20px);
  animation: waveInPathLoop2 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes waveInPathLoop2 {
  0% { opacity: 0; transform: translateX(-20px); }
  15% { opacity: 1; transform: translateX(5px); }
  20% { opacity: 1; transform: translateX(0); }
  50% { opacity: 1; transform: translateX(0); }
  65% { opacity: 1; transform: translateX(-5px); }
  100% { opacity: 0; transform: translateX(-20px); }
}`,
    wave3: `.logo-anim-wave3 {
  opacity: 0;
  transform: translate(-15px, 15px);
  animation: waveInPathLoop3 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes waveInPathLoop3 {
  0% { opacity: 0; transform: translate(-15px, 15px); }
  15% { opacity: 1; transform: translate(5px, -5px); }
  20% { opacity: 1; transform: translate(0, 0); }
  50% { opacity: 1; transform: translate(0, 0); }
  65% { opacity: 1; transform: translate(-5px, 5px); }
  100% { opacity: 0; transform: translate(-15px, 15px); }
}`,
    wave4: `.logo-anim-wave4 {
  opacity: 0;
  transform: scale(0.5);
  animation: waveInPathLoop4 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes waveInPathLoop4 {
  0% { opacity: 0; transform: scale(0.5); }
  10% { opacity: 0.5; transform: scale(0.8); }
  15% { opacity: 1; transform: scale(1.05); }
  20% { opacity: 1; transform: scale(1); }
  50% { opacity: 1; transform: scale(1); }
  65% { opacity: 1; transform: scale(1.05); }
  80% { opacity: 0.5; transform: scale(0.8); }
  100% { opacity: 0; transform: scale(0.5); }
}`,
    pulse: `.logo-anim-pulse {
  opacity: 0;
  transform: scale(0);
  animation: pulseInPathLoop 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes pulseInPathLoop {
  0% { opacity: 0; transform: scale(0); }
  10% { opacity: 1; transform: scale(1.15); }
  15% { opacity: 1; transform: scale(1); }
  50% { opacity: 1; transform: scale(1); }
  65% { opacity: 1; transform: scale(1.1); }
  90% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    pulse2: `.logo-anim-pulse2 {
  opacity: 0;
  transform: scale(0);
  animation: pulseInPathLoop2 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes pulseInPathLoop2 {
  0% { opacity: 0; transform: scale(0); }
  8% { opacity: 1; transform: scale(1.25); }
  12% { opacity: 1; transform: scale(0.95); }
  15% { opacity: 1; transform: scale(1); }
  50% { opacity: 1; transform: scale(1); }
  65% { opacity: 1; transform: scale(1.15); }
  88% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    pulse3: `.logo-anim-pulse3 {
  opacity: 0;
  transform: scale(0);
  animation: pulseInPathLoop3 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes pulseInPathLoop3 {
  0% { opacity: 0; transform: scale(0); }
  20% { opacity: 1; transform: scale(1.05); }
  25% { opacity: 1; transform: scale(1); }
  55% { opacity: 1; transform: scale(1); }
  70% { opacity: 1; transform: scale(1.05); }
  85% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    pulse4: `.logo-anim-pulse4 {
  opacity: 0;
  transform: scale(0);
  animation: pulseInPathLoop4 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite;
  transform-origin: center;
}

@keyframes pulseInPathLoop4 {
  0% { opacity: 0; transform: scale(0); }
  6% { opacity: 1; transform: scale(1.2); }
  10% { opacity: 1; transform: scale(1); }
  46% { opacity: 1; transform: scale(1); }
  54% { opacity: 1; transform: scale(1.1); }
  94% { opacity: 0; transform: scale(0); }
  100% { opacity: 0; transform: scale(0); }
}`,
    float: `.logo-anim-float {
  animation: floatLoop 3s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes floatLoop {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}`,
    float2: `.logo-anim-float2 {
  animation: floatLoop2 2.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes floatLoop2 {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}`,
    float3: `.logo-anim-float3 {
  animation: floatLoop3 3.5s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes floatLoop3 {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
}`,
    float4: `.logo-anim-float4 {
  animation: floatLoop4 4s ease-in-out 0s infinite;
  transform-origin: center;
}

@keyframes floatLoop4 {
  0%, 100% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-2px) scale(1.02); }
  50% { transform: translateY(0) scale(1); }
  75% { transform: translateY(2px) scale(0.98); }
}`,
  };

  return cssMap[variant] || '';
}

function LogoAnimation({ variant, title, logoColor, customVariantCSS, groupTitle, allVariants, currentIndex, allGroups, currentGroupIndex, isMobile }: LogoAnimationProps & { customVariantCSS?: Record<string, string> }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const modalSvgRef = useRef<SVGSVGElement>(null);
  const favoriteKey = `favorite-${variant}`;
  const countKey = `favorite-count-${variant}`;
  
  // Initialize with defaults to avoid hydration mismatch; sync from localStorage after mount
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalCopied, setModalCopied] = useState(false);
  const [modalIsFavorited, setModalIsFavorited] = useState(false);
  const [keyboardPressedButton, setKeyboardPressedButton] = useState<'left' | 'right' | null>(null);
  
  // Build flat list of all animations across all groups for navigation
  const allAnimations = allGroups && allGroups.length > 0 
    ? allGroups.flatMap(group => 
        group.variants.map(v => ({ ...v, groupTitle: group.groupTitle }))
      )
    : (allVariants && allVariants.length > 0 ? allVariants.map(v => ({ ...v, groupTitle: groupTitle || '' })) : [{ variant, title, groupTitle: groupTitle || '' }]);
  
  // Find current animation index in the flat list
  const findCurrentAnimationIndex = () => {
    if (!allGroups || allGroups.length === 0) {
      return currentIndex !== undefined ? currentIndex : 0;
    }
    const currentGroupIdx = currentGroupIndex !== undefined ? currentGroupIndex : 0;
    let globalIndex = 0;
    for (let i = 0; i < currentGroupIdx; i++) {
      globalIndex += allGroups[i].variants.length;
    }
    return globalIndex + (currentIndex !== undefined ? currentIndex : 0);
  };
  
  const initialGlobalIndex = findCurrentAnimationIndex();
  const [activeGlobalIndex, setActiveGlobalIndex] = useState(initialGlobalIndex);
  
  // Get current modal variant and group
  const currentAnimation = allAnimations[activeGlobalIndex] || { variant, title, groupTitle: groupTitle || '' };
  const currentModalVariant = { variant: currentAnimation.variant, title: currentAnimation.title };
  const currentModalGroupTitle = currentAnimation.groupTitle;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsFavorited(localStorage.getItem(favoriteKey) === 'true');
    const count = localStorage.getItem(countKey);
    setFavoriteCount(count ? parseInt(count, 10) : 0);
  }, [favoriteKey, countKey]);
  
  // Sync modal favorite state when modal opens or variant changes
  useEffect(() => {
    if (!showModal) return;
    const modalFavoriteKey = `favorite-${currentAnimation.variant}`;
    setModalIsFavorited(localStorage.getItem(modalFavoriteKey) === 'true');
  }, [showModal, activeGlobalIndex, currentAnimation.variant]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);
  
  // Keyboard navigation for modal
  useEffect(() => {
    if (!showModal) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setKeyboardPressedButton('left');
        setActiveGlobalIndex((prev) => (prev > 0 ? prev - 1 : allAnimations.length - 1));
        setTimeout(() => setKeyboardPressedButton(null), 200);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setKeyboardPressedButton('right');
        setActiveGlobalIndex((prev) => (prev < allAnimations.length - 1 ? prev + 1 : 0));
        setTimeout(() => setKeyboardPressedButton(null), 200);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowModal(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, allAnimations.length]);

  // Copy animation code state
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const cssCode = getAnimationCSS(variant, customVariantCSS);
    if (cssCode) {
      try {
        await navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };
  
  const handleModalCopyCode = async () => {
    const cssCode = getAnimationCSS(currentAnimation.variant, customVariantCSS);
    if (cssCode) {
      try {
        await navigator.clipboard.writeText(cssCode);
        setModalCopied(true);
        setTimeout(() => setModalCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };
  
  const handleModalFavorite = () => {
    const modalFavoriteKey = `favorite-${currentAnimation.variant}`;
    const modalCountKey = `favorite-count-${currentAnimation.variant}`;
    
    if (modalIsFavorited) {
      setModalIsFavorited(false);
      localStorage.removeItem(modalFavoriteKey);
      const count = localStorage.getItem(modalCountKey);
      const currentCount = count ? parseInt(count, 10) : 0;
      const newCount = Math.max(0, currentCount - 1);
      if (newCount > 0) {
        localStorage.setItem(modalCountKey, newCount.toString());
      } else {
        localStorage.removeItem(modalCountKey);
      }
    } else {
      setModalIsFavorited(true);
      localStorage.setItem(modalFavoriteKey, 'true');
      const count = localStorage.getItem(modalCountKey);
      const currentCount = count ? parseInt(count, 10) : 0;
      localStorage.setItem(modalCountKey, (currentCount + 1).toString());
    }
  };
  
  const handlePrevious = () => {
    setActiveGlobalIndex((prev) => (prev > 0 ? prev - 1 : allAnimations.length - 1));
  };
  
  const handleNext = () => {
    setActiveGlobalIndex((prev) => (prev < allAnimations.length - 1 ? prev + 1 : 0));
  };
  
  // Reset modal index when opening
  const handleOpenModal = () => {
    // Recalculate index to ensure it's always correct
    const currentIndex = findCurrentAnimationIndex();
    setActiveGlobalIndex(currentIndex);
    setShowModal(true);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll("path")) as SVGPathElement[];
    
    if (paths.length === 0) return;

    // Remove all animation classes first
    paths.forEach((path) => {
      path.className.baseVal = path.className.baseVal
        .split(" ")
        .filter((cls: string) => !cls.startsWith("logo-anim-"))
        .join(" ");
      path.style.animation = "";
      path.style.animationDelay = "";
    });

    // Apply animations with delays
    const baseClass = `logo-anim-${variant}`;
    paths.forEach((path, index) => {
      let delay = 0;
      switch (variant) {
        case "sequential":
          delay = index * 0.15;
          break;
        case "scale":
          delay = index * 0.1;
          break;
        case "rotate":
          delay = index * 0.12;
          break;
        case "morph":
          delay = index * 0.15;
          break;
        case "wave":
          delay = index * 0.1;
          break;
        case "wave2":
          delay = index * 0.1;
          break;
        case "wave3":
          delay = index * 0.12;
          break;
        case "wave4":
          delay = index * 0.08;
          break;
        case "pulse":
          delay = index * 0.08;
          break;
        case "sequential2":
        case "sequential3":
        case "sequential4":
          delay = index * 0.15;
          break;
        case "scale2":
        case "scale3":
        case "scale4":
          delay = index * 0.1;
          break;
        case "rotate2":
        case "rotate3":
        case "rotate4":
          delay = index * 0.12;
          break;
        case "morph2":
        case "morph3":
        case "morph4":
          delay = index * 0.15;
          break;
        case "pulse2":
        case "pulse3":
        case "pulse4":
          delay = index * 0.08;
          break;
        case "float":
        case "float2":
        case "float3":
        case "float4":
          delay = 0;
          break;
        default:
          // Handle dynamic variants - extract base name
          const baseName = variant.replace(/\d+$/, '').replace(/-.*$/, '');
          if (baseName === 'sequential' || variant.startsWith('sequential')) {
            delay = index * 0.15;
          } else if (baseName === 'scale' || variant.startsWith('scale')) {
            delay = index * 0.1;
          } else if (baseName === 'rotate' || variant.startsWith('rotate')) {
            delay = index * 0.12;
          } else if (baseName === 'morph' || variant.startsWith('morph')) {
            delay = index * 0.15;
          } else if (baseName === 'wave' || variant.startsWith('wave')) {
            delay = index * 0.1;
          } else if (baseName === 'pulse' || variant.startsWith('pulse')) {
            delay = index * 0.08;
          } else if (baseName === 'float' || variant.startsWith('float')) {
            delay = 0;
          } else if (variant.includes('custom-')) {
            // Custom animations - use default delay
            delay = index * 0.1;
          } else {
            delay = index * 0.1; // Default fallback
          }
          break;
      }
      
      path.className.baseVal += ` ${baseClass}`;
      if (delay > 0) {
        path.style.animationDelay = `${delay}s`;
      }
    });
  }, [variant]);


  return (
    <>
      <div
        className="flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl relative cursor-zoom-in hover:bg-card/70 hover:shadow-sm dark:hover:shadow-lg transition-all"
        onClick={handleOpenModal}
      >
      <div className="flex items-center justify-between w-full gap-4">
                <h3 className="font-space-grotesk text-xs sm:text-sm font-medium text-muted-foreground">
                  {title}
                </h3>
        <div className="flex items-center gap-1.5">
          <div className="relative group/copy">
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer"
              aria-label="Copy animation code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Code className="w-4 h-4 text-muted-foreground group-hover/copy:text-foreground transition-colors" />
              )}
            </button>
            {!copied && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/copy:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                Copy CSS code
                {/* Border triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-border"></div>
                {/* Background triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-popover"></div>
              </div>
            )}
          </div>
          <div className="relative group/heart">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isFavorited) {
                  // Unfavourite
                  setIsFavorited(false);
                  localStorage.removeItem(favoriteKey);
                  
                  // Decrement count (ensure it doesn't go below 0)
                  const newCount = Math.max(0, favoriteCount - 1);
                  setFavoriteCount(newCount);
                  if (newCount > 0) {
                    localStorage.setItem(countKey, newCount.toString());
                  } else {
                    localStorage.removeItem(countKey);
                  }
                } else {
                  // Favourite
                  setIsFavorited(true);
                  localStorage.setItem(favoriteKey, 'true');
                  
                  // Increment count
                  const newCount = favoriteCount + 1;
                  setFavoriteCount(newCount);
                  localStorage.setItem(countKey, newCount.toString());
                }
              }}
              className="p-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer"
              aria-label={isFavorited ? "Unfavourite from favourites" : "Add to favourites"}
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isFavorited
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground group-hover/heart:fill-red-500 group-hover/heart:text-red-500"
                }`}
              />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/heart:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
              {isFavorited ? "Unfavourite" : "Favourite"}
              {/* Border triangle */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-border"></div>
              {/* Background triangle */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-popover"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-32 h-32 flex items-center justify-center">
        <svg
          ref={svgRef}
          width="132"
          height="132"
          viewBox="0 0 132 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-foreground"
        >
          {logoPaths.map((path, index) => (
            <path
              key={index}
              d={path}
              fill={logoColor || "currentColor"}
              className="logo-path"
            />
          ))}
        </svg>
      </div>
    </div>
    {showModal && typeof document !== 'undefined' && createPortal(
      <>
        <div
          className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        />
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          {/* Left navigation button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className={`absolute p-3 rounded-md hover:bg-muted/80 transition-all cursor-pointer z-10 bg-card/80 backdrop-blur-sm border border-border ${
              keyboardPressedButton === 'left' ? 'bg-muted scale-95 ring-2 ring-foreground/20' : ''
            }`}
            aria-label="Previous animation"
            style={{ 
              left: isMobile ? '8px' : 'calc((100% - 42rem) / 4)', 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          
          {/* Right navigation button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className={`absolute p-3 rounded-md hover:bg-muted/80 transition-all cursor-pointer z-10 bg-card/80 backdrop-blur-sm border border-border ${
              keyboardPressedButton === 'right' ? 'bg-muted scale-95 ring-2 ring-foreground/20' : ''
            }`}
            aria-label="Next animation"
            style={{ 
              right: isMobile ? '8px' : 'calc((100% - 42rem) / 4)', 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }}
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
          
          <div
            className="bg-card border border-border rounded-xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] flex flex-col relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4 flex-1 min-h-0">
              {/* Section heading and close button */}
              <div className="flex items-center justify-between w-full shrink-0">
                {currentModalGroupTitle ? (
                  <h2 className="font-space-grotesk text-sm font-semibold text-foreground">
                    {currentModalGroupTitle}
                  </h2>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-md hover:outline hover:outline-2 hover:outline-border transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              {/* Animation SVG */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center relative flex-1 min-h-0">
                <ModalAnimationSVG
                  ref={modalSvgRef}
                  variant={currentModalVariant.variant}
                  logoColor={logoColor}
                  customVariantCSS={customVariantCSS}
                />
              </div>
              {/* Title */}
              <h3 className="font-space-grotesk text-lg font-semibold text-foreground text-center shrink-0">
                {currentModalVariant.title}
              </h3>
              {/* Action buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative group/modal-copy">
                  <button
                    onClick={handleModalCopyCode}
                    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                    aria-label="Copy animation code"
                  >
                    {modalCopied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Code className="w-4 h-4 text-muted-foreground group-hover/modal-copy:text-foreground transition-colors" />
                        <span className="text-sm font-medium text-muted-foreground group-hover/modal-copy:text-foreground transition-colors">Copy CSS</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative group/modal-heart">
                  <button
                    onClick={handleModalFavorite}
                    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                    aria-label={modalIsFavorited ? "Unfavourite from favourites" : "Add to favourites"}
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        modalIsFavorited
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground group-hover/modal-heart:fill-red-500 group-hover/modal-heart:text-red-500"
                      }`}
                    />
                    <span className="text-sm font-medium text-muted-foreground group-hover/modal-heart:text-foreground transition-colors">
                      {modalIsFavorited ? "Favourited" : "Favourite"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    )}
    </>
  );
}

// Animation group component - shows all variations grouped by title
function AnimationGroup({ 
  baseVariant, 
  title, 
  variations,
  logoColor,
  headingRef,
  hideHeading,
  onCreateVariant,
  customVariantCSS,
  generatingVariant,
  allAnimationGroups,
  className,
  colorPickerOpen,
  isMobile
}: { 
  baseVariant: string; 
  title: string; 
  variations: { variant: string; title: string }[];
  logoColor?: string;
  headingRef?: React.RefObject<HTMLHeadingElement | HTMLDivElement | null>;
  hideHeading?: boolean;
  onCreateVariant?: (baseVariant: string) => void;
  customVariantCSS?: Record<string, string>;
  generatingVariant?: string | null;
  allAnimationGroups?: Array<{
    groupTitle: string;
    variants: Array<{ variant: string; title: string }>;
  }>;
  className?: string;
  colorPickerOpen?: boolean;
  isMobile?: boolean;
}) {
  const spacingClass = hideHeading 
    ? (colorPickerOpen ? 'space-y-6' : 'space-y-0') 
    : (colorPickerOpen ? 'space-y-6' : 'space-y-12');
  return (
    <div ref={hideHeading ? headingRef as React.RefObject<HTMLDivElement> : undefined} className={`${spacingClass} !pt-0 !mt-0 ${className || ''}`}>
      <div className={`flex items-center justify-between ${hideHeading ? '!mt-0 !mb-0 h-0 overflow-hidden' : '!mt-0'}`}>
        {!hideHeading && (
          <h2 ref={headingRef as React.RefObject<HTMLHeadingElement>} className="font-space-grotesk text-lg font-semibold text-foreground">
            {title}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { variant: baseVariant, title: "Original" },
          ...variations
        ].map((item, index) => {
          // Find the group index in allAnimationGroups
          const groupIndex = allAnimationGroups.findIndex(g => g.groupTitle === title);
          return (
            <LogoAnimation 
              key={item.variant} 
              variant={item.variant} 
              title={item.title}
              logoColor={logoColor}
              customVariantCSS={customVariantCSS}
              groupTitle={title}
              allVariants={[{ variant: baseVariant, title: "Original" }, ...variations]}
              currentIndex={index}
              allGroups={allAnimationGroups}
              currentGroupIndex={groupIndex >= 0 ? groupIndex : undefined}
              isMobile={isMobile}
            />
          );
        })}
      </div>
      {onCreateVariant && (
        <button
          onClick={() => onCreateVariant(baseVariant)}
          disabled={generatingVariant === baseVariant}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-md hover:bg-muted/30 hover:text-foreground hover:border-border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="New variant"
        >
          {generatingVariant === baseVariant ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              New variant
              <Plus className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

// Color conversion utilities
function hexToHsl(hex: string) {
  if (!hex || hex.length < 7) return { h: 0, s: 0, l: 100, a: 100 };
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: 100
  };
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgba(hex: string, alphaPercent: number): string {
  if (!hex || hex.length < 7) return `rgba(0,0,0,${alphaPercent / 100})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alphaPercent / 100})`;
}

function rgbToHsl(r: number, g: number, b: number, a: number = 100) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a
  };
}

// Color Picker Component
interface ColorPickerComponentProps {
  color: string;
  onChange: (hex: string) => void;
  hsl: { h: number; s: number; l: number; a: number };
  onHslChange: (hsl: { h?: number; s?: number; l?: number; a?: number }) => void;
  colorFormat: 'hex' | 'rgb' | 'hsl';
  onFormatChange: (format: 'hex' | 'rgb' | 'hsl') => void;
}

function ColorPickerComponent({
  color,
  onChange,
  hsl,
  onHslChange,
  colorFormat,
  onFormatChange
}: ColorPickerComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<'saturation' | 'hue' | 'alpha' | null>(null);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const squareRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const formatDropdownRef = useRef<HTMLDivElement>(null);
  const hslRef = useRef(hsl);
  hslRef.current = hsl;

  // Global mouse handlers for dragging (use hslRef so handler always has latest hue)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent text selection
      const currentHsl = hslRef.current;

      if (dragType === 'saturation' && squareRef.current) {
        const rect = squareRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        if (width <= 0 || height <= 0) return;
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / height));
        const newS = Math.round(x * 100);
        const newL = Math.round((1 - y) * 100);
        const updatedHsl = { ...currentHsl, s: newS, l: newL };
        onHslChange({ s: newS, l: newL });
        const hex = hslToHex(updatedHsl.h, updatedHsl.s, updatedHsl.l);
        onChange(hex);
      } else if (dragType === 'hue' && hueRef.current) {
        const rect = hueRef.current.getBoundingClientRect();
        if (rect.width <= 0) return;
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newH = Math.min(359, Math.max(0, Math.round(x * 360)));
        const updatedHsl = { ...currentHsl, h: newH };
        onHslChange({ h: newH });
        const hex = hslToHex(updatedHsl.h, updatedHsl.s, updatedHsl.l);
        onChange(hex);
      } else if (dragType === 'alpha' && alphaRef.current) {
        const rect = alphaRef.current.getBoundingClientRect();
        if (rect.width <= 0) return;
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        onHslChange({ a: Math.round(x * 100) });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragType(null);
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };

    const handleSelectStart = (e: Event) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    if (isDragging) {
      // Prevent text selection during drag
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('selectstart', handleSelectStart);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('selectstart', handleSelectStart);
        // Restore text selection
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
      };
    }
  }, [isDragging, dragType, onHslChange, onChange]);

  // Close format dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formatDropdownRef.current && !formatDropdownRef.current.contains(event.target as Node)) {
        setShowFormatDropdown(false);
      }
    };

    if (showFormatDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showFormatDropdown]);

  // Get current color in HSL format for the square
  const hueColor = `hsl(${hsl.h}, 100%, 50%)`;
  const currentColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const formatOptions = [
    { value: 'hex', label: 'Hex' },
    { value: 'rgb', label: 'RGB' },
    { value: 'hsl', label: 'HSL' }
  ];


  const handleSquareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!squareRef.current) return;
    const rect = squareRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    const newS = Math.round(x * 100);
    const newL = Math.round((1 - y) * 100);
    const updatedHsl = { ...hsl, s: newS, l: newL };
    onHslChange({ s: newS, l: newL });
    const hex = hslToHex(updatedHsl.h, updatedHsl.s, updatedHsl.l);
    onChange(hex);
  };

  const handleHueClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newH = Math.min(359, Math.max(0, Math.round(x * 360)));
    const updatedHsl = { ...hsl, h: newH };
    onHslChange({ h: newH });
    const hex = hslToHex(updatedHsl.h, updatedHsl.s, updatedHsl.l);
    onChange(hex);
  };

  const handleAlphaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!alphaRef.current) return;
    const rect = alphaRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onHslChange({ a: Math.round(x * 100) });
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return { r: f(0), g: f(8), b: f(4) };
  };

  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);

  return (
    <div className="space-y-2.5 sm:space-y-3 overflow-visible">
      {/* Main Color Square */}
      <div
        ref={squareRef}
        className="relative w-full h-40 sm:h-44 rounded-md cursor-crosshair overflow-hidden"
        style={{
          background: `linear-gradient(to top, black, transparent), linear-gradient(to right, white, ${hueColor})`
        }}
        onClick={handleSquareClick}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          setDragType('saturation');
          handleSquareClick(e);
        }}
      >
        {/* Thumb kept inside square (8px inset) so top-right corner stays clickable; same style as hue slider (no fill) */}
        <div
          className="absolute w-4 h-4 rounded-full border border-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-transparent"
          style={{
            left: `calc(8px + (100% - 16px) * ${hsl.s / 100})`,
            top: `calc(8px + (100% - 16px) * ${(100 - hsl.l) / 100})`
          }}
        />
      </div>

      {/* Hue Slider - full width to match color square */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="w-full">
          <div
            ref={hueRef}
            className="relative w-full h-[20px] rounded-full cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
          }}
          onClick={handleHueClick}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            setDragType('hue');
            handleHueClick(e);
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border border-black/25 shadow-[0_2px_8px_rgba(0,0,0,0.35)] transform -translate-x-1/2 pointer-events-none"
            style={{ 
              left: `clamp(12px, calc(12px + ${(hsl.h / 360) * 100}% * (100% - 24px) / 100%), calc(100% - 12px))`
            }}
          />
          </div>
        </div>
      </div>

      {/* Alpha/Opacity Slider - full width to match color square */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="w-full">
          <div
            ref={alphaRef}
            className="relative w-full h-[20px] rounded-full cursor-pointer overflow-hidden"
          style={{
            background: `linear-gradient(to right, 
              transparent 0%, 
              ${currentColor} 100%),
              repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 8px 8px`
          }}
          onClick={handleAlphaClick}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            setDragType('alpha');
            handleAlphaClick(e);
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border border-black/25 shadow-[0_2px_8px_rgba(0,0,0,0.35)] transform -translate-x-1/2 pointer-events-none"
            style={{ 
              left: `clamp(12px, calc(12px + ${hsl.a}% * (100% - 24px) / 100%), calc(100% - 12px))`
            }}
          />
          {isDragging && dragType === 'alpha' && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap pointer-events-none z-50"
              style={{ left: `${hsl.a}%` }}
            >
              {hsl.a}%
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Color Format Selector and Inputs */}
      <div className="space-y-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div ref={formatDropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowFormatDropdown(!showFormatDropdown)}
              className="text-xs px-2 py-2 border border-border/60 rounded-md bg-background text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 min-w-[60px] focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
            >
              <span>{formatOptions.find(opt => opt.value === colorFormat)?.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showFormatDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showFormatDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-popover border border-border rounded-md shadow-lg z-[60] overflow-hidden">
                {formatOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onFormatChange(option.value as 'hex' | 'rgb' | 'hsl');
                      setShowFormatDropdown(false);
                    }}
                    className={`w-full text-left text-xs px-2 py-1.5 hover:bg-muted transition-colors ${
                      colorFormat === option.value ? 'bg-muted/50' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {colorFormat === 'hex' && (
            <>
              <input
                type="text"
                value={color.replace('#', '').toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
                  if (val.length === 6) {
                    onChange(`#${val}`);
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="flex-1 min-w-0 px-2 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
                placeholder="000000"
              />
              <div className="flex items-center gap-0.5 shrink-0">
                <input
                  type="text"
                  inputMode="numeric"
                  value={String(hsl.a)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    if (raw === '') return;
                    const n = parseInt(raw, 10);
                    if (!Number.isNaN(n)) onHslChange({ a: Math.max(0, Math.min(100, n)) });
                  }}
                  onBlur={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    if (raw === '') onHslChange({ a: 100 });
                    else {
                      const n = parseInt(raw, 10);
                      if (!Number.isNaN(n)) onHslChange({ a: Math.max(0, Math.min(100, n)) });
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                  className="w-9 pl-1 pr-1 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70 text-left"
                  placeholder="%"
                  title="Opacity %"
                />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
            </>
          )}
          {colorFormat === 'rgb' && (
            <>
              <input
                type="number"
                value={rgb.r}
                onChange={(e) => {
                  const r = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                  const newHsl = rgbToHsl(r, rgb.g, rgb.b, hsl.a);
                  onHslChange(newHsl);
                  onChange(hslToHex(newHsl.h, newHsl.s, newHsl.l));
                }}
                onFocus={(e) => e.target.select()}
                min="0"
                max="255"
                className="input-no-spinner flex-1 min-w-0 px-1.5 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
                placeholder="R"
              />
              <input
                type="number"
                value={rgb.g}
                onChange={(e) => {
                  const g = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                  const newHsl = rgbToHsl(rgb.r, g, rgb.b, hsl.a);
                  onHslChange(newHsl);
                  onChange(hslToHex(newHsl.h, newHsl.s, newHsl.l));
                }}
                onFocus={(e) => e.target.select()}
                min="0"
                max="255"
                className="input-no-spinner flex-1 min-w-0 px-1.5 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
                placeholder="G"
              />
              <input
                type="number"
                value={rgb.b}
                onChange={(e) => {
                  const b = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                  const newHsl = rgbToHsl(rgb.r, rgb.g, b, hsl.a);
                  onHslChange(newHsl);
                  onChange(hslToHex(newHsl.h, newHsl.s, newHsl.l));
                }}
                onFocus={(e) => e.target.select()}
                min="0"
                max="255"
                className="input-no-spinner flex-1 min-w-0 px-1.5 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
                placeholder="B"
              />
              <div className="flex items-center gap-0.5 shrink-0">
                <input
                  type="number"
                  value={hsl.a}
                  onChange={(e) => onHslChange({ a: parseInt(e.target.value) || 0 })}
                  onFocus={(e) => e.target.select()}
                  min="0"
                  max="100"
                  className="input-no-spinner w-9 pl-1 pr-1 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70 text-left"
                  placeholder="A"
                />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
            </>
          )}
          {colorFormat === 'hsl' && (
            <>
              <input
                type="number"
                value={hsl.h}
                onChange={(e) => onHslChange({ h: parseInt(e.target.value) || 0 })}
                onFocus={(e) => e.target.select()}
                min="0"
                max="360"
                className="input-no-spinner flex-1 min-w-0 px-1.5 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
                placeholder="H"
              />
              <input
                type="number"
                value={hsl.s}
                onChange={(e) => onHslChange({ s: parseInt(e.target.value) || 0 })}
                onFocus={(e) => e.target.select()}
                min="0"
                max="100"
                className="input-no-spinner flex-1 min-w-0 px-1.5 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
                placeholder="S"
              />
              <input
                type="number"
                value={hsl.l}
                onChange={(e) => onHslChange({ l: parseInt(e.target.value) || 0 })}
                onFocus={(e) => e.target.select()}
                min="0"
                max="100"
                className="input-no-spinner flex-1 min-w-0 px-1.5 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70"
                placeholder="L"
              />
              <div className="flex items-center gap-0.5 shrink-0">
                <input
                  type="number"
                  value={hsl.a}
                  onChange={(e) => onHslChange({ a: parseInt(e.target.value) || 0 })}
                  onFocus={(e) => e.target.select()}
                  min="0"
                  max="100"
                  className="input-no-spinner w-9 pl-1 pr-1 py-2 text-xs border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border/90 dark:focus:border-border/70 text-left"
                  placeholder="A"
                />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoadingAnimationsPage() {
  const { resolvedTheme, toggleTheme, setTheme } = useTheme();
  const [isNavStuck, setIsNavStuck] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  // Initialize color picker state from localStorage, default to false
  const [showColorPicker, setShowColorPicker] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('color-picker-open');
    return saved === 'true';
  });
  const [randomPickTooltipDismissed, setRandomPickTooltipDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [currentGroupTitle, setCurrentGroupTitle] = useState<string>("");
  const stickySentinelRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorPickerButtonRef = useRef<HTMLDivElement>(null);
  const colorPickerMouseDownInsideRef = useRef(false);
  const [pickerPosition, setPickerPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pickerInitializedRef = useRef(false);
  const hasBeenDraggedRef = useRef(false);
  
  // Refs for each animation group heading
  const sequentialRef = useRef<HTMLHeadingElement | HTMLDivElement>(null);
  const scaleRef = useRef<HTMLHeadingElement>(null);
  const rotateRef = useRef<HTMLHeadingElement>(null);
  const morphRef = useRef<HTMLHeadingElement>(null);
  const waveRef = useRef<HTMLHeadingElement>(null);
  const pulseRef = useRef<HTMLHeadingElement>(null);
  const subtleRef = useRef<HTMLHeadingElement>(null);
  
  // Default colors based on theme - flipped between modes
  // Light mode: logo uses dark color (like foreground text)
  // Dark mode: logo uses light color (like foreground text)
  // These match the CSS variables: --foreground in light mode is dark, in dark mode is light
  const defaultLightColor = "#1a1a1a"; // Dark color for light mode (matches --foreground in light mode)
  const defaultDarkColor = "#f5f5f5"; // Light color for dark mode (matches --foreground in dark mode)
  
  // Initialize with defaults to avoid hydration mismatch; sync from localStorage after mount
  const [logoColor, setLogoColor] = useState<string>("");
  const [userHasSetColor, setUserHasSetColor] = useState(false);

  const [mounted, setMounted] = useState(false);
  const hasInitializedThemeAndLogoRef = useRef(false);
  const previousThemeRef = useRef<string | null>(null);

  // Track if this is a reload
  const isReloadRef = useRef<boolean | null>(null);
  
  // Custom animations state - initialize from localStorage if available
  const [customAnimations, setCustomAnimations] = useState<Array<{
    id: string;
    baseVariant: string;
    title: string;
    variations: { variant: string; title: string }[];
    css: string;
  }>>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const cached = localStorage.getItem('custom-animations-cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed || [];
      }
    } catch (e) {
      console.error('Error loading custom animations cache:', e);
    }
    return [];
  });
  
  const customAnimationCounterRef = useRef<number>(0);
  
  // Initialize counter from localStorage
  if (typeof window !== 'undefined' && customAnimationCounterRef.current === 0) {
    try {
      const cached = localStorage.getItem('custom-animation-counter');
      customAnimationCounterRef.current = cached ? parseInt(cached, 10) : 0;
    } catch {
      customAnimationCounterRef.current = 0;
    }
  }
  
  // Dynamic variations for existing groups - initialize from localStorage
  const [dynamicVariations, setDynamicVariations] = useState<Record<string, Array<{ variant: string; title: string }>>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const cached = localStorage.getItem('dynamic-variations-cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed || {};
      }
    } catch (e) {
      console.error('Error loading dynamic variations cache:', e);
    }
    return {};
  });
  
  // Store CSS for custom variants - initialize from localStorage
  const [customVariantCSS, setCustomVariantCSS] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const cached = localStorage.getItem('custom-variant-css-cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed || {};
      }
    } catch (e) {
      console.error('Error loading custom variant CSS cache:', e);
    }
    return {};
  });
  
  // Loading state for variant generation
  const [generatingVariant, setGeneratingVariant] = useState<string | null>(null);
  
  // Random animation variant for generator section logo
  const [randomGeneratorAnimation, setRandomGeneratorAnimation] = useState<string>(() => {
    const variants = [
      'sequential', 'sequential2', 'sequential3', 'sequential4',
      'scale', 'scale2', 'scale3', 'scale4',
      'rotate', 'rotate2', 'rotate3', 'rotate4',
      'morph', 'morph2', 'morph3', 'morph4',
      'wave', 'wave2', 'wave3', 'wave4',
      'pulse', 'pulse2', 'pulse3', 'pulse4',
      'float', 'float2', 'float3', 'float4'
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  });
  
  const generatorLogoRef = useRef<SVGSVGElement>(null);
  
  // After mount: run once — on reload reset logo/theme; otherwise restore from localStorage or set default
  useEffect(() => {
    if (typeof window === 'undefined' || hasInitializedThemeAndLogoRef.current) return;
    hasInitializedThemeAndLogoRef.current = true;
    const navEntry = performance.getEntriesByType?.("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navEntry?.type === "reload") {
      localStorage.removeItem("logo-color-override");
      // Clear animation caches on hard reload
      localStorage.removeItem("custom-animations-cache");
      localStorage.removeItem("dynamic-variations-cache");
      localStorage.removeItem("custom-variant-css-cache");
      localStorage.removeItem("custom-animation-counter");
      localStorage.removeItem("used-animation-styles");
      setTheme("system");
      isReloadRef.current = true;
      setUserHasSetColor(false);
      setLogoColor(""); // Clear logoColor immediately on reload
      // Reset state to empty
      setCustomAnimations([]);
      setDynamicVariations({});
      setCustomVariantCSS({});
      customAnimationCounterRef.current = 0;
    } else {
      isReloadRef.current = false;
      const saved = localStorage.getItem("logo-color-override");
      if (saved) {
        setLogoColor(saved);
        setUserHasSetColor(true);
      } else {
        setUserHasSetColor(false);
        // Don't set logoColor here - wait for resolvedTheme to be available
      }
    }
  }, [setTheme]);

  useEffect(() => {
    setMounted(true);
    
    // Load and inject cached CSS on mount
    if (typeof window !== 'undefined' && customVariantCSS && Object.keys(customVariantCSS).length > 0) {
      const allCSS = Object.values(customVariantCSS).join('\n\n');
      if (allCSS) {
        injectCustomCSS(allCSS);
      }
    }
  }, []);

  // Cache customAnimations to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('custom-animations-cache', JSON.stringify(customAnimations));
    } catch (e) {
      console.error('Error saving custom animations cache:', e);
    }
  }, [customAnimations]);

  // Cache dynamicVariations to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('dynamic-variations-cache', JSON.stringify(dynamicVariations));
    } catch (e) {
      console.error('Error saving dynamic variations cache:', e);
    }
  }, [dynamicVariations]);

  // Cache customVariantCSS to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('custom-variant-css-cache', JSON.stringify(customVariantCSS));
    } catch (e) {
      console.error('Error saving custom variant CSS cache:', e);
    }
  }, [customVariantCSS]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Track large screen size (lg breakpoint: 1024px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLargeScreen(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Prevent body scrolling when mobile color picker is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (showColorPicker && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showColorPicker, isMobile]);

  useEffect(() => {
    // Hide footer on this page
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }
    
    return () => {
      // Restore footer when leaving page
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  useEffect(() => {
    const sentinel = stickySentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel scrolls out of view, the sticky bar has reached the top.
        setIsNavStuck(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Detect when user is at bottom of page
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Consider "at bottom" when within 100px of the bottom
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which animation group is currently visible
  useEffect(() => {
    const refs = [
      { ref: sequentialRef, title: "Sequential Reveal" },
      { ref: scaleRef, title: "Scale from Centre" },
      { ref: rotateRef, title: "Rotate into Place" },
      { ref: morphRef, title: "Morph from Circles" },
      { ref: waveRef, title: "Wave Effect" },
      { ref: pulseRef, title: "Pulse Animation" },
      { ref: subtleRef, title: "Subtle Motion" },
      // Add custom animation sets
      ...customAnimations.map(set => ({
        ref: getCustomSetRef(set.id),
        title: set.title
      }))
    ];

    const observers: IntersectionObserver[] = [];

    refs.forEach(({ ref, title }) => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentGroupTitle(title);
          }
        },
        // Only switch when the section heading has been fully covered by the sticky bar
        // (root = top strip only; use percentage since rootMargin doesn't support calc)
        { threshold: 0, rootMargin: '0px 0px -92% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [customAnimations]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove # if present, then add it back
    value = value.replace(/^#/, '');
    // Only allow hex characters
    value = value.replace(/[^0-9A-Fa-f]/g, '');
    // Limit to 6 characters
    value = value.slice(0, 6);
    // Add # prefix
    if (value) {
      const hexColor = `#${value}`;
      setLogoColor(hexColor);
      setUserHasSetColor(true);
      localStorage.setItem('logo-color-override', hexColor);
    } else {
      setLogoColor("");
      setUserHasSetColor(false);
      localStorage.removeItem('logo-color-override');
    }
  };

  // Close color picker when clicking outside (not when changing format/color inside)
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      colorPickerMouseDownInsideRef.current =
        colorPickerRef.current?.contains(event.target as Node) ?? false;
    };
    // Removed click-outside handler - color picker stays open unless user explicitly closes it
    // Only track mousedown for potential future use
    if (showColorPicker) {
      document.addEventListener('mousedown', handleMouseDown);
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [showColorPicker]);

  // Persist color picker state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('color-picker-open', showColorPicker.toString());
    }
  }, [showColorPicker]);

  // Reset random-pick tooltip when picker opens so it shows on first hover again
  useEffect(() => {
    if (showColorPicker) setRandomPickTooltipDismissed(false);
  }, [showColorPicker]);

  // Initialize or reset picker position
  useEffect(() => {
    if (!showColorPicker || isMobile || isLargeScreen) {
      setPickerPosition(null);
      pickerInitializedRef.current = false;
      hasBeenDraggedRef.current = false;
      return;
    }

    // Initialize position if not set - position below the button (dropdown style)
    // Reset initialization flag when picker closes so it repositions on next open
    if (!pickerInitializedRef.current && !hasBeenDraggedRef.current) {
      // Use double requestAnimationFrame to ensure DOM is fully laid out
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (colorPickerButtonRef.current) {
              const buttonRect = colorPickerButtonRef.current.getBoundingClientRect();
              const pickerWidth = 280; // sm:w-72 = 18rem = 288px, but max-w-[280px] so use 280
              const spacing = 8; // mt-2 = 8px spacing
              const pickerHeight = 345;
              const scrollY = window.scrollY || window.pageYOffset;
              const isAtTop = scrollY < 50; // Consider "at top" if scrolled less than 50px
              
              // Position directly below the button, aligned to left edge
              // getBoundingClientRect gives viewport coordinates (perfect for fixed positioning)
              // This works correctly whether sticky nav is active or not, as it uses viewport coords
              let x = buttonRect.left;
              let y = buttonRect.bottom + spacing;
              
              // When at top of page (before sticky nav activates), ensure picker doesn't overlap header
              // The header is typically around 60-80px tall, so ensure enough clearance
              if (isAtTop && !isNavStuck) {
                const headerHeight = 80; // Approximate header height
                const minY = headerHeight + 16; // Header height + spacing
                if (y < minY) {
                  y = minY;
                }
              }
              
              // Only adjust if absolutely necessary (would go off screen)
              if (x + pickerWidth > window.innerWidth - 16) {
                x = Math.max(16, window.innerWidth - pickerWidth - 16);
              }
              if (y + pickerHeight > window.innerHeight - 16) {
                y = Math.max(16, buttonRect.top - pickerHeight - spacing);
              }
              
              setPickerPosition({ x, y });
              pickerInitializedRef.current = true;
            }
          }, 0);
        });
      });
    }
  }, [showColorPicker, isMobile]);

  // Drag handlers for color picker
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMobile || isLargeScreen) return;
    // Don't drag if clicking on buttons or interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('[role="button"]')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - (pickerPosition?.x ?? 0),
      y: e.clientY - (pickerPosition?.y ?? 0)
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      setPickerPosition({ x: newX, y: newY });
      hasBeenDraggedRef.current = true; // Mark as dragged so we don't reset to dropdown position
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const currentHsl = hexToHsl(logoColor || '#000000');
  const [hsl, setHsl] = useState(currentHsl);
  const colorChangeFromPickerRef = useRef(false);

  // Set default color based on theme if user hasn't set one
  // This runs when resolvedTheme becomes available or changes
  useEffect(() => {
    if (!mounted || !resolvedTheme) return;
    
    const defaultColor = resolvedTheme === "dark" ? defaultDarkColor : defaultLightColor;
    
    // On reload, always reset to default color based on resolvedTheme
    if (isReloadRef.current === true) {
      setLogoColor(defaultColor);
      isReloadRef.current = null; // Reset flag after handling reload
      previousThemeRef.current = resolvedTheme;
      return;
    }
    
    // If user hasn't manually set a color, always use the default for current theme
    if (!userHasSetColor) {
      const themeChanged = previousThemeRef.current && previousThemeRef.current !== resolvedTheme;
      
      // Set default if: logoColor is empty, or theme changed (user hasn't manually set color, so update to new theme default)
      if (!logoColor || themeChanged) {
        setLogoColor(defaultColor);
      }
    }
    
    previousThemeRef.current = resolvedTheme;
  }, [resolvedTheme, userHasSetColor, mounted]);

  // Update HSL when logoColor changes from a source that doesn't go through onHslChange (e.g. hex input).
  // Skip when hex is white/black so we don't overwrite picker position with s:0.
  useEffect(() => {
    if (!logoColor || logoColor.length !== 7) return;
    const newHsl = hexToHsl(logoColor);
    if (newHsl.s === 0 && (newHsl.l === 100 || newHsl.l === 0)) return;
    setHsl(newHsl);
  }, [logoColor]);

  const handleHslChange = (newHsl: { h?: number; s?: number; l?: number; a?: number }) => {
    colorChangeFromPickerRef.current = true;
    const updated = { ...hsl, ...newHsl };
    setHsl(updated);
    const hex = hslToHex(updated.h, updated.s, updated.l);
    setLogoColor(hex);
    setUserHasSetColor(true);
    localStorage.setItem('logo-color-override', hex);
  };

  const handleRgbChange = (r: number, g: number, b: number) => {
    const newHsl = rgbToHsl(r, g, b, hsl.a);
    setHsl(newHsl);
    setLogoColor(hslToHex(newHsl.h, newHsl.s, newHsl.l));
  };

  const handleResetColor = () => {
    const defaultColor = resolvedTheme === "dark" ? defaultDarkColor : defaultLightColor;
    const defaultHsl = hexToHsl(defaultColor);
    setLogoColor(defaultColor);
    setHsl({ ...defaultHsl, a: hsl.a }); // Keep current alpha
    setUserHasSetColor(false);
    localStorage.removeItem("logo-color-override");
  };

  // Get default color based on current theme
  const getDefaultColor = () => {
    if (resolvedTheme === "dark") return defaultDarkColor;
    if (resolvedTheme === "light") return defaultLightColor;
    // Fallback to system preference if theme not resolved yet
    return typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches ? defaultDarkColor : defaultLightColor;
  };

  // Generate a new variant based on an existing base variant
  const handleCreateVariant = async (baseVariant: string) => {
    if (generatingVariant) return; // Prevent multiple simultaneous generations
    
    setGeneratingVariant(baseVariant);
    
    try {
      // Check if this is a custom animation set (e.g., custom-1-base)
      const isCustomSet = baseVariant.startsWith('custom-') && baseVariant.includes('-base');
      
      let baseCSS: string | undefined;
      
      if (isCustomSet) {
        // For custom sets, get CSS from customVariantCSS or the custom set's css property
        baseCSS = customVariantCSS[baseVariant];
        if (!baseCSS) {
          const customSet = customAnimations.find(set => set.baseVariant === baseVariant);
          if (customSet?.css) {
            // Extract just the base variant CSS from the full CSS
            const baseMatch = customSet.css.match(new RegExp(`\\.logo-anim-${baseVariant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?\\n\\n`, 'm'));
            baseCSS = baseMatch ? baseMatch[0].trim() : customSet.css.split('\n\n')[0];
          }
        }
      } else {
        // For predefined variants, use getAnimationCSS with customVariantCSS
        baseCSS = getAnimationCSS(baseVariant, customVariantCSS);
      }
      
      if (!baseCSS) {
        setGeneratingVariant(null);
        return;
      }
      
      let nextNumber: number;
      let newVariant: string;
      let newTitle: string;
      
      if (isCustomSet) {
        // For custom sets, find the highest existing variant number
        // Custom variants follow pattern: custom-1-base-1, custom-1-base-2, etc.
        const customSet = customAnimations.find(set => set.baseVariant === baseVariant);
        const existingVariations = customSet?.variations || [];
        const variantNumbers = existingVariations
          .map(v => {
            const match = v.variant.match(/-(\d+)$/);
            return match ? parseInt(match[1]) : 0;
          })
          .filter(n => n > 0);
        
        // Start from the next number after existing variations
        nextNumber = variantNumbers.length > 0 ? Math.max(...variantNumbers) + 1 : existingVariations.length + 1;
        newVariant = `${baseVariant}-${nextNumber}`;
        newTitle = generateVariationTitle(customSet?.title || 'Custom', nextNumber);
      } else {
        // For predefined variants, find the highest existing variant number
        // Predefined variants go up to 4 (e.g., sequential4, scale4)
        const dynamicVariants = dynamicVariations[baseVariant] || [];
        const variantNumbers = dynamicVariants
          .map(v => {
            const match = v.variant.match(/\d+$/);
            return match ? parseInt(match[0]) : 0;
          })
          .filter(n => n > 0);
        
        // Start from 5 if no dynamic variants exist, otherwise increment from max
        nextNumber = variantNumbers.length > 0 ? Math.max(...variantNumbers) + 1 : 5;
        newVariant = `${baseVariant}${nextNumber}`;
        newTitle = generateVariantTitle(baseVariant, nextNumber);
      }
      
      // Check if variant already exists (uniqueness check)
      const allExistingVariants = [
        ...customAnimations.flatMap(set => [
          set.baseVariant,
          ...set.variations.map(v => v.variant)
        ]),
        ...Object.values(dynamicVariations).flatMap(variants => variants.map(v => v.variant)),
        // Include predefined variants
        'sequential', 'sequential2', 'sequential3', 'sequential4',
        'scale', 'scale2', 'scale3', 'scale4',
        'rotate', 'rotate2', 'rotate3', 'rotate4',
        'morph', 'morph2', 'morph3', 'morph4',
        'wave', 'wave2', 'wave3', 'wave4',
        'pulse', 'pulse2', 'pulse3', 'pulse4',
        'float', 'float2', 'float3', 'float4'
      ];
      
      // Ensure variant is unique - if it exists, increment number
      let attempts = 0;
      let finalVariant = newVariant;
      while (allExistingVariants.includes(finalVariant) && attempts < 100) {
        if (isCustomSet) {
          nextNumber += 1;
          finalVariant = `${baseVariant}-${nextNumber}`;
        } else {
          nextNumber += 1;
          finalVariant = `${baseVariant}${nextNumber}`;
        }
        attempts += 1;
      }
      
      if (attempts >= 100) {
        console.error('Could not generate unique variant name');
        setGeneratingVariant(null);
        return;
      }
      
      newVariant = finalVariant;
      
      // Generate modified CSS
      const newCSS = generateVariantCSS(baseCSS, baseVariant, newVariant);
      
      // Inject CSS synchronously before state update
      if (typeof document !== 'undefined') {
        injectCustomCSS(newCSS);
        // Force a reflow to ensure CSS is applied
        document.body.offsetHeight;
      }
      
      // Store CSS for copy functionality
      setCustomVariantCSS(prev => ({
        ...prev,
        [newVariant]: newCSS
      }));
      
      if (isCustomSet) {
        // Update custom animations state to include the new variant
        setCustomAnimations(prev => prev.map(set => 
          set.baseVariant === baseVariant
            ? {
                ...set,
                variations: [...set.variations, { variant: newVariant, title: newTitle }]
              }
            : set
        ));
      } else {
        // Add to dynamic variations for predefined sets
        setDynamicVariations(prev => ({
          ...prev,
          [baseVariant]: [...(prev[baseVariant] || []), { variant: newVariant, title: newTitle }]
        }));
      }
    } finally {
      // Small delay to ensure rendering completes
      setTimeout(() => {
        setGeneratingVariant(null);
      }, 100);
    }
  };

  // Get all existing animation styles to ensure uniqueness
  const getUsedAnimationStyles = (): Set<string> => {
    if (typeof window === 'undefined') return new Set();
    try {
      const cached = localStorage.getItem('used-animation-styles');
      if (cached) {
        return new Set(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Error loading used animation styles:', e);
    }
    return new Set();
  };

  const saveUsedAnimationStyle = (styleSignature: string) => {
    if (typeof window === 'undefined') return;
    try {
      const used = getUsedAnimationStyles();
      used.add(styleSignature);
      localStorage.setItem('used-animation-styles', JSON.stringify(Array.from(used)));
    } catch (e) {
      console.error('Error saving used animation style:', e);
    }
  };

  // Generate a completely new animation set with unique style
  const handleGenerateNewSet = () => {
    customAnimationCounterRef.current += 1;
    const setId = `custom-${customAnimationCounterRef.current}`;
    const baseVariant = `${setId}-base`;
    
    // Get all existing variants to ensure uniqueness
    const allExistingVariants = [
      ...customAnimations.flatMap(set => [
        set.baseVariant,
        ...set.variations.map(v => v.variant)
      ]),
      ...Object.values(dynamicVariations).flatMap(variants => variants.map(v => v.variant)),
      'sequential', 'sequential2', 'sequential3', 'sequential4',
      'scale', 'scale2', 'scale3', 'scale4',
      'rotate', 'rotate2', 'rotate3', 'rotate4',
      'morph', 'morph2', 'morph3', 'morph4',
      'wave', 'wave2', 'wave3', 'wave4',
      'pulse', 'pulse2', 'pulse3', 'pulse4',
      'float', 'float2', 'float3', 'float4'
    ];
    
    // Generate unique animation style (different from all existing sets)
    const usedStyles = getUsedAnimationStyles();
    let animationStyle: any;
    let styleSignature: string;
    let attempts = 0;
    
    do {
      animationStyle = generateUniqueAnimationStyle(usedStyles);
      styleSignature = `${animationStyle.type}-${animationStyle.timing}-${animationStyle.easing}`;
      attempts += 1;
    } while (usedStyles.has(styleSignature) && attempts < 50);
    
    if (attempts >= 50) {
      console.warn('Could not generate completely unique style, using generated style');
    }
    
    // Save the style signature
    saveUsedAnimationStyle(styleSignature);
    
    // Generate set title based on animation style
    const setTitle = generateRandomSetTitle();
    
    // Generate 3 variations (4 total: 1 base + 3 variations) with same style but different parameters
    const variations = [
      { variant: `${baseVariant}-1`, title: generateVariationTitle(setTitle, 1) },
      { variant: `${baseVariant}-2`, title: generateVariationTitle(setTitle, 2) },
      { variant: `${baseVariant}-3`, title: generateVariationTitle(setTitle, 3) }
    ];

    // Generate CSS for base and variations using the unique style
    const baseCSS = generateAnimationCSSFromStyle(baseVariant, animationStyle);
    const variationCSSArray = variations.map((v, i) => {
      // Create variations with slight modifications to timing/easing
      const variationStyle = {
        ...animationStyle,
        timing: animationStyle.timing + (i * 0.2 - 0.2), // Slight variation
        easing: animationStyle.easing // Keep same easing for consistency
      };
      return generateAnimationCSSFromStyle(v.variant, variationStyle);
    });
    const variationCSS = variationCSSArray.join('\n\n');
    const allCSS = `${baseCSS}\n\n${variationCSS}`;

    // Inject CSS
    injectCustomCSS(allCSS);

    // Store CSS for copy functionality
    const newCustomCSS: Record<string, string> = { [baseVariant]: baseCSS };
    variations.forEach((v, i) => {
      newCustomCSS[v.variant] = variationCSSArray[i];
    });
    setCustomVariantCSS(prev => ({ ...prev, ...newCustomCSS }));

    // Save counter
    if (typeof window !== 'undefined') {
      localStorage.setItem('custom-animation-counter', customAnimationCounterRef.current.toString());
    }

    // Add to custom animations state
    const newAnimationSet = {
      id: setId,
      baseVariant,
      title: setTitle,
      variations,
      css: allCSS
    };

    setCustomAnimations(prev => [...prev, newAnimationSet]);
  };

  // Helper functions
  const generateVariantTitle = (baseVariant: string, number: number): string => {
    const titles: Record<string, string[]> = {
      sequential: ['Fast', 'Slow', 'Bounce', 'Smooth'],
      scale: ['Elastic', 'Smooth', 'Quick', 'Bounce'],
      rotate: ['360°', 'Bounce', 'Smooth', 'Quick'],
      morph: ['Elastic', 'Quick', 'Smooth', 'Bounce'],
      wave: ['Horizontal', 'Diagonal', 'Ripple', 'Smooth'],
      pulse: ['Strong', 'Gentle', 'Quick', 'Smooth'],
      float: ['Breathe', 'Drift', 'Float', 'Smooth']
    };
    
    const base = baseVariant.replace(/\d+$/, '');
    const titleList = titles[base] || ['Variant'];
    return titleList[(number - 2) % titleList.length] || `Variant ${number}`;
  };

  const generateVariantCSS = (baseCSS: string, oldVariant: string, newVariant: string): string => {
    // Modify timing, easing, or transform values randomly
    const timingVariations = [1.8, 2.0, 2.2, 2.5, 3.0, 3.5];
    const easingVariations = [
      'ease-in-out',
      'cubic-bezier(0.34, 1.56, 0.64, 1)',
      'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'ease-out',
      'ease-in'
    ];
    
    const newTiming = timingVariations[Math.floor(Math.random() * timingVariations.length)];
    const newEasing = easingVariations[Math.floor(Math.random() * easingVariations.length)];
    
    // Extract keyframe name from the CSS
    const keyframeMatch = baseCSS.match(/@keyframes\s+(\w+)/);
    const oldKeyframeName = keyframeMatch ? keyframeMatch[1] : '';
    
    // Generate new keyframe name based on variant pattern
    // Keyframes are typically named like: fadeInPathLoop, scaleInPathLoop, etc.
    // For new variants, we'll create: fadeInPathLoop5, scaleInPathLoop5, etc.
    const variantNum = newVariant.match(/\d+$/)?.[0] || '';
    let newKeyframeName = '';
    
    if (oldKeyframeName) {
      // If keyframe name exists, append variant number
      newKeyframeName = `${oldKeyframeName}${variantNum}`;
    } else {
      // Fallback: create a new keyframe name based on variant
      const baseName = oldVariant.replace(/\d+$/, '');
      newKeyframeName = `anim${baseName}${variantNum}Loop`;
    }
    
    // Escape special regex characters
    const escapedOldVariant = oldVariant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedOldKeyframe = oldKeyframeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    let modifiedCSS = baseCSS
      // Replace class name
      .replace(new RegExp(`\\.logo-anim-${escapedOldVariant}`, 'g'), `.logo-anim-${newVariant}`)
      // Replace keyframes declaration
      .replace(new RegExp(`@keyframes\\s+${escapedOldKeyframe}`, 'g'), `@keyframes ${newKeyframeName}`)
      // Replace animation property reference to keyframe (match: animation: keyframeName ...)
      .replace(new RegExp(`animation:\\s*${escapedOldKeyframe}(\\s+[^;]+)`, 'g'), `animation: ${newKeyframeName}$1`)
      // Replace timing and easing (but preserve delay and infinite keyword)
      .replace(new RegExp(`animation:\\s*${newKeyframeName}\\s+(\\d+\\.?\\d*)s\\s+(?:ease-[^;]+|cubic-bezier[^;]+)(\\s+[^;]+)`, 'g'), (match, timing, rest) => {
        // rest contains delay and infinite, preserve it
        return `animation: ${newKeyframeName} ${newTiming}s ${newEasing}${rest}`;
      });

    return modifiedCSS;
  };

  // Generate unique animation style that's different from existing ones
  const generateUniqueAnimationStyle = (usedStyles: Set<string>): any => {
    const animationTypes = [
      {
        type: 'scale-bounce',
        initial: 'opacity: 0; transform: scale(0);',
        keyframes: [
          '0% { opacity: 0; transform: scale(0); }',
          '15% { opacity: 1; transform: scale(1.1); }',
          '20% { opacity: 1; transform: scale(1); }',
          '50% { opacity: 1; transform: scale(1); }',
          '65% { opacity: 1; transform: scale(1.05); }',
          '100% { opacity: 0; transform: scale(0); }'
        ],
        timings: [1.8, 2.0, 2.2, 2.5, 3.0, 3.5],
        easings: ['cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'ease-in-out', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'ease-out']
      },
      {
        type: 'slide-up',
        initial: 'opacity: 0; transform: translateY(20px);',
        keyframes: [
          '0% { opacity: 0; transform: translateY(20px); }',
          '15% { opacity: 1; transform: translateY(-5px); }',
          '20% { opacity: 1; transform: translateY(0); }',
          '50% { opacity: 1; transform: translateY(0); }',
          '65% { opacity: 1; transform: translateY(5px); }',
          '100% { opacity: 0; transform: translateY(20px); }'
        ],
        timings: [2.0, 2.2, 2.5, 3.0, 3.5],
        easings: ['ease-in-out', 'ease-out', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)']
      },
      {
        type: 'rotate-scale',
        initial: 'opacity: 0; transform: rotate(-180deg) scale(0.5);',
        keyframes: [
          '0% { opacity: 0; transform: rotate(-180deg) scale(0.5); }',
          '15% { opacity: 1; transform: rotate(0deg) scale(1); }',
          '50% { opacity: 1; transform: rotate(0deg) scale(1); }',
          '65% { opacity: 0; transform: rotate(180deg) scale(0.5); }',
          '100% { opacity: 0; transform: rotate(180deg) scale(0.5); }'
        ],
        timings: [2.2, 2.5, 3.0, 3.5],
        easings: ['cubic-bezier(0.34, 1.56, 0.64, 1)', 'ease-in-out', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'ease-out']
      },
      {
        type: 'fade-only',
        initial: 'opacity: 0;',
        keyframes: [
          '0% { opacity: 0; }',
          '15% { opacity: 1; }',
          '50% { opacity: 1; }',
          '65% { opacity: 0; }',
          '100% { opacity: 0; }'
        ],
        timings: [2.0, 2.5, 3.0, 3.5, 4.0],
        easings: ['ease-in-out', 'ease-out', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'cubic-bezier(0.34, 1.56, 0.64, 1)']
      },
      {
        type: 'skew-reveal',
        initial: 'opacity: 0; transform: skewX(-20deg) translateX(-20px);',
        keyframes: [
          '0% { opacity: 0; transform: skewX(-20deg) translateX(-20px); }',
          '15% { opacity: 1; transform: skewX(0deg) translateX(0); }',
          '50% { opacity: 1; transform: skewX(0deg) translateX(0); }',
          '65% { opacity: 1; transform: skewX(5deg) translateX(5px); }',
          '100% { opacity: 0; transform: skewX(20deg) translateX(20px); }'
        ],
        timings: [2.0, 2.5, 3.0],
        easings: ['ease-in-out', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'ease-out']
      },
      {
        type: 'zoom-blur',
        initial: 'opacity: 0; transform: scale(1.5); filter: blur(10px);',
        keyframes: [
          '0% { opacity: 0; transform: scale(1.5); filter: blur(10px); }',
          '15% { opacity: 1; transform: scale(1); filter: blur(0px); }',
          '50% { opacity: 1; transform: scale(1); filter: blur(0px); }',
          '65% { opacity: 1; transform: scale(0.95); filter: blur(2px); }',
          '100% { opacity: 0; transform: scale(0.8); filter: blur(10px); }'
        ],
        timings: [2.5, 3.0, 3.5],
        easings: ['ease-out', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'ease-in-out']
      },
      {
        type: 'flip-3d',
        initial: 'opacity: 0; transform: rotateY(-90deg) scale(0.8);',
        keyframes: [
          '0% { opacity: 0; transform: rotateY(-90deg) scale(0.8); }',
          '15% { opacity: 1; transform: rotateY(0deg) scale(1); }',
          '50% { opacity: 1; transform: rotateY(0deg) scale(1); }',
          '65% { opacity: 1; transform: rotateY(10deg) scale(0.95); }',
          '100% { opacity: 0; transform: rotateY(90deg) scale(0.8); }'
        ],
        timings: [2.2, 2.8, 3.2],
        easings: ['cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'ease-in-out', 'cubic-bezier(0.34, 1.56, 0.64, 1)']
      },
      {
        type: 'elastic-bounce',
        initial: 'opacity: 0; transform: scale(0) translateY(30px);',
        keyframes: [
          '0% { opacity: 0; transform: scale(0) translateY(30px); }',
          '20% { opacity: 1; transform: scale(1.2) translateY(-10px); }',
          '30% { opacity: 1; transform: scale(0.9) translateY(5px); }',
          '40% { opacity: 1; transform: scale(1.05) translateY(0); }',
          '50% { opacity: 1; transform: scale(1) translateY(0); }',
          '65% { opacity: 1; transform: scale(1) translateY(0); }',
          '100% { opacity: 0; transform: scale(0) translateY(30px); }'
        ],
        timings: [2.5, 3.0, 3.5],
        easings: ['cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'ease-out']
      }
    ];

    // Try to find a unique combination
    let attempts = 0;
    while (attempts < 100) {
      const type = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      const timing = type.timings[Math.floor(Math.random() * type.timings.length)];
      const easing = type.easings[Math.floor(Math.random() * type.easings.length)];
      const signature = `${type.type}-${timing}-${easing}`;
      
      if (!usedStyles.has(signature)) {
        return {
          type: type.type,
          initial: type.initial,
          keyframes: type.keyframes,
          timing,
          easing
        };
      }
      attempts += 1;
    }
    
    // Fallback: return random style even if not completely unique
    const type = animationTypes[Math.floor(Math.random() * animationTypes.length)];
    return {
      type: type.type,
      initial: type.initial,
      keyframes: type.keyframes,
      timing: type.timings[Math.floor(Math.random() * type.timings.length)],
      easing: type.easings[Math.floor(Math.random() * type.easings.length)]
    };
  };

  // Generate CSS from animation style object
  const generateAnimationCSSFromStyle = (variant: string, style: any): string => {
    const keyframeName = `anim${variant.replace(/-/g, '')}Loop`;
    
    return `.logo-anim-${variant} {
  ${style.initial}
  animation: ${keyframeName} ${style.timing}s ${style.easing} 0s infinite;
  transform-origin: center;
}

@keyframes ${keyframeName} {
  ${style.keyframes.join('\n  ')}
}`;
  };

  const generateRandomAnimationCSS = (variant: string): string => {
    // This is kept for backward compatibility but uses the new system
    const style = generateUniqueAnimationStyle(new Set());
    return generateAnimationCSSFromStyle(variant, style);
  };

  const generateVariationTitle = (setTitle: string, index: number): string => {
    // Extract the main word from set title (e.g., "Dynamic Animation" -> "Dynamic")
    const mainWord = setTitle.split(' ')[0];
    
    // Variation descriptors that work with any set title
    const descriptors = ['Fast', 'Smooth', 'Elastic', 'Quick', 'Gentle', 'Strong', 'Swift', 'Bounce'];
    const descriptor = descriptors[index % descriptors.length];
    
    return `${mainWord} ${descriptor}`;
  };

  const generateRandomSetTitle = (): string => {
    // More descriptive and appropriate animation set names
    const styles = [
      'Scale Reveal',
      'Fade Motion',
      'Rotate Effect',
      'Slide Animation',
      'Bounce Reveal',
      'Glide Motion',
      'Pulse Effect',
      'Drift Animation',
      'Flow Reveal',
      'Shift Motion',
      'Smooth Effect',
      'Dynamic Animation'
    ];
    return styles[Math.floor(Math.random() * styles.length)];
  };

  const injectCustomCSS = (css: string) => {
    if (typeof document === 'undefined') return;
    
    const styleId = 'custom-animations';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent += '\n\n' + css;
  };

  // Color with alpha for animation previews (opacity slider updates this)
  const logoColorWithAlpha = hexToRgba(logoColor || getDefaultColor(), hsl.a);

  // Apply random animation to generator logo
  useEffect(() => {
    if (!generatorLogoRef.current) return;
    
    const svg = generatorLogoRef.current;
    const paths = svg.querySelectorAll('path');
    const baseClass = `logo-anim-${randomGeneratorAnimation}`;
    
    // Inject CSS for the animation
    const cssCode = getAnimationCSS(randomGeneratorAnimation);
    if (cssCode) {
      injectCustomCSS(cssCode);
    }
    
    // Apply animation class and delays to each path
    paths.forEach((path, index) => {
      // Remove existing animation classes
      const classes = path.className.baseVal.split(' ').filter((cls: string) => !cls.startsWith("logo-anim-"));
      path.className.baseVal = classes.join(' ');
      
      // Add new animation class
      path.className.baseVal += ` ${baseClass}`;
      
      // Calculate delay based on variant
      let delay = 0;
      const baseName = randomGeneratorAnimation.replace(/\d+$/, '');
      if (baseName === 'sequential' || randomGeneratorAnimation.startsWith('sequential')) {
        delay = index * 0.15;
      } else if (baseName === 'scale' || randomGeneratorAnimation.startsWith('scale')) {
        delay = index * 0.1;
      } else if (baseName === 'rotate' || randomGeneratorAnimation.startsWith('rotate')) {
        delay = index * 0.12;
      } else if (baseName === 'morph' || randomGeneratorAnimation.startsWith('morph')) {
        delay = index * 0.15;
      } else if (baseName === 'wave' || randomGeneratorAnimation.startsWith('wave')) {
        delay = index * 0.1;
      } else if (baseName === 'pulse' || randomGeneratorAnimation.startsWith('pulse')) {
        delay = index * 0.08;
      } else if (baseName === 'float' || randomGeneratorAnimation.startsWith('float')) {
        delay = 0;
      }
      
      if (delay > 0) {
        (path as SVGPathElement).style.animationDelay = `${delay}s`;
      }
    });
  }, [randomGeneratorAnimation, logoColorWithAlpha]);

  // Create refs for custom animation sets dynamically
  const customSetRefs = useRef<Map<string, React.RefObject<HTMLHeadingElement>>>(new Map());
  
  // Get or create ref for a custom set
  const getCustomSetRef = (id: string) => {
    if (!customSetRefs.current.has(id)) {
      customSetRefs.current.set(id, React.createRef<HTMLHeadingElement>());
    }
    return customSetRefs.current.get(id)!;
  };

  // Build all animation groups structure for modal navigation
  const allAnimationGroups = [
    {
      groupTitle: "Sequential Reveal",
      variants: [
        { variant: "sequential", title: "Original" },
        { variant: "sequential2", title: "Fast" },
        { variant: "sequential3", title: "Slow" },
        { variant: "sequential4", title: "Bounce" },
        ...(dynamicVariations["sequential"] || [])
      ]
    },
    {
      groupTitle: "Scale from Centre",
      variants: [
        { variant: "scale", title: "Original" },
        { variant: "scale2", title: "Elastic" },
        { variant: "scale3", title: "Smooth" },
        { variant: "scale4", title: "Quick" },
        ...(dynamicVariations["scale"] || [])
      ]
    },
    {
      groupTitle: "Rotate into Place",
      variants: [
        { variant: "rotate", title: "Original" },
        { variant: "rotate2", title: "360°" },
        { variant: "rotate3", title: "Bounce" },
        { variant: "rotate4", title: "Smooth" },
        ...(dynamicVariations["rotate"] || [])
      ]
    },
    {
      groupTitle: "Morph from Circles",
      variants: [
        { variant: "morph", title: "Original" },
        { variant: "morph2", title: "Elastic" },
        { variant: "morph3", title: "Quick" },
        { variant: "morph4", title: "Smooth" },
        ...(dynamicVariations["morph"] || [])
      ]
    },
    {
      groupTitle: "Wave Effect",
      variants: [
        { variant: "wave", title: "Original" },
        { variant: "wave2", title: "Horizontal" },
        { variant: "wave3", title: "Diagonal" },
        { variant: "wave4", title: "Ripple" },
        ...(dynamicVariations["wave"] || [])
      ]
    },
    {
      groupTitle: "Pulse Animation",
      variants: [
        { variant: "pulse", title: "Original" },
        { variant: "pulse2", title: "Strong" },
        { variant: "pulse3", title: "Gentle" },
        { variant: "pulse4", title: "Quick" },
        ...(dynamicVariations["pulse"] || [])
      ]
    },
    {
      groupTitle: "Subtle Motion",
      variants: [
        { variant: "float", title: "Original" },
        { variant: "float2", title: "Breathe" },
        { variant: "float3", title: "Drift" },
        { variant: "float4", title: "Float" },
        ...(dynamicVariations["float"] || [])
      ]
    },
    ...customAnimations.map(animSet => ({
      groupTitle: animSet.title,
      variants: [
        { variant: animSet.baseVariant, title: "Original" },
        ...animSet.variations
      ]
    }))
  ];

  return (
    <div className="min-h-screen w-full bg-background" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${showColorPicker && !isMobile ? 'sm:pl-0 sm:pr-0 md:pl-0 md:pr-0' : 'p-8 pb-0'}`}>
        {/* Main content area */}
        <div className={`transition-all duration-300 ${showColorPicker && !isMobile ? 'sm:pr-80 sm:pl-8 sm:pt-8 sm:pb-0 md:pr-80 md:pl-8 md:pt-8 md:pb-0' : ''} ${showColorPicker && !isMobile ? '' : 'p-8 pb-0'}`}>
        {/* Logo Header */}
        <div className="flex items-center justify-center mb-0">
          <div 
            className="h-16"
            style={{
              aspectRatio: '198/64', // Maintain logo aspect ratio
              maskImage: 'url("/logo-full-white.svg")',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: 'url("/logo-full-white.svg")',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              backgroundColor: logoColorWithAlpha || hexToRgba(getDefaultColor(), hsl.a)
            }}
            suppressHydrationWarning
            aria-label="Superhands"
          />
        </div>

        <div className="mb-12 text-center mt-0">
          <h2 className="font-space-grotesk text-4xl font-bold text-foreground mb-3 max-w-2xl mx-auto">
            New logo animation
          </h2>
        </div>

        {/* Sticky sentinel (used to detect "stuck" state) */}
        <div ref={stickySentinelRef} className="h-px w-full" aria-hidden="true" />
        </div>
      </div>

      {/* Sticky row: first section title + controls (same row); sticks on scroll - Full width */}
      <div 
          className={`sticky top-0 z-50 py-2 mb-0 bg-background/95 backdrop-blur-sm flex items-center ${isNavStuck ? "border-b border-border/60" : ""} ${showColorPicker && !isMobile ? 'sm:pr-72 sm:pl-8 md:pr-72 md:pl-8' : 'px-8 sm:px-12 md:px-16'}`}
          style={{
            width: showColorPicker && !isMobile ? 'calc(100vw - 18rem)' : '100vw',
            marginLeft: showColorPicker && !isMobile ? '0' : '50%',
            left: showColorPicker && !isMobile ? '0' : undefined,
            transform: showColorPicker && !isMobile ? 'none' : 'translateX(-50%)'
          }}
        >
          <div className="flex flex-row items-center justify-between w-full">
            {/* Left: logo (back to top) when stuck, then section title (non-clickable) */}
            <div className="flex items-center gap-2 min-h-[28px] flex-shrink-0">
              {isNavStuck && (
                <div className="relative group/backtotop">
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                    aria-label="Back to top"
                  >
                    <svg
                      className="nav-backtotop-logo w-6 h-6"
                      viewBox="0 0 76 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                      style={{ transition: 'none' }}
                    >
                      {logoMotifPaths.map((d, i) => (
                        <path 
                          key={i} 
                          d={d} 
                          fill={logoColorWithAlpha || hexToRgba(getDefaultColor(), hsl.a)} 
                          className="nav-backtotop-path" 
                          style={{ transition: 'none', animation: 'none' }}
                        />
                      ))}
                    </svg>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/backtotop:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                    {/* Border triangle */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                    {/* Background triangle */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                    Back to top
                  </div>
                </div>
              )}
              <div className="flex items-center min-h-[28px]">
                {isNavStuck ? (
                  <span className="font-space-grotesk text-xs sm:text-sm font-semibold text-foreground">
                    {isAtBottom ? 'Generate new' : currentGroupTitle}
                  </span>
                ) : (
                  <h2 className="font-space-grotesk text-lg font-semibold text-foreground">
                    Sequential Reveal
                  </h2>
                )}
              </div>
            </div>

            {/* Logo Color Picker and Background Toggle Grouped */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap justify-end flex-shrink-0">
              {/* Theme Toggle - Hidden when color picker is open */}
              {!showColorPicker ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 h-[28px] sm:h-[30px] rounded-full border border-border/80 bg-background hover:bg-background/80 transition-all py-0" suppressHydrationWarning>
                  <div className="relative group/lightmode py-0 flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme("light");
                      }}
                      className="cursor-pointer hover:opacity-80 transition-opacity p-0.5 flex items-center justify-center"
                      aria-label="Switch to light mode"
                    >
                      <Sun className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${resolvedTheme === "light" ? "text-foreground fill-foreground" : "text-muted-foreground"}`} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/lightmode:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                      {/* Border triangle */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                      {/* Background triangle */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                      Light
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className={`w-7 h-3.5 sm:w-8 sm:h-4 rounded-full relative transition-colors cursor-pointer hover:opacity-80 ${
                      resolvedTheme === "dark" ? "bg-foreground" : ""
                    }`}
                    style={resolvedTheme === "dark" ? {} : { backgroundColor: 'var(--muted-foreground)' }}
                    aria-label="Toggle theme"
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-card transition-transform ${
                        resolvedTheme === "dark" ? "translate-x-4 sm:translate-x-[18px] border-0" : "translate-x-0.5 border border-border/50"
                      }`}
                      suppressHydrationWarning
                    />
                  </button>
                  <div className="relative group/darkmode py-0 flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme("dark");
                      }}
                      className="cursor-pointer hover:opacity-80 transition-opacity p-0.5 flex items-center justify-center"
                      aria-label="Switch to dark mode"
                    >
                      <Moon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${resolvedTheme === "dark" ? "text-foreground fill-foreground" : "text-muted-foreground"}`} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/darkmode:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                      {/* Border triangle */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                      {/* Background triangle */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                      Dark
                    </div>
                  </div>
                </div>
              </div>
              ) : null}

              {/* Color Picker - Hidden when color picker is open on desktop, visible on mobile */}
              {!showColorPicker || isMobile ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div ref={colorPickerButtonRef} className="relative group/pickcolour">
                  <button
                    type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const newValue = !showColorPicker;
                        console.log('Toggling color picker:', newValue);
                        setShowColorPicker(newValue);
                      }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    className={`relative flex items-center justify-center gap-1 rounded-full border border-border/60 bg-background hover:bg-muted/50 hover:border-border/90 dark:hover:border-border/70 focus:outline-none focus:ring-0 transition-colors cursor-pointer ${
                      showColorPicker && isMobile 
                        ? 'p-1 aspect-square w-7 h-7' 
                        : showColorPicker && !isMobile 
                        ? 'p-1 aspect-square w-7 h-7 sm:w-8 sm:h-8 md:p-1 md:aspect-square md:w-8 md:h-8 lg:px-2 lg:py-1 lg:aspect-auto lg:w-auto lg:h-auto' 
                        : 'px-2 py-1 sm:p-1 sm:aspect-square sm:w-7 sm:h-7 md:px-2 md:py-1 md:aspect-auto md:w-auto md:h-auto lg:px-2 lg:py-1 lg:aspect-auto lg:w-auto lg:h-auto'
                    }`}
                    aria-label={showColorPicker ? "Close color picker" : "Open color picker"}
                  >
                    <span 
                      className={`text-xs sm:text-sm text-foreground font-mono pr-1 ${
                        showColorPicker && isMobile 
                          ? '!hidden' 
                          : showColorPicker && !isMobile 
                          ? 'hidden sm:hidden md:hidden lg:block' 
                          : 'block sm:hidden md:block lg:block'
                      }`}
                      style={showColorPicker && isMobile ? { display: 'none' } : undefined}
                    >
                      {logoColor.toUpperCase()}
                    </span>
                    <div
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-border/40 shrink-0 aspect-square"
                      style={{ backgroundColor: logoColorWithAlpha }}
                    />
                  </button>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap transition-opacity duration-200 delay-500 pointer-events-none z-50 ${showColorPicker ? 'opacity-0' : 'opacity-0 group-hover/pickcolour:opacity-100'}`}>
                    {/* Border triangle */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                    {/* Background triangle */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                      Logo colour
                  </div>
                </div>
              </div>
              ) : null}
            </div>
          </div>
        </div>

      <div className={`max-w-7xl mx-auto transition-all duration-300 ${showColorPicker && !isMobile ? 'sm:pl-0 sm:pr-0 md:pl-0 md:pr-0' : 'px-8 pt-0 pb-24'}`}>
        {/* Main content area */}
        <div className={`transition-all duration-300 ${showColorPicker && !isMobile ? 'sm:pr-80 sm:pl-8 sm:pt-8 sm:pb-24 md:pr-80 md:pl-8 md:pt-8 md:pb-24' : ''} ${showColorPicker && !isMobile ? '' : 'pt-0 px-8 pb-24'}`}>
        <div className={showColorPicker && !isMobile ? "space-y-8" : "space-y-16"}>
          <AnimationGroup
            baseVariant="sequential"
            title="Sequential Reveal"
            variations={[
              { variant: "sequential2", title: "Fast" },
              { variant: "sequential3", title: "Slow" },
              { variant: "sequential4", title: "Bounce" },
              ...(dynamicVariations["sequential"] || [])
            ]}
            logoColor={logoColorWithAlpha}
            headingRef={sequentialRef}
            hideHeading
            className={showColorPicker && !isMobile ? "!mt-0 !-mt-4" : "!mt-8"}
            onCreateVariant={handleCreateVariant}
            customVariantCSS={customVariantCSS}
            generatingVariant={generatingVariant}
            allAnimationGroups={allAnimationGroups}
            colorPickerOpen={showColorPicker && !isMobile}
            isMobile={isMobile}
          />
          <AnimationGroup
            baseVariant="scale"
            title="Scale from Centre"
            variations={[
              { variant: "scale2", title: "Elastic" },
              { variant: "scale3", title: "Smooth" },
              { variant: "scale4", title: "Quick" },
              ...(dynamicVariations["scale"] || [])
            ]}
            logoColor={logoColorWithAlpha}
            headingRef={scaleRef}
            onCreateVariant={handleCreateVariant}
            customVariantCSS={customVariantCSS}
            generatingVariant={generatingVariant}
            allAnimationGroups={allAnimationGroups}
            colorPickerOpen={showColorPicker && !isMobile}
            isMobile={isMobile}
          />
          <AnimationGroup
            baseVariant="rotate"
            title="Rotate into Place"
            variations={[
              { variant: "rotate2", title: "360°" },
              { variant: "rotate3", title: "Bounce" },
              { variant: "rotate4", title: "Smooth" },
              ...(dynamicVariations["rotate"] || [])
            ]}
            logoColor={logoColorWithAlpha}
            headingRef={rotateRef}
            onCreateVariant={handleCreateVariant}
            customVariantCSS={customVariantCSS}
            generatingVariant={generatingVariant}
            allAnimationGroups={allAnimationGroups}
            colorPickerOpen={showColorPicker && !isMobile}
            isMobile={isMobile}
          />
          <AnimationGroup
            baseVariant="morph"
            title="Morph from Circles"
            variations={[
              { variant: "morph2", title: "Elastic" },
              { variant: "morph3", title: "Quick" },
              { variant: "morph4", title: "Smooth" },
              ...(dynamicVariations["morph"] || [])
            ]}
            logoColor={logoColorWithAlpha}
            headingRef={morphRef}
            onCreateVariant={handleCreateVariant}
            customVariantCSS={customVariantCSS}
            allAnimationGroups={allAnimationGroups}
            colorPickerOpen={showColorPicker && !isMobile}
            isMobile={isMobile}
          />
          <AnimationGroup
            baseVariant="wave"
            title="Wave Effect"
            variations={[
              { variant: "wave2", title: "Horizontal" },
              { variant: "wave3", title: "Diagonal" },
              { variant: "wave4", title: "Ripple" },
              ...(dynamicVariations["wave"] || [])
            ]}
            logoColor={logoColorWithAlpha}
            headingRef={waveRef}
            onCreateVariant={handleCreateVariant}
            customVariantCSS={customVariantCSS}
            generatingVariant={generatingVariant}
            allAnimationGroups={allAnimationGroups}
            colorPickerOpen={showColorPicker && !isMobile}
            isMobile={isMobile}
          />
          <AnimationGroup
            baseVariant="pulse"
            title="Pulse Animation"
            variations={[
              { variant: "pulse2", title: "Strong" },
              { variant: "pulse3", title: "Gentle" },
              { variant: "pulse4", title: "Quick" },
              ...(dynamicVariations["pulse"] || [])
            ]}
            logoColor={logoColorWithAlpha}
            headingRef={pulseRef}
            onCreateVariant={handleCreateVariant}
            customVariantCSS={customVariantCSS}
            allAnimationGroups={allAnimationGroups}
            colorPickerOpen={showColorPicker && !isMobile}
            isMobile={isMobile}
          />
          <AnimationGroup
            baseVariant="float"
            title="Subtle Motion"
            variations={[
              { variant: "float2", title: "Breathe" },
              { variant: "float3", title: "Drift" },
              { variant: "float4", title: "Float" },
              ...(dynamicVariations["float"] || [])
            ]}
            logoColor={logoColorWithAlpha}
            headingRef={subtleRef}
            onCreateVariant={handleCreateVariant}
            customVariantCSS={customVariantCSS}
            generatingVariant={generatingVariant}
            allAnimationGroups={allAnimationGroups}
            colorPickerOpen={showColorPicker && !isMobile}
            isMobile={isMobile}
          />
          
          {/* Custom generated animation sets */}
          {customAnimations.map((animSet) => (
            <AnimationGroup
              key={animSet.id}
              baseVariant={animSet.baseVariant}
              title={animSet.title}
              variations={animSet.variations}
              logoColor={logoColorWithAlpha}
              customVariantCSS={customVariantCSS}
              allAnimationGroups={allAnimationGroups}
              onCreateVariant={handleCreateVariant}
              generatingVariant={generatingVariant}
              colorPickerOpen={showColorPicker && !isMobile}
              isMobile={isMobile}
              headingRef={getCustomSetRef(animSet.id)}
            />
          ))}
          
          {/* Generator section */}
          <div className="pt-8 pb-4">
            <button
              onClick={handleGenerateNewSet}
              className="w-full flex flex-col items-center justify-center gap-6 py-12 px-6 text-sm font-medium text-muted-foreground bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:bg-card/70 hover:text-foreground hover:shadow-sm dark:hover:shadow-lg transition-all cursor-pointer"
              aria-label="Generate new animation set"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  <svg
                    ref={generatorLogoRef}
                    width="64"
                    height="64"
                    viewBox="0 0 132 132"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    {logoPaths.map((path, index) => (
                      <path
                        key={index}
                        d={path}
                        fill={logoColorWithAlpha || hexToRgba(getDefaultColor(), hsl.a)}
                        className="logo-path"
                      />
                    ))}
                  </svg>
                </div>
                <div className="flex items-center justify-center gap-2 font-space-grotesk text-lg font-semibold text-foreground">
                  Generate new set
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </button>
          </div>
          
          {/* Bottom gradient fade */}
          <div 
            className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)`
            }}
          />
        </div>
        </div>
      </div>

        {/* Right-hand sidebar for color picker - part of layout on desktop, full screen on mobile */}
        {/* Mobile: Full screen overlay */}
        {showColorPicker && isMobile && typeof document !== 'undefined' && createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(false);
              }}
            />
            <div
              ref={colorPickerRef}
              className="fixed inset-0 pt-3 pb-6 px-3 bg-card z-[100] overflow-y-auto overflow-x-visible flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Logo colour</h3>
                <div className="flex items-center gap-1.5">
                  {userHasSetColor && (
                    <div className="relative group/reset">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetColor();
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0"
                        aria-label="Reset to default colour"
                      >
                        <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap transition-opacity duration-200 delay-500 pointer-events-none z-50 opacity-0 group-hover/reset:opacity-100">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover" />
                        Reset
                      </div>
                    </div>
                  )}
                  <div className="relative group/randomise">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRandomPickTooltipDismissed(true);
                        const r = () => Math.floor(Math.random() * 256);
                        const hex = '#' + [r(), r(), r()].map((x) => x.toString(16).padStart(2, '0')).join('');
                        const newHsl = hexToHsl(hex);
                        handleHslChange({ h: newHsl.h, s: newHsl.s, l: newHsl.l, a: hsl.a });
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0"
                      aria-label="Pick random colour"
                    >
                      <Shuffle className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap transition-opacity duration-200 delay-500 pointer-events-none z-50 ${randomPickTooltipDismissed ? 'opacity-0' : 'opacity-0 group-hover/randomise:opacity-100'}`}>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover" />
                      Random
                    </div>
                  </div>
                  <div className="relative group/close">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowColorPicker(false);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap transition-opacity duration-200 delay-500 pointer-events-none z-50 opacity-0 group-hover/close:opacity-100">
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover" />
                      Close
                    </div>
                  </div>
                </div>
              </div>
              <ColorPickerComponent
                color={logoColor || '#000000'}
                onChange={(hex) => {
                  setLogoColor(hex);
                  if (!colorChangeFromPickerRef.current) setHsl(hexToHsl(hex));
                  else colorChangeFromPickerRef.current = false;
                  setUserHasSetColor(true);
                  localStorage.setItem('logo-color-override', hex);
                }}
                hsl={hsl}
                onHslChange={handleHslChange}
                colorFormat={colorFormat}
                onFormatChange={setColorFormat}
              />
              {/* Divider */}
              <div className="border-t border-border my-4"></div>
              {/* Theme Toggle */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 h-[28px] sm:h-[30px] rounded-full border border-border/80 bg-background hover:bg-background/80 transition-all py-0" suppressHydrationWarning>
                    <div className="relative group/lightmode py-0 flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheme("light");
                        }}
                        className="cursor-pointer hover:opacity-80 transition-opacity p-0.5 flex items-center justify-center"
                        aria-label="Switch to light mode"
                      >
                        <Sun className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${resolvedTheme === "light" ? "text-foreground fill-foreground" : "text-muted-foreground"}`} />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/lightmode:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                        Light
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      className={`w-7 h-3.5 sm:w-8 sm:h-4 rounded-full relative transition-colors cursor-pointer hover:opacity-80 ${
                        resolvedTheme === "dark" ? "bg-foreground" : ""
                      }`}
                      style={resolvedTheme === "dark" ? {} : { backgroundColor: 'var(--muted-foreground)' }}
                      aria-label="Toggle theme"
                    >
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-card transition-transform ${
                          resolvedTheme === "dark" ? "translate-x-4 sm:translate-x-[18px] border-0" : "translate-x-0.5 border border-border/50"
                        }`}
                        suppressHydrationWarning
                      />
                    </button>
                    <div className="relative group/darkmode py-0 flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheme("dark");
                        }}
                        className="cursor-pointer hover:opacity-80 transition-opacity p-0.5 flex items-center justify-center"
                        aria-label="Switch to dark mode"
                      >
                        <Moon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${resolvedTheme === "dark" ? "text-foreground fill-foreground" : "text-muted-foreground"}`} />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/darkmode:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                        Dark
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(false);
                }}
                className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          </>,
          document.body
        )}
        {/* Desktop: Sidebar (hidden on mobile, visible on tablet and large screens) */}
        {showColorPicker && !isMobile && (
          <div
            ref={colorPickerRef}
            className="hidden sm:block fixed top-0 right-0 w-72 h-screen bg-background border-l border-border overflow-y-auto overflow-x-visible transition-all duration-300 z-[60] pt-2 px-4 pb-4"
          >
            <div className="sticky top-0 -mx-4 px-4 pt-0 pb-0 bg-background border-b border-border z-10">
              <div className="flex items-center justify-between mb-2 pt-0">
                <h3 className="text-sm font-semibold text-foreground">Logo colour</h3>
                <div className="flex items-center gap-1.5">
                  {userHasSetColor && (
                    <div className="relative group/reset">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetColor();
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0"
                        aria-label="Reset to default colour"
                      >
                        <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap transition-opacity duration-200 delay-500 pointer-events-none z-50 opacity-0 group-hover/reset:opacity-100">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover" />
                        Reset
                      </div>
                    </div>
                  )}
                  <div className="relative group/randomise">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRandomPickTooltipDismissed(true);
                        const r = () => Math.floor(Math.random() * 256);
                        const hex = '#' + [r(), r(), r()].map((x) => x.toString(16).padStart(2, '0')).join('');
                        const newHsl = hexToHsl(hex);
                        handleHslChange({ h: newHsl.h, s: newHsl.s, l: newHsl.l, a: hsl.a });
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0"
                      aria-label="Pick random colour"
                    >
                      <Shuffle className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap transition-opacity duration-200 delay-500 pointer-events-none z-50 ${randomPickTooltipDismissed ? 'opacity-0' : 'opacity-0 group-hover/randomise:opacity-100'}`}>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover" />
                      Random
                    </div>
                  </div>
                  <div className="relative group/close">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowColorPicker(false);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap transition-opacity duration-200 delay-500 pointer-events-none z-50 opacity-0 group-hover/close:opacity-100">
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover" />
                      Close
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <ColorPickerComponent
                color={logoColor || '#000000'}
                onChange={(hex) => {
                  setLogoColor(hex);
                  if (!colorChangeFromPickerRef.current) setHsl(hexToHsl(hex));
                  else colorChangeFromPickerRef.current = false;
                  setUserHasSetColor(true);
                  localStorage.setItem('logo-color-override', hex);
                }}
                hsl={hsl}
                onHslChange={handleHslChange}
                colorFormat={colorFormat}
                onFormatChange={setColorFormat}
              />
              {/* Divider */}
              <div className="w-full border-t border-border my-4"></div>
              {/* Theme Toggle */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 h-[28px] sm:h-[30px] rounded-full border border-border/80 bg-background hover:bg-background/80 transition-all py-0" suppressHydrationWarning>
                    <div className="relative group/lightmode py-0 flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheme("light");
                        }}
                        className="cursor-pointer hover:opacity-80 transition-opacity p-0.5 flex items-center justify-center"
                        aria-label="Switch to light mode"
                      >
                        <Sun className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${resolvedTheme === "light" ? "text-foreground fill-foreground" : "text-muted-foreground"}`} />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/lightmode:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                        Light
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      className={`w-7 h-3.5 sm:w-8 sm:h-4 rounded-full relative transition-colors cursor-pointer hover:opacity-80 ${
                        resolvedTheme === "dark" ? "bg-foreground" : ""
                      }`}
                      style={resolvedTheme === "dark" ? {} : { backgroundColor: 'var(--muted-foreground)' }}
                      aria-label="Toggle theme"
                    >
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-card transition-transform ${
                          resolvedTheme === "dark" ? "translate-x-4 sm:translate-x-[18px] border-0" : "translate-x-0.5 border border-border/50"
                        }`}
                        suppressHydrationWarning
                      />
                    </button>
                    <div className="relative group/darkmode py-0 flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheme("dark");
                        }}
                        className="cursor-pointer hover:opacity-80 transition-opacity p-0.5 flex items-center justify-center"
                        aria-label="Switch to dark mode"
                      >
                        <Moon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${resolvedTheme === "dark" ? "text-foreground fill-foreground" : "text-muted-foreground"}`} />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-lg whitespace-nowrap opacity-0 group-hover/darkmode:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none z-50">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-border"></div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[1px] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-popover"></div>
                        Dark
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
