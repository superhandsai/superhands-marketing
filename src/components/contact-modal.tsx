"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, Mail } from "lucide-react";

export function ContactModal({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Get in touch with the Superhands team
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Email Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm text-foreground font-mono">
                {email}
              </div>
              <Button
                type="button"
                size="sm"
                onClick={copyToClipboard}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
