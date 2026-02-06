# Multi-Step Onboarding Wizard - Implementation Plan

## Executive Summary

This plan outlines the implementation of a **3-step onboarding wizard** to replace the current single-field email form. The wizard will collect richer user data (name, role, company, use case, team size) while maintaining the brand's aesthetics and smooth user experience through progressive disclosure.

**Target Implementation Time:** 5 days
**Recommended Approach:** Replace current email form (Option A)

---

## 1. Step Structure & User Journey

### Step 1: Identity (Essential - Required Fields)
**Purpose:** Minimal friction entry point, personalization foundation

**Fields:**
- `name` (text, required) - "What should we call you?"
- `email` (email, required) - "Your email address"

**Validation:**
```typescript
z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email")
})
```

### Step 2: Professional Context (Optional)
**Purpose:** User segmentation and targeted communication

**Fields:**
- `role` (select, optional) - "What best describes your role?"
  - Developer
  - Designer
  - Product Manager
  - Founder/Entrepreneur
  - Student
  - Other
- `company` (text, optional) - "Company or project name (optional)"

**Validation:**
```typescript
z.object({
  role: z.string().optional(),
  company: z.string().max(100).optional()
})
```

### Step 3: Intent & Scale (Optional)
**Purpose:** Understanding use case and potential conversion value

**Fields:**
- `useCase` (radio, optional) - "What will you primarily use Superhands for?"
  - Personal projects
  - Client work
  - Internal tools
  - Learning/Education
  - Startup MVP
- `teamSize` (select, optional) - "Team size (optional)"
  - Just me
  - 2-5 people
  - 6-20 people
  - 21-50 people
  - 51+ people

**Validation:**
```typescript
z.object({
  useCase: z.string().optional(),
  teamSize: z.string().optional()
})
```

---

## 2. Component Architecture

### New Components to Create

```
src/
├── components/
│   ├── onboarding-wizard.tsx                 # Main wizard container with form state
│   ├── onboarding-wizard/
│   │   ├── step-indicator.tsx               # Progress bar (1/3, 2/3, 3/3)
│   │   ├── step-container.tsx               # Wrapper with fadeInUp animation
│   │   └── steps/
│   │       ├── step-one.tsx                 # Name + Email
│   │       ├── step-two.tsx                 # Role + Company
│   │       └── step-three.tsx               # Use Case + Team Size
│   └── ui/
│       ├── select.tsx                       # New: Radix-based select (CVA styled)
│       └── radio-group.tsx                  # New: Radix-based radio (CVA styled)
├── lib/
│   └── schemas/
│       └── onboarding.ts                    # Zod validation schemas
```

### Component Hierarchy

```
OnboardingWizard (main container)
├── StepIndicator (progress visual)
├── form (react-hook-form context)
│   └── StepContainer (animated wrapper)
│       ├── StepOne (currentStep === 1)
│       ├── StepTwo (currentStep === 2)
│       └── StepThree (currentStep === 3)
├── Navigation Buttons
│   ├── Back Button (hidden on step 1)
│   └── Next/Submit Button (text changes on step 3)
└── Error Display (API errors)
```

---

## 3. State Management Strategy

### Form State (react-hook-form)

Single `useForm` instance managing all steps:

```typescript
const formSchema = z.object({
  // Step 1 - Required
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),

  // Step 2 - Optional
  role: z.string().optional(),
  company: z.string().max(100).optional(),

  // Step 3 - Optional
  useCase: z.string().optional(),
  teamSize: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  mode: "onBlur",
  defaultValues: {
    name: "",
    email: "",
    role: undefined,
    company: "",
    useCase: undefined,
    teamSize: undefined,
  },
});
```

### Step Navigation

```typescript
const [currentStep, setCurrentStep] = useState(1);
const [isSubmitting, setIsSubmitting] = useState(false);
const totalSteps = 3;

// Map steps to their fields for validation
const stepFields = {
  1: ["name", "email"] as const,
  2: ["role", "company"] as const,
  3: ["useCase", "teamSize"] as const,
};

// Validate current step before advancing
const validateStep = async (step: number) => {
  const fields = stepFields[step];
  return await form.trigger(fields);
};

const handleNext = async () => {
  const isValid = await validateStep(currentStep);
  if (isValid) {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  }
};

const handleBack = () => {
  setCurrentStep(prev => Math.max(prev - 1, 1));
};
```

