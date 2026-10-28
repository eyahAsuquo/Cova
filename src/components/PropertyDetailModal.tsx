import React, { useState } from 'react';
import { COVA_HQ, GalleryAngle, PropertyListing, formatNgn } from '../data/properties';
import { ArchitecturalCanvas } from './ArchitecturalCanvas';
import {
  X,
  Check,
  ShieldCheck,
  Zap,
  FileText,
  TrendingUp,
  Calculator,
  Phone,
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: PropertyListing | null;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
}) => {
  if (!property) return null;

  const [activeAngle, setActiveAngle] = useState<GalleryAngle>(
    property.galleryAngles[0] || 'Exterior Dusk'
  );

  // Short-let booking state (Airbnb / Luxstay flow)
  const [nights, setNights] = useState<number>(property.minNights || 3);
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-12');

  // Buy / Payment milestone calculator state (Realtor / Zillow flow)
  const [initialDepositPct, setInitialDepositPct] = useState<number>(30);
  const [milestoneMonths, setMilestoneMonths] = useState<number>(12);

  // Inspection / Reservation Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [visitType, setVisitType] = useState<'in-person' | 'video'>('in-person');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const isShortlet = property.mode === 'shortlet';
  const cleaningFee = property.cleaningFeeNgn || 30000;
  const shortletSubtotal = property.priceNgn * nights;
  const shortletTotal = shortletSubtotal + cleaningFee;

  const depositAmount = (property.priceNgn * initialDepositPct) / 100;
  const balanceAmount = property.priceNgn - depositAmount;
  const monthlyInstalment =
    milestoneMonths > 0 ? balanceAmount / milestoneMonths : balanceAmount;

  const currentAnglePhoto =
    activeAngle === 'Architectural Plan'
      ? undefined
      : property.galleryPhotos[activeAngle] || property.imageUrl;

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setFormError('Please provide your full name and phone number.');
      return;
    }
    setFormError('');
    setBookingSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141413]/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
    >
      <div className="relative w-full max-w-6xl bg-[#FAF8F5] border-t sm:border border-[#E6E2DA] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-[#E6E2DA] bg-white shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#65635E]">
              <span>{property.neighborhood}</span>
              <span>·</span>
              <span>{property.category}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{property.architecturalStyle}</span>
            </div>
            <h2
              id="modal-property-title"
              className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-[#141413] truncate"
            >
              {property.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-lg text-[#65635E] hover:text-[#141413] hover:bg-[#F2EFE9] transition-colors shrink-0"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Grid */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left 7 Columns: Real Photography Gallery, Specs, Floor Plan, Valuation History */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Multi-Angle Real Photo & CAD Viewer */}
            <div className="space-y-3">
              <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden border border-[#E6E2DA] bg-[#141413]">
                <ArchitecturalCanvas
                  variant={property.illustrationVariant}
                  angle={activeAngle}
                  imageUrl={currentAnglePhoto}
                  className="w-full h-full"
                  label={`${property.title} - ${activeAngle}`}
                />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded bg-[#141413]/80 backdrop-blur-xs text-white text-xs font-mono-tabular">
                  {activeAngle} · {property.sqm} m² Internal
                </div>
              </div>

              {/* Angle Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {property.galleryAngles.map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setActiveAngle(angle)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      activeAngle === angle
                        ? 'bg-[#141413] text-white'
                        : 'bg-[#F2EFE9] text-[#65635E] hover:text-[#141413]'
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Architectural Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#E6E2DA] font-mono-tabular">
              <div>
                <div className="text-xs text-[#65635E]">Bedrooms</div>
                <div className="text-base sm:text-lg font-semibold text-[#141413]">
                  {property.bedrooms} En-Suite
                </div>
              </div>
              <div>
                <div className="text-xs text-[#65635E]">Floor Area</div>
                <div className="text-base sm:text-lg font-semibold text-[#141413]">
                  {property.sqm} m²
                </div>
              </div>
              <div>
                <div className="text-xs text-[#65635E]">Plot Size</div>
                <div className="text-base sm:text-lg font-semibold text-[#141413]">
                  {property.lotSqm} m²
                </div>
              </div>
              <div>
                <div className="text-xs text-[#65635E]">HQ Proximity</div>
                <div className="text-base sm:text-lg font-semibold text-[#0D4F48]">
                  {property.distanceToHqKm} km
                </div>
              </div>
            </div>

            {/* Narrative & Construction Specification */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-[#141413]">
                Architectural Brief &amp; Engineering
              </h3>
              <p className="text-sm text-[#45433E] leading-relaxed">
                {property.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F2EFE9]/70 border border-[#E6E2DA] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#141413]">
                    <FileText className="w-4 h-4 text-[#0D4F48] shrink-0" />
                    <span>Title Verification</span>
                  </div>
                  <p className="text-xs text-[#65635E] leading-relaxed">
                    {property.titleDocument}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F2EFE9]/70 border border-[#E6E2DA] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#141413]">
                    <Zap className="w-4 h-4 text-[#0D4F48] shrink-0" />
                    <span>Power Redundancy</span>
                  </div>
                  <p className="text-xs text-[#65635E] leading-relaxed">
                    {property.powerSpec}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F2EFE9]/70 border border-[#E6E2DA] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#141413]">
                    <ShieldCheck className="w-4 h-4 text-[#0D4F48] shrink-0" />
                    <span>Security Protocol</span>
                  </div>
                  <p className="text-xs text-[#65635E] leading-relaxed">
                    {property.securitySpec}
                  </p>
                </div>
              </div>
            </div>

            {/* Room-by-Room Schedule */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-[#141413]">
                Spatial Schedule &amp; Dimensions
              </h3>
              <div className="divide-y divide-[#E6E2DA] border border-[#E6E2DA] rounded-xl bg-white">
                {property.floorPlanRooms.map((room) => (
                  <div
                    key={room.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-3 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-[#141413]">{room.name}</span>
                    <div className="flex items-center gap-3 font-mono-tabular text-xs text-[#65635E]">
                      <span>{room.level}</span>
                      <span>·</span>
                      <span className="text-[#141413] font-medium">
                        {room.dimensions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-Time Market Valuation & 5-Year Trajectory */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E6E2DA] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#0D4F48] font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>Cova Market Valuation Intelligence</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-[#141413] mt-0.5">
                    5-Year Capital Appreciation ({property.neighborhood})
                  </h4>
                </div>
                <div className="text-left sm:text-right font-mono-tabular">
                  <div className="text-xs text-[#65635E]">Estimated Market Value</div>
                  <div className="text-base font-bold text-[#0D4F48]">
                    {formatNgn(property.covaEstimateNgn)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-2 items-end h-28 sm:h-32">
                {property.priceHistory.map((pt, idx) => {
                  const maxVal = Math.max(
                    ...property.priceHistory.map((h) => h.valueMillionNgn)
                  );
                  const heightPct = Math.max(
                    25,
                    Math.round((pt.valueMillionNgn / maxVal) * 100)
                  );
                  return (
                    <div
                      key={pt.year}
                      className="flex flex-col items-center gap-1.5 h-full justify-end"
                    >
                      <span className="text-[10px] sm:text-[11px] font-mono-tabular font-semibold text-[#141413]">
                        ₦{pt.valueMillionNgn}M
                      </span>
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          idx === property.priceHistory.length - 1
                            ? 'bg-[#0D4F48]'
                            : 'bg-[#D5CFC4]'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[10px] sm:text-[11px] font-mono-tabular text-[#65635E]">
                        {pt.year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Contiguous Purchase / Short-Let Booking & Payment Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E6E2DA] space-y-6 lg:sticky lg:top-4">
              {/* Price Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E6E2DA] pb-4">
                <div>
                  <span className="text-xs text-[#65635E] block">
                    {isShortlet
                      ? 'Serviced Short-Let Rate'
                      : property.mode === 'rent'
                      ? 'Annual Corporate Lease'
                      : 'Outright Guide Price'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#141413] mt-0.5">
                    {formatNgn(property.priceNgn)}
                    {property.pricePeriod !== 'total' && (
                      <span className="text-sm font-normal text-[#65635E]">
                        {' '}
                        / {property.pricePeriod}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right font-mono-tabular text-xs text-[#0D4F48]">
                  <div>+{property.appreciationYoY}% YoY</div>
                  <div className="text-[#65635E]">
                    {property.rentalYieldPct}% Gross Yield
                  </div>
                </div>
              </div>

              {/* Conditional Module: Short-Let Calculator vs Outright Milestone Calculator */}
              {isShortlet ? (
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-[#141413] flex items-center justify-between">
                    <span>Instant Stay Calculator</span>
                    {property.rating && (
                      <span className="font-mono-tabular text-[#0D4F48]">
                        ★ {property.rating} ({property.reviewCount} stays)
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#65635E] mb-1">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs font-mono-tabular border border-[#D5CFC4] rounded-lg bg-[#FAF8F5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#65635E] mb-1">
                        Duration (Nights)
                      </label>
                      <input
                        type="number"
                        min={property.minNights || 1}
                        max={60}
                        value={nights}
                        onChange={(e) =>
                          setNights(Math.max(1, Number(e.target.value) || 1))
                        }
                        className="w-full px-3 py-2.5 text-xs font-mono-tabular border border-[#D5CFC4] rounded-lg bg-[#FAF8F5]"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] space-y-2 text-xs font-mono-tabular">
                    <div className="flex justify-between text-[#65635E]">
                      <span>
                        {formatNgn(property.priceNgn)} × {nights} nights
                      </span>
                      <span>{formatNgn(shortletSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#65635E]">
                      <span>Sanitization &amp; Concierge</span>
                      <span>{formatNgn(cleaningFee)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-[#141413] pt-2 border-t border-[#E6E2DA] text-sm">
                      <span>Total Reservation</span>
                      <span>{formatNgn(shortletTotal)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#141413]">
                    <Calculator className="w-4 h-4 text-[#0D4F48]" />
                    <span>Cova Construction Milestone Planner</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#65635E]">Initial Equity Deposit</span>
                        <span className="font-mono-tabular font-semibold text-[#141413]">
                          {initialDepositPct}% ({formatNgn(depositAmount, true)})
                        </span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={80}
                        step={10}
                        value={initialDepositPct}
                        onChange={(e) => setInitialDepositPct(Number(e.target.value))}
                        className="w-full accent-[#0D4F48]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-[#65635E]">Spread Balance Over</span>
                      <div className="flex items-center gap-1">
                        {[3, 6, 12, 18].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMilestoneMonths(m)}
                            className={`px-2.5 py-1.5 text-xs font-mono-tabular rounded transition-colors ${
                              milestoneMonths === m
                                ? 'bg-[#0D4F48] text-white'
                                : 'bg-[#F2EFE9] text-[#65635E] hover:text-[#141413]'
                            }`}
                          >
                            {m}m
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] space-y-1.5 text-xs font-mono-tabular">
                      <div className="flex justify-between text-[#65635E]">
                        <span>Initial Deposit ({initialDepositPct}%)</span>
                        <span>{formatNgn(depositAmount)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-[#0D4F48] text-sm pt-1 border-t border-[#E6E2DA]">
                        <span>Monthly Milestone ({milestoneMonths} mos)</span>
                        <span>{formatNgn(monthlyInstalment)}/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Booking / Private Inspection Form */}
              {bookingSubmitted ? (
                <div className="p-5 rounded-xl bg-[#0D4F48] text-white space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Check className="w-5 h-5 text-[#5EEAD4]" />
                    <span>
                      {isShortlet
                        ? 'Short-Let Reservation Hold Confirmed'
                        : 'Private Inspection Scheduled'}
                    </span>
                  </div>
                  <p className="text-xs text-[#E6E2DA] leading-relaxed">
                    Thank you, <strong className="text-white">{clientName}</strong>. Our
                    senior advisory team at Cova HQ (33A Ehio Street, Mgbuoba) has
                    logged your request for <strong>{property.title}</strong> and will
                    call <strong>{clientPhone}</strong> within 15 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingSubmitted(false)}
                    className="text-xs underline text-[#5EEAD4] hover:text-white"
                  >
                    Modify reservation details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleActionSubmit} className="space-y-3">
                  <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setVisitType('in-person')}
                      className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
                        visitType === 'in-person'
                          ? 'bg-white text-[#141413] shadow-xs'
                          : 'text-[#65635E]'
                      }`}
                    >
                      {isShortlet ? 'Instant Stay Hold' : 'Site Inspection'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisitType('video')}
                      className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
                        visitType === 'video'
                          ? 'bg-white text-[#141413] shadow-xs'
                          : 'text-[#65635E]'
                      }`}
                    >
                      Live Video Tour
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Full Name (e.g. Engr. Tamuno Briggs)"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#D5CFC4] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#0D4F48]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="tel"
                      placeholder="Phone (+234 ...)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#D5CFC4] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#0D4F48]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#D5CFC4] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#0D4F48]"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-700 font-medium">{formError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0D4F48] hover:bg-[#093B36] rounded-lg transition-colors whitespace-nowrap"
                  >
                    {isShortlet
                      ? `Reserve ${nights} Nights (${formatNgn(shortletTotal, true)})`
                      : visitType === 'in-person'
                      ? 'Schedule Private Inspection'
                      : 'Request Live Video Tour'}
                  </button>
                </form>
              )}

              {/* Direct Cova HQ Contact Footer */}
              <div className="pt-3 border-t border-[#E6E2DA] flex items-center justify-between text-xs text-[#65635E]">
                <span>Direct Cova Advisory Line</span>
                <a
                  href={`tel:${COVA_HQ.phone.replace(/\s+/g, '')}`}
                  className="font-mono-tabular font-semibold text-[#141413] hover:text-[#0D4F48] flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0D4F48]" />
                  {COVA_HQ.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
