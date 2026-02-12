import { CaseStudy } from "@/lib/case-studies-data";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CaseStudyCard({ caseStudy, index, isExpanded, onToggle }: CaseStudyCardProps) {
  // Stagger animation delays based on index
  const animationDelay = `animation-delay-${Math.min((index % 6 + 1) * 100, 600)}`;

  return (
    <div
      className={`bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 animate-fade-in-up ${animationDelay}`}
    >
      {/* Card Header */}
      <div className="p-6">
        {/* Company & Industry */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {caseStudy.company}
            </h3>
            <p className="text-sm text-muted-foreground">
              {caseStudy.industry}
            </p>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-foreground mb-3 leading-snug">
          {caseStudy.title}
        </h4>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {caseStudy.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={onToggle}
          className="w-full px-4 py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isExpanded ? "Show less" : "Read full case study"}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Expandable Details */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 space-y-6 border-t border-border pt-6">
          {/* Challenge */}
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
              Challenge
            </h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
              Solution
            </h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>

          {/* Results */}
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Results
            </h5>
            <div className="grid grid-cols-1 gap-3">
              {caseStudy.results.map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <span className="text-sm text-muted-foreground">
                    {result.metric}
                  </span>
                  <span className="text-lg font-bold text-primary ml-2">
                    {result.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <div className="border-l-4 border-primary pl-4 py-2">
              <blockquote className="text-sm text-foreground italic leading-relaxed mb-3">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  {caseStudy.testimonial.author}
                </p>
                <p className="text-muted-foreground">
                  {caseStudy.testimonial.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
