"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const start = vh;
      const end = 0;
      const scrollP = Math.min(1, Math.max(0, (start - sectionCenter) / (start - end)));

      // Also check if user is near the bottom of the page (mobile fallback)
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const bottomP = maxScroll > 0 ? scrollY / maxScroll : 0;
      const bottomBoost = bottomP > 0.9 ? (bottomP - 0.9) / 0.1 : 0;

      const p = Math.min(1, Math.max(scrollP, bottomBoost));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return progress;
}

const SUPERWHITE_DATA_URI = "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAvG1kYXQAAAAfTgEFGkdWStxcTEM/lO/FETzRQ6gD7gAA7gIAA3EYgAAAAEgoAa8iNjAkszOL+e58c//cEe//0TT//scp1n/381P/RWP/zOW4QtxorfVogeh8nQDbQAAAAwAQMCcWUTAAAAMAAAMAAAMA84AAAAAVAgHQAyu+KT35E7gAADFgAAADABLQAAAAEgIB4AiS76MTkNbgAAF3AAAPSAAAABICAeAEn8+hBOTXYAADUgAAHRAAAAPibW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAKcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAw10cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAKcAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAACnAAAAAAABAAAAAAKFbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABdwAAAD6BVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAixtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAHsc3RibAAAARxzdHNkAAAAAAAAAAEAAAEMaHZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAHVodmNDAQIgAAAAsAAAAAAAPPAA/P36+gAACwOgAAEAGEABDAH//wIgAAADALAAAAMAAAMAPBXAkKEAAQAmQgEBAiAAAAMAsAAAAwAAAwA8oBQgQcCTDLYgV7kWVYC1CRAJAICiAAEACUQBwChkuNBTJAAAAApmaWVsAQAAAAATY29scm5jbHgACQAQAAkAAAAAEHBhc3AAAAABAAAAAQAAABRidHJ0AAAAAAAALPwAACz8AAAAKHN0dHMAAAAAAAAAAwAAAAIAAAPoAAAAAQAAAAEAAAABAAAD6AAAABRzdHNzAAAAAAAAAAEAAAABAAAAEHNkdHAAAAAAIBAQGAAAAChjdHRzAAAAAAAAAAMAAAABAAAAAAAAAAEAAAfQAAAAAgAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAQAAAABAAAAJHN0c3oAAAAAAAAAAAAAAAQAAABvAAAAGQAAABYAAAAWAAAAFHN0Y28AAAAAAAAAAQAAACwAAABhdWR0YQAAAFltZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACxpbHN0AAAAJKl0b28AAAAcZGF0YQAAAAEAAAAATGF2ZjYwLjMuMTAw";

