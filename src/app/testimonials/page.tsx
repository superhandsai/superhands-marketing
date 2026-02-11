"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Quote, ArrowRight, Users, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Floating gradient blob component (reused from landing page)
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
      const floatX =
        Math.sin(elapsed * 0.3) * 80 +
        Math.sin(elapsed * 0.7) * 40 +
        Math.sin(elapsed * 1.3) * 15;

      const floatY =
        Math.cos(elapsed * 0.25) * 60 +
        Math.cos(elapsed * 0.6) * 35 +
        Math.sin(elapsed * 1.1) * 12;

      // Update blend factor for smooth transition when mouse stops
      if (isFollowingMouse) {
        floatBlendRef.current = 0;
      } else if (mouseStopTimeRef.current !== null) {
        const timeSinceStop = (now - mouseStopTimeRef.current) / 1000;
        const t = Math.min(1, timeSinceStop / 1.2);
        floatBlendRef.current = 1 - Math.pow(1 - t, 3);
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
      <div
        ref={innerRef}
        style={{
          transition: "transform 0.2s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
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

        <div
          className="w-[600px] h-[600px] rounded-full relative"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(238, 96, 1, 0.25) 0%, rgba(238, 96, 1, 0.14) 35%, rgba(238, 96, 1, 0.05) 55%, transparent 70%)",
            filter: "blur(40px)",
            transform: "translateZ(0px)",
          }}
        />

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

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  featured?: boolean;
}

interface CaseStudy {
  company: string;
  industry: string;
  logo: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechFlow",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    quote: "Superhands transformed how our team ships features. Our product designers can now test and iterate on ideas without waiting for engineering sprints. It's like giving everyone on the team superpowers.",
    featured: true,
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Design",
    company: "StreamLine",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    quote: "We reduced our time-to-market by 60% after adopting Superhands. The ability to explore and fix bugs directly in the browser has been a game-changer for our workflow.",
    featured: true,
  },
  {
    name: "Emily Watson",
    role: "Founder & CEO",
    company: "GrowthKit",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    quote: "As a non-technical founder, Superhands gives me the autonomy to make updates to our product without constantly pulling engineers away from core features. It's incredibly empowering.",
  },
  {
    name: "David Park",
    role: "Product Lead",
    company: "DataSync",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    quote: "The AI assistance in Superhands is remarkable. I can describe what I want in plain English, and it helps me make the changes. No context switching, no waiting.",
  },
  {
    name: "Jessica Liu",
    role: "UX Designer",
    company: "CloudNest",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    quote: "Finally, a tool that bridges the gap between design and development. I can prototype directly in our production code and see real results immediately.",
  },
  {
    name: "Alex Thompson",
    role: "VP of Product",
    company: "NexusApp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    quote: "Superhands has democratized our development process. Everyone on the product team can contribute, test, and iterate. Our velocity has never been higher.",
  },
];

