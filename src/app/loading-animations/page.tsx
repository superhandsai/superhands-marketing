"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Moon, Sun, Copy, Check } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

// Logo paths from the SVG
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
}

// Function to get CSS code for each animation variant
function getAnimationCSS(variant: string): string {
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
  };

  return cssMap[variant] || '';
}

function LogoAnimation({ variant, title }: LogoAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const favoriteKey = `favorite-${variant}`;
  const countKey = `favorite-count-${variant}`;
  
  // Check if user has already favorited this animation
  const [isFavorited, setIsFavorited] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(favoriteKey) === 'true';
    }
    return false;
  });
  
  // Get favorite count
  const [favoriteCount, setFavoriteCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const count = localStorage.getItem(countKey);
      return count ? parseInt(count, 10) : 0;
    }
    return 0;
  });

  // Copy animation code state
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const cssCode = getAnimationCSS(variant);
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

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll("path")) as SVGPathElement[];
    
    if (paths.length === 0) return;

    // Remove all animation classes first
    paths.forEach((path) => {
      path.className.baseVal = path.className.baseVal
        .split(" ")
        .filter((cls) => !cls.startsWith("logo-anim-"))
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
      }
      
      path.className.baseVal += ` ${baseClass}`;
      if (delay > 0) {
        path.style.animationDelay = `${delay}s`;
      }
    });
  }, [variant]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl relative">
      <div className="flex items-center justify-center w-full relative">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="absolute right-0 flex items-center gap-1.5">
          <button
            onClick={handleCopyCode}
            className="p-1.5 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer group"
            aria-label="Copy animation code"
            title="Copy CSS code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isFavorited) {
                // Unfavorite
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
                // Favorite
                setIsFavorited(true);
                localStorage.setItem(favoriteKey, 'true');
                
                // Increment count
                const newCount = favoriteCount + 1;
                setFavoriteCount(newCount);
                localStorage.setItem(countKey, newCount.toString());
              }
            }}
            className="p-1.5 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer group"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                isFavorited
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground group-hover:fill-red-500 group-hover:text-red-500"
              }`}
            />
          </button>
          {favoriteCount > 0 && (
            <span className="text-xs text-muted-foreground min-w-[1rem]">
              {favoriteCount}
            </span>
          )}
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
              fill="currentColor"
              className="logo-path"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

// Animation group component - shows all variations grouped by title
function AnimationGroup({ 
  baseVariant, 
  title, 
  variations 
}: { 
  baseVariant: string; 
  title: string; 
  variations: { variant: string; title: string }[] 
}) {
  return (
    <div className="space-y-6 pt-12">
      <h2 className="text-lg font-semibold text-foreground">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LogoAnimation variant={baseVariant} title="Original" />
        {variations.map((variation) => (
          <LogoAnimation 
            key={variation.variant} 
            variant={variation.variant} 
            title={variation.title} 
          />
        ))}
      </div>
    </div>
  );
}

export default function LoadingAnimationsPage() {
  const { resolvedTheme, toggleTheme } = useTheme();

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

  return (
    <div className="min-h-screen w-full bg-background p-8 pb-24" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6" suppressHydrationWarning>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 hover:bg-card transition-all group"
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            suppressHydrationWarning
          >
            <div className="flex items-center gap-2">
              <Sun className={`w-4 h-4 transition-colors ${resolvedTheme === "light" ? "text-foreground" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium transition-colors ${resolvedTheme === "light" ? "text-foreground" : "text-muted-foreground"}`}>
                Light
              </span>
            </div>
            <div className="w-8 h-4 rounded-full bg-muted relative transition-colors">
              <div
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-background border border-border transition-transform ${
                  resolvedTheme === "dark" ? "translate-x-4" : "translate-x-0.5"
                }`}
                suppressHydrationWarning
              />
            </div>
            <div className="flex items-center gap-2">
              <Moon className={`w-4 h-4 transition-colors ${resolvedTheme === "dark" ? "text-foreground" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium transition-colors ${resolvedTheme === "dark" ? "text-foreground" : "text-muted-foreground"}`}>
                Dark
              </span>
            </div>
          </button>
        </div>

        {/* Logo Header */}
        <div className="flex items-center justify-center mb-3">
          <img
            src="/logo-full-white.svg"
            alt="Superhands"
            className={`h-16 ${resolvedTheme === "light" ? "brightness-0" : ""}`}
            suppressHydrationWarning
          />
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-3">
            Logo Animation Exploration
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Click the heart on animations you like for use as loading states.
          </p>
        </div>

        <div className="space-y-8">
          <AnimationGroup
            baseVariant="sequential"
            title="Sequential Reveal"
            variations={[
              { variant: "sequential2", title: "Sequential Fast" },
              { variant: "sequential3", title: "Sequential Slow" },
              { variant: "sequential4", title: "Sequential Bounce" }
            ]}
          />
          <AnimationGroup
            baseVariant="scale"
            title="Scale from Centre"
            variations={[
              { variant: "scale2", title: "Scale Elastic" },
              { variant: "scale3", title: "Scale Smooth" },
              { variant: "scale4", title: "Scale Quick" }
            ]}
          />
          <AnimationGroup
            baseVariant="rotate"
            title="Rotate into Place"
            variations={[
              { variant: "rotate2", title: "Rotate 360°" },
              { variant: "rotate3", title: "Rotate Bounce" },
              { variant: "rotate4", title: "Rotate Smooth" }
            ]}
          />
          <AnimationGroup
            baseVariant="morph"
            title="Morph from Circles"
            variations={[
              { variant: "morph2", title: "Morph Elastic" },
              { variant: "morph3", title: "Morph Quick" },
              { variant: "morph4", title: "Morph Smooth" }
            ]}
          />
          <AnimationGroup
            baseVariant="wave"
            title="Wave Effect"
            variations={[
              { variant: "wave2", title: "Wave Horizontal" },
              { variant: "wave3", title: "Wave Diagonal" },
              { variant: "wave4", title: "Wave Ripple" }
            ]}
          />
          <AnimationGroup
            baseVariant="pulse"
            title="Pulse Animation"
            variations={[
              { variant: "pulse2", title: "Pulse Strong" },
              { variant: "pulse3", title: "Pulse Gentle" },
              { variant: "pulse4", title: "Pulse Quick" }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