const SH_LOGO_MARK_D = "M49.6144 15.1622C51.1204 15.3739 52.4932 15.8016 53.7306 16.4483C55.4572 17.3116 56.841 18.5435 57.8829 20.1426L58.087 20.4668L58.088 20.4678C59.1162 22.2273 59.628 24.2989 59.628 26.6778C59.628 29.0542 59.1692 31.0224 58.2452 32.5762C57.3239 34.0836 56.0651 35.3196 54.4727 36.2813L54.4708 36.2823C52.884 37.1989 51.087 37.9688 49.0802 38.5928L46.131 39.4776C44.4497 39.9742 42.9798 40.533 41.7218 41.1524L41.7208 41.1514C40.5055 41.7671 39.5534 42.5873 38.8614 43.6094C38.2085 44.6257 37.8781 45.9947 37.878 47.7247C37.878 50.1548 38.5959 52.0314 40.0235 53.3663L40.3185 53.626C41.9837 55.0197 44.0855 55.7188 46.63 55.7188C46.7591 55.7188 46.8877 55.7164 47.0157 55.7129L47.1065 55.711L47.1134 55.8018C47.21 57.0386 47.4618 58.1793 47.8653 59.2256L47.9122 59.3467L47.7823 59.3555C47.4048 59.3812 47.0207 59.3965 46.63 59.3965C44.1951 59.3965 42.0554 58.9163 40.214 57.9542C38.3723 57.0333 36.9192 55.6935 35.8565 53.9356L35.8556 53.9346C34.8274 52.1751 34.3155 50.1035 34.3155 47.7247C34.3156 45.3482 34.7743 43.3801 35.6983 41.8262C36.6197 40.3189 37.8784 39.0828 39.4708 38.1211L39.4718 38.1202C41.0587 37.2035 42.8564 36.4337 44.8634 35.8096L47.8116 34.9249L48.4337 34.7354L48.9601 34.5655C50.171 34.1633 51.2578 33.7251 52.2208 33.251C53.4359 32.6357 54.3881 31.8165 55.0802 30.795C55.7339 29.7785 56.0655 28.4089 56.0655 26.6778C56.0655 24.0857 55.2486 22.1233 53.6251 20.7764C52.66 19.9687 51.5479 19.3949 50.2901 19.0547L50.2227 19.0372L50.2198 18.9668C50.1556 17.6342 49.9189 16.409 49.5108 15.2901L49.4561 15.1397L49.6144 15.1622ZM65.2875 36.3516V39.3721C65.2875 42.2878 64.7035 44.7117 63.5345 46.6387L63.5365 46.6397C62.4037 48.6051 60.8442 50.0895 58.8614 51.0938L58.8624 51.0948C57.2284 51.9373 55.4204 52.4237 53.4405 52.5586L53.3702 52.5635L53.3448 52.4971C52.9341 51.4319 52.679 50.273 52.5811 49.0196L52.5733 48.919L52.6739 48.9161C54.2986 48.8715 55.7716 48.5449 57.0929 47.9356C58.5139 47.2802 59.6407 46.2567 60.4737 44.8624C61.3047 43.4713 61.7247 41.643 61.7247 39.3721V36.3516H65.2875ZM34.753 8.09583C37.1876 8.09583 39.3268 8.57533 41.1681 9.53723L41.5089 9.71493C43.0781 10.5665 44.3498 11.7389 45.3224 13.2315L45.5265 13.5557V13.5577C46.5546 15.3172 47.0675 17.3878 47.0675 19.7667C47.0675 22.1433 46.6088 24.1121 45.6847 25.6661L45.6837 25.667C44.7624 27.1742 43.5044 28.4086 41.9122 29.3702L41.9103 29.3711C40.3235 30.2877 38.5264 31.0576 36.5196 31.6817L36.5186 31.6827L33.5704 32.5665C31.8892 33.0631 30.4183 33.6219 29.1603 34.2413L29.1593 34.2403C27.9443 34.8558 26.9928 35.6765 26.3009 36.6983C25.6478 37.7147 25.3165 39.0842 25.3165 40.8145C25.3166 43.4065 26.1344 45.368 27.7579 46.7149L28.1251 47.0059C28.8735 47.5659 29.7035 47.9951 30.6153 48.294L31.0772 48.4327L31.1446 48.4502L31.1476 48.5196C31.2206 49.856 31.4711 51.0831 31.8927 52.2032L31.9493 52.3545L31.7892 52.3321C30.2751 52.1215 28.8963 51.6924 27.6534 51.043C25.8117 50.1222 24.3586 48.7823 23.296 47.0245L23.295 47.0235C22.2669 45.264 21.754 43.1933 21.754 40.8145C21.754 38.4379 22.2127 36.469 23.1368 34.9151L23.1378 34.9141L23.3145 34.6348C24.2177 33.2538 25.4166 32.1125 26.9093 31.211L26.9112 31.21C28.4981 30.2933 30.2958 29.5226 32.3028 28.8985L35.252 28.0137L35.8731 27.8243C37.2975 27.3763 38.5598 26.8816 39.6603 26.3399L40.1036 26.0997C41.11 25.5163 41.9149 24.7765 42.5206 23.8819C43.1735 22.8655 43.505 21.4968 43.505 19.7667C43.505 17.1748 42.6878 15.2132 41.0645 13.8663L41.0636 13.8653C39.3984 12.4718 37.2972 11.7726 34.753 11.7725C34.2742 11.7725 33.8078 11.797 33.3546 11.8448L33.2589 11.8545L33.2491 11.7588C33.1289 10.5369 32.8557 9.41052 32.4288 8.37902L32.381 8.26472L32.504 8.24713C33.229 8.14593 33.9789 8.09583 34.753 8.09583ZM26.9474 15.1006C27.3822 16.151 27.6603 17.2957 27.7823 18.5342L27.7921 18.629L27.6974 18.6387C26.4676 18.7683 25.3318 19.0735 24.2901 19.5538C22.8691 20.2091 21.7423 21.2328 20.9093 22.627C20.0783 24.018 19.6583 25.8464 19.6583 28.1172V31.1377H16.0958V28.1172C16.0958 25.2009 16.6778 22.7759 17.8477 20.8487C18.9802 18.8841 20.5383 17.3986 22.5206 16.3946L23.0235 16.1495C24.21 15.6019 25.4843 15.2332 26.8458 15.043L26.919 15.0323L26.9474 15.1006Z";

