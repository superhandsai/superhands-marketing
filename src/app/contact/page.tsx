"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check, Copy, ArrowLeft } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message must be under 2000 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "hello@superhands.ai";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // For now, open the user's mail client with prefilled info
    const subject = encodeURIComponent(`Contact from ${data.name}`);
    const body = encodeURIComponent(data.message);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 animate-fade-in-up">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Superhands"
                className="w-10 h-10 mr-3 logo-invert"
              />
              <h1 className="text-xl font-semibold text-foreground tracking-tight">
                Superhands
              </h1>
            </Link>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in-up animation-delay-100">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have a question or want to learn more? We'd love to hear from you.
          </p>
        </div>

        {/* Email Quick Copy */}
        <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-200">
          <button
            onClick={copyToClipboard}
            className={`inline-flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm border rounded-xl transition-all cursor-pointer ${
              copied
                ? "border-green-500/50"
                : "border-border hover:border-primary/50"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-base text-green-500 font-medium">
                  Copied to clipboard!
                </span>
              </>
            ) : (
              <>
                <span className="text-base text-foreground font-medium">
                  {email}
                </span>
                <Copy className="w-4 h-4 text-muted-foreground" />
              </>
            )}
          </button>
        </div>

        {/* Contact Form */}
        <div className="max-w-md mx-auto animate-fade-in-up animation-delay-300">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Thanks for reaching out!
              </h3>
              <p className="text-muted-foreground">
                Your email client should have opened with your message. If not,
                feel free to email us directly at{" "}
                <span className="text-foreground font-medium">{email}</span>.
              </p>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div>
                <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Name
                </Label>
                <Input
                  {...form.register("name")}
                  id="name"
                  placeholder="Your name"
                  disabled={loading}
                  className="!bg-secondary h-12 px-4 rounded-[8px] text-base ring-0 focus-visible:ring-0 border border-border focus:border-foreground transition-colors"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="contact-email"
                  className="text-sm font-medium mb-2 block"
                >
                  Email
                </Label>
                <Input
                  {...form.register("email")}
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={loading}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="!bg-secondary h-12 px-4 rounded-[8px] text-base ring-0 focus-visible:ring-0 border border-border focus:border-foreground transition-colors"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="text-sm font-medium mb-2 block"
                >
                  Message
                </Label>
                <textarea
                  {...form.register("message")}
                  id="message"
                  placeholder="How can we help?"
                  disabled={loading}
                  rows={5}
                  className="flex w-full !bg-secondary px-4 py-3 rounded-[8px] text-base ring-0 focus-visible:ring-0 focus-visible:outline-none border border-border focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base bg-primary text-primary-foreground font-medium rounded-[8px] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