const caseStudies: CaseStudy[] = [
  {
    company: "TechFlow",
    industry: "SaaS Platform",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TechFlow",
    summary: "TechFlow reduced their feature development cycle from weeks to days by empowering their product team to make updates directly. With Superhands, their PM team can now fix bugs, test new features, and iterate on designs without engineering bottlenecks.",
    metrics: [
      { label: "Faster Deployment", value: "75%" },
      { label: "Team Efficiency", value: "3x" },
      { label: "Bug Fix Time", value: "-80%" },
    ],
    tags: ["Product Velocity", "Team Collaboration", "Self-Service"],
  },
  {
    company: "StreamLine",
    industry: "Video Platform",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=StreamLine",
    summary: "StreamLine's design team used Superhands to prototype and ship 20+ UI improvements in their first month. The ability to experiment directly in the browser eliminated the back-and-forth with engineering and accelerated their product roadmap.",
    metrics: [
      { label: "UI Updates Shipped", value: "20+" },
      { label: "Design-to-Dev Time", value: "-60%" },
      { label: "Iteration Speed", value: "5x" },
    ],
    tags: ["Design System", "Rapid Prototyping", "UI/UX"],
  },
  {
    company: "GrowthKit",
    industry: "Marketing Analytics",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=GrowthKit",
    summary: "As a lean startup, GrowthKit needed to move fast with limited engineering resources. Superhands enabled their founder to make product updates, test growth experiments, and ship features independently—accelerating their path to product-market fit.",
    metrics: [
      { label: "Engineering Time Saved", value: "40hrs/mo" },
      { label: "Feature Releases", value: "2x" },
      { label: "Experiment Velocity", value: "4x" },
    ],
    tags: ["Startup Growth", "Resource Optimization", "Experimentation"],
  },
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "product" | "design" | "leadership">("all");

  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "product") return testimonial.role.toLowerCase().includes("product");
    if (selectedCategory === "design") return testimonial.role.toLowerCase().includes("design");
    if (selectedCategory === "leadership") return testimonial.role.toLowerCase().includes("ceo") || testimonial.role.toLowerCase().includes("founder") || testimonial.role.toLowerCase().includes("vp");
    return true;
  });

  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background overflow-hidden relative">
      <FloatingGradient />

      <div className="mx-auto max-w-6xl px-4 pt-8 pb-24 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 animate-fade-in-up">
          <Link href="/" className="flex items-center group">
            <img
              src="/icon.png"
              alt="Superhands"
              className="w-10 h-10 mr-3"
            />
            <h1 className="text-xl font-bold uppercase text-foreground">
              Superhands
            </h1>
          </Link>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80"
          >
            Login
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up animation-delay-100">
          <h2 className="text-4xl sm:text-6xl font-bold mb-4 leading-[1.1]">
            Loved by teams who{" "}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
              ship fast
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
            See how product teams are breaking free from development bottlenecks and shipping features faster than ever.
          </p>
        </div>

        {/* Featured Testimonials */}
        <div className="mb-20 animate-fade-in-up animation-delay-200">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials
              .filter((t) => t.featured)
              .map((testimonial, index) => (
                <div
                  key={index}
                  className="relative p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 group"
                >
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20 group-hover:text-primary/30 transition-colors" />
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-primary/20"
                    />
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-foreground/90 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="mb-20 animate-fade-in-up animation-delay-300">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from teams using Superhands to accelerate their product development
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="relative p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Company Info */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={study.logo}
                        alt={study.company}
                        className="w-16 h-16 rounded-lg border border-border"
                      />
                      <div>
                        <h4 className="font-bold text-foreground text-xl">{study.company}</h4>
                        <p className="text-sm text-muted-foreground">{study.industry}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Middle: Summary */}
                  <div className="lg:w-1/3 flex items-center">
                    <p className="text-foreground/90 leading-relaxed">
                      {study.summary}
                    </p>
                  </div>

                  {/* Right: Metrics */}
                  <div className="lg:w-1/3">
                    <div className="grid grid-cols-3 gap-4">
                      {study.metrics.map((metric, metricIndex) => (
                        <div
                          key={metricIndex}
                          className="text-center p-3 bg-secondary/50 rounded-xl border border-border flex flex-col items-center justify-center min-h-[100px]"
                        >
                          <div className="text-xl font-bold text-primary mb-2 w-full">
                            {metric.value}
                          </div>
                          <div className="text-[10px] leading-tight text-muted-foreground w-full break-words hyphens-auto">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 animate-fade-in-up animation-delay-400">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What people are saying
            </h3>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { label: "All", value: "all" },
              { label: "Product", value: "product" },
              { label: "Design", value: "design" },
              { label: "Leadership", value: "leadership" },
            ].map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value as typeof selectedCategory)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.value
                    ? "bg-primary text-white shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 animate-fade-in-up animation-delay-500">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up animation-delay-600">
          <div className="relative p-12 bg-gradient-to-br from-primary/10 via-orange-500/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to join them?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start shipping faster and empower your entire team to contribute to your product.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
