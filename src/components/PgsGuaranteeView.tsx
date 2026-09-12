import React, { useState } from 'react';
import { ToastMessage } from '../types';
import {
  Users,
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  Ban,
  MessageSquare,
  Plus,
  RefreshCw,
  Clock,
  Sparkles,
  FileCheck2,
  ChevronRight,
  X,
  MapPin,
  Check,
  Scale
} from 'lucide-react';

export interface PgsPeerMember {
  id: string;
  name: string;
  nameHi: string;
  location: string;
  hives: number;
  lastSeasonInspectionDate: string;
  lastWeeklyVisitDate: string;
  inspectorName: string;
  counselGivenRecent: string;
  counselGivenRecentHi: string;
  status: 'vouched' | 'violation_withheld';
  violationReason?: string;
  violationReasonHi?: string;
  rectificationPlan?: string;
  rectificationPlanHi?: string;
  isCurrentUser?: boolean;
}

export interface PgsWeeklyVisit {
  id: string;
  date: string;
  visitorFarmer: string;
  hostFarmer: string;
  focusArea: string;
  focusAreaHi: string;
  counselNotes: string;
  counselNotesHi: string;
  organicComplianceStatus: 'passed' | 'violation_found';
  voucherVerified: boolean;
}

interface PgsGuaranteeViewProps {
  lang?: 'en' | 'hi';
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  onSelectPoolTab?: () => void;
  userIsUnderViolation?: boolean;
  onToggleUserViolation?: (status: boolean) => void;
}

