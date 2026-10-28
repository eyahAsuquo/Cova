/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  COVA_HQ,
  NEIGHBORHOOD_METRICS,
  PROPERTIES,
  ListingMode,
  PropertyListing,
  formatNgn,
} from './data/properties';
import { ArchitecturalCanvas } from './components/ArchitecturalCanvas';
import { SliderRevolutionHero } from './components/SliderRevolutionHero';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import {
  Search,
  Heart,
  Check,
  Menu,
  X,
} from 'lucide-react';

export default function App() {
  // Mobile Navigation Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filter State (Houzez / Luxstay / Realtor inspired)
  const [modeFilter, setModeFilter] = useState<'all' | ListingMode>('all');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('All');
  const [minBedsFilter, setMinBedsFilter] = useState<number>(0);
  const [maxPriceMillion, setMaxPriceMillion] = useState<number>(400);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'yield'>('featured');

  // Interactive Selection & Saved Shortlist State
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(['cova-01']);
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  // Consultation Lead Capture State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadInterest, setLeadInterest] = useState('Acquisition & Land');
  const [leadNotes, setLeadNotes] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState('');

  // Toggle Shortlist Heart
  const toggleSaveProperty = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered & Sorted Properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      if (showSavedOnly && !savedIds.includes(prop.id)) return false;
      if (modeFilter !== 'all' && prop.mode !== modeFilter) return false;
      if (neighborhoodFilter !== 'All' && prop.neighborhood !== neighborhoodFilter)
        return false;
      if (minBedsFilter > 0 && prop.bedrooms < minBedsFilter) return false;

      const comparableMillion =
        prop.mode === 'buy'
          ? prop.priceNgn / 1_000_000
          : prop.covaEstimateNgn / 1_000_000;
      if (comparableMillion > maxPriceMillion) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          prop.title.toLowerCase().includes(q) ||
          prop.neighborhood.toLowerCase().includes(q) ||
          prop.address.toLowerCase().includes(q) ||
          prop.category.toLowerCase().includes(q) ||
          prop.architecturalStyle.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
      if (sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
      if (sortBy === 'yield') return b.appreciationYoY - a.appreciationYoY;
      return 0;
    });
  }, [
    modeFilter,
    neighborhoodFilter,
    minBedsFilter,
    maxPriceMillion,
    searchQuery,
    sortBy,
    showSavedOnly,
    savedIds,
  ]);

  const resetAllFilters = () => {
    setModeFilter('all');
    setNeighborhoodFilter('All');
    setMinBedsFilter(0);
    setMaxPriceMillion(400);
    setSearchQuery('');
    setShowSavedOnly(false);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) {
      setLeadError('Please enter your name and telephone number.');
      return;
    }
    setLeadError('');
    setLeadSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141413] overflow-x-hidden">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-[#E6E2DA] px-4 sm:px-6 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-[#141413] whitespace-nowrap shrink-0"
        >
          Cova Real Estate
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#65635E]">
          <a
            href="#portfolio"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Portfolio
          </a>
          <a
            href="#shortlets"
            onClick={() => setModeFilter('shortlet')}
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Short-Lets
          </a>
          <a
            href="#constructions"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Constructions
          </a>
          <a
            href="#market-data"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Market Data
          </a>
          <a
            href="#advisory"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Advisory
          </a>
        </nav>

        {/* Zone 3: 1 primary action (+ Mobile Hamburger Trigger) */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#advisory"
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-[#0D4F48] rounded-lg hover:bg-[#093B36] transition-colors whitespace-nowrap shrink-0"
          >
            Book Private Tour
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-[#141413] hover:bg-[#F2EFE9] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E6E2DA] px-4 py-4 space-y-2 z-30">
          {[
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Short-Lets', href: '#shortlets', mode: 'shortlet' as const },
            { label: 'Constructions', href: '#constructions' },
            { label: 'Market Data', href: '#market-data' },
            { label: 'Advisory', href: '#advisory' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                if (item.mode) setModeFilter(item.mode);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-sm font-medium text-[#141413] hover:text-[#0D4F48]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <main className="flex-1">
        {/* Section 1: Slider Revolution Style Full-Width Hero Showcase */}
        <SliderRevolutionHero
          onSelectProperty={(prop) => setSelectedProperty(prop)}
        />

        {/* Overlapping Houzez / Luxstay / Realtor Command Search Dock */}
        <section className="relative z-30 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 -mt-8 sm:-mt-12 pb-12">
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E6E2DA] shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Interactive Transaction Mode Segmented Control */}
              <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-xl overflow-x-auto">
                {(
                  [
                    { id: 'all', label: 'All Residences' },
                    { id: 'buy', label: 'For Sale (Buy)' },
                    { id: 'rent', label: 'Annual Lease' },
                    { id: 'shortlet', label: 'Luxury Short-Lets' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModeFilter(tab.id)}
                    className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      modeFilter === tab.id
                        ? 'bg-[#141413] text-white shadow-xs'
                        : 'text-[#65635E] hover:text-[#141413]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Shortlist Filter & Key Proof */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-xs font-mono-tabular text-[#65635E] hidden lg:inline">
                  Verified C of O · ₦18.4B+ Portfolio
                </span>
                <button
                  type="button"
                  onClick={() => setShowSavedOnly(!showSavedOnly)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    showSavedOnly
                      ? 'bg-[#0D4F48] text-white border-[#0D4F48]'
                      : 'bg-white text-[#141413] border-[#D5CFC4] hover:border-[#141413]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Saved ({savedIds.length})</span>
                </button>
              </div>
            </div>

            {/* Filter Inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2 border-t border-[#F2EFE9]">
              {/* Keyword Search */}
              <div className="sm:col-span-2 lg:col-span-4 relative">
                <Search className="w-4 h-4 text-[#65635E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Ehio St, New GRA, Waterfront, Pool..."
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E6E2DA] rounded-xl focus:outline-none focus:border-[#0D4F48]"
                />
              </div>

              {/* Port Harcourt Neighborhood Selector */}
              <div className="lg:col-span-3">
                <select
                  value={neighborhoodFilter}
                  onChange={(e) => setNeighborhoodFilter(e.target.value)}
                  aria-label="Filter by Port Harcourt neighborhood"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E6E2DA] rounded-xl text-[#141413] focus:outline-none focus:border-[#0D4F48]"
                >
                  <option value="All">All Port Harcourt Districts</option>
                  {NEIGHBORHOOD_METRICS.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Bedrooms */}
              <div className="lg:col-span-2">
                <select
                  value={minBedsFilter}
                  onChange={(e) => setMinBedsFilter(Number(e.target.value))}
                  aria-label="Minimum bedrooms"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E6E2DA] rounded-xl text-[#141413] focus:outline-none focus:border-[#0D4F48]"
                >
                  <option value={0}>Any Bedrooms</option>
                  <option value={2}>2+ Bedrooms</option>
                  <option value={3}>3+ Bedrooms</option>
                  <option value={4}>4+ Bedrooms</option>
                  <option value={5}>5+ Bedrooms</option>
                </select>
              </div>

              {/* Max Capital Valuation Slider */}
              <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3 px-3.5 py-2 bg-[#FAF8F5] border border-[#E6E2DA] rounded-xl">
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-mono-tabular">
                    <span className="text-[#65635E]">Max Value</span>
                    <span className="font-semibold text-[#141413]">
                      ₦{maxPriceMillion}M
                    </span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={400}
                    step={20}
                    value={maxPriceMillion}
                    onChange={(e) => setMaxPriceMillion(Number(e.target.value))}
                    className="w-full accent-[#0D4F48] h-1.5 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Full-Width Curated Property Portfolio Grid */}
        <section
          id="portfolio"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 space-y-6"
        >
          {/* Section Header & Sort Control */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DA] pb-4">
            <div>
              <div className="text-xs text-[#65635E]">
                <span>Verified Cova Portfolio</span>
                <span className="mx-2">·</span>
                <span className="font-mono-tabular">
                  Showing {filteredProperties.length} of {PROPERTIES.length}{' '}
                  residences
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#141413] mt-1">
                Curated Port Harcourt Residences &amp; Short-Lets
              </h2>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-xs text-[#65635E] whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs font-medium bg-white border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0D4F48]"
              >
                <option value="featured">Cova Curated Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="yield">Highest YoY Appreciation</option>
              </select>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E6E2DA] text-center space-y-4">
              <p className="text-base font-medium text-[#141413]">
                No residences match your current filter combination.
              </p>
              <p className="text-xs text-[#65635E]">
                Try expanding your budget range or selecting all Port Harcourt
                districts.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0D4F48] rounded-lg hover:bg-[#093B36] transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.map((property) => {
                const isSaved = savedIds.includes(property.id);
                return (
                  <article
                    key={property.id}
                    onClick={() => setSelectedProperty(property)}
                    className="group bg-white rounded-xl border border-[#E6E2DA] overflow-hidden cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Real Photograph Container (4:3 aspect ratio) */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#182220]">
                        <ArchitecturalCanvas
                          variant={property.illustrationVariant}
                          angle="Exterior Dusk"
                          imageUrl={property.imageUrl}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          label={property.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />

                        {/* Save to Shortlist Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleSaveProperty(property.id, e)}
                          aria-label="Save residence to shortlist"
                          className="absolute top-3 right-3 p-2.5 rounded-full bg-black/45 backdrop-blur-xs text-white hover:bg-white hover:text-[#141413] transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isSaved ? 'fill-[#5EEAD4] text-[#5EEAD4]' : ''
                            }`}
                          />
                        </button>

                        {/* Bottom Overlay Price & Yield */}
                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-baseline justify-between text-white font-mono-tabular">
                          <div className="text-lg font-bold">
                            {formatNgn(property.priceNgn)}
                            {property.pricePeriod !== 'total' && (
                              <span className="text-xs font-normal text-[#E6E2DA]">
                                /{property.pricePeriod}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#5EEAD4] font-medium">
                            +{property.appreciationYoY}% YoY
                          </span>
                        </div>
                      </div>

                      {/* Unboxed Metadata & Title (Zero-Pill Discipline) */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#65635E]">
                          <span>{property.neighborhood}</span>
                          <span aria-hidden="true">·</span>
                          <span>{property.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {property.mode === 'shortlet'
                              ? 'Serviced Short-Let'
                              : property.mode === 'rent'
                              ? 'Annual Lease'
                              : 'Outright Sale'}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-[#141413] group-hover:text-[#0D4F48] transition-colors">
                          {property.title}
                        </h3>

                        <p className="text-xs text-[#65635E] line-clamp-1">
                          {property.address}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Specs */}
                    <div className="px-5 py-3.5 border-t border-[#F2EFE9] flex items-center justify-between text-xs font-mono-tabular text-[#52504B]">
                      <div className="flex items-center gap-2">
                        <span>{property.bedrooms} Beds</span>
                        <span>·</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>·</span>
                        <span>{property.sqm} m²</span>
                      </div>
                      <span className="text-[#0D4F48] font-sans font-semibold whitespace-nowrap">
                        Inspect →
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 3: Real-Time Port Harcourt Market Intelligence */}
        <section
          id="market-data"
          className="bg-[#141E1C] text-[#FAF8F5] py-16 sm:py-20 border-y border-[#243835]"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs text-[#8FA6A1] font-mono-tabular">
                  <span>Q4 2026 RIVERS STATE PROPERTY INDEX</span>
                  <span className="mx-2">·</span>
                  <span>COVA RESEARCH DESK</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Port Harcourt neighborhood valuation &amp; rental yield
                  benchmarks.
                </h2>
              </div>
              <p className="text-xs text-[#A8B5B2] max-w-sm leading-relaxed">
                Select any corridor below to filter active listings in that
                district. Metrics reflect verified Cova transactions and
                construction land appraisals.
              </p>
            </div>

            {/* Responsive Cards on Mobile + Tabular Matrix on Desktop */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {NEIGHBORHOOD_METRICS.map((item) => {
                const isSelected = neighborhoodFilter === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setNeighborhoodFilter(isSelected ? 'All' : item.name);
                      document
                        .getElementById('portfolio')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-xl border transition-colors cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-[#0D4F48]/40 border-[#5EEAD4]'
                        : 'bg-[#0F1816] border-[#263B38]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white text-sm">
                        {item.name}
                      </span>
                      <span className="text-xs font-mono-tabular text-[#5EEAD4]">
                        +{item.yoyGrowthPct}% YoY
                      </span>
                    </div>
                    <p className="text-xs text-[#8FA6A1] leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1E302D] text-xs font-mono-tabular">
                      <div>
                        <span className="text-[#8FA6A1] block">Avg. Price / m²</span>
                        <span className="text-white">
                          {formatNgn(item.avgPricePerSqmNgn)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8FA6A1] block">Gross Yield</span>
                        <span className="text-white">
                          {item.avgRentalYieldPct}% p.a.
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#263B38] bg-[#0F1816]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#263B38] text-xs text-[#8FA6A1] font-mono-tabular">
                    <th className="py-4 px-5 font-medium">District / Corridor</th>
                    <th className="py-4 px-5 font-medium">Avg. Price / m²</th>
                    <th className="py-4 px-5 font-medium">YoY Capital Growth</th>
                    <th className="py-4 px-5 font-medium">Gross Rental Yield</th>
                    <th className="py-4 px-5 font-medium">Market Profile</th>
                    <th className="py-4 px-5 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E302D] text-sm">
                  {NEIGHBORHOOD_METRICS.map((item) => {
                    const isSelected = neighborhoodFilter === item.name;
                    return (
                      <tr
                        key={item.name}
                        onClick={() => {
                          setNeighborhoodFilter(
                            isSelected ? 'All' : item.name
                          );
                          document
                            .getElementById('portfolio')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#0D4F48]/40'
                            : 'hover:bg-white/[0.03]'
                        }`}
                      >
                        <td className="py-4 px-5 font-semibold text-white">
                          <div>{item.name}</div>
                          <div className="text-xs font-normal text-[#8FA6A1] mt-0.5 max-w-md">
                            {item.summary}
                          </div>
                        </td>
                        <td className="py-4 px-5 font-mono-tabular text-[#E6E2DA]">
                          {formatNgn(item.avgPricePerSqmNgn)}/m²
                        </td>
                        <td className="py-4 px-5 font-mono-tabular text-[#5EEAD4] font-semibold">
                          +{item.yoyGrowthPct}%
                        </td>
                        <td className="py-4 px-5 font-mono-tabular text-[#E6E2DA]">
                          {item.avgRentalYieldPct}% p.a.
                        </td>
                        <td className="py-4 px-5 text-xs text-[#A8B5B2]">
                          {item.demandIndex}
                        </td>
                        <td className="py-4 px-5 text-right font-mono-tabular text-xs">
                          <span className="text-[#5EEAD4] hover:underline whitespace-nowrap">
                            {isSelected ? 'Showing District' : 'Filter Listings →'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Cova Constructions & Turnkey Architectural Engineering */}
        <section
          id="constructions"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 space-y-10 sm:space-y-12"
        >
          <div className="max-w-2xl space-y-3">
            <div className="text-xs text-[#65635E]">
              <span>Design-Build Division</span>
              <span className="mx-2">·</span>
              <span>Cove Real Estate &amp; Constructions</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-[#141413]"
              style={{ textWrap: 'balance' }}
            >
              End-to-end civil engineering, architectural design, and property
              development.
            </h2>
          </div>

          {/* Asymmetric Bento Grid with Editorial Numbering */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white border border-[#E6E2DA] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono-tabular text-[#0D4F48]">
                  01. Turnkey Residential &amp; Commercial Construction
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#141413]">
                  Pile Foundation to Bespoke Interior Joinery in Rivers State
                </h3>
                <p className="text-sm text-[#52504B] leading-relaxed max-w-2xl">
                  Port Harcourt’s soil mechanics and tropical rainfall demand
                  rigorous structural engineering. Our in-house civil engineers
                  and architects execute soil resistivity testing, raft and pile
                  foundations, damp-proof membrane systems, and contemporary
                  concrete-and-timber facades with milestone transparency for
                  local and diaspora clients.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F2EFE9] text-xs font-mono-tabular">
                <div>
                  <span className="text-[#65635E] block">Structural Warranty</span>
                  <span className="font-semibold text-[#141413]">
                    25-Year Certified
                  </span>
                </div>
                <div>
                  <span className="text-[#65635E] block">Diaspora Reporting</span>
                  <span className="font-semibold text-[#141413]">
                    Bi-Weekly Drone &amp; CAD Logs
                  </span>
                </div>
                <div>
                  <span className="text-[#65635E] block">Delivery Track Record</span>
                  <span className="font-semibold text-[#0D4F48]">
                    42+ Completed Units
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E6E2DA] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono-tabular text-[#0D4F48]">
                  02. Land Acquisition &amp; Title Due Diligence
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#141413]">
                  Verified Rivers State C of O &amp; Charting
                </h3>
                <p className="text-sm text-[#52504B] leading-relaxed">
                  Every parcel in Mgbuoba, New GRA, Peter Odili, and Woji undergoes
                  Surveyor-General charting, Ministry of Lands registry search,
                  and community encumbrance clearance before listing.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F2EFE9] text-xs font-mono-tabular text-[#65635E]">
                Zero Title Disputes Since Inception
              </div>
            </div>

            <div
              id="shortlets"
              className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-[#F2EFE9] border border-[#E6E2DA] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-mono-tabular text-[#0D4F48]">
                  03. Cova Short-Let &amp; Facility Management
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#141413]">
                  Turn your Port Harcourt property into a high-yield executive
                  short-let.
                </h3>
                <p className="text-sm text-[#52504B] leading-relaxed">
                  Inspired by Luxstay and Airbnb Plus hospitality standards, Cova
                  manages furnishing, 24/7 solar-hybrid power redundancy,
                  Starlink connectivity, corporate guest vetting, and preventative
                  maintenance—delivering 9.5% to 12.4% net annual yields for
                  property owners.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-wrap sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModeFilter('shortlet');
                    document
                      .getElementById('portfolio')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] transition-colors whitespace-nowrap"
                >
                  Explore Short-Let Suites
                </button>
                <a
                  href="#advisory"
                  className="w-full sm:w-auto text-center px-5 py-3 text-xs font-semibold bg-white text-[#141413] border border-[#D5CFC4] rounded-lg hover:border-[#141413] transition-colors whitespace-nowrap"
                >
                  Enroll Property in Management
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Cova HQ Location & Private Advisory Lead Capture */}
        <section
          id="advisory"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 sm:pb-24"
        >
          <div className="rounded-2xl bg-white border border-[#E6E2DA] p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left 6 Columns: HQ Address & Attributable Client Proof */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="text-xs text-[#0D4F48] font-mono-tabular font-semibold">
                  VISIT COVA HEADQUARTERS · PORT HARCOURT
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#141413]">
                  Schedule a private portfolio review or construction
                  consultation.
                </h2>
                <p className="text-sm text-[#52504B] leading-relaxed">
                  Meet our principal architects and property advisors at our
                  Mgbuoba office or request a live drone and video walkthrough if
                  you are investing from Lagos, Abuja, the UK, or North America.
                </p>

                <div className="pt-2 space-y-2.5 text-xs text-[#45433E] font-mono-tabular">
                  <div>
                    <strong className="text-[#141413] font-sans block">
                      Headquarters Address:
                    </strong>
                    {COVA_HQ.address}
                  </div>
                  <div>
                    <strong className="text-[#141413] font-sans block">
                      Direct Advisory Telephone:
                    </strong>
                    {COVA_HQ.phone} · {COVA_HQ.hours}
                  </div>
                </div>
              </div>

              {/* Attributable Testimonial */}
              <blockquote className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] space-y-2">
                <p className="text-xs text-[#45433E] leading-relaxed italic">
                  “Before engaging Cova Real Estate &amp; Constructions, managing
                  a duplex build from London meant irregular contractor updates.
                  Cova delivered our 5-bedroom residence off NTA Road two weeks
                  ahead of schedule with verified Rivers State C of O and now
                  operates it at 84% short-let occupancy.”
                </p>
                <footer className="text-xs font-semibold text-[#141413]">
                  Dr. Soboma Alabo — Principal Reservoir Engineer, NLNG &amp;
                  Diaspora Investor
                </footer>
              </blockquote>
            </div>

            {/* Right 6 Columns: Validated Consultation Form */}
            <div className="lg:col-span-6">
              {leadSubmitted ? (
                <div className="h-full p-6 sm:p-8 rounded-xl bg-[#0D4F48] text-white flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2 text-base font-semibold">
                    <Check className="w-5 h-5 text-[#5EEAD4]" />
                    <span>Advisory Dossier Request Received</span>
                  </div>
                  <p className="text-xs text-[#E6E2DA] leading-relaxed">
                    Thank you, <strong>{leadName}</strong>. A senior partner at
                    Cova Real Estate &amp; Constructions (33A Ehio Street,
                    Mgbuoba) will reach out to <strong>{leadPhone}</strong>{' '}
                    regarding <strong>{leadInterest}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setLeadSubmitted(false);
                      setLeadName('');
                      setLeadPhone('');
                      setLeadNotes('');
                    }}
                    className="self-start px-4 py-2 text-xs font-semibold bg-white text-[#141413] rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleLeadSubmit}
                  className="p-5 sm:p-8 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] space-y-4"
                >
                  <h3 className="text-base font-semibold text-[#141413]">
                    Direct Advisory &amp; Construction Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#65635E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Chief / Engr. / Dr. ..."
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D5CFC4] rounded-lg focus:outline-none focus:border-[#0D4F48]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#65635E] mb-1">
                        Telephone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="+234 803 ..."
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D5CFC4] rounded-lg focus:outline-none focus:border-[#0D4F48]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#65635E] mb-1">
                      Primary Advisory Interest
                    </label>
                    <select
                      value={leadInterest}
                      onChange={(e) => setLeadInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D5CFC4] rounded-lg focus:outline-none focus:border-[#0D4F48]"
                    >
                      <option value="Acquisition & Land">
                        Outright Residence or Verified Land Acquisition
                      </option>
                      <option value="Turnkey Construction">
                        Turnkey Architectural &amp; Civil Construction Quote
                      </option>
                      <option value="Executive Short-Let">
                        Corporate / Executive Short-Let Reservation
                      </option>
                      <option value="Property Management">
                        Enroll Property in Cova Facility Management
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#65635E] mb-1">
                      Project Brief or Preferred Inspection Date
                    </label>
                    <textarea
                      rows={3}
                      value={leadNotes}
                      onChange={(e) => setLeadNotes(e.target.value)}
                      placeholder="Specify preferred Port Harcourt district (e.g., Mgbuoba, New GRA, Peter Odili), bedroom count, or plot size..."
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D5CFC4] rounded-lg focus:outline-none focus:border-[#0D4F48]"
                    />
                  </div>

                  {leadError && (
                    <p className="text-xs text-red-700 font-medium">
                      {leadError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-5 text-xs font-semibold text-white bg-[#0D4F48] hover:bg-[#093B36] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Request Private Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E6E2DA] bg-white py-10 px-4 sm:px-6 lg:px-12 text-xs text-[#65635E]">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-base font-display font-semibold text-[#141413]">
              Cova Real Estate &amp; Constructions
            </div>
            <div>
              33A Ehio Street (Off NTA Road), Mgbuoba, Port Harcourt, Rivers
              State, Nigeria · {COVA_HQ.phone}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <a href="#portfolio" className="hover:text-[#141413]">
              Portfolio
            </a>
            <a href="#shortlets" className="hover:text-[#141413]">
              Short-Lets
            </a>
            <a href="#constructions" className="hover:text-[#141413]">
              Constructions
            </a>
            <a href="#market-data" className="hover:text-[#141413]">
              Market Index
            </a>
            <span>© {new Date().getFullYear()} Cova Real Estate</span>
          </div>
        </div>
      </footer>

      {/* Property Detail Dossier & Booking Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