const SH_LOGO_MASK_URI = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 6 53 55"><path d="${SH_LOGO_MARK_D}" fill="white"/></svg>`)}`;

const SH_CLIP_PATH = "M86.9229 51.4163C88.4289 51.628 89.8017 52.0557 91.0391 52.7024H91.0381C92.7647 53.5657 94.1495 54.7976 95.1914 56.3967L95.3955 56.7209L95.3965 56.7219C96.4247 58.4814 96.9365 60.553 96.9365 62.9319C96.9365 65.3083 96.4777 67.2765 95.5537 68.8303V68.8313C94.6324 70.3387 93.3736 71.5737 91.7812 72.5354L91.7793 72.5364C90.1925 73.453 88.3955 74.2229 86.3887 74.8469H86.3877L83.4395 75.7317C81.7582 76.2283 80.2883 76.7871 79.0303 77.4065L79.0293 77.4055C77.814 78.0212 76.8619 78.8414 76.1699 79.8635C75.517 80.8798 75.1866 82.2488 75.1865 83.9788C75.1865 86.4089 75.9044 88.2855 77.332 89.6204L77.627 89.8801C79.2922 91.2738 81.394 91.9729 83.9385 91.9729C84.0676 91.9729 84.1962 91.9705 84.3242 91.967L84.415 91.9651L84.4219 92.0559C84.5185 93.2927 84.7703 94.4334 85.1738 95.4797L85.2207 95.6008L85.0908 95.6096C84.7133 95.6353 84.3292 95.6506 83.9385 95.6506C81.5036 95.6506 79.3639 95.1704 77.5225 94.2083C75.6808 93.2874 74.2277 91.9476 73.165 90.1897L73.1641 90.1887C72.1359 88.4292 71.624 86.3576 71.624 83.9788C71.6241 81.6023 72.0828 79.6342 73.0068 78.0803V78.0793C73.9282 76.572 75.1869 75.3369 76.7793 74.3752L76.7803 74.3743C78.3672 73.4576 80.1649 72.6878 82.1719 72.0637H82.1729L85.1201 71.179L85.7422 70.9895L86.2686 70.8196C87.4795 70.4174 88.5663 69.9792 89.5293 69.5051C90.7444 68.8898 91.6966 68.0706 92.3887 67.0491C93.0424 66.0326 93.374 64.663 93.374 62.9319C93.374 60.3398 92.5571 58.3774 90.9336 57.0305H90.9326C89.9675 56.2228 88.8564 55.649 87.5986 55.3088L87.5312 55.2913L87.5283 55.2209C87.4641 53.8883 87.2274 52.6631 86.8193 51.5442L86.7646 51.3938L86.9229 51.4163ZM102.596 72.6057V75.6262C102.596 78.5419 102.012 80.9658 100.843 82.8928L100.845 82.8938C99.7122 84.8592 98.1527 86.3436 96.1699 87.3479L96.1709 87.3489C94.5369 88.1914 92.7289 88.6778 90.749 88.8127L90.6787 88.8176L90.6533 88.7512C90.2426 87.686 89.9875 86.5271 89.8896 85.2737L89.8818 85.1731L89.9824 85.1702C91.6071 85.1256 93.0801 84.799 94.4014 84.1897C95.8224 83.5343 96.9492 82.5108 97.7822 81.1165C98.6132 79.7254 99.0332 77.8971 99.0332 75.6262V72.6057H102.596ZM72.0615 44.3499C74.4961 44.3499 76.6353 44.8294 78.4766 45.7913L78.8174 45.969C80.3866 46.8206 81.6583 47.993 82.6309 49.4856L82.835 49.8098V49.8118C83.8631 51.5713 84.376 53.6419 84.376 56.0208C84.376 58.3974 83.9173 60.3662 82.9932 61.9202L82.9922 61.9211C82.0709 63.4283 80.8129 64.6627 79.2207 65.6243L79.2188 65.6252C77.632 66.5418 75.8349 67.3117 73.8281 67.9358L73.8271 67.9368L70.8789 68.8206H70.8779C69.1967 69.3172 67.7268 69.876 66.4688 70.4954L66.4678 70.4944C65.2528 71.1099 64.3013 71.9306 63.6094 72.9524C62.9563 73.9688 62.625 75.3383 62.625 77.0686C62.6251 79.6606 63.4429 81.6221 65.0664 82.969L65.4336 83.26C66.182 83.82 67.012 84.2492 67.9238 84.5481L68.3857 84.6868L68.4531 84.7043L68.4561 84.7737C68.5291 86.1101 68.7796 87.3372 69.2012 88.4573L69.2578 88.6086L69.0977 88.5862C67.5836 88.3756 66.2048 87.9465 64.9619 87.2971C63.1202 86.3763 61.6671 85.0364 60.6045 83.2786L60.6035 83.2776C59.5754 81.5181 59.0625 79.4474 59.0625 77.0686C59.0625 74.692 59.5212 72.7231 60.4453 71.1692L60.4463 71.1682L60.623 70.8889C61.5262 69.5079 62.7251 68.3666 64.2178 67.4651L64.2197 67.4641C65.8066 66.5474 67.6043 65.7767 69.6113 65.1526H69.6123L72.5605 64.2678L73.1816 64.0784C74.606 63.6304 75.8683 63.1357 76.9688 62.594L77.4121 62.3538C78.4185 61.7704 79.2234 61.0306 79.8291 60.136C80.482 59.1196 80.8135 57.7509 80.8135 56.0208C80.8135 53.4289 79.9963 51.4673 78.373 50.1204L78.3721 50.1194C76.7069 48.7259 74.6057 48.0267 72.0615 48.0266C71.5827 48.0266 71.1163 48.0511 70.6631 48.0989L70.5674 48.1086L70.5576 48.0129C70.4374 46.791 70.1642 45.6646 69.7373 44.6331L69.6895 44.5188L69.8125 44.5012C70.5375 44.4 71.2874 44.3499 72.0615 44.3499ZM64.2559 51.3547C64.6907 52.4051 64.9688 53.5498 65.0908 54.7883L65.1006 54.8831L65.0059 54.8928C63.7761 55.0224 62.6403 55.3276 61.5986 55.8079C60.1776 56.4632 59.0508 57.4869 58.2178 58.8811C57.3868 60.2721 56.9668 62.1005 56.9668 64.3713V67.3918H53.4043V64.3713C53.4043 61.455 53.9863 59.03 55.1562 57.1028C56.2887 55.1382 57.8468 53.6527 59.8291 52.6487L60.332 52.4036C61.5185 51.856 62.7928 51.4873 64.1543 51.2971L64.2275 51.2864L64.2559 51.3547Z";

