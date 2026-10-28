import React, { useState, useEffect, useCallback } from 'react';
import { HERO_SLIDES, PropertyListing, PROPERTIES } from '../data/properties';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface SliderRevolutionHeroProps {
  onSelectProperty: (property: PropertyListing) => void;
}

export const SliderRevolutionHero: React.FC<SliderRevolutionHeroProps> = ({
  onSelectProperty,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = HERO_SLIDES[activeIndex];

  const handleOpenSlideProperty = () => {
    const found = PROPERTIES.find((p) => p.id === currentSlide.propertyId) || PROPERTIES[0];
    onSelectProperty(found);
  };

  return (
    <section
      className="relative w-full h-[540px] sm:h-[620px] lg:h-[720px] overflow-hidden bg-[#101816] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Architectural Portfolio Slider"
    >
      {/* Background Slides with Ken Burns Scale Effect */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.headline}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Measured Contrast Scrim for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A100F]/90 via-[#0A100F]/45 to-[#0A100F]/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A100F]/80 via-[#0A100F]/30 to-transparent" />
          </div>
        );
      })}

      {/* Decongested Editorial Hero Content */}
      <div className="relative z-20 max-w-[1380px] mx-auto h-full px-4 sm:px-6 lg:px-12 flex flex-col justify-between pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="my-auto max-w-2xl space-y-5">
          <div
            key={`kicker-${currentSlide.id}`}
            className="text-xs font-mono-tabular text-[#5EEAD4] tracking-wide"
          >
            {currentSlide.kicker}
          </div>

          <h1
            key={`title-${currentSlide.id}`}
            className="font-display font-medium text-white tracking-tight leading-[1.06]"
            style={{
              fontSize: 'clamp(2.35rem, 5vw, 4.25rem)',
              textWrap: 'balance',
            }}
          >
            {currentSlide.headline}
          </h1>

          <p
            key={`sub-${currentSlide.id}`}
            className="text-sm sm:text-base text-[#E6E2DA]/90 leading-relaxed max-w-xl"
          >
            {currentSlide.subheadline}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenSlideProperty}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold bg-[#0D4F48] hover:bg-[#0F635A] text-white rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-lg"
            >
              <span>{currentSlide.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Slider Controls: Quiet Progress Lines + Prev/Next */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-10 bg-[#5EEAD4]'
                      : 'w-2.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-xl border border-white/25 bg-black/30 hover:bg-white hover:text-[#141413] text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-xl border border-white/25 bg-black/30 hover:bg-white hover:text-[#141413] text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
