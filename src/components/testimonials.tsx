export function Testimonials() {
  const testimonials = [
    {
      quote: "You just have to use it and you will see, you will just feel it.",
      author: "Gabriel Peal",
      role: "OpenAI",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 4L8 10v8c0 7.4 5.1 14.3 12 16 6.9-1.7 12-8.6 12-16v-8L20 4zm0 3.2l9 4.5v6.3c0 5.9-4.1 11.4-9 12.8-4.9-1.4-9-6.9-9-12.8v-6.3l9-4.5z" />
        </svg>
      ),
      bgColor: "bg-[#e8e9f7]",
      textColor: "text-[#18181b]"
    },
    {
      quote: "Our speed is intense and Linear helps us be action biased.",
      author: "Nik Koblov",
      role: "Head of Engineering, Ramp",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="currentColor">
          <path d="M30 12l-8-8-8 8h5v12h-5l8 8 8-8h-5V12h5z" />
          <path d="M20 4L8 10v8c0 7.4 5.1 14.3 12 16 6.9-1.7 12-8.6 12-16v-8L20 4z" opacity="0.3" />
        </svg>
      ),
      bgColor: "bg-[#d8f05e]",
      textColor: "text-[#18181b]"
    }
  ];

  return (
    <div className="w-full mt-24 animate-fade-in-up animation-delay-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto mb-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`relative ${testimonial.bgColor} ${testimonial.textColor} rounded-[20px] px-8 py-10 sm:px-12 sm:py-14 flex flex-col justify-between min-h-[380px]`}
            style={{
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Quote */}
            <blockquote className="text-[28px] sm:text-[32px] leading-[1.2] font-normal mb-auto pb-16">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 opacity-80">
                {testimonial.icon}
              </div>
              <div>
                <div className="font-medium text-[17px] leading-tight">
                  {testimonial.author}
                </div>
                <div className="text-[15px] opacity-60 mt-0.5">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-7xl mx-auto text-[15px] text-muted-foreground gap-4">
        <p className="leading-relaxed">
          Superhands powers over <strong className="text-foreground font-medium">20,000</strong> product teams. From ambitious startups to major enterprises.
        </p>
        <a
          href="#"
          className="flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap group"
        >
          Customer stories
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
