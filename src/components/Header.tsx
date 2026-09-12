import { useState } from 'react';
import { NavTab } from '../types';
import {
  Home,
  Package,
  Layers,
  PlusCircle,
  Plus,
  FlaskConical,
  ShoppingBag,
  Users,
  Menu,
  X,
  ShieldCheck,
  Headphones,
  User,
  Check,
  LucideIcon
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onSetLang?: (newLang: 'en' | 'hi') => void;
}

export function Header({ activeTab, onSelectTab, lang, onToggleLang, onSetLang }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectLanguage = (targetLang: 'en' | 'hi') => {
    if (lang === targetLang) return;
    if (onSetLang) {
      onSetLang(targetLang);
    } else {
      onToggleLang();
    }
  };

  // Register Batch placed strictly in the middle (4th of 7 items)
  const navItems: { id: NavTab; en: string; hi: string; icon: LucideIcon }[] = [
    { id: 'home', en: 'Home', hi: 'मुख्य पृष्ठ', icon: Home },
    { id: 'my-beehives', en: 'My Beehives', hi: 'मेरे बक्से व आईओटी', icon: Layers },
    { id: 'harvest-batches', en: 'Harvest Batches', hi: 'शहद लॉट व क्यूआर कोड', icon: Package },
    { id: 'register-batch', en: 'Register Batch', hi: 'नई फसल दर्ज करें', icon: PlusCircle },
    { id: 'nmr-lab-reports', en: 'NMR Lab Reports', hi: 'लैब परीक्षण रिपोर्ट', icon: FlaskConical },
    { id: 'cooperative-pools', en: 'Cooperative Pools', hi: 'सहकारी संघ', icon: Users },
    { id: 'marketplace-and-challenge', en: 'Marketplace', hi: 'बाज़ार व प्रामाणिकता', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-white border-b border-stone-200/90 shadow-2xs">
      {/* Top Sovereign Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Left: Govt of India & HoneyChain brand */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          {/* Govt of India Crest */}
          <div className="flex items-center gap-2 pr-3 sm:pr-4 border-r border-stone-200 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-serif font-black text-xs shadow-2xs">
              <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-100" />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] sm:text-xs font-black tracking-wider text-stone-900 uppercase">
                {lang === 'hi' ? 'भारत सरकार' : 'GOVT. OF INDIA'}
              </div>
              <div className="text-[9px] sm:text-[10px] text-stone-500 font-medium">
                {lang === 'hi' ? 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय | KVIC' : 'Ministry of MSME | KVIC & NBHM'}
              </div>
            </div>
          </div>

          {/* HoneyChain KISAN Brand */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group min-w-0"
            title={lang === 'hi' ? 'मुख्य पृष्ठ पर जाएं' : 'Go to Home'}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-800 flex items-center justify-center text-amber-200 shadow-2xs border border-amber-700/60 shrink-0">
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="#b45309" fillOpacity="0.35" />
                <polygon points="12 6 17 9 17 15 12 18 7 15 7 9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="#fbbf24" fillOpacity="0.4" />
                <circle cx="12" cy="12" r="1.75" fill="#fef3c7" stroke="none" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight font-display">
                  HoneyChain
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                  {lang === 'hi' ? 'किसान' : 'KISAN'}
                </span>
              </div>
              <div className="text-[9px] font-mono text-stone-400 font-semibold tracking-wider uppercase mt-0.5 hidden xs:block">
                NBHM-TRACE-v2.4
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Toll-Free + Lang Switcher + Profile */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Toll-Free Pill */}
          <a
            href="tel:18004663958"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-amber-300 bg-stone-50/70 hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs"
            title={lang === 'hi' ? 'केवीआईसी टोल-फ्री हेल्पलाइन' : 'Call KVIC Toll-Free Helpline'}
          >
            <Headphones className="w-4 h-4 text-amber-800 shrink-0" />
            <div className="text-left leading-tight">
              <div className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                {lang === 'hi' ? 'टोल-फ्री हेल्पलाइन' : 'KVIC TOLL-FREE'}
              </div>
              <div className="text-xs font-mono font-bold text-stone-800">
                1800-HONEY-KVIC
              </div>
            </div>
          </a>

          {/* Language Switch Pill (EN / हिंदी) */}
          <div className="flex items-center rounded-lg bg-stone-100 p-0.5 border border-stone-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSelectLanguage('en')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleSelectLanguage('hi')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                lang === 'hi'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
              title="हिन्दी में बदलें"
            >
              हिंदी
            </button>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center gap-2 sm:gap-2.5 pl-1 sm:pl-2">
            <div className="text-right leading-tight hidden sm:block">
              <div className="text-xs sm:text-sm font-bold text-stone-900">
                {lang === 'hi' ? 'गुलाम मोहम्मद' : 'Ghulam Mohammad'}
              </div>
              <div className="text-[10px] text-stone-500">
                {lang === 'hi' ? 'पहलगाम, जम्मू एवं कश्मीर' : 'Pahalgam, Jammu & Kashmir'}
              </div>
            </div>

            {/* Avatar */}
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-900 text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-amber-950 transition-colors"
              title={lang === 'hi' ? 'गुलाम मोहम्मद (पहचान संख्या: JK-NBHM-7729)' : 'Ghulam Mohammad (UID: JK-NBHM-7729)'}
            >
              <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-100" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors lg:hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar - ONLY English in English toggle, ONLY Hindi in Hindi toggle */}
      <div className="border-t border-stone-200 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const label = lang === 'hi' ? item.hi : item.en;
              const isRegister = item.id === 'register-batch';

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-900 text-white shadow-xs'
                      : isRegister
                      ? 'bg-amber-100/70 text-stone-900 hover:bg-amber-100 border border-amber-300/80 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 font-semibold'
                  }`}
                >
                  {isRegister && (
                    <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs border border-red-200">
                      <Plus className="w-3 h-3 text-red-600 stroke-[3]" />
                    </span>
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto animate-fade-in">
          {/* Profile Details in Drawer */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                GM
              </div>
              <div className="leading-tight">
                <div className="font-bold text-stone-900 text-xs flex items-center gap-1">
                  <span>{lang === 'hi' ? 'गुलाम मोहम्मद' : 'Ghulam Mohammad'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </div>
                <div className="text-[10px] text-stone-600 font-mono">
                  {lang === 'hi' ? 'पहचान: JK-NBHM-7729 • पहलगाम' : 'ID: JK-NBHM-7729 • Pahalgam'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
              {lang === 'hi' ? 'केवीआईसी सत्यापित' : 'KVIC Verified'}
            </span>
          </div>

          {/* Navigation Links - ONLY English in English toggle, ONLY Hindi in Hindi toggle */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-1">
              {lang === 'hi' ? 'मुख्य कार्य' : 'CHOOSE WORKFLOW'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const label = lang === 'hi' ? item.hi : item.en;
              const isRegister = item.id === 'register-batch';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-all min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-amber-900 text-white font-bold shadow-xs'
                      : isRegister
                      ? 'bg-amber-50/80 text-stone-900 border border-amber-200/80 font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isRegister ? (
                      <PlusCircle className="w-4 h-4 text-red-600 stroke-[2.5]" />
                    ) : (
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-stone-500'}`} />
                    )}
                    <span className="font-semibold">{label}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
                </button>
              );
            })}
          </div>

          {/* Toll Free Call Button */}
          <a
            href="tel:18004663958"
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold text-center"
          >
            <Headphones className="w-4 h-4 text-amber-300" />
            <span>{lang === 'hi' ? 'किसान टोल-फ्री: 1800-HONEY-KVIC' : 'Kisan Toll-Free: 1800-HONEY-KVIC'}</span>
          </a>
        </div>
      )}
    </header>
  );
}

