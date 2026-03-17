"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X, CheckCircle2 } from "lucide-react";

const demoRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  company: z.string().min(1, "Company is required"),
  message: z.string().max(2000, "Message must be under 2000 characters").optional(),
});

type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

export function DemoRequestModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    // Simulate network delay for prototype
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form and state when closing
      setTimeout(() => {
        form.reset();
        setSubmitted(false);
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Demo</DialogTitle>
          <DialogPrimitive.Close className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Thank you!
            </h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ll be in touch soon to schedule your demo.
            </p>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="demo-name">Name</Label>
              <Input
                {...form.register("name")}
                id="demo-name"
                placeholder="Your name"
                disabled={loading}
                className="!bg-secondary"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-email">Email</Label>
              <Input
                {...form.register("email")}
                id="demo-email"
                type="email"
                placeholder="you@company.com"
                disabled={loading}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="!bg-secondary"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-company">Company</Label>
              <Input
                {...form.register("company")}
                id="demo-company"
                placeholder="Your company"
                disabled={loading}
                className="!bg-secondary"
              />
              {form.formState.errors.company && (
                <p className="text-sm text-red-400">{form.formState.errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-message">
                Message <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <textarea
                {...form.register("message")}
                id="demo-message"
                placeholder="Tell us about your use case..."
                disabled={loading}
                rows={3}
                className="flex w-full rounded-md border border-input !bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
              {form.formState.errors.message && (
                <p className="text-sm text-red-400">{form.formState.errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
