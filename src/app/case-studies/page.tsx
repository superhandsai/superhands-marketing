"use client";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background overflow-hidden relative">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="Superhands"
              className="w-10 h-10 mr-3 logo-invert"
            />
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Superhands
            </h1>
          </div>
          <a
            href="/"
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80"
          >
            Back to Home
          </a>
        </div>

        {/* Page Title */}
        <div className="text-center mb-16 animate-fade-in-up animation-delay-100">
          <h2 className="text-4xl sm:text-6xl font-bold mb-4 leading-[1.1] text-foreground">
            Case Studies
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            See how teams use Superhands to ship faster and validate ideas
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="w-full h-48 bg-secondary rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Case Study {item}
              </h3>
              <p className="text-muted-foreground">
                Coming soon - Learn how this team used Superhands to accelerate their development process.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
