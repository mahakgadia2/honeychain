import { useState } from 'react';
import { NavTab, ToastMessage } from '../types';
import { PgsGuaranteeView } from './PgsGuaranteeView';
import {
  Users,
  Package,
  ShieldCheck,
  Lock,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building2,
  Scale,
  FileText,
  QrCode,
  PhoneCall,
  ExternalLink,
  X,
  Play,
  Layers,
  MapPin,
  FlaskConical,
  Check,
  Copy,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Ban,
  CalendarCheck
} from 'lucide-react';

interface CooperativePoolsViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  lang?: 'en' | 'hi';
}

interface FarmerLot {
  id: string;
  code: string;
  grade: string;
  flora: string;
  floraHi: string;
  weight: number;
  moisture: string;
  status: 'pledged' | 'available';
  targetPoolId?: string;
  nmrPassed: boolean;
}

interface PoolContract {
  id: string;
  lotCode: string;
  tagColor: string;
  title: string;
  titleHi: string;
  buyer: string;
  ratePerKg: number;
  rateNote: string;
  targetKg: number;
  pledgedKg: number;
  remainingKg: number;
  deadline: string;
  purityCriteria: string;
  depot: string;
  isPledgedByUser?: boolean;
  userPledgedKg?: number;
  userPledgedLotCode?: string;
  additionalQualifications?: string[];
  additionalQualificationsHi?: string[];
}