---

## 4. Animation Strategy

### Step Transitions

Leverage existing `animate-fade-in-up` class with key-based remounting:

```tsx
<StepContainer key={currentStep}>
  {currentStep === 1 && <StepOne form={form} />}
  {currentStep === 2 && <StepTwo form={form} />}
  {currentStep === 3 && <StepThree form={form} />}
</StepContainer>
```

```tsx
// StepContainer component
const StepContainer = ({ children }: { children: ReactNode }) => (
  <div className="animate-fade-in-up">
    {children}
  </div>
);
```

### Progress Bar Animation

Add to `globals.css`:

```css
@keyframes progressFill {
  from { width: 0%; }
  to { width: var(--progress-width); }
}

.progress-fill {
  animation: progressFill 0.4s ease-out forwards;
}
```

### Submit Button Interaction

Reuse existing confetti pattern on final step button hover.

---

## 5. Backend Changes

### 5.1 Database Schema Migration

Add columns to Supabase `waitlist` table:

```sql
-- Migration: Add onboarding wizard fields
ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS role VARCHAR(100),
  ADD COLUMN IF NOT EXISTS company VARCHAR(255),
  ADD COLUMN IF NOT EXISTS use_case VARCHAR(100),
  ADD COLUMN IF NOT EXISTS team_size VARCHAR(50),
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_waitlist_role ON waitlist(role);
CREATE INDEX IF NOT EXISTS idx_waitlist_use_case ON waitlist(use_case);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
```

**Note:** Existing records will have NULL values for new fields (backward compatible).

### 5.2 API Route Updates

**File:** `/src/app/api/waitlist/route.ts`

**Changes:**
- Extend request schema to accept new fields
- Update Supabase insert to include all fields
- Maintain duplicate email handling behavior

```typescript
const requestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  useCase: z.string().optional(),
  teamSize: z.string().optional(),
});

// In POST handler
const { error: insertError } = await supabase
  .from("waitlist")
  .insert({
    email: validatedData.email,
    name: validatedData.name,
    role: validatedData.role,
    company: validatedData.company,
    use_case: validatedData.useCase,
    team_size: validatedData.teamSize,
    created_at: new Date().toISOString(),
  });
```

### 5.3 Slack Notification Enhancement

**File:** `/src/lib/services/slack.ts`

Update `notifyWaitlistSignup` to include new fields in rich message format:

```typescript
export async function notifyWaitlistSignup(data: {
  email: string;
  name?: string;
  role?: string;
  company?: string;
  useCase?: string;
  teamSize?: string;
}): Promise<boolean> {
  return sendSlackNotification({
    text: `New waitlist signup: ${data.name || data.email}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🎉 New Waitlist Signup",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${data.name || "Not provided"}` },
          { type: "mrkdwn", text: `*Email:*\n${data.email}` },
          { type: "mrkdwn", text: `*Role:*\n${data.role || "Not provided"}` },
          { type: "mrkdwn", text: `*Company:*\n${data.company || "Not provided"}` },
          { type: "mrkdwn", text: `*Use Case:*\n${data.useCase || "Not provided"}` },
          { type: "mrkdwn", text: `*Team Size:*\n${data.teamSize || "Not provided"}` },
        ],
      },
    ],
  });
}
```

---

## 6. Integration into Landing Page

### Option A: Replace Current Form (Recommended)

**File:** `/src/app/page.tsx`

**Replace:** Current email form section (approximately lines 598-703)

**With:**
```tsx
<div className="flex justify-center mb-16 animate-fade-in-up animation-delay-300">
  <OnboardingWizard />
</div>
```

**Rationale:**
- Simpler user journey (one clear path)
- All users provide richer data
- Cleaner UI
- 3-step wizard with optional fields still maintains reasonable conversion

### Option B: Secondary Button (Alternative)

Keep current email form, add optional wizard access:

```tsx
{/* Existing email form */}
<div className="flex justify-center mb-4 animate-fade-in-up animation-delay-300">
  {/* Current form code */}
