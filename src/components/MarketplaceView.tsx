import { useState, useId, FormEvent } from 'react';
import { NavTab, ToastMessage } from '../types';
import {
  ShoppingBag,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Award,
  Search,
  Lock,
  Scale,
  Coins,
  FileText,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  Check,
  Building2,
  Droplet,
  Flower2,
  BadgePercent,
  SlidersHorizontal,
  AlertCircle
} from 'lucide-react';

interface MarketplaceViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  lang?: 'en' | 'hi';
}

interface FarmerBatch {
  id: string;
  farmerName: string;
  farmerNameHi: string;
  farmerUid: string;
  location: string;
  state: string;
  title: string;
  titleHi: string;
  harvestDate: string;
  quantityKg: number;
  jarsCount: number;
  grade: string;
  nmrAnalysis: string;
  nmrAnalysisHi: string;
  stakedCollateral: number;
  bountyPayout: number;
  status: 'open_challenge' | 'under_challenge' | 'verified_pure';
  statusLabel: string;
  statusHi: string;
  challengeCount: number;
  description: string;
  descriptionHi: string;
  hash: string;
  hives: string[];
  moisture: string;
  pollenCount: string;
  buyerDemandRate: string;
}

export function MarketplaceView({ onNavigateTab, onShowToast, lang = 'en' }: MarketplaceViewProps) {
  const isHi = lang === 'hi';
  const searchInputId = useId();
  // View mode: Simple Farmer Mode vs Detailed Ledger
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('simple');
  const [isExplainerExpanded, setIsExplainerExpanded] = useState(true);
  const [filter, setFilter] = useState<'all' | 'high_stake' | 'under_challenge' | 'verified'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected batch for modal interactions
  const [selectedBatchForChallenge, setSelectedBatchForChallenge] = useState<FarmerBatch | null>(null);
  const [selectedBatchForDetails, setSelectedBatchForDetails] = useState<FarmerBatch | null>(null);

  // Challenge Form State
  const [challengeReason, setChallengeReason] = useState('c4_sugar');
  const [labPreference, setLabPreference] = useState('cbrti_pune');
  const [depositAmount, setDepositAmount] = useState(5000);
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [acknowledgedPledge, setAcknowledgedPledge] = useState(false);
  const [isSubmittingChallenge, setIsSubmittingChallenge] = useState(false);

  // List of certified beekeeper harvest batches across India
  const [batches, setBatches] = useState<FarmerBatch[]>([
    {
      id: 'KVIC-2026-HP-9204',
      farmerName: 'Rameshwar Verma',
      farmerNameHi: 'रामेश्वर वर्मा',
      farmerUid: 'KVIC-HP-3810',
      location: 'Chamba Valley, Himachal Pradesh',
      state: 'Himachal Pradesh',
      title: 'Himalayan Wild Apple Blossom Honey',
      titleHi: 'जंगली सेब बहार शहद • चंबा घाटी',
      harvestDate: '18 Oct 2025',
      quantityKg: 700,
      jarsCount: 1400,
      grade: 'Grade A+ Monofloral',
      nmrAnalysis: '100% Pure (0% Added Sugar)',
      nmrAnalysisHi: '100% शुद्ध (0% चीनी)',
      stakedCollateral: 35000,
      bountyPayout: 24500,
      status: 'open_challenge',
      statusLabel: 'Purity Staked',
      statusHi: 'सुरक्षा गारंटी जमा',
      challengeCount: 0,
      description: 'Raw, unheated honey harvested directly from apple orchards in Chamba Valley. 100% natural, unpasteurized and cold-filtered.',
      descriptionHi: 'चंबा घाटी के सेब के बगीचों से निकाला गया शुद्ध कच्चा शहद। बिना किसी मिलावट व बिना गर्म किए तैयार।',
      hash: '0x82BC...4192',
      hives: ['Hive #12 (Chamba Orchard)', 'Hive #14 (High Elevation)', 'Hive #19 (Flora Peak)'],
      moisture: '17.1%',
      pollenCount: '42,000 grains/g',
      buyerDemandRate: '₹420 / KG',
    },
    {
      id: 'KVIC-2026-JK-7712',
      farmerName: 'Tariq Ahmad Lone',
      farmerNameHi: 'तारिक़ अहमद लोन',
      farmerUid: 'KVIC-JK-7712',
      location: 'Tral, Pulwama, Jammu & Kashmir',
      state: 'Jammu & Kashmir',
      title: 'Kashmir Saffron & Multifloral Honey',
      titleHi: 'कश्मीरी केसर व वन शहद • त्राल',
      harvestDate: '28 Sep 2025',
      quantityKg: 500,
      jarsCount: 1000,
      grade: 'Grade A+ (Premium)',
      nmrAnalysis: '100% Pure (0% Added Sugar)',
      nmrAnalysisHi: '100% शुद्ध (0% चीनी)',
      stakedCollateral: 25000,
      bountyPayout: 17500,
      status: 'open_challenge',
      statusLabel: 'Purity Staked',
      statusHi: 'सुरक्षा गारंटी जमा',
      challengeCount: 0,
      description: 'Rare wild forest and saffron meadow honey harvested in Tral, Pulwama. High medicinal value and rich golden amber aroma.',
      descriptionHi: 'पुलवामा के त्राल क्षेत्र से जंगली फूलों व केसर घाटी का दुर्लभ शहद। उच्च औषधीय गुणवत्ता।',
      hash: '0x44A1...9923',
      hives: ['Hive #03 (Tral Saffron)', 'Hive #06 (Pahalgam Ridge)'],
      moisture: '16.8%',
      pollenCount: '38,500 grains/g',
      buyerDemandRate: '₹480 / KG',
    },
    {
      id: 'KVIC-2026-BR-5531',
      farmerName: 'Anita Devi',
      farmerNameHi: 'अनीता देवी',
      farmerUid: 'KVIC-BR-5531',
      location: 'Muzaffarpur, Bihar',
      state: 'Bihar',
      title: 'Shahi Litchi Blossom Honey',
      titleHi: 'शाही लीची बहार शहद • मुज़फ़्फ़रपुर',
      harvestDate: '15 May 2025',
      quantityKg: 900,
      jarsCount: 1800,
      grade: 'Grade A Monofloral',
      nmrAnalysis: '100% Pure (0% Added Sugar)',
      nmrAnalysisHi: '100% शुद्ध (0% चीनी)',
      stakedCollateral: 45000,
      bountyPayout: 31500,
      status: 'under_challenge',
      statusLabel: 'Under Active Lab Test',
      statusHi: '⚠️ लैब जांच जारी',
      challengeCount: 1,
      description: 'Aromatic monofloral honey from Shahi Litchi orchards in Muzaffarpur. Re-testing requested by peer beekeeper for moisture verification.',
      descriptionHi: 'मुज़फ़्फ़रपुर के शाही लीची के बगीचों का सुगंधित शहद। एक किसान साथी द्वारा नमी की पुनः जांच का अनुरोध।',
      hash: '0x71CD...5510',
      hives: ['Hive #08 (Shahi Orchard 1)', 'Hive #09 (Shahi Orchard 2)'],
      moisture: '18.4%',
      pollenCount: '51,000 grains/g',
      buyerDemandRate: '₹390 / KG',
    },
    {
      id: 'KVIC-2026-WB-8819',
      farmerName: 'Subal Mondal',
      farmerNameHi: 'सुबल मोंडल',
      farmerUid: 'KVIC-WB-8819',
      location: 'Sundarbans Biosphere, West Bengal',
      state: 'West Bengal',
      title: 'Mangrove Khalisha Raw Wild Honey',
      titleHi: 'सुंदरबन खलीशा जंगली शहद',
      harvestDate: '10 Apr 2025',
      quantityKg: 350,
      jarsCount: 700,
      grade: 'Grade A+ Wild Forest',
      nmrAnalysis: '100% Pure (0% Added Sugar)',
      nmrAnalysisHi: '100% शुद्ध (0% चीनी)',
      stakedCollateral: 20000,
      bountyPayout: 14000,
      status: 'open_challenge',
      statusLabel: 'Purity Staked',
      statusHi: 'सुरक्षा गारंटी जमा',
      challengeCount: 0,
      description: 'Medicinal wild mangrove honey traditionally gathered by the Mouli beekeepers in the Sundarbans tiger reserve buffer zone.',
      descriptionHi: 'सुंदरबन के घने मैंग्रोव वनों से पारंपरिक मौली समुदाय द्वारा एकत्रित औषधीय जंगली शहद।',
      hash: '0x19EF...3304',
      hives: ['Box #01 (Mangrove Camp South)', 'Box #04 (River Island)'],
      moisture: '19.1%',
      pollenCount: '62,000 grains/g',
      buyerDemandRate: '₹550 / KG',
    },
    {
      id: 'KVIC-2026-PB-4210',
      farmerName: 'Balwinder Singh',
      farmerNameHi: 'बलविंदर सिंह',
      farmerUid: 'KVIC-PB-4210',
      location: 'Gurdaspur, Punjab',
      state: 'Punjab',
      title: 'Organic Mustard Blossom Creamed Honey',
      titleHi: 'जैविक पीली सरसों शहद • गुरदासपुर',
      harvestDate: '20 Jan 2026',
      quantityKg: 1200,
      jarsCount: 2400,
      grade: 'Grade A Natural Creamed',
      nmrAnalysis: '100% Pure (0% Added Sugar)',
      nmrAnalysisHi: '100% शुद्ध (0% चीनी)',
      stakedCollateral: 60000,
      bountyPayout: 42000,
      status: 'open_challenge',
      statusLabel: 'Purity Staked',
      statusHi: 'सुरक्षा गारंटी जमा',
      challengeCount: 0,
      description: 'Naturally creamed golden mustard honey from organically farmed fields in Gurdaspur, Punjab. Smooth texture and delicate floral taste.',
      descriptionHi: 'पंजाब के खेतों से प्राकृतिक रूप से जमा हुआ शुद्ध सरसों शहद। रोटी व पराठों के साथ बेहद लोकप्रिय।',
      hash: '0x992B...7710',
      hives: ['Hive #21 (Mustard Belt A)', 'Hive #22 (Mustard Belt B)'],
      moisture: '16.5%',
      pollenCount: '34,000 grains/g',
      buyerDemandRate: '₹310 / KG',
    },
    {
      id: 'KVIC-2026-RJ-3091',
      farmerName: 'Kavita Rathore',
      farmerNameHi: 'कविता राठौड़',
      farmerUid: 'KVIC-RJ-3091',
      location: 'Bharatpur, Rajasthan',
      state: 'Rajasthan',
      title: 'Desert Ber & Kikar Blossom Honey',
      titleHi: 'देशी बेर व कीकर शहद • भरतपुर',
      harvestDate: '12 Nov 2025',
      quantityKg: 650,
      jarsCount: 1300,
      grade: 'Grade A Desert Monofloral',
      nmrAnalysis: '100% Pure (0% Added Sugar)',
      nmrAnalysisHi: '100% शुद्ध (0% चीनी)',
      stakedCollateral: 32500,
      bountyPayout: 22750,
      status: 'open_challenge',
      statusLabel: 'Purity Staked',
      statusHi: 'सुरक्षा गारंटी जमा',
      challengeCount: 0,
      description: 'Rich dark amber honey derived from arid zone Ber (Ziziphus) and Kikar flowers in Eastern Rajasthan. High antioxidant activity.',
      descriptionHi: 'राजस्थान के शुष्क वनों से देशी बेर और कीकर के फूलों से तैयार पौष्टिक शहद।',
      hash: '0x334C...1188',
      hives: ['Hive #05 (Ber Orchard East)', 'Hive #09 (Desert Oasis)'],
      moisture: '16.9%',
      pollenCount: '29,000 grains/g',
      buyerDemandRate: '₹360 / KG',
    },
  ]);

  const filteredBatches = batches.filter((b) => {
    if (filter === 'high_stake' && b.stakedCollateral < 30000) return false;
    if (filter === 'under_challenge' && b.status !== 'under_challenge') return false;
    if (filter === 'verified' && b.status !== 'open_challenge') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.farmerName.toLowerCase().includes(q) ||
        b.farmerNameHi.toLowerCase().includes(q) ||
        b.title.toLowerCase().includes(q) ||
        b.titleHi.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.state.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenChallengeModal = (batch: FarmerBatch) => {
    setSelectedBatchForChallenge(batch);
    setDepositAmount(5000);
    setEvidenceNotes('');
    setAcknowledgedPledge(false);
  };

  const handleSubmitChallenge = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedBatchForChallenge) return;

    if (!acknowledgedPledge) {
      onShowToast({
        title: isHi ? 'शपथ अनिवार्य है' : 'Pledge Required',
        message: isHi ? 'कृपया आगे बढ़ने से पहले नियम व शपथ स्वीकार करें।' : 'Please acknowledge the good-faith pledge before submitting.',
        type: 'info',
      });
      return;
    }

    setIsSubmittingChallenge(true);

    setTimeout(() => {
      setBatches((prev) =>
        prev.map((b) =>
          b.id === selectedBatchForChallenge.id
            ? {
                ...b,
                status: 'under_challenge',
                statusLabel: 'Under Active Lab Test',
                statusHi: '⚠️ लैब जांच जारी',
                challengeCount: b.challengeCount + 1,
              }
            : b
        )
      );

      setIsSubmittingChallenge(false);
      setSelectedBatchForChallenge(null);

      onShowToast({
        title: isHi ? '✅ जांच अनुरोध व जमानत दर्ज' : '✅ Audit Request & Bond Registered',
        message: isHi 
          ? `लॉट ${selectedBatchForChallenge.id} के लिए ₹${depositAmount.toLocaleString()} की जमानत दर्ज हुई। सरकारी सीलबंद नमूना जांच के लिए भेजा जा रहा है।`
          : `Security bond of ₹${depositAmount.toLocaleString()} locked for Lot ${selectedBatchForChallenge.id}. Sealed sample dispatched to laboratory.`,
        type: 'success',
      });
    }, 800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header with Farmer View Switch */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold mb-2 border border-amber-200">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{isHi ? 'खादी ग्रामोद्योग शुद्धता गारंटी बाज़ार' : 'KVIC Honey Purity Guarantee Marketplace'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {isHi ? 'किसान शहद मंडी व शुद्धता गारंटी' : 'Honey Marketplace & Purity Guarantee'}
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              {isHi 
                ? 'अन्य किसान भाइयों का शहद देखें। हर किसान ने अपने शहद के असली होने की गारंटी में सरकारी जमानत राशि जमा की है। अगर आपको मिलावट का शक हो, तो आप जांच करवा सकते हैं।'
                : 'Browse certified harvest lots from fellow beekeepers. Every lot carries a locked government security stake guaranteeing 100% pure, unadulterated honey. Challenge stakes if you suspect adulteration.'}
            </p>
          </div>

          {/* Easy View vs Detailed View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('simple')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  viewMode === 'simple'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{isHi ? '🌱 सरल किसान दृश्य' : '🌱 Simple Farmer View'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('detailed')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  viewMode === 'detailed'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{isHi ? '📋 विस्तृत लेज़र' : '📋 Detailed Ledger'}</span>
              </button>
            </div>

            <button
              onClick={() => onNavigateTab('register-batch')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isHi ? '+ अपना शहद दर्ज करें' : '+ Register Your Honey'}</span>
            </button>
          </div>
        </div>

        {/* 3 Simple, Big Farmer-Friendly Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0 text-lg">
              🍯
            </div>
            <div>
              <div className="text-xs font-medium text-stone-600">
                {isHi ? 'उपलब्ध शहद लॉट' : 'Available Lots'}
              </div>
              <div className="text-xl font-bold text-stone-900">
                {isHi ? '54 किसान लॉट' : '54 Farmer Lots'}
              </div>
              <div className="text-[11px] text-stone-500">
                {isHi ? 'पूरे भारत के प्रमाणित मधुमक्खी पालक' : 'Certified beekeepers across India'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-stone-600">
                {isHi ? 'किसानों की कुल जमानत' : 'Total Purity Escrow'}
              </div>
              <div className="text-xl font-bold text-emerald-800">₹18,50,000</div>
              <div className="text-[11px] text-stone-500">
                {isHi ? '100% शुद्धता गारंटी के रूप में सुरक्षित' : 'Locked in escrow as 100% purity pledge'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-stone-600">
                {isHi ? 'मिलावट पकड़ने पर इनाम' : 'Bounties Settled'}
              </div>
              <div className="text-xl font-bold text-blue-900">
                {isHi ? '₹2,40,000 वितरित' : '₹2,40,000 Distributed'}
              </div>
              <div className="text-[11px] text-stone-500">
                {isHi ? 'जांचकर्ताओं को दिया गया नकद इनाम' : 'Cash rewards paid out to honest challengers'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explaining Staking & Challenge in Clear English / Hindi */}
      <div className="rounded-2xl bg-white border border-amber-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-stone-50 to-white flex items-center justify-between gap-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-base shadow-xs">
              💡
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                {isHi ? 'शहद की शुद्धता व इनाम प्रणाली को समझें' : 'How Honey Purity Staking & Bounties Work'}
              </h2>
              <p className="text-xs text-stone-600">
                {isHi 
                  ? 'मिलावट मुक्त भारत के लिए 3 आसान चरण • पारदर्शी नियम'
                  : 'A transparent 3-step system for pure, adulteration-free honey across India'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsExplainerExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <span>
              {isExplainerExpanded
                ? isHi ? 'विवरण छोटा करें' : 'Collapse Details'
                : isHi ? 'समझें कैसे काम करता है' : 'Learn How It Works'}
            </span>
            {isExplainerExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isExplainerExpanded && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">
                    {isHi ? 'किसान की शुद्धता जमानत' : 'Farmer Purity Stake'}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isHi 
                    ? 'हर किसान अपना शहद मंडी में रखते समय ₹50 प्रति किलो (लगभग ₹20,000 से ₹50,000) सरकारी खाते में जमा करता है, जो यह गारंटी देता है कि शहद में चीनी या सिरप नहीं है।'
                    : 'Every beekeeper locks ₹50 per KG (approx. ₹20,000 to ₹50,000) in government escrow to guarantee their honey has zero added sugar, syrup, or adulterants.'}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">
                    {isHi ? 'संदेह होने पर जांच का अधिकार' : 'Peer Inspection & Audit'}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isHi 
                    ? 'अगर किसी भी साथी किसान या खरीदार को लगता है कि शहद में चीनी, पानी या मिलावट है, तो वह ₹5,000 की सुरक्षा राशि जमा कर सरकारी NABL लैब से गोपनीय जांच करवा सकता है।'
                    : 'If any fellow beekeeper or buyer suspects adulteration (C4 corn sugar, high moisture), they deposit a ₹5,000 security bond to request an independent government lab audit.'}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">
                    {isHi ? 'सच्चाई सामने आने पर इनाम' : 'Bounty Reward or Forfeiture'}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isHi 
                    ? 'अगर शहद नकली निकला: बेचने वाले की जमानत जब्त होगी और 70% नकद इनाम (₹17,500 से ₹42,000) शिकायतकर्ता को मिलेगा! अगर शहद शुद्ध निकला, तो बेचने वाले को मुआवजा मिलेगा।'
                    : 'If adulteration is verified: The seller’s stake is forfeited and the challenger receives a 70% cash bounty (₹17,500 to ₹42,000)! If pure, the deposit compensates the beekeeper.'}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>{isHi ? 'ईमानदार किसानों का संरक्षण:' : 'Protecting Honest Beekeepers:'}</strong>{' '}
                  {isHi 
                    ? 'सरकारी लैब (CBRTI पुणे व NDDB आणंद) द्वारा निष्पक्ष व सीलबंद जांच।'
                    : 'Independent sealed testing conducted by accredited labs (CBRTI Pune & NDDB Anand).'}
                </span>
              </div>
              <span className="font-semibold text-emerald-800 hidden sm:inline">
                KVIC-HONEY-PROTOCOL-2026
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {isHi ? `सभी शहद लॉट (${batches.length})` : `All Honey Lots (${batches.length})`}
          </button>
          <button
            type="button"
            onClick={() => setFilter('high_stake')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'high_stake'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {isHi ? 'बड़ी जमानत वाले (≥₹30,000)' : 'High Stake (≥₹30,000)'}
          </button>
          <button
            type="button"
            onClick={() => setFilter('under_challenge')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'under_challenge'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {isHi ? '⚠️ जांच में लंबित (1)' : '⚠️ Under Active Lab Test (1)'}
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id={searchInputId}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHi ? 'किसान का नाम, राज्य या शहद खोजें...' : 'Search beekeeper name, state, flora...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-800 focus:border-amber-800 shadow-2xs"
          />
        </div>
      </div>

      {/* Honey Batches Cards */}
      <div className="space-y-4">
        {filteredBatches.map((batch) => {
          const isUnderChallenge = batch.status === 'under_challenge';

          return (
            <div
              key={batch.id}
              className={`rounded-2xl bg-white border transition-all p-5 shadow-xs ${
                isUnderChallenge
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-stone-200 hover:border-amber-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                {/* Farmer & Honey Main Info */}
                <div className="space-y-3 flex-1">
                  {/* Top Line: Farmer Identity & Status Badge */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
                      👤 {isHi ? `${batch.farmerNameHi} (${batch.farmerName})` : batch.farmerName}
                    </span>
                    <span className="text-stone-500 font-medium">
                      📍 {batch.location}
                    </span>
                    <span className="font-mono text-stone-400 text-[11px]">
                      ({batch.id})
                    </span>

                    {isUnderChallenge ? (
                      <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        <span>{isHi ? 'सरकारी लैब में पुनः जांच जारी' : 'Active Lab Test in Progress'}</span>
                      </span>
                    ) : (
                      <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isHi ? 'गारंटी प्रमाणित (शुद्ध)' : 'Purity Guaranteed (Clean)'}</span>
                      </span>
                    )}
                  </div>

                  {/* Honey Variety Name */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                      <span>🍯</span>
                      <span>{isHi ? batch.titleHi : batch.title}</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isHi ? `${batch.title} • निष्कर्षण तिथि: ${batch.harvestDate}` : `${batch.titleHi} • Harvest Date: ${batch.harvestDate}`}
                    </p>
                  </div>

                  {/* Key Highlights in 4 Clean Metric Blocks */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <div className="text-[11px] text-stone-500 font-medium">
                        {isHi ? 'कुल मात्रा (Quantity)' : 'Total Quantity'}
                      </div>
                      <div className="text-base font-bold text-stone-900 mt-0.5">
                        {batch.quantityKg} KG
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {batch.jarsCount} {isHi ? 'शीशियां' : 'Jars'}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/70">
                      <div className="text-[11px] text-amber-900 font-semibold">
                        {isHi ? 'किसान की जमानत (Stake)' : "Farmer's Stake"}
                      </div>
                      <div className="text-base font-bold text-amber-900 mt-0.5">
                        ₹{batch.stakedCollateral.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        {isHi ? 'सरकारी खाते में सुरक्षित' : 'Locked in Escrow'}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <div className="text-[11px] text-stone-500 font-medium">
                        {isHi ? 'बाज़ार भाव (MSP Rate)' : 'Market Rate (MSP)'}
                      </div>
                      <div className="text-base font-bold text-stone-900 mt-0.5">
                        {batch.buyerDemandRate}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {isHi ? 'प्रमाणित दर' : 'Certified Rate'}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                      <div className="text-[11px] text-emerald-900 font-semibold">
                        {isHi ? 'शुद्धता दावा (Purity)' : 'Purity Claim'}
                      </div>
                      <div className="text-base font-bold text-emerald-800 mt-0.5">
                        {isHi ? batch.nmrAnalysisHi : batch.nmrAnalysis}
                      </div>
                      <div className="text-[11px] text-emerald-700">
                        {isHi ? `नमी: ${batch.moisture}` : `Moisture: ${batch.moisture}`}
                      </div>
                    </div>
                  </div>

                  {/* Detailed view info (Shown only if user toggles 'Detailed Ledger') */}
                  {viewMode === 'detailed' && (
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1.5 font-mono">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span>Genesis Hash: {batch.hash}</span>
                        <span>{isHi ? 'परागकण घनत्व:' : 'Pollen Density:'} {batch.pollenCount}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1 font-sans">
                        <span className="font-semibold text-stone-700">
                          {isHi ? 'संबद्ध बक्से:' : 'Associated Hives:'}
                        </span>
                        {batch.hives.map((h) => (
                          <span key={h} className="px-2 py-0.5 rounded bg-white border border-stone-200 text-[11px]">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Clear Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-2 sm:w-64 shrink-0 pt-2 lg:pt-0 lg:border-l lg:border-stone-100 lg:pl-5">
                  {isUnderChallenge ? (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                      <div className="text-xs font-bold text-amber-900 flex items-center justify-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                        <span>{isHi ? 'जांच प्रक्रियाधीन है' : 'Lab Audit in Progress'}</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        {isHi 
                          ? 'सीलबंद नमूना सरकारी लैब में भेजा गया है। परिणाम शीघ्र उपलब्ध होंगे।'
                          : 'Tamper-evident sample dispatched to NABL lab. Results pending.'}
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenChallengeModal(batch)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-xs transition-colors flex flex-col items-center justify-center gap-0.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>⚔️</span>
                        <span>{isHi ? 'चुनौती दें (Challenge Stake)' : 'Challenge Stake'}</span>
                      </div>
                      <span className="text-[10.5px] font-normal text-amber-200">
                        {isHi 
                          ? `सही साबित होने पर ₹${batch.bountyPayout.toLocaleString()} इनाम`
                          : `Win ₹${batch.bountyPayout.toLocaleString()} bounty if adulterated`}
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedBatchForDetails(batch)}
                    className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-600" />
                    <span>{isHi ? 'पूरी रिपोर्ट व विवरण देखें' : 'View Full Inspection Report'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Challenge Stake Modal */}
      {selectedBatchForChallenge && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 bg-amber-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-200" />
                <div>
                  <h3 className="text-sm font-bold">
                    {isHi ? 'शहद की शुद्धता पर जांच अनुरोध (चुनौती)' : 'Request Purity Audit & Challenge Stake'}
                  </h3>
                  <p className="text-[11px] text-amber-200">
                    {isHi ? 'खादी ग्रामोद्योग बोर्ड निष्पक्ष जांच व्यवस्था' : 'KVIC Impartial Quality Assurance System'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBatchForChallenge(null)}
                className="p-1 rounded-md text-amber-200 hover:text-white hover:bg-amber-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitChallenge} className="p-5 space-y-4 text-xs">
              {/* Batch Summary Card */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-stone-900">
                    {isHi ? selectedBatchForChallenge.titleHi : selectedBatchForChallenge.title}
                  </span>
                  <span className="font-mono text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-200">
                    {selectedBatchForChallenge.id}
                  </span>
                </div>
                <div className="text-stone-600 text-[11px]">
                  {isHi ? 'किसान:' : 'Beekeeper:'} <strong>{selectedBatchForChallenge.farmerName}</strong> • {selectedBatchForChallenge.location}
                </div>
                <div className="pt-1 flex items-center justify-between text-[11px] font-medium border-t border-amber-200/60 mt-1">
                  <span>
                    {isHi ? 'जमा जमानत:' : 'Seller Escrow:'} ₹{selectedBatchForChallenge.stakedCollateral.toLocaleString()}
                  </span>
                  <span className="text-emerald-800 font-bold">
                    {isHi ? 'संभावित इनाम:' : 'Potential Bounty:'} ₹{selectedBatchForChallenge.bountyPayout.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Step 1: Select Suspected Issue */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-800 block">
                  {isHi ? '1. आपको इस शहद में क्या गड़बड़ी लगती है?' : '1. What adulteration issue do you suspect in this honey?'}
                </label>
                <div className="space-y-1.5">
                  {[
                    { 
                      id: 'c4_sugar', 
                      label: isHi ? 'चीनी या कॉर्न सिरप की मिलावट (Added Sugar / C4 Syrup)' : 'Added sugar or corn syrup (C4 Syrup / High Fructose)' 
                    },
                    { 
                      id: 'high_moisture', 
                      label: isHi ? 'अधिक पानी / कच्चा शहद (Moisture > 20%)' : 'Excess water / premature honey (Moisture > 20.0%)' 
                    },
                    { 
                      id: 'wrong_origin', 
                      label: isHi ? 'गलत फूल या गलत स्थान का दावा (Wrong Botanical Origin)' : 'Mislabeled flora or false geographic origin (Wrong Origin)' 
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                        challengeReason === opt.id
                          ? 'border-amber-800 bg-amber-50/70 font-semibold text-stone-900'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="challenge_reason"
                        checked={challengeReason === opt.id}
                        onChange={() => setChallengeReason(opt.id)}
                        className="text-amber-800 focus:ring-amber-800"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Testing Lab */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-800 block">
                  {isHi ? '2. जांच के लिए सरकारी लैब चुनें' : '2. Select accredited government testing laboratory'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLabPreference('cbrti_pune')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      labPreference === 'cbrti_pune'
                        ? 'border-amber-800 bg-amber-50/70 font-bold text-stone-900 shadow-2xs'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className="font-bold">CBRTI Pune</div>
                    <div className="text-[10.5px] text-stone-500">
                      {isHi ? 'केंद्रीय मधुमक्खी अनुसंधान संस्थान' : 'Central Bee Research & Training Institute'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLabPreference('nddb_anand')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      labPreference === 'nddb_anand'
                        ? 'border-amber-800 bg-amber-50/70 font-bold text-stone-900 shadow-2xs'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className="font-bold">NDDB Anand</div>
                    <div className="text-[10.5px] text-stone-500">
                      {isHi ? 'राष्ट्रीय शहद परीक्षण प्रयोगशाला' : 'National Honey Testing Laboratory'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 3: Security Deposit & Clear Reward Math */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-800">
                    {isHi ? 'आपकी जमा सुरक्षा राशि (Deposit):' : 'Your Security Deposit:'}
                  </span>
                  <span className="font-bold text-stone-900 text-sm font-mono">₹{depositAmount.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-stone-600 space-y-1 border-t border-stone-200/80 pt-2 leading-relaxed">
                  <p className="flex items-start gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      {isHi ? (
                        <><strong>अगर मिलावट साबित हुई:</strong> आपकी पूरी ₹5,000 राशि वापस + <strong>₹{selectedBatchForChallenge.bountyPayout.toLocaleString()}</strong> का सरकारी नकद इनाम!</>
                      ) : (
                        <><strong>If adulteration is verified:</strong> Your full ₹5,000 bond is refunded + you receive a <strong>₹{selectedBatchForChallenge.bountyPayout.toLocaleString()}</strong> cash bounty!</>
                      )}
                    </span>
                  </p>
                  <p className="flex items-start gap-1.5 text-stone-500">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      {isHi ? (
                        <><strong>अगर शहद शुद्ध निकला:</strong> यह राशि किसान को बेवजह परेशानी की क्षतिपूर्ति हेतु दी जाएगी।</>
                      ) : (
                        <><strong>If honey passes pure:</strong> The deposit is awarded to the seller to compensate for market disruption.</>
                      )}
                    </span>
                  </p>
                </div>
              </div>

              {/* Honest Farmer Pledge */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledgedPledge}
                  onChange={(e) => setAcknowledgedPledge(e.target.checked)}
                  className="mt-0.5 rounded text-amber-800 focus:ring-amber-800"
                />
                <span className="text-[11px] text-stone-700 leading-tight">
                  {isHi 
                    ? 'मैं शपथ लेता हूँ कि यह जांच अनुरोध केवल शहद की शुद्धता सुनिश्चित करने के उद्देश्य से किया जा रहा है।'
                    : 'I solemnly pledge that this challenge is filed in good faith solely to uphold honey purity standards.'}
                </span>
              </label>

              {/* Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBatchForChallenge(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold transition-colors"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingChallenge}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isSubmittingChallenge ? (
                    <span>{isHi ? 'जमा हो रहा है...' : 'Locking Bond...'}</span>
                  ) : (
                    <span>{isHi ? 'जमानत जमा करें व जांच भेजें' : 'Lock Bond & Submit Challenge'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedBatchForDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-800" />
                <h4 className="text-sm font-bold text-stone-900">
                  {isHi ? 'शहद लॉट सम्पूर्ण विवरण' : 'Honey Lot Inspection Report'}
                </h4>
              </div>
              <button
                onClick={() => setSelectedBatchForDetails(null)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div>
                <span className="font-mono text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedBatchForDetails.id}
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1">
                  {isHi ? selectedBatchForDetails.titleHi : selectedBatchForDetails.title}
                </h3>
                <p className="text-stone-500 text-[11px]">
                  {isHi ? selectedBatchForDetails.descriptionHi : selectedBatchForDetails.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-[11.5px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">{isHi ? 'किसान का नाम:' : 'Beekeeper Name:'}</span>
                  <span className="font-bold text-stone-900">{selectedBatchForDetails.farmerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isHi ? 'स्थान / गाँव:' : 'Location:'}</span>
                  <span className="text-stone-800">{selectedBatchForDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isHi ? 'निष्कर्षण तिथि:' : 'Harvest Date:'}</span>
                  <span className="text-stone-800">{selectedBatchForDetails.harvestDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isHi ? 'कुल उत्पादन:' : 'Total Production:'}</span>
                  <span className="font-bold text-stone-900">{selectedBatchForDetails.quantityKg} KG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isHi ? 'नमी (Moisture):' : 'Moisture Content:'}</span>
                  <span className="font-bold text-emerald-700">{selectedBatchForDetails.moisture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isHi ? 'परागकण विश्लेषण:' : 'Pollen Density:'}</span>
                  <span className="text-stone-800">{selectedBatchForDetails.pollenCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isHi ? 'जमा सुरक्षा राशि:' : 'Locked Purity Stake:'}</span>
                  <span className="font-bold text-amber-900">₹{selectedBatchForDetails.stakedCollateral.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBatchForDetails(null)}
                  className="w-full py-2 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold transition-colors"
                >
                  {isHi ? 'समझ गया / बन्द करें' : 'Close Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
