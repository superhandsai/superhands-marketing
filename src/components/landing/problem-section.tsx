function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeBrowserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 9H2M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27977 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SadFaceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 16C16 16 14.5 14 12 14C9.5 14 8 16 8 16M17 9.24C16.605 9.725 16.065 10 15.5 10C14.935 10 14.41 9.725 14 9.24M10 9.24C9.605 9.725 9.065 10 8.5 10C7.935 10 7.41 9.725 7 9.24M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PAIN_POINTS = [
  {
    icon: EyeOffIcon,
    text: "UI changes ship before you\u2019ve seen them.",
  },
  {
    icon: CodeBrowserIcon,
    text: "You can\u2019t run the code to review the design.",
  },
  {
    icon: SadFaceIcon,
    text: "Missed reviews compound into expensive reworks.",
  },
] as const;

export function ProblemSection() {
  return (
    <section className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-20 px-6 md:px-10 pt-20 pb-20 md:pt-10 max-w-[960px] mx-auto">
      {/* Heading */}
      <h2 className="flex flex-col text-[28px] md:text-[22px] lg:text-[28px] font-semibold leading-[1.1] font-heading md:flex-1">
        <span className="text-[var(--landing-fg)]">
          Design review is broken.{" "}
        </span>
        <span className="text-[var(--landing-fg)]/50 max-w-[260px]">
          It happens too late to matter.
        </span>
      </h2>

      {/* Pain points */}
      <div className="flex flex-col gap-6 md:flex-1 pt-2">
        {PAIN_POINTS.map(({ icon: Icon, text }) => (
          <div key={text} className="group flex items-start gap-4">
            <Icon className="size-[22px] shrink-0 text-[var(--landing-fg)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6" />
            <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[266px]">
              {text}
            </p>
          </div>
        ))}
      </div>
      {/* Dotted divider */}
      <div
        className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.5,
        }}
      />
    </section>
  );
}