// Stable video element that never re-renders (Safari HDR)
const SafariHDRVideo = memo(function SafariHDRVideo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const video = ref.current.querySelector("video");
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);
  return (
    <div
      ref={ref}
      className="absolute inset-0"
      dangerouslySetInnerHTML={{
        __html: `<video muted autoplay loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none" src="${SUPERWHITE_DATA_URI}" oncanplaythrough="this.currentTime=0"></video>`,
      }}
    />
  );
});

function SuperhandsTile({ progress, isSafari, onGlow }: { progress: number; isSafari: boolean; onGlow?: (opacity: number) => void }) {
  const [pressed, setPressed] = useState(false);
  const [clickOverride, setClickOverride] = useState<boolean | null>(null);
  const prevScrollActive = useRef(false);
  const scrollActive = progress >= 0.95;

  // When scroll state changes, clear the click override
  useEffect(() => {
    if (scrollActive !== prevScrollActive.current) {
      prevScrollActive.current = scrollActive;
      setClickOverride(null);
    }
  }, [scrollActive]);

  const glowActive = clickOverride !== null ? clickOverride : scrollActive;
  const [isHDR, setIsHDR] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(dynamic-range: high)");
    setIsHDR(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsHDR(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Notify parent when glow state changes
  useEffect(() => {
    onGlow?.(glowActive ? 0.45 : 0);
  }, [glowActive, onGlow]);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{
        aspectRatio: "1 / 1",
        transform: pressed ? "scale(0.94)" : "scale(1)",
        transition: "transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)",
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={() => setClickOverride(prev => prev !== null ? !prev : !scrollActive)}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          borderRadius: "20.5%",
          outline: "1px solid rgba(82, 82, 84, 0.05)",
          outlineOffset: "-0.5px",
          background: "linear-gradient(to top, #E4E4E4, #FCFCFC)",
          boxShadow: glowActive
            ? "0 0 30px rgba(81, 202, 235, 0.4), 0 0 60px rgba(81, 202, 235, 0.2)"
            : "0 8px 16px rgba(0, 0, 0, 0.08)",
          animation: glowActive ? "tileBoxGlowPulse 4s ease-in-out infinite" : "none",
        }}
      >
        <svg
          viewBox="14 6 53 55"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[44%] h-auto"
          style={{
            opacity: glowActive ? 1 : 0.5,
            animation: glowActive ? "logo-pulse 2s ease-in-out infinite" : "none",
          }}
        >
          <path
            d={SH_LOGO_MARK_D}
            fill="#3F3E41"
            stroke="#323234"
            strokeWidth="0.191658"
          />
        </svg>
      </div>
      
    </div>
  );
}

