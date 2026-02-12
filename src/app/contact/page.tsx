"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, MessageSquare, User } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);

    // Simulate form submission (no backend logic)
    try {
      // In a real implementation, you would send this to an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Contact form submission:", data);
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-4xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
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
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80"
          >
            Login
          </a>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in-up animation-delay-100">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                  <MessageSquare className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="cursor-pointer"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    <User className="w-4 h-4" />
                    Name
                  </Label>
                  <Input
                    {...form.register("name")}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    disabled={loading}
                    className="h-12 text-base"
                    aria-invalid={!!form.formState.errors.name}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    {...form.register("email")}
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    disabled={loading}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="h-12 text-base"
                    aria-invalid={!!form.formState.errors.email}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Label>
                  <textarea
                    {...form.register("message")}
                    id="message"
                    placeholder="Tell us what's on your mind..."
                    disabled={loading}
                    rows={6}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    aria-invalid={!!form.formState.errors.message}
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Additional Contact Info */}
          <div className="mt-12 text-center animate-fade-in-up animation-delay-300">
            <p className="text-muted-foreground mb-4">
              Or reach us directly at
            </p>
            <a
              href="mailto:hello@superhands.ai"
              className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="w-5 h-5" />
              hello@superhands.ai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
