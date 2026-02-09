"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, X } from "lucide-react";

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
          <DialogTitle>Email Us</DialogTitle>
          <DialogPrimitive.Close className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm text-foreground">
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
      </DialogContent>
    </Dialog>
  );
}
