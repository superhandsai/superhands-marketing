"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Send } from "lucide-react";
import Link from "next/link";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Simulate form submission - replace with actual backend logic later
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, just log the data
      console.log("Contact form data:", data);

      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
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
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80"
          >
            Login
          </a>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up animation-delay-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a question or want to learn more? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 sm:p-8 animate-fade-in-up animation-delay-200">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name *
                </Label>
                <Input
                  {...form.register("name")}
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  disabled={isSubmitting}
                  aria-invalid={!!form.formState.errors.name}
                  className="h-11"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </Label>
                <Input
                  {...form.register("email")}
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  aria-invalid={!!form.formState.errors.email}
                  className="h-11"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject *
                </Label>
                <Input
                  {...form.register("subject")}
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                  aria-invalid={!!form.formState.errors.subject}
                  className="h-11"
                />
                {form.formState.errors.subject && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {form.formState.errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message *
                </Label>
                <Textarea
                  {...form.register("message")}
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  disabled={isSubmitting}
                  aria-invalid={!!form.formState.errors.message}
                  rows={6}
                  className="resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Status Message */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-destructive/10 border border-destructive/20"
                  }`}
                >
                  <p
                    className={`text-sm flex items-start gap-2 ${
                      submitStatus.type === "success"
                        ? "text-green-600 dark:text-green-400"
                        : "text-destructive"
                    }`}
                  >
                    <span className="text-base">
                      {submitStatus.type === "success" ? "✓" : "⚠️"}
                    </span>
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base bg-primary text-white font-medium rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(238,96,1,0.5)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Alternative Contact Info */}
          <div className="mt-12 text-center animate-fade-in-up animation-delay-300">
            <p className="text-sm text-muted-foreground mb-4">
              Or reach us directly at
            </p>
            <a
              href="mailto:hello@superhands.ai"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              hello@superhands.ai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
