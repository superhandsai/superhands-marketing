# Alternative Get Started Flow - Implementation Plan

## Overview
Create a modern, multi-step onboarding wizard that enhances user engagement and collects valuable context about new signups before adding them to the waitlist.

## Design Approach

### Multi-Step Wizard Flow
1. **Step 1: Welcome** - Brief introduction with animation
2. **Step 2: User Info** - Collect name and email
3. **Step 3: Context** - Gather role, team size, and use case
4. **Step 4: Confirmation** - Show summary and complete signup

### Key Features
- **Smooth Animations**: Slide transitions between steps with fade effects
- **Progress Indicator**: Visual progress bar showing current step
- **Form Validation**: Real-time validation using Zod schemas
- **Responsive Design**: Mobile-first approach with Tailwind
- **Accessible**: Keyboard navigation and ARIA labels
- **State Management**: Track progress, allow going back
- **Confetti Celebration**: On final submission

## Technical Architecture

### Component Structure
```
src/
├── components/
│   ├── onboarding/
│   │   ├── OnboardingWizard.tsx      (Main container)
│   │   ├── WelcomeStep.tsx           (Step 1)
│   │   ├── UserInfoStep.tsx          (Step 2)
│   │   ├── ContextStep.tsx           (Step 3)
│   │   ├── ConfirmationStep.tsx      (Step 4)
│   │   ├── ProgressBar.tsx           (Progress indicator)
│   │   └── StepTransition.tsx        (Animation wrapper)
│   └── ui/
│       ├── select.tsx                (New - for dropdowns)
│       └── radio-group.tsx           (New - for selections)
└── app/
    ├── api/
    │   └── onboarding/
    │       └── route.ts              (New API endpoint)
    └── get-started/
        └── page.tsx                  (New route - optional)
```

### Data Model

#### Onboarding Form Schema
```typescript
{
  // Step 2: User Info
  name: string (required, 2-50 chars)
  email: string (required, valid email)

  // Step 3: Context
  role: 'developer' | 'designer' | 'product-manager' | 'founder' | 'other'
  teamSize: '1' | '2-5' | '6-20' | '21-50' | '50+'
  useCase: 'personal-projects' | 'client-work' | 'team-collaboration' | 'learning' | 'other'
  hearAboutUs: string (optional)
}
```

#### Database Schema Update
Extend `waitlist` table or create new `onboarding_signups` table:
```sql
- id (uuid, primary key)
- email (text, unique)
- name (text)
- role (text)
- team_size (text)
- use_case (text)
- hear_about_us (text, nullable)
- created_at (timestamp)
```

### API Endpoints

#### POST /api/onboarding
- Validates complete onboarding data
- Inserts into database (Supabase)
- Sends enhanced Slack notification with all context
- Returns success/error response

## Implementation Steps

### Phase 1: Core Components
1. Create `OnboardingWizard.tsx` with state management
   - Track current step (1-4)
   - Store form data across steps
   - Handle navigation (next, back)
   - Implement slide animations

2. Build individual step components
   - `WelcomeStep.tsx`: Hero message, "Let's get started" button
   - `UserInfoStep.tsx`: Name + email form with validation
   - `ContextStep.tsx`: Role, team size, use case selectors
   - `ConfirmationStep.tsx`: Review data, submit

3. Create `ProgressBar.tsx`
   - Visual indicator (4 circles connected by lines)
   - Highlight current step
   - Show completed steps with checkmarks

4. Build `StepTransition.tsx`
   - Wrap each step for animation
   - Slide left/right on navigation
   - Fade in/out effect

### Phase 2: UI Components
5. Create `select.tsx` component
   - Radix UI Select primitive
   - Match existing design system
   - Support icons and descriptions

6. Create `radio-group.tsx` component
   - Radix UI Radio Group primitive
   - Card-style options with hover effects
   - Match existing styling

### Phase 3: Backend Integration
7. Create API route `/api/onboarding/route.ts`
   - Validate request body with Zod
   - Insert into Supabase
   - Send Slack notification
   - Handle errors gracefully

8. Update Slack notification service
   - Include additional context fields
   - Format rich message with user details

### Phase 4: Integration Options

#### Option A: Replace Current Flow (Recommended)
- Modify `src/app/page.tsx`
- Replace email form with "Get Started" button
- Open OnboardingWizard as modal/overlay
- Or navigate to `/get-started` route

