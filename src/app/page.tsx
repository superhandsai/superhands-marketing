"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronDown, Zap, Shield } from "lucide-react";
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
          ? `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(238, 96, 1, 0.9) 0%, rgba(255, 130, 50, 0.7) 25%, rgba(238, 96, 1, 0.4) 50%, var(--foreground) 70%)`
          : "none",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: isTracking ? "transparent" : "var(--foreground)",
        color: "var(--foreground)",
      }}
    >
      Lovable, but for real production code.
    </h2>
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
            background: "radial-gradient(circle, rgba(238, 96, 1, 0.08) 0%, rgba(238, 96, 1, 0.03) 40%, transparent 65%)",
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
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(238, 96, 1, 0.25) 0%, rgba(238, 96, 1, 0.14) 35%, rgba(238, 96, 1, 0.05) 55%, transparent 70%)",
            filter: "blur(40px)",
            transform: "translateZ(0px)",
          }}
        />
        
        {/* Inner core - brighter center for depth */}
        <div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 130, 50, 0.22) 0%, rgba(238, 96, 1, 0.1) 45%, transparent 70%)",
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
            background: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(255, 150, 80, 0.15) 0%, rgba(255, 120, 50, 0.05) 40%, transparent 70%)",
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
            background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(255, 180, 120, 0.08) 0%, transparent 50%)",
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const searchParams = useSearchParams();

  // Allow theme override via URL parameter for previewing
  useEffect(() => {
    const themeParam = searchParams.get("theme");
    if (themeParam === "light") {
      document.documentElement.classList.remove("dark");
    } else if (themeParam === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [searchParams]);

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
    const count = 150;
    const defaults = {
      origin: { y: 0.2 },
      colors: ['#ee6001', '#ff8232', '#ffa366', '#dc2626', '#ef4444', '#fb923c', '#fdba74', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#6366f1', '#84cc16', '#f97316', '#14b8a6', '#a855f7', '#eab308']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Explosive center burst
    fire(0.25, {
      spread: 40,
      startVelocity: 75,
    });

    // Wide spread
    fire(0.2, {
      spread: 90,
      startVelocity: 65,
    });

    // Super wide spray
    fire(0.35, {
      spread: 140,
      decay: 0.89,
      scalar: 1.0,
      startVelocity: 55,
    });

    // Slow floaters
    fire(0.15, {
      spread: 160,
      startVelocity: 30,
      decay: 0.88,
      scalar: 1.4,
      gravity: 0.8,
    });

    // Fast shooters
    fire(0.15, {
      spread: 130,
      startVelocity: 80,
      scalar: 0.9,
    });

    // Side bursts
    fire(0.1, {
      spread: 120,
      startVelocity: 70,
      angle: 60,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 70,
      angle: 120,
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
        <div className="flex items-center justify-center mb-12 animate-fade-in-up">
          <div className="flex items-center">
            <img
              src="/icon.png"
              alt="Superhands"
              className="w-10 h-10 mr-3"
            />
            <h1 className="text-xl font-bold uppercase text-foreground">
              Superhands
            </h1>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <GradientTextHero />
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            A browser-based, Claude-powered experience with guardrails that engineering teams are comfortable with.
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
                  Join our pilot
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
                    className="h-12 px-8 w-full sm:w-[160px] text-base bg-primary text-white font-medium rounded-[8px] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(238,96,1,0.5)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer whitespace-nowrap"
                    disabled={loading}
                    onMouseEnter={triggerConfetti}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Join waitlist"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="w-full animate-fade-in-up animation-delay-400 mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            With Superhands
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Prototyping Card */}
            <div className="relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">
                  Prototype to explore ideas fast
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Explore product ideas, flows, and UI early — before entering a traditional dev cycle — to get internal alignment without burning engineering time.
              </p>
            </div>

            {/* Validation Card */}
            <div className="relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">
                  Validate before production
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A new design-to-dev handoff where teams can validate features, updates, and experiments without risking production code or changing existing workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Pain Points Section */}
        <div className="w-full animate-fade-in-up animation-delay-500 mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">
            Problems we solve
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* CEO Pain Point */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative">
              <div className="absolute top-4 left-4 text-5xl text-primary/20 font-serif leading-none">&ldquo;</div>
              <div className="pt-6">
                <div className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                  CEOs
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  We&apos;re too slow at exploring and shipping product. Competitors are learning faster than us.
                </p>
              </div>
            </div>

            {/* CTO Pain Point */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative">
              <div className="absolute top-4 left-4 text-5xl text-primary/20 font-serif leading-none">&ldquo;</div>
              <div className="pt-6">
                <div className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                  CTOs
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  I don&apos;t want new security risks or tools that force us to change how we work.
                </p>
              </div>
            </div>

            {/* Everyone else Pain Point */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative">
              <div className="absolute top-4 left-4 text-5xl text-primary/20 font-serif leading-none">&ldquo;</div>
              <div className="pt-6">
                <div className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                  Everyone else
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  I&apos;ve used Lovable but have no idea about local dev environments and GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full animate-fade-in-up">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                question: "What is Superhands?",
                answer: "Superhands is a browser-based, Claude-powered platform for prototyping and validating changes on real production codebases. It's designed to help teams explore ideas fast and validate changes before they hit production — all with guardrails that engineering teams are comfortable with."
              },
              {
                question: "Do I need to use Cursor or any IDE?",
                answer: "No! The experience lives entirely in your browser. You don't need to install Cursor, set up a local dev environment, or deal with GitHub and version control. Just open Superhands and start building."
              },
              {
                question: "How does it work with production code?",
                answer: "Superhands connects to your existing codebase and lets you prototype and validate changes in a safe, sandboxed environment. Nothing touches production until your engineering team is ready to merge — giving you the freedom to experiment without risk."
              },
              {
                question: "What guardrails are in place for engineering teams?",
                answer: "We've built Superhands with security and workflow preservation in mind. Changes are isolated, there are no new security risks introduced, and it integrates with your existing processes rather than forcing you to change how you work."
              },
              {
                question: "Is Superhands free to use?",
                answer: "We'll be launching with a free tier that includes everything you need to get started. Premium plans with advanced features will be available for teams and power users."
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
      </div>
    </div>
  );
}
