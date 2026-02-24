# CLAUDE.md

## Overview

Superhands is a Next.js-based marketing website for a browser-based prototyping platform. The site features an interactive landing page with email waitlist signup, video demonstration, and FAQ section. The application uses Supabase for data storage and includes Slack integration for waitlist notifications.

## Tech Stack

- **Framework**: Next.js 16.1.4 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **Database**: Supabase (PostgreSQL)
- **Form Validation**: React Hook Form + Zod
- **UI Components**: Radix UI primitives
- **Analytics**: PostHog
- **Support**: Intercom
- **Package Manager**: npm (with bun.lock present, suggesting bun compatibility)

## Project Structure

```
superhands-marketing/
├── public/                    # Static assets
│   ├── demo.mp4              # Product demo video
│   ├── logo.svg              # Brand logo
│   ├── og.png                # OpenGraph image
│   └── favicon.{svg,ico,png} # Favicons
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/
│   │   │   └── waitlist/
│   │   │       └── route.ts  # Waitlist signup endpoint
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css       # Global styles and CSS variables
│   ├── components/
│   │   ├── ui/               # Reusable UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   ├── contact-modal.tsx # Contact form modal
│   │   └── footer.tsx        # Site footer
│   ├── lib/
│   │   ├── services/
│   │   │   └── slack.ts      # Slack notification service
│   │   ├── supabase/
│   │   │   ├── client.ts     # Client-side Supabase client
│   │   │   └── server.ts     # Server-side Supabase client
│   │   └── utils.ts          # Utility functions (cn, etc.)
│   └── providers/
│       ├── posthog-provider.tsx   # Analytics provider
│       └── theme-provider.tsx     # Theme management
├── package.json
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── postcss.config.mjs        # PostCSS configuration
```

## Key Files

### Core Application Files

- **src/app/page.tsx** (1052 lines) - Main landing page with interactive components:
  - `GradientTextHero` - Mouse-tracking gradient text effect
  - `FloatingGradient` - Animated 3D gradient blob that follows mouse
  - `EmailCopy` - Copy-to-clipboard email component
  - Waitlist signup form with validation
  - Video player with custom controls
  - FAQ accordion section
  - "How It Works" section

- **src/app/layout.tsx** (93 lines) - Root layout component:
  - Metadata and SEO configuration
  - Font loading (Inter via next/font)
  - Provider setup (PostHog, Theme)
  - Intercom chat widget integration
  - Footer component

- **src/app/api/waitlist/route.ts** (48 lines) - API endpoint for waitlist signup:
  - Email validation
  - Supabase database insertion
  - Duplicate email handling
  - Slack notification integration

### Styling

- **src/app/globals.css** (194 lines) - Global styles:
  - Tailwind CSS imports
  - CSS custom properties for theming (light/dark mode)
  - Custom animations (fadeInUp, fadeIn, subtlePulse)
  - Background pattern utilities
  - Theme-specific overrides

### Configuration

- **next.config.ts** - Minimal config with custom headers (Permissions-Policy for fullscreen)
- **tsconfig.json** - Standard Next.js TypeScript config with path aliases (`@/*`)

## How to Run

### Development

```bash
npm run dev
# or
bun dev
```

Runs the development server at http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Environment Variables

The application requires the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_INTERCOM_APP_ID` - Intercom app ID (optional)
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key (optional)
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL (optional)
- `SLACK_WEBHOOK_URL` - Slack webhook for waitlist notifications (optional)

## Database Schema

The application uses a Supabase database with a `waitlist` table:
- `email` - User email (unique constraint)
- Timestamps managed by Supabase

## Features

1. **Interactive Landing Page**
   - Mouse-tracking gradient text effect
   - Animated floating gradient blob with 3D transforms
   - Responsive video player with custom controls
   - Email waitlist signup with confetti animation

2. **Dark/Light Theme**
   - System preference detection
   - URL parameter override (`?theme=dark` or `?theme=light`)
   - CSS custom properties for theming

3. **Email Waitlist**
   - Form validation with Zod
   - Duplicate email handling
   - Slack notifications
   - Redirect to app waitlist confirmation page

4. **Analytics & Support**
   - PostHog for product analytics
   - Intercom for customer support chat

## UI Components

The project uses shadcn/ui-style components built on Radix UI primitives:
- Button - src/components/ui/button.tsx
- Dialog - src/components/ui/dialog.tsx
- Input - src/components/ui/input.tsx
- Label - src/components/ui/label.tsx

All components use the `class-variance-authority` pattern for variant management and `clsx` + `tailwind-merge` for className handling.

## Deployment

The application is designed to be deployed on Vercel (Next.js creators):
- Optimized for Vercel's edge network
- Environment variables configured in Vercel dashboard
- Automatic deployments from git repository
[<u[?1004l[?2004l[?25h]9;4;0;[?25h