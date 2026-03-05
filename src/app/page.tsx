"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Volume2, VolumeX, Maximize, Play, Pause, ChevronDown, Copy, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

// Hero text with mouse-tracking gradient effect
function GradientTextHero() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePos({ x, y });
    };

    const handleMouseEnter = () => {
      setIsTracking(true);
      document.addEventListener("mousemove", handleGlobalMouseMove);
    };

    const textElement = textRef.current;
    if (!textElement) return;

    textElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      textElement.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  return (
    <h2
      ref={textRef}
      className="text-4xl sm:text-6xl font-bold mb-4 leading-[1.1] animate-fade-in-up animation-delay-100 relative cursor-default"
      style={{
        backgroundImage: isTracking
          ? `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.95) 0%, rgba(200, 200, 200, 0.7) 25%, rgba(150, 150, 150, 0.4) 50%, var(--foreground) 70%)`
          : "none",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: isTracking ? "transparent" : "var(--foreground)",
        color: "var(--foreground)",
      }}
    >
      hello
    </h2>
  );
}

// Email copy component with hover interaction
function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const email = "hello@superhands.ai";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`relative inline-flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm border rounded-xl transition-all cursor-pointer ${
        copied ? 'border-green-500/50' : 'border-border hover:border-primary/50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={copyToClipboard}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyToClipboard();
        }
      }}
      aria-label="Click to copy email address"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5 text-green-500" />
          <span className="text-lg text-green-500 font-medium">
            Copied to clipboard!
          </span>
        </>
      ) : (
        <>
          <span className="text-lg text-foreground font-medium">
            {email}
          </span>
          <div
            className={`inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-secondary text-secondary-foreground transition-all ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm">Copy</span>
          </div>
        </>
      )}
    </div>
  );
}

