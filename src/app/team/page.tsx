"use client";

import { useState, useRef } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Johnson",
    role: "Co-Founder & CEO",
    bio: "Former tech lead at major SaaS companies. Passionate about making development accessible to everyone.",
    image: "/team/placeholder-1.png",
    linkedin: "https://www.linkedin.com/in/example"
  },
  {
    name: "Sarah Chen",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer with 10+ years of experience building developer tools and cloud platforms.",
    image: "/team/placeholder-2.png",
    linkedin: "https://www.linkedin.com/in/example"
  },
  {
    name: "Michael Torres",
    role: "Head of Product",
    bio: "Product designer turned product manager. Obsessed with creating intuitive user experiences.",
    image: "/team/placeholder-3.png",
    linkedin: "https://www.linkedin.com/in/example"
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Engineer",
    bio: "AI/ML specialist focused on making AI tools that developers actually want to use.",
    image: "/team/placeholder-4.png",
    linkedin: "https://www.linkedin.com/in/example"
  }
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden bg-secondary">
        {!imageError ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="text-6xl font-bold text-primary/40">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-primary mb-3">
          {member.role}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {member.bio}
        </p>

        {/* LinkedIn Link */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Connect on LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <a href="/" className="flex items-center">
            <img
              src="/icon.png"
              alt="Superhands"
              className="w-10 h-10 mr-3"
            />
            <h1 className="text-xl font-bold uppercase text-foreground">
              Superhands
            </h1>
          </a>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
          >
            Login
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up animation-delay-100">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Meet the Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're a small team of builders on a mission to make software development accessible to everyone.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>

        {/* Join Us Section */}
        <div className="mt-24 text-center animate-fade-in-up animation-delay-300">
          <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Want to Join Us?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented people who share our vision. Check out our open positions or reach out to say hello!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@superhands.ai"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-lg bg-primary text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
              >
                Get in Touch
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-lg bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-secondary/80"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
