export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  company: string;
  industry: string;
  description: string; // Short description for card
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  image?: string; // Optional company logo or hero image
  tags: string[]; // e.g., ["Bug Fixes", "Feature Development", "Performance"]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "shopflow-ecommerce",
    title: "Reducing Cart Abandonment by 25%",
    company: "ShopFlow",
    industry: "E-commerce",
    description: "How a product manager optimized the checkout flow without waiting for a dev sprint, resulting in $50k additional monthly revenue.",
    challenge: "ShopFlow was experiencing a 60% cart abandonment rate during checkout. Customer feedback indicated the checkout process was too slow and cumbersome, but the engineering team was backlogged for months with other priorities. Every day of delay meant lost revenue.",
    solution: "Using Superhands, the product manager was able to identify and fix the performance bottlenecks in the checkout flow without writing a single line of code. They optimized the payment form validation, reduced unnecessary API calls, and streamlined the multi-step process into a cleaner flow—all within 48 hours.",
    results: [
      {
        metric: "Cart Abandonment Reduction",
        value: "25%"
      },
      {
        metric: "Additional Monthly Revenue",
        value: "$50,000"
      },
      {
        metric: "Time to Implementation",
        value: "2 days"
      }
    ],
    testimonial: {
      quote: "Superhands let me ship the checkout improvements our customers were asking for, without waiting months for engineering bandwidth. The impact on our revenue was immediate and significant.",
      author: "Sarah Chen",
      role: "Head of Product at ShopFlow"
    },
    tags: ["Performance", "Bug Fixes", "Conversion Optimization"]
  },
  {
    id: "2",
    slug: "taskmaster-dark-mode",
    title: "Shipping Dark Mode in 2 Days",
    company: "TaskMaster Pro",
    industry: "Project Management SaaS",
    description: "A product manager implemented the most-requested feature without touching the dev backlog, increasing user satisfaction by 40%.",
    challenge: "For over 8 months, TaskMaster Pro users had been requesting dark mode. It was the #1 feature request with hundreds of upvotes, but it kept getting deprioritized as the engineering team focused on backend infrastructure and new integrations. User satisfaction scores were declining, and competitors were gaining ground.",
    solution: "The product manager used Superhands to implement a comprehensive dark mode theme system. They updated the color palette, adjusted component styles for proper contrast, and added a theme toggle in user settings. The entire feature was built, tested, and deployed without requiring any engineering time.",
    results: [
      {
        metric: "User Satisfaction Increase",
        value: "40%"
      },
      {
        metric: "Support Tickets Reduced",
        value: "30%"
      },
      {
        metric: "Implementation Time",
        value: "2 days"
      }
    ],
    testimonial: {
      quote: "Our users had been asking for dark mode for months. With Superhands, I was able to ship it myself in just two days. The response from our community was incredible—we saw an immediate spike in positive reviews.",
      author: "Michael Rodriguez",
      role: "Product Manager at TaskMaster Pro"
    },
    tags: ["Feature Development", "User Experience", "Design"]
  },
  {
    id: "3",
    slug: "healthtrack-critical-fix",
    title: "Fixing a Critical Bug in Minutes",
    company: "HealthTrack",
    industry: "Healthcare Technology",
    description: "A non-technical team member resolved a critical appointment scheduling bug instantly, preventing the loss of 100+ patient appointments.",
    challenge: "A critical bug in HealthTrack's appointment scheduling system was preventing patients from booking appointments during peak hours. The issue surfaced on a Friday evening when the engineering team was offline. With over 100 patients attempting to book appointments for the following week, the business was at risk of significant revenue loss and patient dissatisfaction.",
    solution: "A customer success manager, with no prior coding experience, used Superhands to identify and fix the bug. The AI-assisted interface helped them locate the problematic date validation logic and correct it. The fix was deployed within 20 minutes, and the appointment system was back online before most patients even noticed an issue.",
    results: [
      {
        metric: "System Downtime",
        value: "20 minutes"
      },
      {
        metric: "Appointments Saved",
        value: "100+"
      },
      {
        metric: "Revenue Protected",
        value: "$15,000"
      }
    ],
    testimonial: {
      quote: "I'm not an engineer, but Superhands made it possible for me to fix a critical bug that could have cost us thousands of dollars and damaged patient trust. It's empowering to be able to solve problems immediately instead of waiting for the dev team.",
      author: "Lisa Thompson",
      role: "Customer Success Lead at HealthTrack"
    },
    tags: ["Bug Fixes", "Critical Issues", "Fast Resolution"]
  },
  {
    id: "4",
    slug: "finwise-mobile-optimization",
    title: "Mobile Optimization That Increased Conversions by 35%",
    company: "FinWise",
    industry: "Financial Services",
    description: "A designer identified and fixed mobile UX issues independently, dramatically improving conversion rates on mobile devices.",
    challenge: "FinWise noticed that while 65% of their traffic came from mobile devices, mobile conversions were 50% lower than desktop. User research revealed several UX issues with the mobile signup flow, including tiny buttons, hard-to-read text, and a confusing navigation structure. The design team had detailed mockups ready, but implementation was stuck in the development queue.",
    solution: "The lead designer used Superhands to implement the mobile optimizations directly. They adjusted button sizes for better touch targets, improved typography for mobile readability, simplified the navigation, and optimized form inputs for mobile keyboards. The changes went live within a week, compared to the estimated 6-week timeline through traditional development.",
    results: [
      {
        metric: "Mobile Conversion Increase",
        value: "35%"
      },
      {
        metric: "Mobile User Satisfaction",
        value: "+45%"
      },
      {
        metric: "Time to Launch",
        value: "5 days"
      }
    ],
    testimonial: {
      quote: "Being able to implement my own designs without waiting for engineering was a game-changer. I could iterate quickly based on user feedback and see the impact immediately. Our mobile experience is now on par with our desktop, and the conversion numbers prove it.",
      author: "Alex Kumar",
      role: "Lead Designer at FinWise"
    },
    tags: ["Mobile", "User Experience", "Design", "Conversion Optimization"]
  },
  {
    id: "5",
    slug: "educonnect-accessibility",
    title: "Making Education Accessible for All Students",
    company: "EduConnect",
    industry: "Education Technology",
    description: "An accessibility advocate improved WCAG compliance and made the platform usable for students with disabilities, expanding market reach by 20%.",
    challenge: "EduConnect was losing potential school district contracts because their platform didn't meet WCAG 2.1 AA accessibility standards. Students with visual impairments, motor disabilities, and other accessibility needs couldn't effectively use the platform. Multiple large school districts had rejected the platform specifically due to accessibility concerns, representing millions in lost revenue.",
    solution: "A non-technical team member who was passionate about accessibility used Superhands to systematically improve the platform's accessibility. They added proper ARIA labels, improved keyboard navigation, fixed color contrast issues, added alt text to images, and made forms screen-reader friendly. The entire accessibility overhaul was completed in two weeks.",
    results: [
      {
        metric: "WCAG Compliance",
        value: "AA Standard"
      },
      {
        metric: "Market Reach Expansion",
        value: "+20%"
      },
      {
        metric: "School District Contracts Won",
        value: "3 major"
      }
    ],
    testimonial: {
      quote: "As someone who's passionate about accessibility but not a developer, Superhands gave me the tools to make our platform truly inclusive. We're now serving students with disabilities who previously couldn't use our product, and we've won several contracts we would have lost otherwise.",
      author: "Jordan Williams",
      role: "Accessibility Advocate at EduConnect"
    },
    tags: ["Accessibility", "Compliance", "User Experience", "Inclusion"]
  }
];