// Floating gradient blob component that follows mouse with 3D effect
function FloatingGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const rimHighlightRef = useRef<HTMLDivElement>(null);

  const [isFollowingMouse, setIsFollowingMouse] = useState(false);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const basePositionRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(performance.now());
  const mouseStopTimeRef = useRef<number | null>(null);
  const floatBlendRef = useRef(0);

  // Initialize position to center of screen
  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    basePositionRef.current = { x: centerX, y: centerY };
    lastMouseRef.current = { x: centerX, y: centerY };
    startTimeRef.current = performance.now();

    if (containerRef.current) {
      containerRef.current.style.left = `${centerX}px`;
      containerRef.current.style.top = `${centerY}px`;
    }
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setIsFollowingMouse(true);

    // Calculate velocity for 3D tilt effect
    const newVelocity = {
      x: Math.max(-15, Math.min(15, (e.clientX - lastMouseRef.current.x) * 0.1)),
      y: Math.max(-15, Math.min(15, (e.clientY - lastMouseRef.current.y) * 0.1)),
    };
    velocityRef.current = newVelocity;

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    basePositionRef.current = { x: e.clientX, y: e.clientY };

    // Clear existing timeout
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }

    // Set timeout to stop following mouse after 250ms of no movement
    mouseTimeoutRef.current = setTimeout(() => {
      setIsFollowingMouse(false);
      velocityRef.current = { x: 0, y: 0 };
      mouseStopTimeRef.current = performance.now();
      floatBlendRef.current = 0;
    }, 250);
  }, []);

  // Continuous animation loop - always running
  useEffect(() => {
    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      // Multiple layered sine waves for organic, never-stopping motion
      // Each wave has different frequency and amplitude
      const floatX =
        Math.sin(elapsed * 0.3) * 80 +      // Slow, wide drift
        Math.sin(elapsed * 0.7) * 40 +      // Medium movement
        Math.sin(elapsed * 1.3) * 15;       // Quick, subtle wobble

      const floatY =
        Math.cos(elapsed * 0.25) * 60 +     // Slow, wide drift (different phase)
        Math.cos(elapsed * 0.6) * 35 +      // Medium movement
        Math.sin(elapsed * 1.1) * 12;       // Quick, subtle wobble

      // Update blend factor for smooth transition when mouse stops
      if (isFollowingMouse) {
        floatBlendRef.current = 0;
      } else if (mouseStopTimeRef.current !== null) {
        const timeSinceStop = (now - mouseStopTimeRef.current) / 1000;
        // Ease-out over 1.2 seconds for smooth transition
        const t = Math.min(1, timeSinceStop / 1.2);
        floatBlendRef.current = 1 - Math.pow(1 - t, 3); // Cubic ease-out
      }

      const blend = floatBlendRef.current;

      // Calculate final position with smooth blend
      const finalX = basePositionRef.current.x + floatX * blend;
      const finalY = basePositionRef.current.y + floatY * blend;

      // 3D effects
      const velocity = velocityRef.current;
      const tiltX = velocity.y * 2;
      const tiltY = -velocity.x * 2;
      const breathingScale = 1 + Math.sin(elapsed * 0.8) * 0.03;
      const highlightOffsetX = -velocity.x * 3 + Math.sin(elapsed * 0.5) * 10;
      const highlightOffsetY = -velocity.y * 3 + Math.cos(elapsed * 0.4) * 8;

      // Update DOM directly for smooth animation
      if (containerRef.current) {
        containerRef.current.style.left = `${finalX}px`;
        containerRef.current.style.top = `${finalY}px`;
        containerRef.current.style.transition = isFollowingMouse
          ? "left 0.15s ease-out, top 0.15s ease-out"
          : "none";
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${breathingScale})`;
      }

      if (highlightRef.current) {
        highlightRef.current.style.transform = `translateZ(40px) translate(${highlightOffsetX}px, ${highlightOffsetY}px)`;
      }

      if (rimHighlightRef.current) {
        rimHighlightRef.current.style.transform = `translateZ(30px) translate(${-highlightOffsetX * 0.5}px, ${-highlightOffsetY * 0.5 - 50}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isFollowingMouse]);

  // Add mouse move listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-0"
      style={{
        transform: "translate(-50%, -50%)",
        perspective: "1000px",
      }}
    >
      {/* Main container with 3D transform */}
      <div
        ref={innerRef}
        style={{
          transition: "transform 0.2s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Deep shadow layer - creates depth underneath (hollow center) */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, transparent 0%, transparent 20%, rgba(0, 0, 0, 0.04) 40%, rgba(0, 0, 0, 0.02) 50%, transparent 65%)",
            filter: "blur(60px)",
            transform: "translateZ(-100px) translateY(40px)",
            left: "-50px",
            top: "-50px",
          }}
        />

        {/* Outer glow layer - ambient light */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 65%)",
            filter: "blur(80px)",
            transform: "translateZ(-50px)",
            left: "-100px",
            top: "-100px",
          }}
        />

        {/* Main gradient orb */}
        <div
          className="w-[600px] h-[600px] rounded-full relative"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(200, 200, 200, 0.08) 35%, rgba(150, 150, 150, 0.03) 55%, transparent 70%)",
            filter: "blur(40px)",
            transform: "translateZ(0px)",
          }}
        />

        {/* Inner core - brighter center for depth */}
        <div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(200, 200, 200, 0.05) 45%, transparent 70%)",
            filter: "blur(25px)",
            transform: "translateZ(20px)",
            left: "125px",
            top: "125px",
          }}
        />

        {/* Specular highlight - simulates light reflection */}
        <div
          ref={highlightRef}
          className="absolute w-[200px] h-[150px] rounded-full"
          style={{
            background: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(200, 200, 200, 0.03) 40%, transparent 70%)",
            filter: "blur(20px)",
            transition: "transform 0.3s ease-out",
            left: "180px",
            top: "150px",
          }}
        />

        {/* Secondary rim highlight */}
        <div
          ref={rimHighlightRef}
          className="absolute w-[400px] h-[250px] rounded-full"
          style={{
            background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)",
            filter: "blur(30px)",
            transition: "transform 0.4s ease-out",
            left: "100px",
            top: "100px",
          }}
        />
      </div>
    </div>
  );
}