</div>

{/* New: Alternative wizard button */}
<div className="text-center mb-16">
  <button
    onClick={() => setShowWizard(true)}
    className="text-sm text-muted-foreground hover:text-primary transition-colors"
  >
    Or tell us more about yourself →
  </button>
</div>

{/* Modal/Drawer with wizard */}
{showWizard && (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
    <div className="container mx-auto px-4 py-8">
      <OnboardingWizard onClose={() => setShowWizard(false)} />
    </div>
  </div>
)}
```

**Note:** Recommend starting with Option A for simplicity.

---

## 7. Analytics & Tracking

### PostHog Events

```typescript
// Import in onboarding-wizard.tsx
import { usePostHog } from 'posthog-js/react';

// Track key events:
posthog.capture('onboarding_wizard_started');

posthog.capture('onboarding_step_completed', {
  step: currentStep,
  step_name: getStepName(currentStep),
});

posthog.capture('onboarding_step_validation_failed', {
  step: currentStep,
});

posthog.capture('onboarding_step_back', {
  from_step: currentStep,
});

posthog.capture('onboarding_wizard_completed', {
  role: data.role,
  useCase: data.useCase,
  teamSize: data.teamSize,
  completed_all_optional: !!(data.role && data.useCase && data.teamSize),
});

posthog.capture('onboarding_wizard_abandoned', {
  last_step: currentStep,
});
```

### Funnel Setup

Create PostHog funnel:
1. `onboarding_wizard_started`
2. `onboarding_step_completed` (step: 1)
3. `onboarding_step_completed` (step: 2)
4. `onboarding_step_completed` (step: 3)
5. `onboarding_wizard_completed`

**Target Metrics:**
- Overall completion rate: >60%
- Step 1 completion: >90%
- Step 2 completion: >75%
- Step 3 completion: >65%

---

## 8. Responsive Design

### Mobile Optimization

**Layout:**
- Stack all inputs vertically
- Increase touch targets (min 44x44px)
- Fixed "Next" button position on mobile (always visible)
- Use native select dropdowns on mobile for better UX

**Typography:**
- `fontSize: "16px"` on inputs to prevent iOS zoom on focus

**Step Indicator:**
- Full labels on desktop
- Simple dots on mobile

### Breakpoints

```tsx
<div className="w-full max-w-md md:max-w-lg">
  {/* Wizard content */}
</div>

{/* Step indicator - responsive variants */}
<div className="hidden md:flex">
  {/* Detailed progress with labels */}
</div>
<div className="flex md:hidden">
  {/* Simple dot indicators */}
</div>
```

---

## 9. Error Handling

### Validation Errors

- **Per-field:** Display below input with error icon (existing pattern)
- **Step-level:** Prevent advancing until resolved
- **API errors:** Display at top of wizard with retry button

### Network Issues

```typescript
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  setError(null);

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || "Submission failed");
    }

    // Success
    sessionStorage.setItem("waitlist_email", data.email);
    sessionStorage.setItem("waitlist_name", data.name || "");
    window.location.href = "https://app.superhands.ai/waitlist";

  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === 'TimeoutError') {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError(err.message);
      }
    }
  } finally {
    setIsSubmitting(false);
  }
};
```

### Progress Persistence

Save form state to sessionStorage to handle browser back button:

```typescript
// Save on step change
useEffect(() => {
  sessionStorage.setItem('onboarding_step', currentStep.toString());
  sessionStorage.setItem('onboarding_data', JSON.stringify(form.getValues()));
}, [currentStep]);

// Restore on mount
useEffect(() => {
  const savedStep = sessionStorage.getItem('onboarding_step');
  const savedData = sessionStorage.getItem('onboarding_data');

  if (savedStep && savedData) {
    setCurrentStep(parseInt(savedStep));
    form.reset(JSON.parse(savedData));
  }
}, []);
```

---

## 10. Accessibility

### ARIA Labels

```tsx
<div
  role="progressbar"
  aria-valuenow={currentStep}
  aria-valuemin={1}
  aria-valuemax={3}
  aria-label={`Step ${currentStep} of ${totalSteps}`}
>
  {/* Progress indicator */}
</div>

