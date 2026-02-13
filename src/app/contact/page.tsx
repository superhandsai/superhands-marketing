"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";

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

// Customer data with details
const customers = [
  {
    id: 'vercel',
    name: 'Vercel',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 76 65" fill="currentColor">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
      </svg>
    ),
    description: 'Leading platform for frontend developers',
    partnership: 'Superhands provides AI-powered code assistance to accelerate Vercel\'s deployment workflows and enhance developer productivity across their infrastructure.'
  },
  {
    id: 'cursor',
    name: 'CURSOR',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    ),
    description: 'AI-first code editor',
    partnership: 'We collaborate with Cursor to integrate intelligent coding features, helping developers write better code faster with real-time AI suggestions and error detection.'
  },
  {
    id: 'oscar',
    name: 'Oscar',
    icon: null,
    description: 'Modern health insurance company',
    partnership: 'Superhands supports Oscar Health with AI-driven automation for member services, streamlining healthcare operations and improving patient experience.'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: null,
    description: 'AI research and deployment company',
    partnership: 'We partner with OpenAI to leverage cutting-edge language models, bringing advanced AI capabilities to our customers through seamless integration.'
  },
  {
    id: 'coinbase',
    name: 'coinbase',
    icon: null,
    description: 'Cryptocurrency exchange platform',
    partnership: 'Superhands provides intelligent automation for Coinbase\'s customer support and compliance workflows, ensuring secure and efficient operations at scale.'
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    icon: (
      <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
        <span className="text-background text-xs font-bold">$</span>
      </div>
    ),
    description: 'Mobile payment service',
    partnership: 'We help Cash App automate transaction monitoring and fraud detection, enhancing security while maintaining a seamless user experience for millions of customers.'
  },
  {
    id: 'boom',
    name: 'BOOM',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    description: 'Supersonic travel company',
    partnership: 'Superhands supports BOOM Supersonic with AI-powered engineering workflows and design optimization, accelerating the development of next-generation aircraft.'
  },
  {
    id: 'ramp',
    name: 'ramp',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 17l9.2-9.2M17 17V7H7" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    description: 'Corporate card and spend management',
    partnership: 'We work with Ramp to automate expense categorization and financial reporting, helping businesses manage spending more efficiently with AI-driven insights.'
  }
];

export default function ContactPage() {
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  const toggleCustomer = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
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

        {/* Contact Content */}
        <div className="max-w-2xl mx-auto text-center mt-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground animate-fade-in-up">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up animation-delay-100">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <div className="flex justify-center animate-fade-in-up animation-delay-200">
            <EmailCopy />
          </div>
        </div>

        {/* Logo Showcase with Accordions */}
        <div className="mt-32 animate-fade-in-up animation-delay-300">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 mb-8 opacity-60">
              {customers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => toggleCustomer(customer.id)}
                  className="flex items-center gap-2 text-foreground hover:opacity-100 transition-opacity cursor-pointer"
                  aria-expanded={expandedCustomer === customer.id}
                  aria-controls={`customer-${customer.id}`}
                >
                  {customer.icon}
                  <span className="text-xl font-semibold">{customer.name}</span>
                </button>
              ))}
            </div>

            {/* Accordion Content */}
            {expandedCustomer && (
              <div
                id={`customer-${expandedCustomer}`}
                className="mt-8 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 animate-fade-in-up"
              >
                {customers.map((customer) => {
                  if (customer.id === expandedCustomer) {
                    return (
                      <div key={customer.id}>
                        <div className="flex items-center gap-3 mb-4">
                          {customer.icon && (
                            <div className="opacity-100 text-foreground">
                              {customer.icon}
                            </div>
                          )}
                          <h3 className="text-2xl font-bold text-foreground">
                            {customer.name}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mb-3 text-lg">
                          {customer.description}
                        </p>
                        <div className="border-t border-border pt-4 mt-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                            Partnership
                          </h4>
                          <p className="text-foreground leading-relaxed">
                            {customer.partnership}
                          </p>
                        </div>
                        <button
                          onClick={() => setExpandedCustomer(null)}
                          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 rotate-180" />
                          Close
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