// Animated computer screen with product demo mockup
function AnimatedScreen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sidebarItems = [
    { icon: "~", label: "Dashboard", active: false },
    { icon: ">", label: "Projects", active: true },
    { icon: "#", label: "Components", active: false },
    { icon: "*", label: "Settings", active: false },
  ];

  const codeLines = [
    { indent: 0, content: '<div className="card">' },
    { indent: 1, content: '<h2>{title}</h2>' },
    { indent: 1, content: '<p>{description}</p>' },
    { indent: 1, content: '<Button variant="primary">' },
    { indent: 2, content: "Get Started" },
    { indent: 1, content: "</Button>" },
    { indent: 0, content: "</div>" },
  ];

  const aiPrompt = "Add a progress bar below the description";

  return (
    <div ref={sectionRef} className="w-full mt-24">
      {/* Monitor frame */}
      <div className="max-w-4xl mx-auto">
        {/* Screen bezel */}
        <div
          className="rounded-t-2xl border border-white/[0.08] bg-[#1a1a1a] p-1.5 shadow-2xl shadow-black/40"
        >
          {/* Browser chrome */}
          <div className="rounded-t-xl bg-[#0f0f0f] overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161616] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className={`h-6 w-64 rounded-md bg-white/[0.05] flex items-center justify-center text-[11px] text-white/30 transition-opacity duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  app.superhands.ai/editor
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* App body */}
            <div className="flex min-h-[320px] sm:min-h-[380px]">
              {/* Sidebar */}
              <div className="w-40 sm:w-48 border-r border-white/[0.06] bg-[#111111] py-3 px-2 hidden sm:block">
                <div className="mb-3 px-2">
                  <div
                    className={`text-[10px] uppercase tracking-wider text-white/20 transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-3"
                    }`}
                  >
                    Navigation
                  </div>
                </div>
                {sidebarItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs mb-0.5 transition-all duration-500 ${
                      item.active
                        ? "bg-white/[0.06] text-white/80"
                        : "text-white/30"
                    }`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateX(0)"
                        : "translateX(-12px)",
                      transitionDelay: `${300 + i * 100}ms`,
                    }}
                  >
                    <span className="font-mono text-[10px] w-4 text-center opacity-50">
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content area */}
              <div className="flex-1 flex flex-col relative">
                {/* File tabs */}
                <div className="flex border-b border-white/[0.06] bg-[#0d0d0d]">
                  <div
                    className={`px-4 py-2 text-[11px] text-white/50 border-b border-white/20 bg-[#0f0f0f] transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    Card.tsx
                  </div>
                  <div
                    className={`px-4 py-2 text-[11px] text-white/25 transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    index.tsx
                  </div>
                </div>

                {/* Code area */}
                <div className="flex-1 p-4 font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden">
                  {codeLines.map((line, i) => (
                    <div
                      key={i}
                      className="flex transition-all duration-500"
                      style={{
                        paddingLeft: `${line.indent * 16}px`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                          ? "translateY(0)"
                          : "translateY(8px)",
                        transitionDelay: `${400 + i * 80}ms`,
                      }}
                    >
                      <span className="w-6 text-right mr-3 text-white/15 select-none text-[10px]">
                        {i + 1}
                      </span>
                      <span
                        className={`${
                          line.content.startsWith("<")
                            ? "text-white/50"
                            : line.content.startsWith("{")
                              ? "text-white/40"
                              : "text-white/60"
                        }`}
                      >
                        {line.content}
                      </span>
                    </div>
                  ))}

                  {/* Highlighted new line that appears after AI prompt */}
                  <div
                    className="flex transition-all duration-700"
                    style={{
                      paddingLeft: "16px",
                      opacity: isVisible ? 1 : 0,
                      maxHeight: isVisible ? "24px" : "0px",
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(4px)",
                      transitionDelay: "2200ms",
                    }}
                  >
                    <span className="w-6 text-right mr-3 text-white/15 select-none text-[10px]">
                      8
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-400/70 px-1 rounded-sm">
                      {"<ProgressBar value={progress} />"}
                    </span>
                  </div>
                </div>

                {/* AI prompt overlay */}
                <div
                  className="absolute bottom-3 left-3 right-3 transition-all duration-600"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0)"
                      : "translateY(10px)",
                    transitionDelay: "1600ms",
                    transitionDuration: "500ms",
                  }}
                >
                  <div className="rounded-lg border border-white/[0.08] bg-[#1a1a1a]/95 backdrop-blur-sm p-3 shadow-lg">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-[8px] text-white/50">
                        AI
                      </div>
                      <span className="text-[10px] text-white/30">
                        Superhands
                      </span>
                    </div>
                    <div className="text-xs text-white/60 overflow-hidden">
                      <span
                        className="inline-block overflow-hidden whitespace-nowrap"
                        style={{
                          width: isVisible ? `${aiPrompt.length}ch` : "0",
                          transition: "width 1.5s steps(40, end)",
                          transitionDelay: "1800ms",
                        }}
                      >
                        {aiPrompt}
                      </span>
                      <span
                        className="inline-block w-[2px] h-3 bg-white/50 ml-0.5 align-middle"
                        style={{
                          animation: isVisible
                            ? "blinkCursor 1s step-end infinite"
                            : "none",
                          animationDelay: "1800ms",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitor stand / chin */}
        <div className="flex justify-center">
          <div className="w-32 h-1.5 bg-[#1a1a1a] rounded-b-lg border-x border-b border-white/[0.06]" />
        </div>
        <div className="flex justify-center">
          <div className="w-20 h-4 bg-[#161616] rounded-b-lg border-x border-b border-white/[0.05]" />
        </div>
      </div>
    </div>
  );
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-svh w-full bg-background" />}>
      <LandingPageContent />
    </Suspense>
  );
}

function LandingPageContent() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    const container = videoContainerRef.current;

    if (!video || !container) return;

    // Check if we're currently in fullscreen
    const fullscreenElement = document.fullscreenElement ||
      (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
      (document as unknown as { msFullscreenElement?: Element }).msFullscreenElement;

    try {
      if (fullscreenElement) {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
          await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
        } else if ((document as unknown as { msExitFullscreen?: () => Promise<void> }).msExitFullscreen) {
          await (document as unknown as { msExitFullscreen: () => Promise<void> }).msExitFullscreen();
        }
      } else {
        // Enter fullscreen - try video element first for iOS compatibility
        const videoElement = video as HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
          webkitSupportsFullscreen?: boolean;
        };

        // iOS Safari: use video's native fullscreen (only option that works)
        if (videoElement.webkitSupportsFullscreen && videoElement.webkitEnterFullscreen) {
          videoElement.webkitEnterFullscreen();
          return;
        }

        // Try container fullscreen for desktop/Android
        const containerElement = container as HTMLDivElement & {
          webkitRequestFullscreen?: () => Promise<void>;
          msRequestFullscreen?: () => Promise<void>;
        };

        if (containerElement.requestFullscreen) {
          await containerElement.requestFullscreen();
        } else if (containerElement.webkitRequestFullscreen) {
          await containerElement.webkitRequestFullscreen();
        } else if (containerElement.msRequestFullscreen) {
          await containerElement.msRequestFullscreen();
        } else if (videoElement.webkitEnterFullscreen) {
          // Fallback to video fullscreen for other mobile browsers
          videoElement.webkitEnterFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Allow theme override via URL parameter for previewing
  useEffect(() => {
    const themeParam = searchParams.get("theme");
    if (themeParam === "light") {
      document.documentElement.classList.remove("dark");
    } else if (themeParam === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [searchParams]);

  // Track fullscreen state changes (including vendor-prefixed events)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || 
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as unknown as { msFullscreenElement?: Element }).msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };
    
    // Listen to all fullscreen change events for cross-browser support
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    
    // Also listen to video's webkitbeginfullscreen/webkitendfullscreen for iOS
    const video = videoRef.current;
    if (video) {
      video.addEventListener("webkitbeginfullscreen", () => setIsFullscreen(true));
      video.addEventListener("webkitendfullscreen", () => setIsFullscreen(false));
    }
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
      if (video) {
        video.removeEventListener("webkitbeginfullscreen", () => setIsFullscreen(true));
        video.removeEventListener("webkitendfullscreen", () => setIsFullscreen(false));
      }
    };
  }, []);


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle clicking outside form fields
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("input")) {
        setFocusedField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerConfetti = () => {
    // Confetti effect
    const count = 1000;
    const defaults = {
      origin: { y: 0.2 },
      colors: ['#ffffff', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // MASSIVE explosive center burst
    fire(0.25, {
      spread: 40,
      startVelocity: 75,
    });

    // HUGE wide spread
    fire(0.2, {
      spread: 90,
      startVelocity: 65,
    });

    // INSANE super wide spray
    fire(0.35, {
      spread: 140,
      decay: 0.89,
      scalar: 1.0,
      startVelocity: 55,
    });

    // TONS of slow floaters
    fire(0.15, {
      spread: 160,
      startVelocity: 30,
      decay: 0.88,
      scalar: 1.4,
      gravity: 0.8,
    });

    // TONS of fast shooters
    fire(0.15, {
      spread: 130,
      startVelocity: 80,
      scalar: 0.9,
    });

    // EPIC side bursts (left)
    fire(0.1, {
      spread: 120,
      startVelocity: 70,
      angle: 60,
    });

    // EPIC side bursts (right)
    fire(0.1, {
      spread: 120,
      startVelocity: 70,
      angle: 120,
    });

    // EXTRA: Full left side explosion
    fire(0.15, {
      spread: 100,
      startVelocity: 85,
      angle: 45,
    });

    // EXTRA: Full right side explosion
    fire(0.15, {
      spread: 100,
      startVelocity: 85,
      angle: 135,
    });

    // EXTRA: Straight up fountain
    fire(0.2, {
      spread: 60,
      startVelocity: 100,
      angle: 90,
    });

    // EXTRA: Wild spiraling confetti
    fire(0.12, {
      spread: 180,
      startVelocity: 60,
      decay: 0.85,
      scalar: 1.8,
    });

    // EXTRA: Glitter particles
    fire(0.08, {
      spread: 360,
      startVelocity: 25,
      decay: 0.9,
      scalar: 0.6,
      ticks: 400,
    });

    // EXTRA: Low gravity floaters
    fire(0.1, {
      spread: 200,
      startVelocity: 35,
      decay: 0.85,
      scalar: 2.0,
      gravity: 0.3,
    });

    // EXTRA: Super fast shooters from bottom
    fire(0.08, {
      spread: 100,
      startVelocity: 120,
      angle: 90,
      origin: { y: 0.8 },
    });

    // EXTRA: Corner bursts (top left)
    fire(0.05, {
      spread: 90,
      startVelocity: 90,
      angle: 315,
      origin: { x: 0.2, y: 0.1 },
    });

    // EXTRA: Corner bursts (top right)
    fire(0.05, {
      spread: 90,
      startVelocity: 90,
      angle: 225,
      origin: { x: 0.8, y: 0.1 },
    });
  };

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "An error occurred");
      }

      sessionStorage.setItem("waitlist_email", data.email);
      window.location.href = "https://app.superhands.ai/waitlist";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background overflow-hidden relative">
      <FloatingGradient />
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="Superhands"
              className="w-10 h-10 mr-3 logo-invert"
            />
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Superhands
            </h1>
          </div>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
          >
            Login
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <GradientTextHero />
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Stop waiting for engineering. Prototype, test, and validate ideas yourself.
          </p>
        </div>

        {/* Email Signup Form */}
        <div className="flex justify-center mb-16 animate-fade-in-up animation-delay-300">
          <div className="w-full max-w-md">
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              {error && (
                <div className="mb-6 p-3 bg-red-900/20 rounded-md">
                  <p className="text-sm text-foreground flex items-start">
                    <svg
                      className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="email"
                  className="text-base font-medium text-foreground block text-center"
                >
                  Get early access
                </Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      {...form.register("email", {
                        onBlur: () => setFocusedField(null),
                      })}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      disabled={loading}
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="!bg-secondary h-12 transition-all duration-200 cursor-text selection:!bg-primary selection:!text-primary-foreground px-4 rounded-[8px] text-base ring-0 focus-visible:ring-0 border-0 !opacity-100 w-full"
                      style={{
                        border: form.formState.errors.email
                          ? "1px solid #EF4444"
                          : focusedField === "email"
                            ? "1px solid var(--foreground)"
                            : "1px solid var(--input-border)",
                        color:
                          focusedField === "email" || form.watch("email")
                            ? "var(--foreground)"
                            : hoveredField === "email"
                              ? "#D1D5DB"
                              : "#9CA3AF",
                        fontSize: "16px",
                      }}
                      onFocus={() => setFocusedField("email")}
                      onMouseEnter={(e) => {
                        setHoveredField("email");
                        if (focusedField !== "email" && !form.watch("email")) {
                          e.currentTarget.style.color = "#D1D5DB";
                        }
                      }}
                      onMouseLeave={(e) => {
                        setHoveredField(null);
                        if (focusedField !== "email" && !form.watch("email")) {
                          e.currentTarget.style.color = "#9CA3AF";
                        }
                      }}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-400 mt-2 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="relative h-12 px-8 w-full sm:w-[160px] text-base bg-primary text-primary-foreground font-medium rounded-[8px] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer whitespace-nowrap overflow-hidden group/btn"
                    disabled={loading}
                    onMouseEnter={triggerConfetti}
                  >
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                    ) : (
                      <span className="relative z-10">Get started</span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full animate-fade-in-up animation-delay-400 relative">
          <div className="absolute inset-0 left-[50%] -translate-x-1/2 w-screen bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none" />
          <div
            ref={videoContainerRef}
            className="relative rounded-[18px] overflow-hidden group"
          >
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={(e) => {
                console.error('Video error:', e);
                setVideoError('Failed to load video');
              }}
              onLoadStart={() => console.log('Video loading started')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="https://gpzgnsqxhytllyibiova.supabase.co/storage/v1/object/public/page-captures/vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <p>{videoError}</p>
              </div>
            )}
            
            {/* Center Play/Pause Button */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <button
                onClick={togglePlayPause}
                className="p-7 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-2xl text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="w-14 h-14" fill="currentColor" />
                ) : (
                  <Play className="w-14 h-14" fill="currentColor" />
                )}
              </button>
            </div>

            {/* Other Video Controls */}
            <div 
              className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                onClick={toggleMute}
                className="p-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-lg text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-lg text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Animated Screen Section */}
        <AnimatedScreen />

        {/* FAQ Section */}
        <div className="w-full mt-24 animate-fade-in-up animation-delay-500">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                question: "What is Superhands?",
                answer: "Superhands empowers product managers, designers, and non-technical team members to prototype features, test ideas with users, and validate concepts. All on your production codebase, directly in the browser. Stop waiting for engineering. Start learning from users today."
              },
              {
                question: "Do I need coding experience to use Superhands?",
                answer: "No coding experience is required! Superhands is designed for product managers, designers, and anyone on the team who wants to contribute. With AI assistance built right into your browser, you can make changes to your existing product just by describing what you want to update."
              },
              {
                question: "How does Superhands work with my existing codebase?",
                answer: "Superhands connects to your team's production codebase and lets you explore, test changes, and propose updates in a safe environment. You can experiment with new features and bug fixes without affecting your live product or needing to set up a local development environment."
              },
              {
                question: "How can I use Superhands to validate product ideas?",
                answer: "Superhands lets you build functional prototypes directly on your production codebase. Describe the feature or change you want to test, and our AI helps you build it in minutes. You can then share a link to your prototype with users or stakeholders to gather feedback, all before writing a single engineering ticket or PRD."
              },
              {
                question: "Is Superhands free to use?",
                answer: "We'll be launching with a free tier that includes everything you need to get started. Premium plans with advanced features will be available for teams and power users."
              },
              {
                question: "When will Superhands be available?",
                answer: "We're currently in early access. Join the waitlist to be among the first to try Superhands and help shape the product with your feedback!"
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Us Section */}
        <div className="w-full mt-20 animate-fade-in-up animation-delay-600">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            Get in Touch
          </h3>
          <div className="max-w-3xl mx-auto flex justify-center">
            <EmailCopy />
          </div>
        </div>
      </div>
    </div>
  );
}
