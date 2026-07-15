import "./landing.css";
import { HomeHeroHeader } from "@/components/landing/home-hero-header";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <div data-landing className="relative min-h-screen font-body">
      <div className="mx-auto flex min-h-screen w-full max-w-[960px] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 md:px-10">
          <HomeHeroHeader />
        </div>

        <LandingFooter />
      </div>
    </div>
  );
}
