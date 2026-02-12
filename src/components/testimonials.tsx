export function Testimonials() {
  const testimonials = [
    {
      quote: "You just have to use it and you will see, you will just feel it.",
      author: "Gabriel Peal",
      role: "OpenAI",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      bgColor: "bg-blue-100 dark:bg-blue-950/30",
      textColor: "text-gray-900 dark:text-gray-100"
    },
    {
      quote: "Our speed is intense and Linear helps us be action biased.",
      author: "Nik Koblov",
      role: "Head of Engineering, Ramp",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      ),
      bgColor: "bg-lime-300 dark:bg-lime-400",
      textColor: "text-gray-900"
    }
  ];

  return (
    <div className="w-full mt-20 animate-fade-in-up animation-delay-700">
      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
        What people are saying
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`relative ${testimonial.bgColor} ${testimonial.textColor} rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[300px] border-2 border-black/5 dark:border-white/5`}
          >
            {/* Quote */}
            <blockquote className="text-2xl sm:text-3xl font-medium leading-tight mb-8">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {testimonial.icon}
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {testimonial.author}
                </div>
                <div className="text-sm opacity-70">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-12 flex items-center justify-between max-w-6xl mx-auto text-sm text-muted-foreground">
        <p>
          Linear powers over <strong className="text-foreground">20,000</strong> product teams. From ambitious startups to major enterprises.
        </p>
        <a
          href="#"
          className="flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap ml-4"
        >
          Customer stories
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