// Vertical connector for mobile: straight line down
const CV_PATH = "M12 0V120";

function ConnectorVertical({ className, progress, id, glow = 0 }: { className?: string; progress: number; id: string; glow?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 12, y: 0 });

  const updatePos = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(progress * len);
    setPos({ x: pt.x, y: pt.y });
  }, [progress]);

  useEffect(() => {
    updatePos();
  }, [updatePos]);

  return (
    <svg
      className={className}
      viewBox="-8 -8 40 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="a" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="a" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.749 0 0 0 0 0.933 0 0 0 0 0.988 0 0 0 1 0" />
          <feBlend mode="normal" in2="bg" result="shadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
        <radialGradient id={`${id}-dot`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(6)">
          <stop stopColor="#7AD7F0" />
          <stop offset="1" stopColor="#31C1E8" />
        </radialGradient>
      </defs>
      <path
        ref={pathRef}
        d={CV_PATH}
        stroke="var(--landing-divider, #29292B)"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {glow > 0 && (
        <path
          d={CV_PATH}
          stroke="#51caeb"
          strokeOpacity={glow}
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      <g filter={`url(#${id}-glow)`} transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="6" fill={`url(#${id}-dot)`} />
      </g>
    </svg>
  );
}

const CL_PATH = "M12 13V104C12 121.673 26.327 136 44 136H420";

function ConnectorLeft({ className, progress, glow = 0 }: { className?: string; progress: number; glow?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 12, y: 12 });

  const updatePos = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(progress * len);
    setPos({ x: pt.x, y: pt.y });
  }, [progress]);

  useEffect(() => {
    updatePos();
  }, [updatePos]);

  return (
    <svg
      className={className}
      viewBox="-8 -8 437 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cl-dot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(6)">
          <stop stopColor="#7AD7F0" />
          <stop offset="1" stopColor="#31C1E8" />
        </radialGradient>
      </defs>
      <path
        ref={pathRef}
        d={CL_PATH}
        stroke="var(--landing-divider, #29292B)"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="6" fill="url(#cl-dot)" />
      </g>
    </svg>
  );
}

const CR_PATH = "M410 124V33C410 15.327 395.673 1 378 1H1";

function ConnectorRight({ className, progress, glow = 0 }: { className?: string; progress: number; glow?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 410, y: 125 });

  const updatePos = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(progress * len);
    setPos({ x: pt.x, y: pt.y });
  }, [progress]);

  useEffect(() => {
    updatePos();
  }, [updatePos]);

  return (
    <svg
      className={className}
      viewBox="-8 -8 437 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cr-dot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(6)">
          <stop stopColor="#7AD7F0" />
          <stop offset="1" stopColor="#31C1E8" />
        </radialGradient>
      </defs>
      <path
        ref={pathRef}
        d={CR_PATH}
        stroke="var(--landing-divider, #29292B)"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="6" fill="url(#cr-dot)" />
      </g>
    </svg>
  );
}

