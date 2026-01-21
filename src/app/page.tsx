"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Volume2, VolumeX, Maximize, Play, Pause } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Floating gradient blob component that follows mouse
function FloatingGradient() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFollowingMouse, setIsFollowingMouse] = useState(false);
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Random drift state
  const currentOffsetRef = useRef({ x: 0, y: 0 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const lastDirectionChangeRef = useRef(0);

  // Pick a new random target to drift towards
  const pickNewTarget = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150; // Random distance 100-250px
    targetOffsetRef.current = {
      x: currentOffsetRef.current.x + Math.cos(angle) * distance,
      y: currentOffsetRef.current.y + Math.sin(angle) * distance,
    };
    lastDirectionChangeRef.current = performance.now();
  }, []);

  // Initialize position to center of screen
  useEffect(() => {
    setPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setIsFollowingMouse(true);
    setPosition({ x: e.clientX, y: e.clientY });
    // Reset float offset when mouse moves
    setFloatOffset({ x: 0, y: 0 });
    currentOffsetRef.current = { x: 0, y: 0 };
    targetOffsetRef.current = { x: 0, y: 0 };

    // Clear existing timeout
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }

    // Set timeout to stop following mouse after 250ms of no movement
    mouseTimeoutRef.current = setTimeout(() => {
      pickNewTarget();
      setIsFollowingMouse(false);
    }, 250);
  }, [pickNewTarget]);

  // Floating animation when not following mouse
  useEffect(() => {
    if (isFollowingMouse) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    // Pick initial target when starting to float
    if (lastDirectionChangeRef.current === 0) {
      pickNewTarget();
    }
    
    // Store the next change time
    let nextChangeTime = performance.now() + 2000 + Math.random() * 2000;

    const animate = () => {
      const now = performance.now();
      
      // Pick a new random direction every 2-4 seconds
      if (now > nextChangeTime) {
        pickNewTarget();
        nextChangeTime = now + 2000 + Math.random() * 2000;
      }
      
      // Smoothly lerp towards the target (increased speed)
      const lerpFactor = 0.04;
      currentOffsetRef.current = {
        x: currentOffsetRef.current.x + (targetOffsetRef.current.x - currentOffsetRef.current.x) * lerpFactor,
        y: currentOffsetRef.current.y + (targetOffsetRef.current.y - currentOffsetRef.current.y) * lerpFactor,
      };
      
      // Add subtle organic wobble on top
      const wobbleTime = now / 1000;
      const wobbleX = Math.sin(wobbleTime * 1.5) * 15;
      const wobbleY = Math.cos(wobbleTime * 1.2) * 12;
      
      setFloatOffset({ 
        x: currentOffsetRef.current.x + wobbleX, 
        y: currentOffsetRef.current.y + wobbleY 
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isFollowingMouse, pickNewTarget]);

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

  // Calculate final position
  const finalX = isFollowingMouse ? position.x : position.x + floatOffset.x;
  const finalY = isFollowingMouse ? position.y : position.y + floatOffset.y;

  return (
    <div
      className="fixed pointer-events-none z-0"
      style={{
        left: finalX,
        top: finalY,
        transform: "translate(-50%, -50%)",
        transition: isFollowingMouse ? "left 0.15s ease-out, top 0.15s ease-out" : "left 0.5s ease-out, top 0.5s ease-out",
      }}
    >
      <div
        className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/25 via-primary/10 to-transparent blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(238, 96, 1, 0.2) 0%, rgba(238, 96, 1, 0.08) 40%, transparent 70%)",
        }}
      />
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

  const toggleFullscreen = () => {
    const video = videoRef.current;
    const container = videoContainerRef.current;
    
    if (!video || !container) return;

    // Check if we're currently in fullscreen
    const fullscreenElement = document.fullscreenElement || 
      (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
      (document as unknown as { msFullscreenElement?: Element }).msFullscreenElement;

    if (fullscreenElement) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
        (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
      } else if ((document as unknown as { msExitFullscreen?: () => Promise<void> }).msExitFullscreen) {
        (document as unknown as { msExitFullscreen: () => Promise<void> }).msExitFullscreen();
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
        containerElement.requestFullscreen();
      } else if (containerElement.webkitRequestFullscreen) {
        containerElement.webkitRequestFullscreen();
      } else if (containerElement.msRequestFullscreen) {
        containerElement.msRequestFullscreen();
      } else if (videoElement.webkitEnterFullscreen) {
        // Fallback to video fullscreen for other mobile browsers
        videoElement.webkitEnterFullscreen();
      }
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
              src="/icon.png"
              alt="SuperHands"
              className="w-10 h-10 mr-3"
            />
            <h1 className="text-xl font-bold uppercase text-foreground">
              SUPERHANDS
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
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-4 leading-[1.1] animate-fade-in-up animation-delay-100">
            The easiest way to build and share prototypes in Cursor
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Get started in Cursor without all the technical complexity of local dev, GitHub and version control.
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
                  className="text-base font-medium text-foreground block text-center sm:text-left"
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
                      className="!bg-secondary h-12 transition-all duration-200 cursor-text selection:!bg-orange-500 selection:!text-white px-4 rounded-[8px] text-base ring-0 focus-visible:ring-0 border-0 !opacity-100 w-full"
                      style={{
                        border: form.formState.errors.email
                          ? "1px solid #EF4444"
                          : focusedField === "email"
                            ? "1px solid #ee6001"
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
                    className="h-12 px-8 min-w-[160px] text-base bg-primary text-white font-medium rounded-[8px] transition-all hover:bg-primary/90 active:scale-[0.95] flex items-center justify-center cursor-pointer whitespace-nowrap"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full animate-fade-in-up animation-delay-400 relative">
          <div className="absolute inset-0 left-[50%] -translate-x-1/2 w-screen bg-gradient-to-t from-primary/15 via-primary/5 to-transparent blur-3xl pointer-events-none" />
          <div 
            ref={videoContainerRef}
            className="relative bg-card rounded-[18px] border border-border shadow-lg overflow-hidden group"
          >
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
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
      </div>
    </div>
  );
}
