import { useState } from 'react';
import { NavTab, ToastMessage } from '../types';
import {
  Mic,
  PhoneCall,
  MapPin,
  Compass,
  ArrowRight,
  Languages,
  Droplet,
  Box,
  QrCode,
  FlaskConical,
  Users,
  Store,
  X,
  Volume2,
  CheckCircle2,
  Calendar,
  Sparkles,
  Play,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface HomeDashboardViewProps {
  lang: 'en' | 'hi';
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
}

export function HomeDashboardView({
  lang,
  onNavigateTab,
  onShowToast,
}: HomeDashboardViewProps) {
  // Modals state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isOfficerModalOpen, setIsOfficerModalOpen] = useState(false);
  const [voiceQueryActive, setVoiceQueryActive] = useState(false);
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<'ks' | 'hi' | 'ur' | 'en'>('hi');
  const [voiceResponseText, setVoiceResponseText] = useState<string | null>(null);

  // Voice Assistant preset queries
  const voicePresets = [
    {
      q: 'मेरे बक्से (Box #01) का तापमान और नमी कैसी है?',
      qEn: 'Check Hive Box #01 Temperature & Humidity',
      lang: 'hi' as const,
      ans: 'गुलाम जी, बक्सा #01 का तापमान 34.8°C और नमी 58% बिल्कुल सामान्य है। रानी मक्खी सक्रिय है और ब्रूड चैंबर का स्वास्थ्य उत्तम है।',
      targetTab: 'my-beehives' as NavTab,
    },
    {
      q: 'लॉट #KV-JK-8841 का NMR लैब परीक्षण पास हुआ या नहीं?',
      qEn: 'Is Harvest Lot #KV-JK-8841 NMR Purity Passed?',
      lang: 'hi' as const,
      ans: 'हाँ, लॉट #KV-JK-8841 का एनडीआरआई करनाल लैब से 100% शुद्ध रोबिनिया शहद सर्टिफिकेट जारी हो चुका है। C4 शुगर 0.0% और आइसोटोप रेश्यो ग्रेड A+ है।',
      targetTab: 'nmr-lab-reports' as NavTab,
    },
    {
      q: 'अनंतनाग मंडी में आज का न्यूनतम समर्थन मूल्य (MSP) क्या है?',
      qEn: "Today's KVIC MSP rate & cooperative export pool status",
      lang: 'hi' as const,
      ans: 'आज रोबिनिया व्हाइट हनी का सहकारी पूल रेट ₹460 प्रति किलो है, जो स्थानीय बिचौलियों के दाम (₹420) से ₹40 अधिक है। यूरोपियन एक्सपोर्ट पूल में 4,000 किलो का स्लॉट खुला है।',
      targetTab: 'cooperative-pools' as NavTab,
    },
    {
      q: 'नया शहद लॉट दर्ज करके क्यूआर कोड कैसे बनाएं?',
      qEn: 'How to register a new extraction batch and generate QR?',
      lang: 'hi' as const,
      ans: 'आप नीचे "नई फसल दर्ज करें" बटन दबाएं। अपना बक्सा, फूलों का स्रोत और वजन दर्ज करें। डिजिटल ब्लॉकचेन क्यूआर कोड तुरंत प्रिंट के लिए तैयार हो जाएगा।',
      targetTab: 'register-batch' as NavTab,
    },
  ];

  const handleTriggerVoiceQuery = (preset: typeof voicePresets[0]) => {
    setVoiceQueryActive(true);
    setVoiceResponseText(null);
    setTimeout(() => {
      setVoiceQueryActive(false);
      setVoiceResponseText(preset.ans);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-in">
      {/* 1. Greeting & Identity Header */}
      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider text-amber-900 uppercase">
          <span className="text-amber-800">
            {lang === 'hi' ? 'किसान पोर्टल • किसान सेवा' : 'KISAN PORTAL • BEEKEEPER SERVICES'}
          </span>
          <span className="text-stone-300">•</span>
          <span className="font-mono text-stone-600 font-semibold bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200/80">
            {lang === 'hi' ? 'पहचान संख्या: JK-NBHM-7729' : 'ID: JK-NBHM-7729'}
          </span>
        </div>

        {/* Large H1 Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
          {lang === 'hi' ? (
            <>
              नमस्ते,{' '}
              <span className="text-amber-900 font-serif font-bold">
                गुलाम मोहम्मद
              </span>{' '}
              जी
            </>
          ) : (
            <>
              Welcome back,{' '}
              <span className="text-amber-900 font-serif font-bold">
                Ghulam Mohammad
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-700 font-normal">
          {lang === 'hi'
            ? 'आज आप क्या करना चाहते हैं? नीचे दिए गए विकल्पों में से चुनें।'
            : 'What would you like to do today? Select an action below to get started.'}
        </p>
      </section>

      {/* 2. HONEYCHAIN ACTION & ASSISTANCE GRID */}
      <section>
        {/* Action Grid with Kisan Assistance included as a distinct color box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card: 24X7 Kisan Assistance & Voice Mitra (Distinct Colored Box) */}
          <div
            onClick={() => {
              setIsVoiceModalOpen(true);
              setVoiceResponseText(null);
            }}
            className="group rounded-2xl border-2 border-amber-400/90 bg-linear-to-br from-amber-100/95 via-orange-50/90 to-amber-200/60 p-6 shadow-xs hover:shadow-md hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Subtle decorative background accent */}
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-300/30 pointer-events-none blur-lg" />

            <div className="space-y-4 relative z-10">
              {/* Top Row: Icon and Live Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-900 border border-amber-950 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-xs">
                  <Mic className="w-6 h-6 text-amber-200" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  {lang === 'hi' ? '24X7 सक्रिय' : '24X7 Active'}
                </span>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-950">
                  {lang === 'hi' ? 'किसान मित्र सहायता' : 'KISAN ASSISTANCE & HELPLINE'}
                </div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors mt-0.5">
                  {lang === 'hi' ? 'किसान सहायता व वॉइस मित्र' : 'Kisan Assistance & Voice Mitra'}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-stone-700 mt-1 leading-relaxed">
                  {lang === 'hi'
                    ? 'असमंजस में हैं? बोलकर पूछें या क्षेत्रीय अधिकारी परवेज अहमद (पहलगाम) से सीधे फोन पर जुड़ें'
                    : 'Speak in Kashmiri/Hindi/Urdu or call Area Bee Mitra Officer Parvez Ahmad'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-200/90 flex items-center justify-between gap-2 relative z-10">
              <div className="flex items-center gap-2 flex-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVoiceModalOpen(true);
                    setVoiceResponseText(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5 text-amber-200" />
                  <span>{lang === 'hi' ? 'बोलकर पूछें' : 'Voice Query'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOfficerModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/95 hover:bg-white text-emerald-900 border border-emerald-300 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  title={lang === 'hi' ? 'अधिकारी का संपर्क विवरण' : 'Field Officer Info'}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{lang === 'hi' ? 'अधिकारी' : 'Officer'}</span>
                </button>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-900 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </div>

          {/* Card 1: Register New Batch */}
          <div
            onClick={() => onNavigateTab('register-batch')}
            className="group bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Soft Amber Icon */}
              <div className="w-12 h-12 rounded-xl bg-amber-100/90 border border-amber-200 flex items-center justify-center text-amber-900 group-hover:scale-105 transition-transform">
                <Droplet className="w-6 h-6 fill-amber-800/30 text-amber-900" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
                  {lang === 'hi' ? 'नई फसल दर्ज करें' : 'Register New Harvest Batch'}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-stone-500 mt-1 leading-relaxed">
                  {lang === 'hi'
                    ? 'नया शहद निष्कर्षण, वजन, पराग स्रोत व क्यूआर कोड बनाएं'
                    : 'Record lot extraction, flora source, batch weight & generate QR'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-amber-900 group-hover:text-amber-950">
              <span>{lang === 'hi' ? 'नया लॉट दर्ज करें' : 'Register Batch'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: My Beehives & Sensors */}
          <div
            onClick={() => onNavigateTab('my-beehives')}
            className="group bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Soft Mint/Green Icon */}
              <div className="w-12 h-12 rounded-xl bg-emerald-100/90 border border-emerald-200 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
                <Box className="w-6 h-6 text-emerald-800" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                  {lang === 'hi' ? 'मेरे बक्से व आईओटी' : 'My Beehives & Sensors'}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-stone-500 mt-1 leading-relaxed">
                  {lang === 'hi'
                    ? 'तापमान, आर्द्रता, बक्सा वजन व मधुमक्खी स्वास्थ्य की लाइव स्थिति'
                    : 'Live sensor telemetry, brood temperature, colony weight & health'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
              <span>{lang === 'hi' ? 'बक्से देखें' : 'View Beehives'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Harvest Batches & QR Code */}
          <div
            onClick={() => onNavigateTab('harvest-batches')}
            className="group bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Soft Purple/Stone Icon */}
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-900 group-hover:scale-105 transition-transform">
                <QrCode className="w-6 h-6 text-purple-900" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
                  {lang === 'hi' ? 'शहद लॉट व क्यूआर कोड' : 'Harvest Batches & QR Labels'}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-stone-500 mt-1 leading-relaxed">
                  {lang === 'hi'
                    ? 'तैयार लॉट, प्रिंट योग्य क्यूआर लेबल व ब्लॉकचेन प्रामाणिकता'
                    : 'Harvested batches, printable QR labels, barcode tags & audit trail'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-amber-900 group-hover:text-amber-950">
              <span>{lang === 'hi' ? 'लॉट देखें' : 'View Batches'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: NMR Lab Reports */}
          <div
            onClick={() => onNavigateTab('nmr-lab-reports')}
            className="group bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Soft Emerald Icon */}
              <div className="w-12 h-12 rounded-xl bg-emerald-100/90 border border-emerald-200 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-6 h-6 text-emerald-800" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                  {lang === 'hi' ? 'लैब परीक्षण रिपोर्ट' : 'NMR Lab Reports'}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-stone-500 mt-1 leading-relaxed">
                  {lang === 'hi'
                    ? 'एनएमआर शुद्धता, सी4 शुगर जांच व केवीआईसी प्रामाणिकता प्रमाण पत्र'
                    : 'Certified NMR spectroscopy, C4 sugar analysis & purity certificates'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
              <span>{lang === 'hi' ? 'रिपोर्ट्स देखें' : 'View Lab Reports'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Cooperative Pools */}
          <div
            onClick={() => onNavigateTab('cooperative-pools')}
            className="group bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Soft Orange Icon */}
              <div className="w-12 h-12 rounded-xl bg-amber-100/90 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 text-amber-800" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
                  {lang === 'hi' ? 'सहकारी संघ व थोक मांग' : 'Cooperative Aggregation Pools'}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-stone-500 mt-1 leading-relaxed">
                  {lang === 'hi'
                    ? 'सामूहिक निर्यात पूल, एमएसपी न्यूनतम समर्थन मूल्य व थोक खरीदार'
                    : 'Collective export pooling, KVIC MSP guarantee & bulk corporate orders'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-amber-900 group-hover:text-amber-950">
              <span>{lang === 'hi' ? 'सहकारी संघ देखें' : 'View Pools'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Marketplace & Challenge */}
          <div
            onClick={() => onNavigateTab('marketplace-and-challenge')}
            className="group bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Soft Coral/Amber Icon */}
              <div className="w-12 h-12 rounded-xl bg-orange-100/90 border border-orange-200 flex items-center justify-center text-orange-900 group-hover:scale-105 transition-transform">
                <Store className="w-6 h-6 text-orange-900" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
                  {lang === 'hi' ? 'बाज़ार व प्रामाणिकता' : 'Marketplace & Purity Challenge'}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-stone-500 mt-1 leading-relaxed">
                  {lang === 'hi'
                    ? 'उपभोक्ताओं को सीधा विक्रय और ₹1 लाख शुद्धता चुनौती'
                    : 'Direct consumer sales, escrow payouts & ₹1 Lakh purity challenge'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-amber-900 group-hover:text-amber-950">
              <span>{lang === 'hi' ? 'बाज़ार देखें' : 'Explore Market'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* MODAL 1: Mitra Voice Assistant Dialog */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-900 text-white flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">
                    किसान मित्र AI (Voice Assistance)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Dedicated AI Voice Assistant for Pahalgam Apiaries
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVoiceModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center justify-between bg-stone-50 p-2 rounded-xl border border-stone-200">
              <span className="text-xs font-semibold text-stone-600 pl-1 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-amber-800" />
                <span>भाषा चुनें:</span>
              </span>
              <div className="flex gap-1 text-xs">
                {(
                  [
                    { id: 'hi', label: 'हिन्दी' },
                    { id: 'ks', label: 'कॉशुर' },
                    { id: 'ur', label: 'اردو' },
                    { id: 'en', label: 'English' },
                  ] as const
                ).map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedVoiceLang(l.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                      selectedVoiceLang === l.id
                        ? 'bg-amber-900 text-white shadow-2xs'
                        : 'text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Microphone Wave Visualizer */}
            <div className="bg-amber-50/60 rounded-xl border border-amber-200/80 p-5 flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative">
                <button
                  onClick={() => handleTriggerVoiceQuery(voicePresets[0])}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    voiceQueryActive
                      ? 'bg-rose-600 text-white scale-110 shadow-lg animate-pulse'
                      : 'bg-amber-900 text-white hover:scale-105 shadow-md'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>
                {voiceQueryActive && (
                  <span className="absolute -inset-2 rounded-full border-2 border-rose-500 animate-ping pointer-events-none" />
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-stone-900">
                  {voiceQueryActive
                    ? 'सुन रहे हैं... (Listening...)'
                    : 'माइक दबाएं और बोलें (Tap to Speak)'}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  or tap one of the frequent questions below
                </p>
              </div>

              {/* Sound wave visual bars */}
              <div className="flex items-center gap-1.5 h-6">
                {[40, 70, 90, 60, 100, 75, 45, 80, 50, 65, 30].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      voiceQueryActive ? 'bg-rose-500' : 'bg-amber-400'
                    }`}
                    style={{
                      height: voiceQueryActive ? `${Math.max(12, Math.round(h * Math.random()))}px` : '6px',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Answer Display if any */}
            {voiceResponseText && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2 animate-fade-in">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
                  <Volume2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>किसान मित्र का उत्तर:</span>
                </div>
                <p className="leading-relaxed font-medium">{voiceResponseText}</p>
              </div>
            )}

            {/* Quick Frequent Beekeeping Queries */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                अक्सर पूछे जाने वाले सवाल (Quick Voice Prompts):
              </div>
              <div className="space-y-2">
                {voicePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTriggerVoiceQuery(preset)}
                    className="w-full text-left p-2.5 rounded-lg bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-xs text-stone-800 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate font-medium group-hover:font-semibold">
                        {preset.q}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>National Beekeeping &amp; Honey Mission (NBHM)</span>
              <button
                onClick={() => setIsVoiceModalOpen(false)}
                className="px-3 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Area Bee Mitra Field Officer Info Dialog */}
      {isOfficerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                  PW
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Parvez Ahmad Wani
                  </h3>
                  <p className="text-xs text-stone-500">
                    KVIC Junior Field Extension Officer, Pahalgam Circle
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOfficerModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-semibold">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Assigned Mandi &amp; Testing Center:</span>
                </div>
                <div className="pl-6 text-stone-600">
                  KVIC Mandi Depot Center #04, NH-44 Bypass, Industrial Area, Anantnag, J&amp;K.
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-semibold">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>On-Field Visiting Hours:</span>
                </div>
                <div className="pl-6 text-stone-600">
                  Monday to Saturday: 09:00 AM – 04:30 PM
                  <br />
                  Emergency Hive Inspection: On call request
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Free Services Provided:</span>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Physical lot moisture and refractometer checking</li>
                  <li>Tamper-evident NFC seal application on bulk barrels</li>
                  <li>Assistance in KVIC cooperative export pool pledges</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
              <a
                href="tel:+919419028192"
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now (+91 94190 28192)</span>
              </a>
              <button
                onClick={() => setIsOfficerModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