// HDR-glowing text (Chrome only, skipped on Safari)
function HDRText({ children, isSafari, opacity }: { children: React.ReactNode; isSafari: boolean; opacity: number }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-[1]" style={{ color: "#51caeb" }}>{children}</span>
      {opacity > 0 && !isSafari && (
        <span
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: "linear-gradient(to right, #51caeb, #51caeb), url(/images/hdr_pixel.avif)",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: opacity,
          }}
        >
          {children}
        </span>
      )}
    </span>
  );
}

export function SetupFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsSafari(/Safari/.test(ua) && !/Chrome/.test(ua));
  }, []);

  // Both dots travel toward center (delayed start)
  const dotProgress = Math.min(1, Math.max(0, (progress - 0.15)) / 0.45);
  const tileProgress = dotProgress >= 0.95 ? 1 : 0;
  const [glowOpacity, setGlowOpacity] = useState(0);
  const handleGlow = useCallback((opacity: number) => setGlowOpacity(opacity), []);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-10 pt-10 pb-8 md:pt-20 md:pb-20 max-w-[960px] mx-auto">
      {/* Mobile: stacked layout with vertical connectors */}
      <div className="flex flex-col items-center md:hidden">
        <div className="self-start">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 text-[24px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <span className="text-[#51caeb]">GitHub</span>
          </h2>
        </div>

        {/* Top vertical connector: dot travels down toward tile */}
        <ConnectorVertical className="w-6 h-20" progress={dotProgress} id="cv-top" glow={glowOpacity} />

        <div className="relative z-10 w-[110px]">
          <SuperhandsTile progress={tileProgress} isSafari={isSafari} onGlow={handleGlow} />
        </div>

        {/* Bottom vertical connector: dot travels up toward tile */}
        <div className="rotate-180">
          <ConnectorVertical className="w-6 h-20" progress={dotProgress} id="cv-bottom" glow={glowOpacity} />
        </div>

        <div className="self-end text-right">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and bring
          </p>
          <h2 className="mt-2 text-[24px] font-semibold leading-[1.1] font-heading">
            <span className="text-[#51caeb]">designers</span>
            <span className="text-[var(--landing-fg)]"> into the pull request flow.</span>
          </h2>
        </div>
      </div>

      {/* Desktop: positioned illustration */}
      <div
        className="relative hidden md:block w-full"
        style={{ aspectRatio: "816 / 430" }}
      >
        {/* Top-left text */}
        <div className="absolute left-0 top-0 w-[300px]">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <span className="text-[#51caeb]">GitHub</span>
          </h2>
        </div>

        {/* Left connector */}
        <div
          className="absolute"
          style={{ left: "10%", top: "26%", width: "44%", height: "27.2%" }}
        >
          <ConnectorLeft className="size-full" progress={dotProgress} glow={glowOpacity} />
        </div>

        {/* Center tile */}
        <div
          className="absolute z-10 flex items-center justify-center"
          style={{ left: "50%", top: "52%", transform: "translate(-50%, -50%)", width: "124px", height: "124px" }}
        >
          <SuperhandsTile progress={tileProgress} isSafari={isSafari} onGlow={handleGlow} />
        </div>

        {/* Right connector */}
        <div
          className="absolute"
          style={{ left: "46%", top: "50%", width: "44%", height: "27.3%" }}
        >
          <ConnectorRight className="size-full" progress={dotProgress} glow={glowOpacity} />
        </div>

        {/* Bottom-right text */}
        <div className="absolute right-0 text-right" style={{ top: "78%", width: "320px" }}>
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and&nbsp;&nbsp;bring
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[#51caeb]">designers</span>
            <span className="text-[var(--landing-fg)]"> into the pull request flow.</span>
          </h2>
        </div>
      </div>

      {/* Dotted divider */}
      <div
        className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.5,
        }}
      />
    </section>
  );
}
