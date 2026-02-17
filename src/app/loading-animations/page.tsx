"use client";

import { useEffect, useRef } from "react";

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

function LogoAnimation({ variant, title }: LogoAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

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
        case "pulse":
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
    <div className="flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
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

export default function LoadingAnimationsPage() {
  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Logo Loading Animations
          </h1>
          <p className="text-muted-foreground text-lg">
            Various animation styles for the Superhands logo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LogoAnimation variant="sequential" title="Sequential Reveal" />
          <LogoAnimation variant="scale" title="Scale from Center" />
          <LogoAnimation variant="rotate" title="Rotate into Place" />
          <LogoAnimation variant="morph" title="Morph from Circles" />
          <LogoAnimation variant="wave" title="Wave Effect" />
          <LogoAnimation variant="pulse" title="Pulse Animation" />
        </div>
      </div>
    </div>
  );
}