<form aria-label="Onboarding wizard">
  {/* Form fields */}
</form>
```

### Focus Management

```typescript
// Focus first input when step changes
useEffect(() => {
  const firstInput = document.querySelector(
    `[data-step="${currentStep}"] input, [data-step="${currentStep}"] select`
  );
  if (firstInput instanceof HTMLElement) {
    firstInput.focus();
  }
}, [currentStep]);
```

### Screen Reader Announcements

```tsx
<div aria-live="polite" aria-atomic="true" className="sr-only">
  Step {currentStep} of {totalSteps}: {getStepDescription(currentStep)}
</div>
```

### Keyboard Navigation

- Tab order follows visual flow
- Enter key advances to next step (if valid)
- Arrow keys navigate radio groups
- Escape key clears error messages

---

## 11. Implementation Sequence

### Phase 1: Foundation (Day 1)
1. ✅ Run database migration (add columns to waitlist table)
2. ✅ Create Zod schemas in `/lib/schemas/onboarding.ts`
3. ✅ Create base UI components:
   - `/components/ui/select.tsx` (Radix-based, CVA styled)
   - `/components/ui/radio-group.tsx` (Radix-based, CVA styled)
4. ✅ Test database changes with sample data

### Phase 2: Wizard Components (Day 2)
5. ✅ Create `/components/onboarding-wizard/step-container.tsx`
6. ✅ Create `/components/onboarding-wizard/step-indicator.tsx`
7. ✅ Create individual step components:
   - `/components/onboarding-wizard/steps/step-one.tsx`
   - `/components/onboarding-wizard/steps/step-two.tsx`
   - `/components/onboarding-wizard/steps/step-three.tsx`
8. ✅ Test each step in isolation (Storybook or manual)

### Phase 3: Integration & Logic (Day 3)
9. ✅ Create main `/components/onboarding-wizard.tsx`
   - Form state management (react-hook-form)
   - Step navigation logic
   - Validation handling
10. ✅ Update `/src/app/api/waitlist/route.ts`
    - Extend request schema
    - Update Supabase insert
11. ✅ Update `/src/lib/services/slack.ts`
    - Enhanced notification format
12. ✅ Test end-to-end flow in development

### Phase 4: Page Integration (Day 4)
13. ✅ Integrate wizard into `/src/app/page.tsx` (Option A or B)
14. ✅ Add PostHog tracking events
15. ✅ Add CSS animations to `/src/app/globals.css`
16. ✅ Test responsive behavior (mobile/tablet/desktop)

### Phase 5: Polish & Testing (Day 5)
17. ✅ Add loading states and error handling
18. ✅ Implement progress persistence (sessionStorage)
19. ✅ Test keyboard navigation and accessibility
20. ✅ Conduct user testing with 5-10 people
21. ✅ Deploy behind feature flag for gradual rollout

---

## 12. Success Metrics

### Week 1: Completion Rates
- Wizard completion rate: **>60%**
- Step 1 completion: **>90%**
- Step 2 completion: **>75%**
- Step 3 completion: **>65%**
- Average time to complete: **<90 seconds**

### Month 1: Data Quality
- % users filling optional fields: **>40%**
- Role distribution (validate segmentation)
- Use case distribution (validate PMF)
- Duplicate email rate (should not increase)

### Month 2-3: Business Impact
- Activation rate (vs. email-only signups)
- Retention at 7/30 days
- Conversion to paid (if applicable)
- Support ticket volume (should decrease)

---

## 13. Rollout Strategy

### Phase 1: Internal Testing (Week 1)
- Deploy behind feature flag
- Test with team (5-10 people)
- Fix critical bugs

### Phase 2: Beta (Week 2)
- Enable for 10% of traffic (A/B test)
- Monitor analytics closely
- Collect feedback (exit survey)

### Phase 3: Gradual Rollout (Weeks 3-4)
- 25% → 50% → 75% → 100%
- Monitor conversion rates at each stage
- Iterate based on drop-off points

### Rollback Plan
- Keep old email form code for 30 days
- Instant revert via feature flag
- Database schema supports both (nullable columns)

---

## 14. Testing Checklist

### Manual Testing

**Step 1:**
- [ ] Empty name shows error
- [ ] Invalid email shows error
- [ ] Valid data allows advancing
- [ ] Back button disabled on step 1

**Step 2:**
- [ ] Can skip role selection
- [ ] Company field accepts text
- [ ] Back button returns to step 1 with data preserved

**Step 3:**
- [ ] Radio buttons work correctly
- [ ] Team size dropdown functions
- [ ] Submit button shows confetti on hover
- [ ] Submit disabled while loading

**Error Scenarios:**
- [ ] Network error shows retry option
- [ ] Duplicate email handled gracefully
- [ ] Timeout shows clear message
- [ ] Form validation prevents invalid submission

**Responsive:**
- [ ] Mobile layout stacks correctly
- [ ] Touch targets adequate size (44x44px min)
- [ ] Native inputs on mobile
- [ ] Keyboard navigation works

**Browser Compatibility:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] iOS Safari
- [ ] Android Chrome

**Analytics:**
- [ ] All PostHog events firing
- [ ] Funnel data populating
- [ ] No PII leaking to analytics

---

## 15. Trade-offs & Recommendations

### Conversion vs. Data Quality

**Trade-off:** More steps = potential lower conversion rate

**Mitigation:**
- Steps 2-3 are optional (reduce friction)
- Clear progress indicator (manage expectations)
- Smooth animations (feel seamless)
- A/B test to measure impact

**Acceptable threshold:** 5-15% conversion decrease OK if remaining users are higher quality leads with better activation rates.

### Complexity vs. Maintainability

**Trade-off:** Multi-step form more complex than single input

**Mitigation:**
- Strong TypeScript typing
- Modular component structure
- Clear separation of concerns
- Comprehensive testing strategy

### Mobile Experience

**Trade-off:** More fields = harder on mobile

**Mitigation:**
- Optimized mobile layout
- Native inputs where possible
- Large touch targets
- Progress saving (resume capability)

---

## 16. Future Enhancements (Post-Launch)

1. **Conditional logic:** Show different questions based on role
2. **Personalized success:** "Thanks, [Name]! As a [Role], here's what to expect..."
3. **Email verification:** Send code to verify email in step 1
4. **Social auth:** "Sign up with Google" option
5. **Progress recovery:** Email link to resume incomplete wizard
6. **Multi-language:** i18n for international users
7. **Video previews:** Show relevant demos based on use case
8. **Referral tracking:** Capture UTM parameters

---

## 17. Critical Files Reference

### Files to Modify
1. `/src/app/page.tsx` - Integrate wizard (replace email form)
2. `/src/app/api/waitlist/route.ts` - Extend API to accept new fields
3. `/src/lib/services/slack.ts` - Enhance notification format
4. `/src/app/globals.css` - Add progress bar animation

### Files to Create
5. `/src/components/onboarding-wizard.tsx` - Main wizard component
6. `/src/components/onboarding-wizard/step-indicator.tsx` - Progress bar
7. `/src/components/onboarding-wizard/step-container.tsx` - Animation wrapper
8. `/src/components/onboarding-wizard/steps/step-one.tsx` - Name + Email
9. `/src/components/onboarding-wizard/steps/step-two.tsx` - Role + Company
10. `/src/components/onboarding-wizard/steps/step-three.tsx` - Use Case + Team Size
11. `/src/components/ui/select.tsx` - New Radix select component
12. `/src/components/ui/radio-group.tsx` - New Radix radio component
13. `/src/lib/schemas/onboarding.ts` - Zod validation schemas

### Database Migration
14. Run SQL migration to add columns to Supabase `waitlist` table

---

## Conclusion

This implementation plan provides a comprehensive, battle-tested approach to building a multi-step onboarding wizard that:

✅ Collects richer user data for segmentation
✅ Maintains brand aesthetics and smooth animations
✅ Works responsively across all devices
✅ Includes robust error handling and accessibility
✅ Tracks analytics for optimization
✅ Can be rolled out gradually with A/B testing

**Recommendation:** Proceed with Option A (replace current email form) for simplicity and consistency. The 3-step wizard with optional fields in steps 2-3 strikes a good balance between data collection and conversion optimization.

**Estimated completion:** 5 days for full implementation and testing.