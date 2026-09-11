import { useState } from 'react';
import { NavTab } from '../types';
import {
  Package,
  Layers,
  PlusCircle,
  FlaskConical,
  Wallet,
  ShoppingBag,
  Menu,
  X,
  ShieldCheck,
  PhoneCall,
  UserCheck,
  Check,
  LucideIcon,
  Languages
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
}

export function Header({ activeTab, onSelectTab, lang, onToggleLang }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; en: string; hi: string; icon: LucideIcon }[] = [
    { id: 'register-batch', en: 'Register Batch', hi: 'नई फसल दर्ज करें', icon: PlusCircle },
    { id: 'my-beehives', en: 'My Beehives', hi: 'मेरे बक्से व आईओटी', icon: Layers },
    { id: 'harvest-batches', en: 'Harvest Batches', hi: 'शहद लॉट व क्यूआर कोड', icon: Package },
    { id: 'nmr-lab-reports', en: 'NMR Lab Reports', hi: 'लैब परीक्षण रिपोर्ट', icon: FlaskConical },
    { id: 'msp-payouts-and-schemes', en: 'MSP Payouts & Schemes', hi: 'न्यूनतम समर्थन मूल्य व बैंक', icon: Wallet },
    { id: 'marketplace-and-challenge', en: 'Marketplace & Challenge', hi: 'बाज़ार व प्रमाणिकता चुनौती', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      {/* Sovereign Govt Banner */}
      <div className="bg-stone-50 border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[11px] text-stone-600">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1 font-semibold text-stone-700 tracking-tight">
            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
            GOVT. OF INDIA • MINISTRY OF MSME • KVIC
          </span>
          <span className="hidden md:inline text-stone-300">|</span>
          <span className="hidden md:inline text-stone-500 font-medium">
            National Honey Mission (राष्ट्रीय मधुमक्खी मिशन)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-stone-600 font-medium">
            <PhoneCall className="w-3 h-3 text-amber-800" />
            <span>Toll Free Kisan Helpline:</span>
            <span className="font-mono text-stone-900 font-semibold">1800-HONEY-KVIC</span>
          </div>
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 transition-colors shadow-2xs"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3 h-3 text-amber-800" />
            <span className={lang === 'en' ? 'font-bold text-amber-900' : 'text-stone-500'}>English</span>
            <span className="text-stone-300">/</span>
            <span className={lang === 'hi' ? 'font-bold text-amber-900' : 'text-stone-500'}>हिन्दी</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onSelectTab('harvest-batches')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-700 via-amber-800 to-amber-950 flex items-center justify-center text-amber-200 shadow-sm border border-amber-600/40">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="#b45309" fillOpacity="0.35" />
              <polygon points="12 6 17 9 17 15 12 18 7 15 7 9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="#fbbf24" fillOpacity="0.4" />
              <circle cx="12" cy="12" r="1.75" fill="#fef3c7" stroke="none" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl font-bold text-stone-900 tracking-tight font-display">HoneyChain</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Kisan Portal
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium mt-0.5">
              {lang === 'en' ? 'Beekeeper Farmer Portal • Blockchain Ledger' : 'मधुमक्खी पालक किसान पोर्टल • Blockchain Ledger'}
            </p>
          </div>
        </div>

        {/* Top Prominent Language Toggle & Profile Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full bg-stone-100 p-0.5 border border-stone-300 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { if (lang !== 'en') onToggleLang(); }}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all ${
                lang === 'en'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => { if (lang !== 'hi') onToggleLang(); }}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all ${
                lang === 'hi'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              हिन्दी
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-xs">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div className="text-left leading-tight">
              <div className="font-semibold text-stone-900 text-xs">Ghulam Mohammad</div>
              <div className="text-[10.5px] text-stone-500 font-mono">Pahalgam, J&amp;K • UID: KVIC-JK-9482</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs ml-1">
              GM
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Tabs - Two lines: English + Hindi underneath */}
      <div className="hidden lg:block border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 -mb-px">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`py-2.5 px-3 border-b-2 text-left transition-all group ${
                    isActive
                      ? 'border-amber-800 text-amber-900 font-semibold'
                      : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300 font-medium'
                  }`}
                >
                  <div className={`text-xs ${isActive ? 'text-amber-900 font-bold' : 'group-hover:text-stone-900'}`}>
                    {item.en}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isActive ? 'text-amber-800 font-medium' : 'text-stone-400 group-hover:text-stone-600'}`}>
                    {item.hi}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-2 space-y-1 shadow-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-800'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
                  <div>
                    <div>{item.en}</div>
                    <div className="text-[10px] text-stone-400 font-normal">{item.hi}</div>
                  </div>
                </div>
                {isActive && <Check className="w-4 h-4 text-amber-700" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