#### Option B: Add as Secondary Option
- Keep current email form
- Add new button: "Complete Onboarding"
- Open wizard in modal overlay
- Both flows lead to waitlist

#### Option C: Separate Route
- Create `/get-started` page
- Add navigation link in header
- Full-page wizard experience
- Link from main page

### Phase 5: Polish & Testing
9. Add animations and transitions
   - Framer Motion or CSS transitions
   - Match existing FloatingGradient aesthetic
   - Confetti on completion

10. Implement form persistence
    - Save progress to sessionStorage
    - Resume if user refreshes
    - Clear on completion

11. Add loading states
    - Spinner during submission
    - Disable buttons appropriately
    - Show success state

12. Error handling
    - Network errors
    - Validation errors
    - Duplicate email handling

## Design Specifications

### Color Palette
- Primary: `#ee6001` (orange)
- Success: `#10b981` (green)
- Background: Use existing CSS variables
- Border: `var(--border)`

### Typography
- Headings: Bold, large (text-2xl to text-4xl)
- Body: text-base or text-lg
- Labels: text-sm, font-medium

### Spacing
- Step container: max-w-2xl, mx-auto
- Form fields: gap-6
- Buttons: h-12, px-8

### Animations
- Step transitions: 300ms ease-in-out
- Button hovers: scale-[1.02]
- Progress bar: animated fill

## User Experience Flow

### Step 1: Welcome
```
┌─────────────────────────────────┐
│   ✨ Welcome to Superhands!     │
│                                 │
│   Let's get you set up in       │
│   just a few quick steps        │
│                                 │
│   [Let's get started →]         │
└─────────────────────────────────┘
```

### Step 2: User Info
```
┌─────────────────────────────────┐
│   Tell us about yourself        │
│                                 │
│   Name:    [____________]       │
│   Email:   [____________]       │
│                                 │
│   [← Back]      [Continue →]    │
└─────────────────────────────────┘
```

### Step 3: Context
```
┌─────────────────────────────────┐
│   Help us personalize your      │
│   experience                    │
│                                 │
│   Role: [ Select... ▼ ]        │
│   Team Size: [ Select... ▼ ]   │
│   Use Case: [ Select... ▼ ]    │
│                                 │
│   [← Back]      [Continue →]    │
└─────────────────────────────────┘
```

### Step 4: Confirmation
```
┌─────────────────────────────────┐
│   🎉 You're all set!            │
│                                 │
│   Name: John Doe                │
│   Email: john@example.com       │
│   Role: Developer               │
│                                 │
│   [← Back]  [Join Waitlist →]  │
└─────────────────────────────────┘
```

## Implementation Variants

### Minimal Version (Quick Implementation)
- 2 steps instead of 4 (combine welcome + user info, context + confirmation)
- Simple forward-only navigation
- Basic fade transitions
- Inline on main page (no modal)

### Full Version (Comprehensive)
- All 4 steps with rich animations
- Modal overlay with backdrop blur
- Back/forward navigation
- Progress saving to sessionStorage
- Enhanced Slack notifications
- Analytics tracking per step

### Enhanced Version (Future)
- Conditional questions based on role
- File upload for profile picture
- Integration previews (show what they'll build)
- Personalized recommendations
- Email verification step
- Social proof (testimonials between steps)

## Success Metrics
- Completion rate vs. current simple flow
- Time to complete onboarding
- Data quality (complete profiles)
- User engagement (clicks, interactions)
- Conversion from waitlist to active user

## Technical Considerations

### Performance
- Code split wizard components
- Lazy load only when triggered
- Optimize animations for 60fps
- Minimize bundle size impact

### Accessibility
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels and roles
- Screen reader announcements
- Focus management between steps
- Skip navigation option

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Touch-friendly tap targets (min 44x44px)

### SEO
- If separate route: proper meta tags
- Schema markup for signup
- Canonical URLs

## Recommended Approach

**I recommend implementing the Full Version with Option A (Replace Current Flow):**

1. **Why**: Provides best user experience, collects valuable data, modern feel
2. **Integration**: Modal overlay on main page triggered by "Get Started" button
3. **Fallback**: Keep API backward compatible for simple email signup
4. **Timeline**: ~4-6 hours for complete implementation

This approach:
- ✅ Maximizes engagement with progressive disclosure
- ✅ Collects rich user data for personalization
- ✅ Maintains brand consistency with existing design
- ✅ Provides smooth, delightful user experience
- ✅ Easy to A/B test against simple flow
