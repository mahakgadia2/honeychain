import {
  Home,
  Package,
  Layers,
  PlusCircle,
  FlaskConical,
  Users,
  ShoppingBag,
  LucideIcon
} from 'lucide-react';
import { NavTab } from '../types';

interface FooterNavBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  lang?: 'en' | 'hi';
}

export function FooterNavBar({ activeTab, onSelectTab, lang = 'en' }: FooterNavBarProps) {
  const navItems: { id: NavTab; en: string; hi: string; icon: LucideIcon }[] = [
    { id: 'home', en: 'Home', hi: 'होम', icon: Home },
    { id: 'my-beehives', en: 'Beehives', hi: 'बक्से', icon: Layers },
    { id: 'harvest-batches', en: 'Batches', hi: 'लॉट', icon: Package },
    { id: 'register-batch', en: 'Register', hi: 'दर्ज करें', icon: PlusCircle },
    { id: 'nmr-lab-reports', en: 'Lab Reports', hi: 'जांच', icon: FlaskConical },
    { id: 'cooperative-pools', en: 'Co-op Pools', hi: 'सहकारी संघ', icon: Users },
    { id: 'marketplace-and-challenge', en: 'Marketplace', hi: 'मंडी', icon: ShoppingBag },
  ];

  return (
    <footer
      id="bottom-footer-navigation"
      aria-label="Application Footer Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-1.5 px-2 sm:px-6 pb-[max(env(safe-area-inset-bottom,0px),6px)]"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'cooperative-pools' && activeTab === 'msp-payouts-and-schemes');
          const isRegister = item.id === 'register-batch';
          const label = lang === 'hi' ? item.hi : item.en;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center min-h-[50px] sm:min-h-[52px] py-1 px-1 sm:px-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-100/80 text-amber-950 font-bold shadow-2xs scale-[1.02]'
                  : isRegister
                  ? 'hover:bg-amber-50/70 text-stone-700 hover:text-stone-950'
                  : 'hover:bg-stone-100/70 text-stone-600 hover:text-stone-900 font-medium'
              }`}
            >
              {isRegister ? (
                <div className="relative flex items-center justify-center">
                  <span className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center border border-red-300 shadow-2xs">
                    <PlusCircle className="w-5 h-5 text-red-600 stroke-[2.75]" />
                  </span>
                </div>
              ) : (
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-amber-900 stroke-[2.5]' : 'text-stone-600 stroke-2'
                  }`}
                />
              )}
              <span
                className={`text-[10px] sm:text-xs tracking-tight leading-tight mt-0.5 truncate max-w-full ${
                  isActive
                    ? 'font-bold text-amber-950'
                    : isRegister
                    ? 'font-bold text-stone-800'
                    : 'font-semibold text-stone-600'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}
