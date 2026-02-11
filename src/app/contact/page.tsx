"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "An error occurred");
      }

      setSuccess(true);
      form.reset();
      setFocusedField(null);
      setHoveredField(null);
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

  const getFieldStyle = (fieldName: string, hasValue: boolean, hasError: boolean) => ({
    border: hasError
      ? "1px solid #EF4444"
      : focusedField === fieldName
        ? "1px solid #ee6001"
        : "1px solid var(--input-border)",
    color:
      focusedField === fieldName || hasValue
        ? "var(--foreground)"
        : hoveredField === fieldName
          ? "#D1D5DB"
          : "#9CA3AF",
    fontSize: "16px",
  });

  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
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
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
          >
            Login
          </a>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground animate-fade-in-up animation-delay-100">
              Get in Touch
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
              Have a question or want to learn more? We'd love to hear from you.
            </p>
          </div>

          <div className="animate-fade-in-up animation-delay-300">
            {success && (
              <div className="mb-6 p-4 bg-green-900/20 rounded-md border border-green-500/50">
                <p className="text-sm text-foreground">
                  ✓ Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

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

            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Name Field */}
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground block mb-2"
                >
                  Name
                </Label>
                <Input
                  {...form.register("name", {
                    onBlur: () => setFocusedField(null),
                  })}
                  id="name"
                  type="text"
                  placeholder="Your name"
                  disabled={loading}
                  autoComplete="name"
                  className="!bg-secondary h-12 transition-all duration-200 cursor-text selection:!bg-orange-500 selection:!text-white px-4 rounded-[8px] text-base ring-0 focus-visible:ring-0 border-0 !opacity-100 w-full"
                  style={getFieldStyle("name", !!form.watch("name"), !!form.formState.errors.name)}
                  onFocus={() => setFocusedField("name")}
                  onMouseEnter={() => setHoveredField("name")}
                  onMouseLeave={() => setHoveredField(null)}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground block mb-2"
                >
                  Email
                </Label>
                <Input
                  {...form.register("email", {
                    onBlur: () => setFocusedField(null),
                  })}
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  disabled={loading}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="!bg-secondary h-12 transition-all duration-200 cursor-text selection:!bg-orange-500 selection:!text-white px-4 rounded-[8px] text-base ring-0 focus-visible:ring-0 border-0 !opacity-100 w-full"
                  style={getFieldStyle("email", !!form.watch("email"), !!form.formState.errors.email)}
                  onFocus={() => setFocusedField("email")}
                  onMouseEnter={() => setHoveredField("email")}
                  onMouseLeave={() => setHoveredField(null)}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground block mb-2"
                >
                  Message
                </Label>
                <Textarea
                  {...form.register("message", {
                    onBlur: () => setFocusedField(null),
                  })}
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  disabled={loading}
                  className="!bg-secondary transition-all duration-200 cursor-text selection:!bg-orange-500 selection:!text-white px-4 rounded-[8px] text-base ring-0 focus-visible:ring-0 border-0 !opacity-100 w-full"
                  style={getFieldStyle("message", !!form.watch("message"), !!form.formState.errors.message)}
                  onFocus={() => setFocusedField("message")}
                  onMouseEnter={() => setHoveredField("message")}
                  onMouseLeave={() => setHoveredField(null)}
                  rows={6}
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-medium rounded-md transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