export function PgsGuaranteeView({
  lang = 'en',
  onShowToast,
  onSelectPoolTab,
  userIsUnderViolation = false,
  onToggleUserViolation,
}: PgsGuaranteeViewProps) {
  // Modal states
  const [isLogVisitModalOpen, setIsLogVisitModalOpen] = useState(false);
  const [isRectifyModalOpen, setIsRectifyModalOpen] = useState(false);
  const [selectedPeerForRectify, setSelectedPeerForRectify] = useState<PgsPeerMember | null>(null);
  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);

  // New visit form states
  const [newVisitHost, setNewVisitHost] = useState('Fatima Begum');
  const [newVisitFocus, setNewVisitFocus] = useState('Bee Nutrition & Dearth Feeding');
  const [newVisitCounsel, setNewVisitCounsel] = useState('');
  const [newVisitCompliance, setNewVisitCompliance] = useState<'passed' | 'violation_found'>('passed');

  // Peer members state
  const [peerMembers, setPeerMembers] = useState<PgsPeerMember[]>([
    {
      id: 'peer-1',
      name: 'Ghulam Mohammad (You)',
      nameHi: 'गुलाम मोहम्मद (आप)',
      location: 'Pahalgam Colony • Compartment 14',
      hives: 24,
      lastSeasonInspectionDate: '15 April 2026',
      lastWeeklyVisitDate: '09 Sept 2026 (2 days ago)',
      inspectorName: 'Bashir Ahmad Dar',
      counselGivenRecent: 'Advised shifting hive cluster 50m deeper into pine woodland buffer. Zero synthetic miticides verified.',
      counselGivenRecentHi: 'चीड़ के पेड़ों के बफर ज़ोन में बक्से रखने की सलाह दी। शून्य रासायनिक कीटनाशक सत्यापित।',
      status: userIsUnderViolation ? 'violation_withheld' : 'vouched',
      isCurrentUser: true,
      violationReason: userIsUnderViolation ? 'Simulated violation for test: Non-organic wax foundation used' : undefined,
    },
    {
      id: 'peer-2',
      name: 'Fatima Begum',
      nameHi: 'फातिमा बेगम',
      location: 'Lidder Valley Apiaries • Sallar',
      hives: 18,
      lastSeasonInspectionDate: '16 April 2026',
      lastWeeklyVisitDate: '06 Sept 2026',
      inspectorName: 'Ghulam Mohammad (You)',
      counselGivenRecent: 'Demonstrated solar wax extractor technique to avoid open-flame burning. Organic credentials intact.',
      counselGivenRecentHi: 'सौर मोम निष्कर्षण तकनीक का प्रदर्शन किया। जैविक प्रमाण पत्र शत-प्रतिशत मान्य।',
      status: 'vouched',
    },
    {
      id: 'peer-3',
      name: 'Bashir Ahmad Dar',
      nameHi: 'बशीर अहमद डार',
      location: 'Aru Green Heights • Overa Sanctuary',
      hives: 32,
      lastSeasonInspectionDate: '15 April 2026',
      lastWeeklyVisitDate: '02 Sept 2026',
      inspectorName: 'Mohammad Altaf',
      counselGivenRecent: 'Counseled on wild Robinia floral timing and swarm prevention without artificial queen clip wings.',
      counselGivenRecentHi: 'रोबिनिया के प्राकृतिक खिलने और रानी मक्खी के पंख न काटने की जैविक विधि पर परामर्श।',
      status: 'vouched',
    },
    {
      id: 'peer-4',
      name: 'Tariq Lone',
      nameHi: 'तारिक लोन',
      location: 'Overa Valley Farm • Anantnag Border',
      hives: 15,
      lastSeasonInspectionDate: '18 April 2026',
      lastWeeklyVisitDate: '28 Aug 2026',
      inspectorName: 'Bashir Ahmad Dar',
      counselGivenRecent: 'FLAGGED VIOLATION: Non-organic commercial sugar feed cans discovered during dearth. Group sale withheld.',
      counselGivenRecentHi: 'नियम उल्लंघन: फूलों की कमी के समय गैर-जैविक चीनी सिरप का उपयोग पाया गया। समूह बिक्री स्थगित।',
      status: 'violation_withheld',
      violationReason: 'Found using non-organic commercial inverted sugar syrup during August floral dearth period.',
      violationReasonHi: 'अगस्त की फूलों की कमी के दौरान गैर-जैविक व्यावसायिक चीनी सिरप का उपयोग करते पाया गया।',
      rectificationPlan: 'Offending feed cans confiscated. Replaced with certified organic honey reserve combs. Awaiting 14-day clearance peer inspection.',
      rectificationPlanHi: 'आपत्तिजनक सिरप हटाया गया। प्रमाणित जैविक शहद के छत्ते लगाए गए। 14 दिवसीय पुनः परीक्षण लंबित।',
    },
    {
      id: 'peer-5',
      name: 'Zahoor Wani',
      nameHi: 'ज़हूर वानी',
      location: 'Baisaran Meadows Apiary',
      hives: 20,
      lastSeasonInspectionDate: '17 April 2026',
      lastWeeklyVisitDate: '25 Aug 2026',
      inspectorName: 'Fatima Begum',
      counselGivenRecent: 'Inspected 3km foraging buffer against nearby conventional apple orchards. Natural forest forage cleared.',
      counselGivenRecentHi: 'सेब के बागानों से 3 किमी बफर दूरी की जांच की। प्राकृतिक जंगली क्षेत्र प्रमाणित।',
      status: 'vouched',
    },
    {
      id: 'peer-6',
      name: 'Mohammad Altaf',
      nameHi: 'मोहम्मद अल्ताफ',
      location: 'Laripora Eco-Hives',
      hives: 22,
      lastSeasonInspectionDate: '16 April 2026',
      lastWeeklyVisitDate: '20 Aug 2026',
      inspectorName: 'Zahoor Wani',
      counselGivenRecent: 'Trained on botanical smoke herbs (wild lavender & pine needles) instead of chemical propellant smoker.',
      counselGivenRecentHi: 'रासायनिक स्मोकर के स्थान पर जंगली लैवेंडर व चीड़ के पत्तों के धुएं का उपयोग करने की सलाह।',
      status: 'vouched',
    },
  ]);

  // Weekly visits log
  const [weeklyVisits, setWeeklyVisits] = useState<PgsWeeklyVisit[]>([
    {
      id: 'vis-101',
      date: '09 Sept 2026',
      visitorFarmer: 'Bashir Ahmad Dar',
      hostFarmer: 'Ghulam Mohammad (You)',
      focusArea: 'Varroa Mite Organic Check',
      focusAreaHi: 'वरोआ माइट जैविक जांच व परामर्श',
      counselNotes: 'Inspected 6 random brood frames. Verified natural formic acid gel strips. Zero synthetic chemical residues. Credentials vouched.',
      counselNotesHi: '6 ब्रूड फ्रेम का निरीक्षण किया। प्राकृतिक फॉर्मिक एसिड जेल का उपयोग सत्यापित। शून्य रासायनिक अवशेष।',
      organicComplianceStatus: 'passed',
      voucherVerified: true,
    },
    {
      id: 'vis-100',
      date: '06 Sept 2026',
      visitorFarmer: 'Ghulam Mohammad (You)',
      hostFarmer: 'Fatima Begum',
      focusArea: 'Solar Wax Rendering',
      focusAreaHi: 'सौर मोम शोधन व स्वच्छता',
      counselNotes: 'Demonstrated natural solar extraction. Advised keeping honey supers elevated on wooden pallets away from ground moisture.',
      counselNotesHi: 'सौर ऊर्जा आधारित मोम शोधन का प्रदर्शन। शहद के बक्से लकड़ी के स्टैंड पर रखने का परामर्श दिया।',
      organicComplianceStatus: 'passed',
      voucherVerified: true,
    },
    {
      id: 'vis-099',
      date: '28 Aug 2026',
      visitorFarmer: 'Bashir Ahmad Dar',
      hostFarmer: 'Tariq Lone',
      focusArea: 'Dearth Supplemental Feeding',
      focusAreaHi: 'फूलों की कमी में पूरक आहार जांच',
      counselNotes: 'VIOLATION DETECTED: Discovered store-bought commercial syrup. Issued formal PGS Peer Warning Notice. Produce withheld from FPO pool.',
      counselNotesHi: 'उल्लंघन दर्ज: बाज़ारू गैर-जैविक सिरप का उपयोग पाया गया। औपचारिक चेतावनी जारी, सहकारी पूल बिक्री तुरंत रोकी गई।',
      organicComplianceStatus: 'violation_found',
      voucherVerified: false,
    },
    {
      id: 'vis-098',
      date: '20 Aug 2026',
      visitorFarmer: 'Zahoor Wani',
      hostFarmer: 'Mohammad Altaf',
      focusArea: 'Forage Radius Organic Buffer',
      focusAreaHi: 'चराई क्षेत्र एवं जैविक बफर जांच',
      counselNotes: 'Walked the 3km perimeter. No chemical spray activity detected within flight path. Hive logs signed and vouched.',
      counselNotesHi: '3 किमी परिधि का पैदल निरीक्षण किया। उड़ान क्षेत्र में किसी रासायनिक छिड़काव का कोई निशान नहीं। लॉग बुक सत्यापित।',
      organicComplianceStatus: 'passed',
      voucherVerified: true,
    },
  ]);

  // Handle logging a new weekly peer visit
  const handleLogVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitCounsel.trim()) {
      onShowToast({
        title: lang === 'hi' ? 'परामर्श विवरण आवश्यक है' : 'Counsel Notes Required',
        message: lang === 'hi' ? 'कृपया सहकर्मी को दिए गए परामर्श का विवरण दर्ज करें।' : 'Please enter the counseling notes provided during the peer inspection.',
        type: 'warning',
      });
      return;
    }

    const newVisit: PgsWeeklyVisit = {
      id: `vis-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      visitorFarmer: 'Ghulam Mohammad (You)',
      hostFarmer: newVisitHost,
      focusArea: newVisitFocus,
      focusAreaHi: newVisitFocus,
      counselNotes: newVisitCounsel,
      counselNotesHi: newVisitCounsel,
      organicComplianceStatus: newVisitCompliance,
      voucherVerified: newVisitCompliance === 'passed',
    };

    setWeeklyVisits([newVisit, ...weeklyVisits]);

    // If violation found, update peer status
    if (newVisitCompliance === 'violation_found') {
      setPeerMembers((prev) =>
        prev.map((m) =>
          m.name.includes(newVisitHost)
            ? {
                ...m,
                status: 'violation_withheld',
                violationReason: `Violation logged on ${newVisit.date}: ${newVisitCounsel}`,
                violationReasonHi: `उल्लंघन दर्ज (${newVisit.date}): ${newVisitCounsel}`,
              }
            : m
        )
      );
      onShowToast({
        title: lang === 'hi' ? 'उल्लंघन दर्ज: समूह बिक्री स्थगित' : 'Violation Recorded: Produce Sale Withheld',
        message: lang === 'hi'
          ? `${newVisitHost} का शहद तब तक सहकारी पूल में नहीं बेचा जाएगा जब तक गलती सुधार न ली जाए।`
          : `${newVisitHost}'s produce is now strictly withheld from group cooperative sale until rectified.`,
        type: 'error',
      });
    } else {
      setPeerMembers((prev) =>
        prev.map((m) =>
          m.name.includes(newVisitHost)
            ? {
                ...m,
                lastWeeklyVisitDate: 'Today',
                inspectorName: 'Ghulam Mohammad (You)',
                counselGivenRecent: newVisitCounsel,
              }
            : m
        )
      );
      onShowToast({
        title: lang === 'hi' ? 'साप्ताहिक निरीक्षण व परामर्श दर्ज' : 'Weekly Peer Visit & Counsel Logged',
        message: lang === 'hi'
          ? `${newVisitHost} की जैविक साख प्रमाणित की गई। डिजिटल बहीखाता अपडेट हो गया।`
          : `Successfully vouched for ${newVisitHost}'s organic credentials and logged counsel.`,
        type: 'success',
      });
    }

    setIsLogVisitModalOpen(false);
    setNewVisitCounsel('');
  };

  // Handle rectifying a violation
  const handleApproveRectification = (peerId: string) => {
    setPeerMembers((prev) =>
      prev.map((m) =>
        m.id === peerId
          ? {
              ...m,
              status: 'vouched',
              violationReason: undefined,
              violationReasonHi: undefined,
              rectificationPlan: undefined,
              counselGivenRecent: 'RECTIFIED & RESTORED: Verified 100% organic reserve feed restored. Full group sale eligibility restored.',
              counselGivenRecentHi: 'सुधार पूर्ण: जैविक शहद आरक्षित छत्ते स्थापित। समूह बिक्री अधिकार पुनः बहाल किए गए।',
              lastWeeklyVisitDate: 'Today (Re-inspected)',
            }
          : m
      )
    );

    setIsRectifyModalOpen(false);
    setSelectedPeerForRectify(null);

    onShowToast({
      title: lang === 'hi' ? 'सुधार सत्यापित: बिक्री बहाल!' : 'Rectification Verified: Sale Restored!',
      message: lang === 'hi'
        ? 'सहकर्मी ने अपनी गलती सुधार ली है। अब इनका उत्पाद समूह के माध्यम से बेचा जा सकता है।'
        : 'The peer has rectified the violation. Produce is now fully authorized for sale through the cooperative pool.',
      type: 'success',
    });
  };

  const vouchedCount = peerMembers.filter((m) => m.status === 'vouched').length;
  const violationCount = peerMembers.filter((m) => m.status === 'violation_withheld').length;

  return (
    <div className="space-y-6 animate-fade-in" id="pgs-organic-scheme-section">
      {/* 1. Sovereign Scheme Banner highlighting the exact PGS definition */}
      <section className="bg-linear-to-br from-emerald-900 via-stone-900 to-amber-950 text-white rounded-2xl p-5 sm:p-7 shadow-md border border-emerald-700/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-48 h-48 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>PGS-INDIA ORGANIC CERTIFICATION SCHEME • भागीदारी गारंटी प्रणाली</span>
            </div>
            <span className="font-mono text-[11px] text-stone-300 bg-black/40 px-2.5 py-0.5 rounded border border-stone-700">
              Group ID: #PGS-IN-JK-0881 • Pahalgam Circle #04
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              {lang === 'hi'
                ? 'भागीदारी गारंटी प्रणाली (PGS): सहकर्मी जैविक प्रमाणन'
                : 'Participatory Guarantee Systems (PGS) Organic Scheme'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/90 font-medium mt-1 max-w-3xl leading-relaxed">
              {lang === 'hi'
                ? 'समूह के किसान एक-दूसरे की भूमि/मधुमक्खी फार्म का निरीक्षण करते हैं और इसकी जैविक साख की पुष्टि करते हैं। निरीक्षण प्रत्येक बुवाई/ऋतु की शुरुआत में किया जाता है और किसान परामर्श देने के लिए लगभग हर हफ्ते एक-दूसरे से मिलते हैं।'
                : "Farmers in a group inspect each other's land and vouch for its organic credentials. The inspection is carried out at the start of every sowing season and farmers visit each other almost weekly to provide counsel."}
            </p>
          </div>

          {/* Golden Highlight Box: The Strict Penalty / Safeguard Rule */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/70 border border-amber-500/50 flex items-start gap-3 text-xs sm:text-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300 mt-0.5">
              <Ban className="w-4 h-4 text-amber-300 stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-stone-100">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] block">
                {lang === 'hi' ? 'कठोर समूह अनुपालन नियम (ENFORCEMENT CLAUSE):' : 'STRICT GROUP ENFORCEMENT CLAUSE:'}
              </span>
              <p className="text-stone-200 font-semibold leading-relaxed">
                {lang === 'hi'
                  ? 'यदि कोई किसान नियमों का उल्लंघन करता पाया जाता है, तो जब तक वह अपनी गलती सुधार नहीं लेता, तब तक उसका उत्पाद समूह के माध्यम से नहीं बेचा जाता है।'
                  : 'If a farmer is found to be in violation, her produce is NOT sold through the group till she rectifies her mistake.'}
              </p>
            </div>
          </div>

          {/* Quick Stat Highlights */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <div className="text-stone-300 text-[10px] font-bold uppercase">{lang === 'hi' ? 'समूह सदस्य' : 'Group Peers'}</div>
              <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">{peerMembers.length} {lang === 'hi' ? 'पालक' : 'Farmers'}</div>
              <div className="text-[10px] text-emerald-300 font-semibold mt-0.5">Pahalgam Valley Circle</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <div className="text-stone-300 text-[10px] font-bold uppercase">{lang === 'hi' ? 'प्रमाणित (बिक्री योग्य)' : 'Vouched & Cleared'}</div>
              <div className="text-lg sm:text-xl font-extrabold text-emerald-300 mt-0.5">{vouchedCount} {lang === 'hi' ? 'सत्यापित' : 'Eligible'}</div>
              <div className="text-[10px] text-stone-300 mt-0.5">{lang === 'hi' ? 'पूल में बिक्री की अनुमति' : 'Can sell via co-op pool'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <div className="text-stone-300 text-[10px] font-bold uppercase">{lang === 'hi' ? 'बिक्री स्थगित (उल्लंघन)' : 'Sale Withheld'}</div>
              <div className="text-lg sm:text-xl font-extrabold text-rose-300 mt-0.5">{violationCount} {lang === 'hi' ? 'स्थगित' : 'Withheld'}</div>
              <div className="text-[10px] text-rose-200 mt-0.5">{lang === 'hi' ? 'गलती सुधार लंबित' : 'Rectification pending'}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <div className="text-stone-300 text-[10px] font-bold uppercase">{lang === 'hi' ? 'साप्ताहिक परामर्श' : 'Weekly Visits'}</div>
              <div className="text-lg sm:text-xl font-extrabold text-amber-300 mt-0.5">{weeklyVisits.length} {lang === 'hi' ? 'दर्ज' : 'Logged'}</div>
              <div className="text-[10px] text-stone-300 mt-0.5">{lang === 'hi' ? 'नियमित देखरेख' : 'Active weekly visits'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Operational Columns: Season-Start Inspection & Weekly Counsel Log */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (7 Cols): Sowing Season Baseline & Weekly Peer Visits Ledger */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card: Start of Sowing Season Inspection Card */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    {lang === 'hi' ? 'ऋतु प्रारंभ निरीक्षण (SEASON BASELINE)' : 'SEASON START INSPECTION'}
                  </div>
                  <h3 className="text-base font-bold text-stone-900">
                    {lang === 'hi' ? 'बुवाई / ऋतु प्रारंभ पर संयुक्त भूमि व फार्म निरीक्षण' : 'Start of Season Group Land & Apiary Inspection'}
                  </h3>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'hi' ? 'सत्यापित' : 'Passed & Vouched'}</span>
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? 'नियम के अनुसार, प्रत्येक बुवाई व फूल खिलने के मौसम की शुरुआत में समूह के किसान एक-दूसरे की भूमि, चारागाह और बक्सों का संयुक्त निरीक्षण करते हैं।'
                : 'As mandated by PGS guidelines, peer farmers conducted exhaustive on-site inspections of each other’s floral forage zones and hive construction before season opening.'}
            </p>

            {/* Checklist of 4 Core Pillars Checked at Season Start */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>{lang === 'hi' ? '3 किमी जैविक बफर परिधि' : '3km Organic Forage Buffer'}</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {lang === 'hi'
                    ? 'उड़ान परिधि में कोई रासायनिक कीटनाशक छिड़काव नहीं।'
                    : 'Zero prohibited synthetic sprays within bee foraging radius.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>{lang === 'hi' ? 'प्राकृतिक लकड़ी के बक्से व छत्ते' : 'Non-Toxic Hive Construction'}</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {lang === 'hi'
                    ? 'अलसी तेल व मोम पॉलिश, शून्य सीसा या रासायनिक पेंट।'
                    : 'Linseed oil and beeswax seal; no synthetic enamel paint.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>{lang === 'hi' ? 'जैविक स्वास्थ्य प्रबंधन' : 'Organic Health Protocols'}</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {lang === 'hi'
                    ? 'प्राकृतिक थाइमोल व फॉर्मिक एसिड, शून्य एंटीबायोटिक।'
                    : 'Botanical thymol & organic acids; zero chemical antibiotics.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>{lang === 'hi' ? 'शुद्ध शहद आरक्षित फ्रेम' : 'Honey Reserve Frame Storage'}</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {lang === 'hi'
                    ? 'अकाल समय हेतु प्राकृतिक शहद सुरक्षित, चीनी सिरप वर्जित।'
                    : 'Natural honey stores verified for dearth periods.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
              <span>{lang === 'hi' ? 'निरीक्षण दल:' : 'Season Inspectors:'} <strong>Bashir Ahmad Dar & Fatima Begum</strong></span>
              <button
                type="button"
                onClick={() => setIsSeasonModalOpen(true)}
                className="text-amber-900 font-bold hover:underline cursor-pointer"
              >
                {lang === 'hi' ? 'प्रमाणपत्र देखें' : 'View Certificate'} →
              </button>
            </div>
          </div>

          {/* Card: Weekly Peer Visits & Counsel Ledger */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  {lang === 'hi' ? 'साप्ताहिक परामर्श बहीखाता (WEEKLY COUNSEL)' : 'WEEKLY PEER VISITS & COUNSEL'}
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {lang === 'hi' ? 'साप्ताहिक सहकर्मी भ्रमण एवं मार्गदर्शन' : 'Weekly Farm Visits & Peer Mentoring Log'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsLogVisitModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 text-amber-200" />
                <span>{lang === 'hi' ? '+ नया साप्ताहिक भ्रमण दर्ज करें' : '+ Log Weekly Peer Visit'}</span>
              </button>
            </div>

            <p className="text-xs text-stone-600">
              {lang === 'hi'
                ? 'किसान हर हफ्ते एक-दूसरे के यहां जाकर तकनीकी परामर्श और जैविक मानकों की समीक्षा करते हैं:'
                : 'Farmers visit each other almost weekly to provide counsel and ensure no prohibited inputs compromise the harvest:'}
            </p>

            {/* Visits Timeline */}
            <div className="space-y-3">
              {weeklyVisits.map((visit) => {
                const isViolation = visit.organicComplianceStatus === 'violation_found';

                return (
                  <div
                    key={visit.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isViolation
                        ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-200'
                        : 'bg-stone-50 border-stone-200/90 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700 font-bold">
                          {visit.date}
                        </span>
                        <span className="font-bold text-stone-900">
                          {visit.visitorFarmer} → <span className="text-amber-950">{visit.hostFarmer}</span>
                        </span>
                      </div>

                      {isViolation ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-black uppercase flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-700" />
                          {lang === 'hi' ? 'उल्लंघन दर्ज (बिक्री स्थगित)' : 'Violation Flagged (Sale Withheld)'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          {lang === 'hi' ? 'जैविक प्रमाणित' : 'Vouched 100%'}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                      <span>{lang === 'hi' ? 'निरीक्षण व परामर्श:' : 'Counsel Given:'} <strong className="text-stone-900 font-bold">{visit.focusArea}</strong></span>
                    </div>

                    <p className="mt-1 text-xs text-stone-600 pl-5 leading-relaxed">
                      "{lang === 'hi' ? visit.counselNotesHi || visit.counselNotes : visit.counselNotes}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Peer Members Directory & Violation Enforcement */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card: Group Members & Current Sale Eligibility Status */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    {lang === 'hi' ? 'समूह के साथी किसान व पात्रता स्थिति' : 'PGS Group Peers & Sale Status'}
                  </h3>
                  <div className="text-[11px] text-stone-500">
                    {lang === 'hi' ? 'पारस्परिक जांच व सहकर्मी गारंटी' : 'Peer-to-peer verification status'}
                  </div>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px] font-bold">
                6 PEERS
              </span>
            </div>

            <p className="text-xs text-stone-600">
              {lang === 'hi'
                ? 'यदि किसी किसान के फार्म पर उल्लंघन पाया जाता है, तो जब तक वह सुधार न कर ले, समूह पूल में उसका शहद बेचना पूर्णतः वर्जित रहता है:'
                : 'Produce can only be pooled for sale if peer farmers have verified zero violations:'}
            </p>

            {/* Peer List */}
            <div className="space-y-3">
              {peerMembers.map((member) => {
                const isViolation = member.status === 'violation_withheld';

                return (
                  <div
                    key={member.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isViolation
                        ? 'bg-rose-50/50 border-rose-300'
                        : member.isCurrentUser
                        ? 'bg-amber-50/40 border-amber-300'
                        : 'bg-white border-stone-200/90'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                          <span>{lang === 'hi' ? member.nameHi : member.name}</span>
                          {member.isCurrentUser && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-950 text-[10px]">
                              {lang === 'hi' ? 'आप' : 'You'}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{member.location}</span>
                        </div>
                        <div className="text-[10px] text-stone-400 mt-0.5">
                          {member.hives} {lang === 'hi' ? 'मधुमक्खी बक्से' : 'Hives'} • {lang === 'hi' ? 'अंतिम साप्ताहिक भ्रमण:' : 'Last Visit:'} {member.lastWeeklyVisitDate}
                        </div>
                      </div>

                      {isViolation ? (
                        <span className="px-2 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-bold uppercase tracking-tight flex items-center gap-1 shrink-0">
                          <Ban className="w-3 h-3 text-rose-700" />
                          <span>{lang === 'hi' ? 'बिक्री स्थगित' : 'Sale Withheld'}</span>
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold uppercase tracking-tight flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>{lang === 'hi' ? 'बिक्री अधिकृत' : 'Authorized'}</span>
                        </span>
                      )}
                    </div>

                    {/* Violation Alert Box if any */}
                    {isViolation && (
                      <div className="mt-2.5 p-2.5 rounded-lg bg-white border border-rose-200 text-xs space-y-1.5">
                        <div className="text-[11px] font-bold text-rose-900 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span>{lang === 'hi' ? 'उल्लंघन विवरण:' : 'Active Violation Detail:'}</span>
                        </div>
                        <p className="text-[11px] text-stone-700 leading-snug">
                          {lang === 'hi' ? member.violationReasonHi || member.violationReason : member.violationReason}
                        </p>
                        {member.rectificationPlan && (
                          <div className="pt-1 text-[11px] text-amber-900 font-medium">
                            <strong>{lang === 'hi' ? 'सुधार प्रगति:' : 'Rectification:'}</strong> {lang === 'hi' ? member.rectificationPlanHi || member.rectificationPlan : member.rectificationPlan}
                          </div>
                        )}

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPeerForRectify(member);
                              setIsRectifyModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-md bg-rose-800 hover:bg-rose-900 text-white font-bold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>{lang === 'hi' ? 'सुधार का पुनः निरीक्षण करें' : 'Verify Rectification & Restore'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Vouched note if healthy */}
                    {!isViolation && (
                      <div className="mt-2 text-[11px] text-stone-600 bg-stone-50 p-2 rounded border border-stone-100">
                        <span className="font-semibold text-stone-700">{lang === 'hi' ? 'हालिया सहकर्मी परामर्श:' : 'Recent Counsel:'}</span> {lang === 'hi' ? member.counselGivenRecentHi || member.counselGivenRecent : member.counselGivenRecent}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card: Direct Integration with Cooperative Mandi / Pools */}
          <div className="bg-amber-50/70 rounded-xl border border-amber-300 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
              <Scale className="w-4 h-4 text-amber-900 shrink-0" />
              <span>{lang === 'hi' ? 'सहकारी पूल व मंडी से सीधा जुड़ाव' : 'PGS Linkage to Co-op Pools'}</span>
            </div>

            <p className="text-xs text-amber-900/90 leading-relaxed">
              {lang === 'hi'
                ? 'यूरोपीय व राष्ट्रीय निर्यातक (TRIFED/KVIC) केवल उन्हीं शहद लॉट को ₹420–₹460/किलो का प्रीमियम मूल्य देते हैं जिनके पास मान्य PGS सहकर्मी गारंटी व साप्ताहिक परामर्श रिकॉर्ड होता है।'
                : 'Institutional buyers and KVIC only unlock export rates (₹420–₹460/KG) for lots backed by active PGS-India group peer vouchers and up-to-date weekly visit ledgers.'}
            </p>

            <div className="p-3 rounded-lg bg-white border border-amber-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-stone-900">
                  {lang === 'hi' ? 'आपकी वर्तमान स्थिति:' : 'Your Status:'}
                </div>
                <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'hi' ? 'PGS जैविक प्रमाणित (पूल बिक्री हेतु मान्य)' : 'PGS Certified Organic (Eligible for Pool Sale)'}</span>
                </div>
              </div>

              {onSelectPoolTab && (
                <button
                  type="button"
                  onClick={onSelectPoolTab}
                  className="px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'पूल देखें' : 'View Pools'} →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL: Log Weekly Peer Visit */}
      {isLogVisitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                  PGS WEEKLY COUNSEL LOG
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1">
                  {lang === 'hi' ? 'साप्ताहिक सहकर्मी भ्रमण व परामर्श दर्ज करें' : 'Log Weekly Peer Visit & Provide Counsel'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLogVisitModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogVisit} className="space-y-4 text-xs">
              {/* Select Peer Visited */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  {lang === 'hi' ? 'किस सहकर्मी के फार्म का निरीक्षण किया?' : 'Whose farm/apiary did you visit?'}
                </label>
                <select
                  value={newVisitHost}
                  onChange={(e) => setNewVisitHost(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg font-semibold text-stone-900 bg-white"
                >
                  {peerMembers
                    .filter((m) => !m.isCurrentUser)
                    .map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.location})
                      </option>
                    ))}
                </select>
              </div>

              {/* Inspection Focus */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  {lang === 'hi' ? 'निरीक्षण का मुख्य विषय:' : 'Inspection Focus Area:'}
                </label>
                <select
                  value={newVisitFocus}
                  onChange={(e) => setNewVisitFocus(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg font-semibold text-stone-900 bg-white"
                >
                  <option value="Varroa Mite Organic Check">Varroa Mite Organic Check (जैविक माइट नियंत्रण)</option>
                  <option value="Bee Nutrition & Dearth Feeding">Bee Nutrition & Dearth Feeding (अकाल समय पोषण व छत्ते)</option>
                  <option value="Forage Radius Organic Buffer">Forage Radius Organic Buffer (3 किमी जैविक बफर परिधि)</option>
                  <option value="Solar Wax Rendering & Sanitation">Solar Wax Rendering & Sanitation (मोम निष्कर्षण स्वच्छता)</option>
                  <option value="Hive Box Natural Paint & Seal">Hive Box Natural Paint & Seal (प्राकृतिक पॉलिश व बक्सा स्थिति)</option>
                </select>
              </div>

              {/* Counsel & Mentoring Notes */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  {lang === 'hi' ? 'सहकर्मी को दिया गया परामर्श व सुझाव:' : 'Counsel & Recommendations Provided:'}
                </label>
                <textarea
                  rows={3}
                  value={newVisitCounsel}
                  onChange={(e) => setNewVisitCounsel(e.target.value)}
                  placeholder={
                    lang === 'hi'
                      ? 'उदाहरण: प्राकृतिक थाइमोल की मात्रा की जांच की, बक्से को छायादार स्थान पर रखने की सलाह दी...'
                      : 'e.g., Inspected 4 supers. Advised switching to oxalic acid vapor for natural varroa control. Confirmed zero synthetic chemicals...'
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg font-normal text-stone-900 bg-white focus:ring-1 focus:ring-amber-800"
                />
              </div>

              {/* Compliance Status & Safeguard */}
              <div className="space-y-2 pt-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  {lang === 'hi' ? 'जैविक अनुपालन निर्णय:' : 'Compliance Determination:'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    className={`p-3 rounded-lg border flex items-center gap-2 cursor-pointer ${
                      newVisitCompliance === 'passed'
                        ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="compliance"
                      checked={newVisitCompliance === 'passed'}
                      onChange={() => setNewVisitCompliance('passed')}
                      className="accent-emerald-700"
                    />
                    <div>
                      <div className="font-bold text-emerald-900 text-xs">
                        {lang === 'hi' ? 'साख प्रमाणित (Vouched)' : 'Vouch Credentials'}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {lang === 'hi' ? 'पूर्ण जैविक, कोई उल्लंघन नहीं' : '100% Organic, no violations'}
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-lg border flex items-center gap-2 cursor-pointer ${
                      newVisitCompliance === 'violation_found'
                        ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-500'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="compliance"
                      checked={newVisitCompliance === 'violation_found'}
                      onChange={() => setNewVisitCompliance('violation_found')}
                      className="accent-rose-700"
                    />
                    <div>
                      <div className="font-bold text-rose-900 text-xs">
                        {lang === 'hi' ? 'उल्लंघन दर्ज (Withhold)' : 'Flag Violation'}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {lang === 'hi' ? 'सुधार तक बिक्री स्थगित' : 'Withhold pool sale until fixed'}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Enforcement Notice */}
              <div className="p-3 rounded-lg bg-stone-100 border border-stone-200 text-[11px] text-stone-600">
                <strong>PGS Guarantee Rule:</strong> By signing this digital log, you vouch as a fellow farmer under PGS-India regulations. If a violation is flagged, produce cannot be pooled until verified rectification.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsLogVisitModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-white font-bold cursor-pointer shadow-xs"
                >
                  {lang === 'hi' ? 'निरीक्षण व परामर्श सहेजें' : 'Save & Sign Peer Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Verify Rectification & Restore Group Sale Access */}
      {isRectifyModalOpen && selectedPeerForRectify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 text-[10px] font-mono font-bold">
                  PGS RECTIFICATION RE-INSPECTION
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1">
                  {lang === 'hi' ? 'गलती सुधार सत्यापन व बिक्री बहाली' : 'Verify Rectification & Restore Pool Sale'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRectifyModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-1">
                <div className="font-bold text-stone-900">
                  {selectedPeerForRectify.name} ({selectedPeerForRectify.location})
                </div>
                <div className="text-rose-800 text-[11px] font-semibold">
                  <strong>{lang === 'hi' ? 'मूल उल्लंघन:' : 'Original Violation:'}</strong> {selectedPeerForRectify.violationReason}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-stone-900">
                  {lang === 'hi' ? 'पुनः निरीक्षण चेकलिस्ट (सुधार पुष्टि):' : 'Re-Inspection Verification Checklist:'}
                </div>

                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Offending non-organic inputs fully removed from farm premises.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Certified organic reserve honey comb frames reinstated.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Peer counseling acknowledged and signed in farm inspection ledger.</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed">
                <strong>PGS Resolution Rule:</strong> Once you verify this rectification, {selectedPeerForRectify.name}'s produce will be immediately re-authorized for aggregation and sale through the cooperative export pools.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsRectifyModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 cursor-pointer text-xs"
              >
                {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => handleApproveRectification(selectedPeerForRectify.id)}
                className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold cursor-pointer text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{lang === 'hi' ? 'सुधार स्वीकृत करें व बिक्री बहाल करें' : 'Approve Rectification & Restore Sale'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Sowing Season Inspection Certificate */}
      {isSeasonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold">
                  PGS-INDIA CERTIFICATE
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1">
                  Season Baseline Inspection Record
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSeasonModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Group Name:</span>
                <span className="font-bold text-stone-900">Pahalgam Valley Bee Circle #04</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">PGS-India Reg #:</span>
                <span className="font-bold text-stone-900">PGS-IN-JK-2026-0881</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Inspection Date:</span>
                <span className="font-bold text-stone-900">15 April 2026 (Spring Sowing)</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Lead Peer Inspector:</span>
                <span className="font-bold text-stone-900">Bashir Ahmad Dar (Aru)</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Organic Status:</span>
                <span className="font-bold text-emerald-700">CERTIFIED GREEN PGS-ORGANIC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Next Baseline Due:</span>
                <span className="font-bold text-amber-900">15 Oct 2026 (Autumn Cycle)</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsSeasonModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
