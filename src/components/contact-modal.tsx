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
          <div className="relative flex items-center bg-secondary rounded-lg pr-2 pl-3 py-2">
            <div className="flex-1 text-sm text-foreground pr-2">
              {email}
            </div>
            <Button
              type="button"
              size="sm"
              onClick={copyToClipboard}
              className="flex-shrink-0 bg-primary hover:bg-primary/90 text-white h-7 text-xs rounded-md"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
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
