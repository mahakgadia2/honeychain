import { NavTab } from '../types';
import {
  ShieldCheck,
  Headphones,
  User,
} from 'lucide-react';

interface HeaderProps {
  activeTab?: NavTab;
  onSelectTab: (tab: NavTab) => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onSetLang?: (newLang: 'en' | 'hi') => void;
}

export function Header({ onSelectTab, lang, onToggleLang, onSetLang }: HeaderProps) {
  const handleSelectLanguage = (targetLang: 'en' | 'hi') => {
    if (lang === targetLang) return;
    if (onSetLang) {
      onSetLang(targetLang);
    } else {
      onToggleLang();
    }
  };

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
          </div>
        </div>
      </div>
    </header>
  );
}

