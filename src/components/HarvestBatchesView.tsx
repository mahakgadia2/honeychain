import { useState, useId } from 'react';
import { NavTab, ToastMessage } from '../types';
import {
  Package,
  PlusCircle,
  QrCode,
  Printer,
  CheckCircle2,
  Clock,
  Truck,
  Search,
  Download,
  X,
  FileText,
  ShieldCheck,
  Award,
  SlidersHorizontal,
  ExternalLink,
  Eye,
  Check,
  Droplet,
  Users
} from 'lucide-react';

interface HarvestBatchesViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  lang?: 'en' | 'hi';
}

export function HarvestBatchesView({ onNavigateTab, onShowToast, lang = 'en' }: HarvestBatchesViewProps) {
  const searchInputId = useId();
  const [filter, setFilter] = useState<'all' | 'ready' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQrBatch, setSelectedQrBatch] = useState<any | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedPackSize, setSelectedPackSize] = useState('500g');
  const [isGeneratingSpool, setIsGeneratingSpool] = useState(false);

  // Featured Batch
  const featuredBatch = {
    id: 'KVIC-2026-JK-8841',
    title: 'Kashmir Valley White Honey',
    titleHi: 'रॉबिनिया सफेद शहद',
    harvestDate: '24 Oct 2025',
    description: 'Extracted from Robinia pseudoacacia blossom in higher elevation Pahalgam apiary zones. Unheated, raw filtered cold processing.',
    quantityKg: 450,
    jarsCount: 900,
    grade: 'Grade A+',
    gradeSub: 'Pure Raw Monofloral',
    nmrAnalysis: 'Pass (0.00%)',
    nmrSub: 'C4 Invert Sugar Absent',
    mspValuation: '₹2,47,500',
    mspSub: '₹550 / KG Base Rate',
    hash: '0x93FA...8841',
    hives: [
      'Hive #01 (Flora Optimal)',
      'Hive #02 (Pahalgam Ridge)',
      'Hive #05 (High Yield)',
      'Hive #08 (Healthy Brood)',
    ],
  };

  // 3 Sub-batches
  const subBatches = [
    {
      id: 'KVIC-2025-JK-7420',
      title: 'Himachal Wild Mustard Honey',
      titleHi: 'सरसों शहद',
      harvestDate: '12 Aug 2025',
      status: 'Dispatched',
      statusType: 'dispatched',
      weight: '600 KG',
      jars: '1,200',
      grade: 'Creamed',
      destLabel: 'DESTINATION',
      destValue: 'Dispatched to Khadi Kendra',
      destSub: 'Consignment #KK-DEL-409',
    },
    {
      id: 'KVIC-2025-JK-6112',
      title: 'Wild Forest Multifloral',
      titleHi: 'जंगली शहद',
      harvestDate: '15 May 2025',
      status: 'Ready for Sale',
      statusType: 'ready',
      weight: '320 KG',
      jars: '640',
      grade: 'Grade A',
      destLabel: 'STORAGE VAULT',
      destValue: 'Pahalgam Cooperative',
      destSub: '100% NMR Passed',
    },
    {
      id: 'KVIC-2025-JK-5091',
      title: 'Litchi Orchard Blossom',
      titleHi: 'लीची शहद',
      harvestDate: '04 April 2025',
      status: 'Ready for Sale',
      statusType: 'ready',
      weight: '400 KG',
      jars: '800',
      grade: 'Grade A+',
      destLabel: 'TEST CERT',
      destValue: 'NABL-KVIC-44910',
      destSub: 'FSSAI Organic Safe',
    },
  ];

  const handlePrintSubmit = () => {
    setIsGeneratingSpool(true);
    setTimeout(() => {
      setIsGeneratingSpool(false);
      setIsPrintModalOpen(false);
      onShowToast({
        title: 'Print Spool Downloaded',
        message: `900 QR adhesive stickers formatted for ${selectedPackSize} jars downloaded.`,
        type: 'success',
      });
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-500 font-semibold tracking-wider uppercase text-[11px]">
            LEDGER STAGE 04 • PROVENANCE MINTING
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-700 font-medium">Live Cryptographic Sync</span>
        </div>
      </div>

      {/* Main View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-display">
            Harvest Batches • शहद लॉट व क्यूआर कोड
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            Immutable harvest lot registry certified under NABL and KVIC honey standards. Generate, download, and trace tamper-evident tamper-proof consumer QR tags.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab('register-batch')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-red-400 stroke-[2.5]" />
            <span>+ नई फसल दर्ज करें (+ Register New Batch)</span>
          </button>
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Bulk Print Queue (900)</span>
          </button>
        </div>
      </div>

      {/* 4 Sovereign Metric Cards matching image.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold tracking-wider uppercase">
            <span>REGISTERED BATCHES</span>
            <Package className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900 tracking-tight">
            06 <span className="text-xs font-normal text-stone-500">लॉट सत्यापित</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>All lots on Polygon PoS Ledger</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold tracking-wider uppercase">
            <span>TOTAL HONEY HARVESTED</span>
            <Droplet className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900 tracking-tight">
            2,450 <span className="text-xs font-normal text-stone-500">KG (कुल शहद)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium mt-1">
            <Droplet className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Harvested across 34 Active Hives</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold tracking-wider uppercase">
            <span>VERIFIED QR JARS IN MARKET</span>
            <QrCode className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900 tracking-tight">
            4,900 <span className="text-xs font-normal text-stone-500">मुहरबंद जार</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Live in Khadi Gramodyog Bhawans</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold tracking-wider uppercase">
            <span>PURITY CERTIFIED (NABL)</span>
            <Award className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700 tracking-tight">
            100% <span className="text-xs font-normal text-stone-500">NABL NMR Pass</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>C4/Rice Sugar Zero Detected</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar matching image.png */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Batches (सभी लॉट) • 6
          </button>
          <button
            onClick={() => setFilter('ready')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'ready'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Ready for Sale • 4
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'archived'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Archived Batches • 2
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Batch ID, Floral Source, or Hive..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800 focus:border-amber-800"
            />
          </div>
          <button
            onClick={() => {
              onShowToast({
                title: 'Filters Active',
                message: 'Sorting by harvest freshness and NABL certification status.',
                type: 'info',
              });
            }}
            className="p-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-600 transition-colors"
            title="Filter options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Batch Card matching image.png */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: QR Seal */}
          <div className="lg:col-span-4 bg-stone-50/70 border border-stone-200/70 rounded-xl p-5 flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-stone-500 mb-3">
              <span className="font-semibold uppercase tracking-wider text-stone-600">CRYPTOGRAPHIC QR</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                VERIFIED
              </span>
            </div>

            {/* Stylized QR Box matching image.png */}
            <div className="w-48 h-48 bg-white border border-stone-300 rounded-xl p-3 shadow-xs relative flex items-center justify-center my-1 group">
              <div className="w-full h-full border-2 border-stone-800 rounded-lg p-2 flex flex-col justify-between relative bg-stone-50/50">
                <div className="flex justify-between">
                  <div className="w-9 h-9 border-4 border-stone-900 rounded-xs flex items-center justify-center">
                    <div className="w-4 h-4 bg-stone-900 rounded-2xs" />
                  </div>
                  <div className="w-9 h-9 border-4 border-stone-900 rounded-xs flex items-center justify-center">
                    <div className="w-4 h-4 bg-stone-900 rounded-2xs" />
                  </div>
                </div>

                {/* Center Amber Hex Badge */}
                <div className="absolute inset-0 m-auto w-11 h-11 bg-amber-800 rounded-lg text-amber-100 flex items-center justify-center shadow-md border border-amber-600/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#92400e" />
                    <circle cx="12" cy="12" r="2.5" fill="#fef3c7" stroke="none" />
                  </svg>
                </div>

                <div className="flex justify-between items-end">
                  <div className="w-9 h-9 border-4 border-stone-900 rounded-xs flex items-center justify-center">
                    <div className="w-4 h-4 bg-stone-900 rounded-2xs" />
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-1">
                    <div className="w-2.5 h-2.5 bg-stone-800 rounded-xs" />
                    <div className="w-2.5 h-2.5 bg-stone-800 rounded-xs" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 rounded bg-stone-900 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
                SCAN TO AUDIT
              </div>
            </div>

            <div className="mt-3 font-mono text-xs text-stone-600 font-medium">
              HASH: <span className="text-stone-900 font-semibold">{featuredBatch.hash}</span>
            </div>
            <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tamper-Proof Smart Seal</span>
            </div>
          </div>

          {/* Right Column: Batch Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-stone-100 font-mono text-xs font-bold text-stone-800 border border-stone-200">
                  {featuredBatch.id}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Govt Approved &amp; Verified (हरित मुहर)</span>
                </span>
              </div>
              <span className="text-xs text-stone-500">
                Harvested: <strong className="text-stone-700">{featuredBatch.harvestDate}</strong>
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {featuredBatch.title} • {featuredBatch.titleHi}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                {featuredBatch.description}
              </p>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
              <div>
                <div className="text-[10.5px] uppercase tracking-wider font-semibold text-stone-500">QUANTITY</div>
                <div className="text-base font-bold text-stone-900 mt-0.5">{featuredBatch.quantityKg} KG</div>
                <div className="text-[11px] text-stone-500">{featuredBatch.jarsCount} Consumer Jars</div>
              </div>

              <div>
                <div className="text-[10.5px] uppercase tracking-wider font-semibold text-stone-500">GRADE &amp; PURITY</div>
                <div className="text-base font-bold text-emerald-700 mt-0.5">{featuredBatch.grade}</div>
                <div className="text-[11px] text-emerald-700 font-medium">{featuredBatch.gradeSub}</div>
              </div>

              <div>
                <div className="text-[10.5px] uppercase tracking-wider font-semibold text-stone-500">NMR ANALYSIS</div>
                <div className="text-base font-bold text-stone-900 mt-0.5">{featuredBatch.nmrAnalysis}</div>
                <div className="text-[11px] text-stone-500">{featuredBatch.nmrSub}</div>
              </div>

              <div>
                <div className="text-[10.5px] uppercase tracking-wider font-semibold text-stone-500">MSP VALUATION</div>
                <div className="text-base font-bold text-amber-800 mt-0.5">{featuredBatch.mspValuation}</div>
                <div className="text-[11px] text-stone-500">{featuredBatch.mspSub}</div>
              </div>
            </div>

            {/* Linked Apiary Boxes */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
                LINKED APIARY BOXES (आईओटी स्मार्ट बक्से)
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {featuredBatch.hives.map((hive) => (
                  <span
                    key={hive}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-mono border border-stone-200/70"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{hive}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onShowToast({
                    title: 'Batch PDF Downloaded',
                    message: 'Downloaded printable adhesive sticker spool for 900 jars.',
                    type: 'success',
                  });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download All 900 QR Stickers (PDF)</span>
              </button>

              <button
                onClick={() => {
                  onShowToast({
                    title: 'QR Code PNG Saved',
                    message: 'Single master QR code graphic saved in 600 DPI.',
                    type: 'success',
                  });
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
              >
                <QrCode className="w-4 h-4 text-stone-600" />
                <span>Download Single QR (PNG)</span>
              </button>

              <button
                onClick={() => onNavigateTab('nmr-lab-reports')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 hover:text-emerald-900 transition-colors ml-auto"
              >
                <span>View Public Consumer Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Smaller Batch Cards matching image.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {subBatches.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-xl border border-stone-200/90 p-5 flex flex-col justify-between shadow-2xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-50 font-mono text-xs font-bold text-amber-900 border border-amber-200/80">
                  {b.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 ${
                    b.statusType === 'dispatched'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {b.statusType === 'dispatched' ? (
                    <Truck className="w-3 h-3 text-blue-600" />
                  ) : (
                    <Check className="w-3 h-3 text-emerald-600" />
                  )}
                  <span>{b.status}</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-base leading-snug">{b.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {b.titleHi} • <span className="font-medium text-stone-600">Harvest Date: {b.harvestDate}</span>
                </p>
              </div>

              {/* 3 Mini Stats */}
              <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-lg bg-stone-50 text-center text-xs">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-stone-500">WEIGHT</div>
                  <div className="font-bold text-stone-900 mt-0.5">{b.weight}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-stone-500">JARS</div>
                  <div className="font-bold text-stone-900 mt-0.5">{b.jars}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-stone-500">GRADE</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{b.grade}</div>
                </div>
              </div>

              {/* Mini QR + Dest Info */}
              <div className="flex items-center gap-3 text-xs text-stone-600 pt-1">
                <div className="w-12 h-12 bg-stone-100 rounded-lg border border-stone-200 p-1 flex items-center justify-center shrink-0">
                  <QrCode className="w-8 h-8 text-stone-800" />
                </div>
                <div className="space-y-0.5 text-[11px] leading-tight">
                  <div className="text-[10px] uppercase font-semibold text-stone-400">{b.destLabel}</div>
                  <div className="font-semibold text-stone-900">{b.destValue}</div>
                  <div className="text-stone-500 font-mono text-[10px]">{b.destSub}</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-2">
              <button
                onClick={() => {
                  onShowToast({
                    title: 'Stickers Ready',
                    message: `Labels downloaded for lot ${b.id}.`,
                    type: 'success',
                  });
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download QR Stickers</span>
              </button>
              <button
                onClick={() => onNavigateTab('nmr-lab-reports')}
                className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                title="View Lab Report"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateTab('cooperative-pools')}
                className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition-colors"
                title="Pledge to Cooperative Pool (शहद संघ)"
              >
                <Users className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Sticker Print Preview & Packaging Specs matching image.png */}
      <div className="space-y-3 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-amber-800" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Quick Sticker Print Preview &amp; Packaging Specs
              </h3>
              <p className="text-xs text-stone-500">
                Guidelines for applying KVIC tamper-evident blockchain QR adhesive stickers to glass jars
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onShowToast({
                title: 'Template Kit Downloaded',
                message: 'Downloaded Adobe InDesign & CorelDraw sticker layout guidelines.',
                type: 'success',
              });
            }}
            className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
          >
            Download PDF Template Kit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-sm">250g Glass Jar</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                Round / Hex
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Recommended for monofloral &amp; high-value raw comb honey
            </p>
            <div className="p-2.5 rounded-lg bg-stone-50 text-[11px] space-y-1 font-mono text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Sticker Size:</span>
                <span className="font-bold">45mm × 45mm Square</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Placement:</span>
                <span>Side Body / Cap Flange</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Print Density:</span>
                <span>300 DPI Thermal/Gloss</span>
              </div>
            </div>
            <div className="text-[10.5px] text-stone-500 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tamper seal must cross over metal lid closure.</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-sm">500g Glass Jar</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                Standard
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Standard retail pack for Khadi Gramodyog nationwide outlets
            </p>
            <div className="p-2.5 rounded-lg bg-stone-50 text-[11px] space-y-1 font-mono text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Sticker Size:</span>
                <span className="font-bold">55mm × 55mm Square</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Placement:</span>
                <span>Front Center Traceability Band</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Print Density:</span>
                <span>300 DPI Laser/Vinyl</span>
              </div>
            </div>
            <div className="text-[10.5px] text-stone-500 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official KVIC holographic watermark pre-applied.</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-sm">1 KG Institutional Pack</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                Bulk Glass/Pail
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Cooperative bulk distribution, wellness centers &amp; institutional buyers
            </p>
            <div className="p-2.5 rounded-lg bg-stone-50 text-[11px] space-y-1 font-mono text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Sticker Size:</span>
                <span className="font-bold">70mm × 70mm Square</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Placement:</span>
                <span>Dual Side (Seal + Master QR)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Print Density:</span>
                <span>600 DPI Heavy-Duty Resin</span>
              </div>
            </div>
            <div className="text-[10.5px] text-stone-500 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Moisture &amp; cold storage resistant adhesive required.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Print Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-800" />
                <h4 className="text-sm font-bold text-stone-900">Bulk Jar Label Printing</h4>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Select Jar Packaging Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {['250g', '500g', '1 KG'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedPackSize(sz)}
                      className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                        selectedPackSize === sz
                          ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div>{sz} Jar</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {sz === '250g' ? '45×45 mm' : sz === '500g' ? '55×55 mm' : '70×70 mm'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Paper Layout Sheet</label>
                <select className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-800">
                  <option>Standard A4 Sheet (24 labels per page)</option>
                  <option>Continuous Thermal Roll (Zebra/TSC)</option>
                  <option>Pre-Cut Adhesive Vinyl (Khadi Official)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Batch Reference:</span>
                  <span className="font-mono font-semibold text-stone-900">KVIC-2026-JK-8841</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-semibold text-stone-900">900 Serialized Stickers</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(false)}
                  className="flex-1 py-2 px-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePrintSubmit}
                  disabled={isGeneratingSpool}
                  className="flex-1 py-2 px-3 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
                >
                  {isGeneratingSpool ? (
                    <span>Generating Spool...</span>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