export function CooperativePoolsView({ onNavigateTab, onShowToast, lang = 'en' }: CooperativePoolsViewProps) {
  // Modal states
  const [selectedEscrowPool, setSelectedEscrowPool] = useState<PoolContract | null>(null);
  const [isDepotModalOpen, setIsDepotModalOpen] = useState(false);
  const [isJoinFpoModalOpen, setIsJoinFpoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [expandedQualifications, setExpandedQualifications] = useState<Record<string, boolean>>({});

  const toggleQualifications = (poolId: string) => {
    setExpandedQualifications((prev) => ({
      ...prev,
      [poolId]: !prev[poolId],
    }));
  };

  // Available lots for pledging
  const [farmerLots, setFarmerLots] = useState<FarmerLot[]>([
    {
      id: 'lot-8841',
      code: 'Lot #KV-2026-JK-8841',
      grade: 'Grade A+',
      flora: 'White Acacia Robinia',
      floraHi: 'सफेद बबूल (रोबिनिया)',
      weight: 450,
      moisture: '16.8%',
      status: 'pledged',
      targetPoolId: 'pool-robinia-eu',
      nmrPassed: true
    },
    {
      id: 'lot-8910',
      code: 'Lot #KV-2026-JK-8910',
      grade: 'Grade A',
      flora: 'Highland Multiflora',
      floraHi: 'पहाड़ी बहुपुष्पीय (मल्टीफ्लोरा)',
      weight: 220,
      moisture: '18.1%',
      status: 'available',
      nmrPassed: true
    },
    {
      id: 'lot-8955',
      code: 'Lot #KV-2026-JK-8955',
      grade: 'Grade A+',
      flora: 'Wild Forest Amber Flora',
      floraHi: 'वन्य औषधीय अंबर शहद',
      weight: 310,
      moisture: '17.2%',
      status: 'available',
      nmrPassed: true
    }
  ]);

  // Form selections
  const [selectedLotId, setSelectedLotId] = useState<string>('lot-8841');
  const [selectedTargetPoolId, setSelectedTargetPoolId] = useState<string>('pool-robinia-eu');
  const [isSubmittingPledge, setIsSubmittingPledge] = useState(false);
  const [mobileSubTab, setMobileSubTab] = useState<'orders' | 'pledge'>('orders');
  const [coopSubSection, setCoopSubSection] = useState<'pools' | 'pgs' | 'pledge'>('pools');
  const [userIsUnderViolation, setUserIsUnderViolation] = useState(false);

  // Pools Data
  const [pools, setPools] = useState<PoolContract[]>([
    {
      id: 'pool-robinia-eu',
      lotCode: 'LOT #EU-EXP-2026-R08',
      tagColor: 'amber',
      title: 'Kashmir Monofloral Robinia Export Consortia',
      titleHi: 'कश्मीर मोनोफ्लोरल रोबिनिया निर्यात संघ',
      buyer: 'TRIFED & European Organic Retail Consortium',
      ratePerKg: 420,
      rateNote: '+18.5% over local mandi (₹380)',
      targetKg: 10000,
      pledgedKg: 7200,
      remainingKg: 2800,
      deadline: 'Closes in 4 Days (15 Nov 2026)',
      purityCriteria: 'Moisture < 17.5% • C4 Sugar 0.0% • Robinia > 85%',
      depot: 'KVIC District Honey Processing Centre, Anantnag',
      isPledgedByUser: true,
      userPledgedKg: 450,
      userPledgedLotCode: 'Lot #KV-JK-8841',
      additionalQualifications: [
        'Moisture Content strictly < 17.5% verified by temperature-calibrated digital refractometer (at 20°C)',
        'Zero C4/C3 exogenous cane or high-fructose corn syrups (0.0% δ13C EA/IRMS isotope ratio confirmation)',
        'HMF (Hydroxymethylfurfural) < 15 mg/kg ensuring zero heat damage and fully active raw enzymes',
        'Robinia pseudoacacia pollen dominance >= 85% certified via official melissopalynological microscopy',
        'Zero synthetic antibiotic residues (Chloramphenicol, Nitrofurans, Streptomycin < LOD 0.1 ppb)',
        'Diastase enzyme activity >= 10 Schade units; Invertase enzyme activity >= 64 U/kg',
        'Packed strictly in food-grade SS304 stainless steel or epoxy-lined drums with KVIC tamper-proof lead seal'
      ],
      additionalQualificationsHi: [
        'नमी की मात्रा 17.5% से कम (20°C तापमान पर डिजिटल रिफ्रैक्टोमीटर द्वारा सत्यापित)',
        'शून्य बाहरी C4/C3 सिरप (0.0% कार्बन आइसोटोप अनुपात सत्यापन द्वारा प्रमाणित)',
        'एचएमएफ (HMF) 15 mg/kg से कम — शत-प्रतिशत कच्चा व बिना गरम किया गया प्राकृतिक शहद',
        'सफेद बबूल (रोबिनिया) परागकण की सांद्रता 85% या उससे अधिक',
        'एंटीबायोटिक व कीटनाशक अवशेष शून्य (LOD 0.1 ppb से कम)',
        'डायस्टेस एंजाइम गतिविधि 10 शेड यूनिट या अधिक (सक्रिय पाचक एंजाइम)',
        'खाद्य-ग्रेड SS304 स्टेनलेस स्टील या सीलबंद ड्रम में छेड़छाड़-रोधी केवीआईसी सील अनिवार्य'
      ]
    },
    {
      id: 'pool-fmcg-multi',
      lotCode: 'LOT #IND-FMCG-2026-MULTI',
      tagColor: 'emerald',
      title: 'Himalayan Multiflora Bulk Supply - National FMCG Retail',
      titleHi: 'हिमालयन मल्टीफ्लोरा सामूहिक आपूर्ति - राष्ट्रीय रिटेल',
      buyer: 'Dabur & Patanjali Certified Sourcing Network',
      ratePerKg: 340,
      rateNote: '+₹45/kg over local brokers (₹295)',
      targetKg: 25000,
      pledgedKg: 14500,
      remainingKg: 10500,
      deadline: 'Closes in 12 Days (23 Nov 2026)',
      purityCriteria: 'Moisture < 19.0% • 100% Raw Unheated Filtered',
      depot: 'Srinagar Agro Logistics Terminal (Gate 3)',
      isPledgedByUser: false,
      additionalQualifications: [
        'Moisture Content < 19.0% strictly meeting FSSAI Gazette Notification standards for domestic retail',
        'Specific Gravity >= 1.35 at 27°C with characteristic high-altitude floral viscosity and aroma intact',
        'Diastase enzyme activity >= 8 Schade units confirming live natural invertase and catalase presence',
        'Free from added rice syrup, inverted beet syrup, or golden syrup (TLC & SIRA tested and passed)',
        'Natural floral pollen count exceeding 25,000 pollen grains per 10 grams of honey sample',
        'Free from chemical defoamers and clarifying agents; pre-filtered through 80-mesh stainless steel sieve',
        'Producer apiary registered with active NBHM hive ID and geo-tagged location within J&K territory'
      ],
      additionalQualificationsHi: [
        'नमी की मात्रा 19.0% से कम (FSSAI राजपत्र घरेलू रिटेल मानकों के पूर्णतः अनुरूप)',
        'विशिष्ट गुरुत्व (Specific Gravity) 27°C पर 1.35 या उससे अधिक',
        'डायस्टेस एंजाइम गतिविधि 8 शेड यूनिट या अधिक (सक्रिय पाचक एंजाइम उपस्थिति)',
        'चावल, चुकंदर या मक्का सिरप से 100% मुक्त (TLC व SIRA प्रयोगशाला जांच उत्तीर्ण)',
        'प्राकृतिक परागकण घनत्व प्रति 10 ग्राम नमूने में 25,000 कणों से अधिक',
        'रासायनिक शोधकों से मुक्त; 80-मेश स्टेनलेस स्टील छलनी से प्राथमिक छनाई',
        'पंजीकृत एनबीएचएम (NBHM) बी-यार्ड और जियो-टैग स्थान सत्यापन अनिवार्य'
      ]
    },
    {
      id: 'pool-wild-kvic',
      lotCode: 'LOT #KVIC-WILD-2026-ORG',
      tagColor: 'orange',
      title: 'High Altitude Wild Forest Honey (जंगली शहद सामूहिक लॉट)',
      titleHi: 'उच्च हिमालयी जंगली शहद (खादी इंडिया प्रीमियम)',
      buyer: 'KVIC Gramodyog Direct Stores & Khadi India Premium Network',
      ratePerKg: 460,
      rateNote: 'Direct Khadi Premium Grade',
      targetKg: 5000,
      pledgedKg: 1800,
      remainingKg: 3200,
      deadline: 'Aggregation starts 20 Nov 2026',
      purityCriteria: 'Open for Verified Organic Beekeepers • Forest Origin Certified',
      depot: 'Pahalgam Eco-Collection Depot #02',
      isPledgedByUser: false,
      additionalQualifications: [
        '100% Wild Forest Flora origin certified by TRIFED and high-altitude forest range officers (> 2,000m ASL)',
        'Harvested exclusively via KVIC-approved non-destructive sustainable comb-cutting techniques',
        'Zero chemical pesticides, synthetic acaricides, or industrial contaminants (certified organic wild zone)',
        'Water activity (aw) < 0.60 to prevent wild yeast fermentation in raw unpasteurized state',
        'Direct optical rotation characteristic of wild flora nectar (-12.0° to -15.0°)',
        'Insoluble impurities < 0.1% (clean cold-strained wax particulate removal)',
        'Physical inspection and composite batch sealing by Pahalgam District KVIC Field Superintendent'
      ],
      additionalQualificationsHi: [
        'उच्च हिमालयी वन्य वनस्पति मूल प्रमाण पत्र (समुद्र तल से 2,000+ मीटर की ऊंचाई से प्राप्त)',
        'खादी आयोग (KVIC) अनुमोदित अहिंसक व पर्यावरण-अनुकूल निष्कर्षण तकनीक',
        'रासायनिक कीटनाशक, खरपतवारनाशक या बाहरी रसायनों से पूर्णतः मुक्त पर्वतीय क्षेत्र',
        'जल सक्रियता (aw) 0.60 से कम ताकि बिना पाश्चुरीकृत किए भी किण्वन न हो',
        'ऑप्टिकल रोटेशन (-12.0° से -15.0°) जो असली जंगली हिमालयी शहद की पहचान है',
        'अघुलनशील अशुद्धियाँ 0.1% से कम (स्वच्छ गुरुत्वाकर्षण शीत छनाई)',
        'पहलगाम क्षेत्रीय खादी अधीक्षक द्वारा निष्कर्षण केंद्र पर प्रत्यक्ष सत्यापन व सीलिंग'
      ]
    }
  ]);

  // Current selected lot object
  const activeSelectedLot = farmerLots.find((l) => l.id === selectedLotId) || farmerLots[0];
  const activeSelectedPool = pools.find((p) => p.id === selectedTargetPoolId) || pools[0];

  // Calculated figures
  const currentNetWeight = activeSelectedLot ? activeSelectedLot.weight : 450;
  const currentRate = activeSelectedPool ? activeSelectedPool.ratePerKg : 420;
  const currentTotalPayout = currentNetWeight * currentRate;

  // Summary Metrics
  const totalUserPledgedKg = farmerLots
    .filter((l) => l.status === 'pledged')
    .reduce((sum, l) => sum + l.weight, 0);

  const totalProjectedPayout = farmerLots
    .filter((l) => l.status === 'pledged')
    .reduce((sum, l) => {
      const p = pools.find((pool) => pool.id === l.targetPoolId);
      const rate = p ? p.ratePerKg : 420;
      return sum + l.weight * rate;
    }, 0);

  const handlePledgeCommit = () => {
    if (userIsUnderViolation) {
      onShowToast({
        title: lang === 'hi' ? 'PGS नियम: समूह बिक्री स्थगित' : 'PGS Rule: Produce Sale Withheld',
        message: lang === 'hi'
          ? 'भागीदारी गारंटी प्रणाली (PGS) के अनुसार, यदि कोई किसान उल्लंघन करता है, तो सुधार होने तक उसका उत्पाद समूह के माध्यम से नहीं बेचा जा सकता।'
          : 'Under PGS scheme rules, produce cannot be sold through the group till you rectify the violation and receive peer re-inspection.',
        type: 'error'
      });
      return;
    }

    if (activeSelectedLot.status === 'pledged') {
      onShowToast({
        title: 'Lot Already Reserved',
        message: `${activeSelectedLot.code} is already allocated and locked in Smart Escrow.`,
        type: 'info'
      });
      return;
    }

    setIsSubmittingPledge(true);
    setTimeout(() => {
      // Update lot status
      setFarmerLots((prev) =>
        prev.map((l) =>
          l.id === activeSelectedLot.id
            ? { ...l, status: 'pledged', targetPoolId: activeSelectedPool.id }
            : l
        )
      );

      // Update pool pledged volume
      setPools((prev) =>
        prev.map((p) =>
          p.id === activeSelectedPool.id
            ? {
                ...p,
                pledgedKg: p.pledgedKg + activeSelectedLot.weight,
                remainingKg: Math.max(0, p.remainingKg - activeSelectedLot.weight),
                isPledgedByUser: true,
                userPledgedKg: (p.userPledgedKg || 0) + activeSelectedLot.weight,
                userPledgedLotCode: activeSelectedLot.code
              }
            : p
        )
      );

      setIsSubmittingPledge(false);
      onShowToast({
        title: 'Collective Batch Pledged Successfully!',
        message: `${activeSelectedLot.code} (${activeSelectedLot.weight} KG) locked to ${activeSelectedPool.title}. Escrow payout ₹${(
          activeSelectedLot.weight * activeSelectedPool.ratePerKg
        ).toLocaleString('en-IN')} reserved.`,
        type: 'success'
      });
    }, 900);
  };

  const copyEscrowHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-8 animate-fade-in">
      {/* 1. Sovereign Banner Header */}
      <section className="bg-white rounded-xl border border-stone-200/90 shadow-xs p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-linear-to-l from-amber-50/70 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-3xl">
            {/* Green Sovereign Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-[10px] sm:text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate">KVIC COLLECTIVE MANDI • न्यूनतम समर्थन मूल्य व अधिप्राप्ति संघ</span>
            </div>

            {/* Headline */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Honey Cooperative Pools{' '}
              <span className="text-amber-800 font-serif font-medium text-lg sm:text-xl lg:text-2xl block xs:inline">
                (मधुमक्खी पालक सहकारी संघ)
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-stone-600 leading-relaxed">
              Pool your verified harvest with fellow valley beekeepers to fulfill massive bulk export and institutional orders. Guarantee fixed above-market MSP rates with cryptographic escrow protection.
            </p>

            {/* Trust Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-y-1.5 gap-x-3 sm:gap-x-6 text-[11px] sm:text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700 shrink-0" />
                100% Direct DBT Bank Settlement
              </span>
              <span className="text-stone-300 hidden xs:inline">•</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
                KVIC Fair-Trade Assured
              </span>
              <span className="text-stone-300 hidden xs:inline">•</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-700 shrink-0" />
                Zero Middleman Cut
              </span>
            </div>
          </div>

          {/* Right Header CTAs */}
          <div className="flex flex-col xs:flex-row lg:flex-col items-stretch gap-2 shrink-0 lg:w-60">
            <button
              onClick={() => setCoopSubSection('pgs')}
              className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors min-h-[42px] cursor-pointer ${
                coopSubSection === 'pgs'
                  ? 'bg-emerald-800 text-white ring-2 ring-emerald-400'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>PGS Organic Scheme</span>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-950 font-bold px-1.5 py-0.5 rounded">
                Verified
              </span>
            </button>
            <button
              onClick={() => setIsJoinFpoModalOpen(true)}
              className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors min-h-[42px]"
            >
              <Users className="w-4 h-4 text-amber-200" />
              <span>Join a Cooperative</span>
              <span className="text-[11px] opacity-80 font-normal hidden sm:inline">(नया संघ)</span>
            </button>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-1.5 sm:py-2 rounded-lg bg-stone-100 hover:bg-stone-200/90 text-stone-800 text-xs sm:text-sm font-semibold border border-stone-200 transition-colors min-h-[38px]"
            >
              <Play className="w-3.5 h-3.5 text-amber-800 fill-amber-800" />
              <span>Video Guide</span>
              <span className="text-[11px] text-stone-500 font-normal hidden sm:inline">(गाइड)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Top 4 Metric Cards - 2x2 on Mobile Phone Screens, 4 on Desktop */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Metric 1: ENROLLED FPO */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-3.5 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-1">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-stone-500 uppercase truncate">
              ENROLLED FPO / संघ
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-base sm:text-lg font-bold text-stone-900 truncate">Pahalgam Valley FPO</div>
            <div className="text-[10px] sm:text-xs text-stone-500 font-medium mt-0.5 truncate">
              पहलगाम घाटी संघ
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px] sm:text-[11px]">
            <span className="font-mono font-semibold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded text-[10px]">
              #JK-FPO-104
            </span>
            <button
              onClick={() => setIsJoinFpoModalOpen(true)}
              className="text-amber-800 hover:underline font-semibold"
            >
              View
            </button>
          </div>
        </div>

        {/* Metric 2: TOTAL PLEDGED */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-3.5 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-1">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-stone-500 uppercase truncate">
              TOTAL PLEDGED / आरक्षित
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              {totalUserPledgedKg.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-stone-500">KG</span>
            </div>
            <div className="text-[10px] sm:text-xs text-stone-500 font-medium mt-0.5 truncate">
              1 Export Pool Locked
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px] sm:text-[11px]">
            <span className="font-mono text-stone-700 font-semibold truncate max-w-[120px] sm:max-w-[160px]">
              Lot #8841 (Robinia)
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          </div>
        </div>

        {/* Metric 3: PROJECTED COLLECTIVE PAYOUT */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-3.5 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-1">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-stone-500 uppercase truncate">
              PROJECTED PAYOUT
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shrink-0">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              ₹{totalProjectedPayout.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] sm:text-xs text-stone-500 font-medium mt-0.5 truncate">
              संभावित आय (एस्क्रो लॉक्ड)
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-stone-100 flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-800 font-semibold truncate">
            <ShieldCheck className="w-3 h-3 text-emerald-700 shrink-0" />
            <span className="truncate">Auto-Settlement</span>
          </div>
        </div>

        {/* Metric 4: COLLECTIVE GAIN */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-3.5 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-1">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-stone-500 uppercase truncate">
              COLLECTIVE GAIN / लाभ
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-800 shrink-0">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-xl sm:text-2xl font-black text-emerald-800">
              +₹40 <span className="text-xs font-normal text-stone-500">/ KG</span>
            </div>
            <div className="text-[10px] sm:text-xs text-stone-500 font-medium mt-0.5 truncate">
              स्थानीय मंडी से अधिक
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-stone-100 text-[10px] sm:text-[11px] text-stone-600 font-medium truncate">
            <span className="text-emerald-700 font-bold">+₹18,000</span> extra on lot
          </div>
        </div>
      </section>

      {/* 2b. PGS Participatory Guarantee Scheme Status Banner */}
      <section className="bg-linear-to-r from-emerald-950 via-stone-900 to-amber-950 text-white rounded-xl p-4 sm:p-5 border border-emerald-700/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wide">
                {lang === 'hi'
                  ? 'भागीदारी गारंटी प्रणाली (PGS-India) जैविक योजना'
                  : 'Participatory Guarantee Systems (PGS) Organic Scheme'}
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded font-mono font-bold">
                Pahalgam Circle #04
              </span>
              {userIsUnderViolation ? (
                <span className="text-[10px] bg-rose-500/30 text-rose-200 border border-rose-400/40 px-2 py-0.5 rounded font-bold uppercase">
                  Sale Withheld (Violation Active)
                </span>
              ) : (
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded font-bold uppercase">
                  5/6 Peers Vouched • 1 In Rectification
                </span>
              )}
            </div>
            <p className="text-xs text-stone-200 mt-1 max-w-3xl leading-relaxed">
              {lang === 'hi'
                ? 'समूह के किसान एक-दूसरे की भूमि का निरीक्षण करते हैं व साप्ताहिक परामर्श देते हैं। यदि कोई किसान उल्लंघन करता पाया जाता है, तो जब तक वह सुधार न कर ले, समूह में उसका शहद नहीं बेचा जाता।'
                : "Farmers in a group inspect each other's land and vouch for its organic credentials. Inspections are conducted at season-start with weekly peer counsel. Violations result in produce sale withheld until rectified."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={() => setCoopSubSection('pgs')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
              coopSubSection === 'pgs'
                ? 'bg-white text-stone-900 ring-2 ring-emerald-400'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <span>{coopSubSection === 'pgs' ? 'Viewing PGS Scheme' : 'Inspect PGS Scheme'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 2c. Section Navigation Switcher (Desktop & Mobile) */}
      <div className="flex p-1 rounded-xl bg-stone-100 border border-stone-300/80 shadow-2xs">
        <button
          type="button"
          onClick={() => {
            setCoopSubSection('pools');
            setMobileSubTab('orders');
          }}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer ${
            coopSubSection === 'pools'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4 text-amber-800 shrink-0" />
          <span>{lang === 'hi' ? 'सामूहिक निर्यात मांग' : 'Bulk Export Pools'} ({pools.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setCoopSubSection('pgs')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer ${
            coopSubSection === 'pgs'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 shrink-0 ${coopSubSection === 'pgs' ? 'text-emerald-200' : 'text-emerald-700'}`} />
          <span className="truncate">{lang === 'hi' ? 'PGS सहकर्मी जैविक गारंटी' : 'PGS Organic Peer Guarantee'}</span>
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${coopSubSection === 'pgs' ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-100 text-emerald-900'}`}>
            5/6 Vouched
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCoopSubSection('pledge');
            setMobileSubTab('pledge');
          }}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer ${
            coopSubSection === 'pledge'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Lock className="w-4 h-4 text-amber-800 shrink-0" />
          <span>{lang === 'hi' ? 'लॉट आरक्षण (Pledge)' : 'Pledge Batch'}</span>
          {farmerLots.some(l => l.status === 'pledged') && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          )}
        </button>
      </div>

      {/* 2d. PGS Guarantee View Conditional Display */}
      {coopSubSection === 'pgs' && (
        <PgsGuaranteeView
          lang={lang}
          onShowToast={onShowToast}
          onSelectPoolTab={() => setCoopSubSection('pools')}
          userIsUnderViolation={userIsUnderViolation}
          onToggleUserViolation={(v) => setUserIsUnderViolation(v)}
        />
      )}

      {/* 3. Main 2-Column Section: Bulk Orders vs Pledge Form */}
      <section className={`grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start ${coopSubSection === 'pgs' ? 'hidden' : ''}`}>
        {/* Left Column (Col 8): Featured Bulk Demand Orders */}
        <div className={`space-y-4 sm:space-y-6 ${coopSubSection === 'pledge' ? 'hidden' : 'lg:col-span-7 xl:col-span-8'} ${mobileSubTab === 'orders' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                Featured Bulk Demand Orders
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                सक्रिय सामूहिक मांग लॉट • Aggregate with local FPOs to meet certified commercial volume thresholds
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-semibold text-xs shrink-0">
              {pools.length} Active Consortia
            </span>
          </div>

          <div className="space-y-5">
            {pools.map((pool) => {
              const progressPct = Math.min(100, Math.round((pool.pledgedKg / pool.targetKg) * 100));

              return (
                <div
                  key={pool.id}
                  className={`bg-white rounded-xl border transition-all ${
                    pool.isPledgedByUser
                      ? 'border-amber-400/90 shadow-sm ring-1 ring-amber-400/30'
                      : 'border-stone-200/90 shadow-xs hover:border-stone-300'
                  } p-5 sm:p-6 space-y-4`}
                >
                  {/* Top Bar: Lot Code & Price */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700 font-mono text-xs font-bold">
                        {pool.lotCode}
                      </span>
                      {pool.isPledgedByUser && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-800 stroke-[3]" />
                          PLEDGED BY YOU ({pool.userPledgedKg} KG)
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        GUARANTEED RATE
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-stone-900">
                        ₹{pool.ratePerKg}{' '}
                        <span className="text-xs font-normal text-stone-500">/ KG</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-semibold">
                        {pool.rateNote}
                      </div>
                    </div>
                  </div>

                  {/* Title & Buyer */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">{pool.title}</h3>
                    <div className="text-xs text-stone-600 font-medium mt-0.5">
                      <span className="text-stone-400">Buyer:</span>{' '}
                      <span className="text-stone-800 font-semibold">{pool.buyer}</span>
                    </div>
                  </div>

                  {/* Progress Bar & Volumes */}
                  <div className="space-y-1.5 bg-stone-50 p-3.5 rounded-lg border border-stone-200/70">
                    <div className="flex justify-between items-center text-xs font-semibold text-stone-800">
                      <span className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-stone-500" />
                        Aggregate Target: {pool.targetKg.toLocaleString('en-IN')} KG
                      </span>
                      <span className="text-amber-900 font-bold">
                        {pool.pledgedKg.toLocaleString('en-IN')} KG Pledged ({progressPct}%)
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-amber-600 to-amber-700 transition-all duration-500 rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] pt-1">
                      <span className="text-stone-500">
                        Remaining to Lock: <strong className="text-stone-700">{pool.remainingKg.toLocaleString('en-IN')} KG</strong>
                      </span>
                      <span className="text-rose-700 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pool.deadline}
                      </span>
                    </div>
                  </div>

                  {/* 2 Grid Info Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded-lg bg-white border border-stone-200/80 text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                        <FlaskConical className="w-3 h-3 text-amber-700" />
                        {lang === 'hi' ? 'शुद्धता मानक:' : 'Purity Benchmarks:'}
                      </div>
                      <div className="font-semibold text-stone-800 mt-1">{pool.purityCriteria}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-stone-200/80 text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-600" />
                        {lang === 'hi' ? 'संकलन डिपो:' : 'Aggregation Depot:'}
                      </div>
                      <div className="font-semibold text-stone-800 mt-1">{pool.depot}</div>
                    </div>
                  </div>

                  {/* Additional Qualifications Required for Honey (Read More / Read Less) */}
                  {pool.additionalQualifications && pool.additionalQualifications.length > 0 && (
                    <div className="rounded-xl border border-amber-200/90 bg-amber-50/40 p-3 sm:p-3.5 text-xs transition-all">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-bold text-stone-900">
                          <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                          <span>
                            {lang === 'hi'
                              ? 'शहद के लिए अतिरिक्त योग्यताएं व मानक'
                              : 'Additional Qualifications Required for Honey'}
                          </span>
                          <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded-full bg-amber-200/70 text-[10px] font-bold text-amber-900">
                            {(lang === 'hi' ? pool.additionalQualificationsHi : pool.additionalQualifications)?.length || 0}{' '}
                            {lang === 'hi' ? 'शर्तें' : 'standards'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleQualifications(pool.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-amber-100/80 border border-amber-200 text-amber-900 font-bold text-[11px] shadow-2xs transition-all cursor-pointer shrink-0"
                          aria-expanded={Boolean(expandedQualifications[pool.id])}
                        >
                          <span>
                            {expandedQualifications[pool.id]
                              ? (lang === 'hi' ? 'संक्षेप में देखें' : 'Read Less')
                              : (lang === 'hi' ? 'और पढ़ें' : 'Read More')}
                          </span>
                          {expandedQualifications[pool.id] ? (
                            <ChevronUp className="w-3.5 h-3.5 text-amber-800" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-amber-800" />
                          )}
                        </button>
                      </div>

                      {/* Collapsed Preview Line */}
                      {!expandedQualifications[pool.id] && (
                        <div className="mt-1.5 flex items-center justify-between text-[11px] text-stone-600">
                          <span className="truncate pr-2">
                            <strong className="text-stone-700 font-semibold">
                              {lang === 'hi' ? 'मुख्य शर्त:' : 'Core requirement:'}
                            </strong>{' '}
                            {(lang === 'hi' ? pool.additionalQualificationsHi : pool.additionalQualifications)?.[0]}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleQualifications(pool.id)}
                            className="text-amber-900 font-bold hover:underline shrink-0 text-[11px] cursor-pointer"
                          >
                            {lang === 'hi' ? '+ और पढ़ें' : '+ Read More'}
                          </button>
                        </div>
                      )}

                      {/* Expanded Full Qualifications Checklist */}
                      {expandedQualifications[pool.id] && (
                        <div className="mt-2.5 pt-2.5 border-t border-amber-200/70 space-y-2 animate-fade-in">
                          <ul className="space-y-1.5">
                            {(lang === 'hi' ? pool.additionalQualificationsHi : pool.additionalQualifications)?.map(
                              (item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-stone-700 text-[11px] leading-relaxed">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              )
                            )}
                          </ul>

                          <div className="pt-2 border-t border-amber-200/50 flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-600">
                            <span className="flex items-center gap-1 font-semibold text-emerald-800">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              {lang === 'hi'
                                ? 'केवीआईसी एवं एनएमआर स्पेक्ट्रोस्कोपी द्वारा 100% डिजिटल सत्यापन'
                                : '100% Digitally Verified by KVIC & NMR Spectrometry'}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleQualifications(pool.id)}
                              className="text-amber-900 font-bold hover:underline cursor-pointer"
                            >
                              {lang === 'hi' ? 'संक्षेप में देखें (Read Less)' : 'Close (Read Less)'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Card Action / Confirmation Banner */}
                  <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {pool.isPledgedByUser ? (
                      <>
                        <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            Your Batch <strong className="font-mono text-stone-900">{pool.userPledgedLotCode}</strong> ({pool.userPledgedKg} KG) Pledged: NMR Validated & Reserved in Smart Escrow
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedEscrowPool(pool)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-950 underline shrink-0 cursor-pointer"
                        >
                          View Escrow Contract <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-xs text-stone-600 font-medium">
                          You have <strong className="text-emerald-800">2 NMR Eligible</strong> Unpledged Lots
                        </div>
                        <button
                          onClick={() => {
                            setSelectedTargetPoolId(pool.id);
                            setMobileSubTab('pledge');
                            setTimeout(() => {
                              document.getElementById('pledge-form-card')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer min-h-[44px]"
                        >
                          <span>+ Pledge Batch</span>
                          <span className="text-[10px] font-normal opacity-85">(अपना शहद जोड़ें)</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 1-Click "Commit Batch" Form & Depot Card */}
        <div className={`space-y-4 sm:space-y-6 ${coopSubSection === 'pledge' ? 'lg:col-span-8 lg:col-start-3 max-w-2xl mx-auto w-full' : 'lg:col-span-5 xl:col-span-4'} ${coopSubSection === 'pledge' || mobileSubTab === 'pledge' ? 'block' : 'hidden lg:block'}`}>
          {/* Card 1: Pledge Batch to Pool Form */}
          <div
            id="pledge-form-card"
            className="bg-white rounded-xl border border-stone-200/90 p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5 relative"
          >
            {/* Header with Green Lock Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">Pledge Batch to Pool</h3>
                  <div className="text-xs text-stone-500 font-medium">अपनी प्रमाणित लॉट चुनें</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono text-[10px] font-bold">
                ESCROW LOCK
              </span>
            </div>

            {/* Selection 1: Farmer Harvest Lot */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                SELECT FARMER HARVEST LOT (चयनित लॉट)
              </label>

              <div className="space-y-2">
                {farmerLots.map((lot) => {
                  const isSelected = selectedLotId === lot.id;
                  const isPledged = lot.status === 'pledged';

                  return (
                    <div
                      key={lot.id}
                      onClick={() => setSelectedLotId(lot.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/50 ring-1 ring-amber-700'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <input
                            type="radio"
                            name="harvestLot"
                            checked={isSelected}
                            onChange={() => setSelectedLotId(lot.id)}
                            className="mt-1 accent-amber-800 cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-stone-900">
                              <span>{lot.code}</span>
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px]">
                                {lot.grade}
                              </span>
                            </div>
                            <div className="text-xs text-stone-600 font-medium mt-0.5">
                              {lot.flora} • <strong className="text-stone-900">{lot.weight} KG</strong>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-medium mt-1">
                              <span className="flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                NMR Passed
                              </span>
                              <span>•</span>
                              <span>Moisture {lot.moisture}</span>
                            </div>
                          </div>
                        </div>

                        {isPledged ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold shrink-0">
                            Pledged
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-semibold shrink-0">
                            Available
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selection 2: Target Consortia */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                TARGET CONSORTIA (लक्षित पूल)
              </label>
              <select
                value={selectedTargetPoolId}
                onChange={(e) => setSelectedTargetPoolId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold text-stone-900 bg-white border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 focus:border-amber-800 cursor-pointer"
              >
                {pools.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title.substring(0, 36)}... (₹{p.ratePerKg}/KG)
                  </option>
                ))}
              </select>
            </div>

            {/* Instant Dynamic Calculation Box */}
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Pledged Net Weight:</span>
                <span className="font-bold text-stone-900">{currentNetWeight} KG</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Guaranteed Pool Rate:</span>
                <span className="font-bold text-stone-900">₹{currentRate} / KG</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>KVIC Platform Fee:</span>
                <span className="font-semibold text-emerald-700">₹0 (Subsidized)</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-sm">Total Payout (सीधा भुगतान):</span>
                <span className="font-black text-amber-900 text-lg sm:text-xl">
                  ₹{currentTotalPayout.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* PGS Organic Guarantee Clearance Box */}
            <div
              className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                userIsUnderViolation
                  ? 'bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-200'
                  : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold flex items-center gap-1.5">
                  {userIsUnderViolation ? (
                    <Ban className="w-4 h-4 text-rose-700 shrink-0" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  )}
                  <span>
                    {userIsUnderViolation
                      ? (lang === 'hi' ? 'PGS उल्लंघन सक्रिय • समूह बिक्री स्थगित' : 'PGS Violation Active • Produce Sale Withheld')
                      : (lang === 'hi' ? 'PGS सहकर्मी जैविक प्रमाणन • मान्य' : 'PGS Peer Organic Voucher • Cleared')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCoopSubSection('pgs')}
                  className="text-[11px] font-bold text-amber-900 hover:underline cursor-pointer"
                >
                  {lang === 'hi' ? 'योजना देखें' : 'View Scheme'} →
                </button>
              </div>

              <p className="text-[11px] text-stone-600 leading-relaxed">
                {userIsUnderViolation
                  ? (lang === 'hi'
                      ? 'PGS नियम: यदि कोई किसान नियमों का उल्लंघन करता पाया जाता है, तो जब तक वह सुधार न कर ले, समूह में उसका उत्पाद नहीं बेचा जा सकता।'
                      : 'Under PGS scheme rules: If a farmer is found to be in violation, produce is NOT sold through the group till she rectifies her mistake.')
                  : (lang === 'hi'
                      ? 'पहलगाम सर्कल #04 द्वारा फार्म का निरीक्षण व साप्ताहिक परामर्श सत्यापित। 100% जैविक निर्यात हेतु मान्य।'
                      : 'Inspected by local peer farmers at season start and counselled weekly. 100% organic vouched.')}
              </p>

              {/* Toggle to simulate / test enforcement rule */}
              <div className="pt-1.5 flex items-center justify-between border-t border-stone-200/60 text-[10px] text-stone-500">
                <span>{lang === 'hi' ? 'PGS नियम परीक्षण (सिमुलेशन):' : 'PGS Rule Safeguard Simulation:'}</span>
                <button
                  type="button"
                  onClick={() => setUserIsUnderViolation(!userIsUnderViolation)}
                  className="px-2 py-0.5 rounded bg-white border border-stone-300 font-semibold hover:bg-stone-50 text-stone-700 cursor-pointer"
                >
                  {userIsUnderViolation ? 'Reset to Vouched (Clean)' : 'Test Violation Lock'}
                </button>
              </div>
            </div>

            {/* Smart Escrow Security Note */}
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-700 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="leading-snug text-stone-600">
                <strong>Smart Escrow Security:</strong> Payout auto-executes straight to Ghulam Mohammad's Aadhaar DBT account upon hub composite barcode scan.
              </p>
            </div>

            {/* Confirmation CTA Button */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={handlePledgeCommit}
                disabled={isSubmittingPledge || userIsUnderViolation}
                className={`w-full py-3 px-4 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  userIsUnderViolation
                    ? 'bg-rose-900 hover:bg-rose-950 text-white cursor-not-allowed opacity-90'
                    : 'bg-amber-900 hover:bg-amber-950 active:scale-[0.99] text-white disabled:opacity-75'
                }`}
              >
                {userIsUnderViolation ? (
                  <>
                    <Ban className="w-4 h-4 text-rose-300" />
                    <span>Sale Withheld (PGS Violation Active)</span>
                  </>
                ) : isSubmittingPledge ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Minting Blockchain Pledge...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>Confirm Collective Pledge (पुष्टि करें)</span>
                  </>
                )}
              </button>
              <div className="text-center text-[10px] text-stone-500 font-mono">
                {userIsUnderViolation
                  ? 'Resolve violation in PGS scheme tab to re-authorize group sale'
                  : 'Cryptographic Hash generated on Polygon Private Network'}
              </div>
            </div>
          </div>

          {/* Card 2: Assigned Aggregation Depot */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
              <span>Your Assigned Aggregation Depot</span>
            </div>

            <div className="space-y-1 text-xs text-stone-600">
              <div className="font-bold text-stone-900 text-sm">KVIC Mandi Center #04, Anantnag</div>
              <div>NH-44 Bypass, Industrial Area, Anantnag, J&K.</div>
              <div className="text-stone-500 pt-0.5">
                Superintendent: <strong>Er. Tariq Ahmad</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setIsDepotModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
              >
                <span>View Drop Slots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="tel:+919419028192"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition-colors"
              >
                <PhoneCall className="w-3 h-3 text-amber-800" />
                <span>Call Depot</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Educational & Operational Flow (How Collective Aggregation Works) */}
      {coopSubSection !== 'pgs' && (
        <>
          <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="text-[11px] font-bold tracking-widest uppercase text-amber-800">
            PARCHMENT TO SMART ESCROW • पारदर्शी प्रक्रिया
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            How Collective Aggregation Works (सामूहिक बिक्री प्रक्रिया)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Guaranteed protection from farm-gate to global export container with zero broker deduction
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                1
              </div>
              <div className="font-bold text-sm text-stone-900">
                Pledge Online <span className="text-xs font-normal text-stone-500">(किसान लॉट जोड़ें)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Select your lab-tested honey batch. Lock target volume into the active FPO pool with cryptographic reservation.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pre-validated by NMR</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                2
              </div>
              <div className="font-bold text-sm text-stone-900">
                Depot Drop-off <span className="text-xs font-normal text-stone-500">(संग्रहण केंद्र पर जमा)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Drop filled standard food-grade canisters at KVIC Anantnag Hub. Barcodes scanned and sealed digitally.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center gap-1 text-[11px] text-stone-700 font-semibold">
              <QrCode className="w-3.5 h-3.5 text-amber-800" />
              <span>Instant QR Dispatch</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                3
              </div>
              <div className="font-bold text-sm text-stone-900">
                Composite Testing <span className="text-xs font-normal text-stone-500">(संयुक्त गुणवत्ता जांच)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Automated composite blending at KVIC. Single Master NABL NMR certificate minted directly to blockchain ledger.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
              <span>NABL Certified</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                4
              </div>
              <div className="font-bold text-sm text-stone-900">
                Instant DBT Payout <span className="text-xs font-normal text-stone-500">(सीधा बैंक खाते में)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Smart contract executes automatic fund release from buyer escrow directly into your Aadhaar-linked bank account within 24h.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Deductions</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Institutional Support & Ombudsman Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Support 1 */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Package className="w-4 h-4 text-amber-800" />
            <span>KVIC FPO Infrastructure Support</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Under the National Beekeeping & Honey Mission (NBHM), registered cooperatives receive 75% capital subsidy for collective automated extraction units and stainless steel testing tanks.
          </p>
        </div>

        {/* Support 2 */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Scale className="w-4 h-4 text-amber-800" />
            <span>Tri-Party Grievance Redressal</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Independent ombudsman committee comprising KVIC District Officers, FPO Farmer Representatives, and Buyer Inspectors ensure unbiased resolution within 48 business hours.
          </p>
        </div>

        {/* Support 3: Helpline */}
        <div className="bg-amber-50/70 rounded-xl border border-amber-200 p-5 shadow-xs space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
            NEED BULK AGGREGATION ASSISTANCE?
          </div>
          <div className="text-xl font-black text-amber-950 font-mono">
            1800-HONEY-KVIC
          </div>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            Toll-free beekeeper desk (हिन्दी, कश्मीरी, Urdu, English available).
          </p>
        </div>
      </section>
    </>
  )}

      {/* MODAL 1: Smart Escrow Contract & Master Composite QR Modal */}
      {selectedEscrowPool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-mono font-bold">
                  SMART CONTRACT ESCROW
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  {selectedEscrowPool.title}
                </h3>
                <div className="text-xs text-stone-500 font-medium">
                  Contract Hash: 0x71F82B93b1...e419 (Polygon Private EVM)
                </div>
              </div>
              <button
                onClick={() => setSelectedEscrowPool(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smart Contract State */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Escrow Funds Locked & Verified
                </span>
                <span className="font-mono text-emerald-800 font-bold">₹42,00,000 Total Escrow</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Buyer <strong>{selectedEscrowPool.buyer}</strong> has placed funds in cryptographic multi-sig escrow with KVIC Banking Node. Funds release automatically upon physical aggregation & composite lab confirmation.
              </p>
            </div>

            {/* Farmer's Proportional Allocation */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-stone-800">Farmer Contributor Breakdown</div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-600">Your Allocated Lot:</span>
                  <span className="font-mono font-bold text-stone-900">Lot #KV-2026-JK-8841</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Pledged Volume:</span>
                  <span className="font-bold text-stone-900">450 KG (4.50% of Total Pool)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Locked Rate:</span>
                  <span className="font-bold text-stone-900">₹420 / KG</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm">
                  <span className="text-stone-900">Guaranteed DBT Payout:</span>
                  <span className="text-amber-900">₹1,89,000</span>
                </div>
              </div>
            </div>

            {/* Tamper-Proof Composite QR Code Section */}
            <div className="p-4 rounded-xl border border-stone-200 bg-linear-to-b from-stone-50 to-white flex flex-col items-center text-center space-y-3">
              <div className="w-36 h-36 bg-white border-2 border-dashed border-stone-300 rounded-xl flex items-center justify-center p-2 shadow-xs">
                {/* Visual Composite QR Graphic */}
                <div className="w-full h-full bg-stone-900 rounded-lg p-2 flex flex-col justify-between text-amber-400 font-mono text-[8px]">
                  <div className="flex justify-between">
                    <span className="bg-amber-400 text-stone-900 p-0.5 rounded font-bold">QR</span>
                    <span>KVIC</span>
                  </div>
                  <div className="text-center font-bold text-[10px] text-white">
                    COMPOSITE LOT<br />#EU-EXP-2026
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>NABL</span>
                    <span>POLY</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xs">Master Composite Lot QR Code</div>
                <div className="text-[11px] text-stone-500 max-w-sm mt-0.5">
                  When the pool locks, this master QR code unifies all 22 valley beekeeper lots into an immutable EU-export container passport.
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => copyEscrowHash('0x71F82B93b1C20539F24d77A19D72E14620F3e419')}
                className="px-3 py-2 rounded-lg border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Hash!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Contract Hash</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedEscrowPool(null)}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Depot Directions & Drop Slots */}
      {isDepotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Depot Drop Slots & Canister Guidelines
                </h3>
                <div className="text-xs text-stone-500">
                  KVIC Mandi Center #04, Anantnag Industrial Area
                </div>
              </div>
              <button
                onClick={() => setIsDepotModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900">Scheduled Ingress Hours for Valley FPOs:</div>
                <div className="text-amber-950 font-medium">Monday – Saturday: 08:30 AM to 04:00 PM IST</div>
                <div className="text-[11px] text-amber-900/80">Canister intake gate: Gate #2 (Direct Weighbridge Dock)</div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-stone-900">Pre-Checklist before Arrival:</div>
                <ul className="space-y-1.5 text-stone-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Standard SS 304 food-grade canisters (supplied under NBHM subsidy)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Printed digital batch tags affixed with tamper-evident seal</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Original NABL NMR certificate QR code displayed on mobile or printed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setIsDepotModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold cursor-pointer"
              >
                Understood & Acknowledged
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Join a Cooperative / FPO Directory */}
      {isJoinFpoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  KVIC Accredited Beekeeping FPOs
                </h3>
                <div className="text-xs text-stone-500">
                  Join or switch certified Honey Producer Organisations in Jammu & Kashmir
                </div>
              </div>
              <button
                onClick={() => setIsJoinFpoModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg border-2 border-amber-800 bg-amber-50/50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">Pahalgam Valley FPO (Active)</div>
                  <div className="text-stone-600 text-[11px]">84 Active Valley Beekeepers • KVIC #JK-FPO-104</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                  Enrolled
                </span>
              </div>

              <div className="p-3 rounded-lg border border-stone-200 bg-white hover:border-stone-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">Anantnag Apiculture Sahakari Samiti</div>
                  <div className="text-stone-600 text-[11px]">112 Members • KVIC #JK-FPO-119</div>
                </div>
                <button
                  onClick={() => {
                    onShowToast({
                      title: 'FPO Transfer Requested',
                      message: 'Request sent to Anantnag Apiculture Sahakari Samiti for review.',
                      type: 'info'
                    });
                    setIsJoinFpoModalOpen(false);
                  }}
                  className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                >
                  Request Switch
                </button>
              </div>

              <div className="p-3 rounded-lg border border-stone-200 bg-white hover:border-stone-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">Kashmir Alpine Forest Honey Producer Co.</div>
                  <div className="text-stone-600 text-[11px]">65 Organic Members • KVIC #JK-FPO-205</div>
                </div>
                <button
                  onClick={() => {
                    onShowToast({
                      title: 'FPO Transfer Requested',
                      message: 'Request sent to Kashmir Alpine Forest Honey Producer Co.',
                      type: 'info'
                    });
                    setIsJoinFpoModalOpen(false);
                  }}
                  className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                >
                  Request Switch
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setIsJoinFpoModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Video Guide Briefing Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Video Guide: How FPO Honey Pooling Works
                </h3>
                <div className="text-xs text-stone-500">
                  National Honey Mission (NBHM) & KVIC Training Video
                </div>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full aspect-video bg-stone-900 rounded-xl flex flex-col items-center justify-center text-center p-6 text-white space-y-2 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 fill-stone-950 ml-0.5" />
              </div>
              <div className="font-bold text-sm">FPO Bulk Aggregation & DBT Settlement</div>
              <div className="text-xs text-stone-400 max-w-xs">
                Learn how small beekeepers with 300–500 kg lots combine volumes to secure institutional rates of ₹420/kg.
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-amber-900 text-white text-xs font-semibold"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
