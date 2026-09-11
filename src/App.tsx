/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { NavTab, ToastMessage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HarvestBatchesView } from './components/HarvestBatchesView';
import { MyBeehivesView } from './components/MyBeehivesView';
import { RegisterBatchView } from './components/RegisterBatchView';
import { NmrLabReportsView } from './components/NmrLabReportsView';
import { MspEarningsView } from './components/MspEarningsView';
import { MarketplaceView } from './components/MarketplaceView';
import {
  Package,
  Layers,
  PlusCircle,
  FlaskConical,
  Wallet,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('harvest-batches');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (msg: Omit<ToastMessage, 'id'>) => {
    setToast({
      id: Date.now().toString(),
      type: 'success',
      ...msg,
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative text-stone-900 antialiased selection:bg-amber-200">
      {/* Static Orangish-Golden Honeycomb Background (Non-White Warm Canvas) */}
      <div className="honeycomb-amber-container" aria-hidden="true">
        {/* Base left-to-right warm honey gradient (starts warm, not white!) */}
        <div className="honeycomb-amber-base" />
        
        {/* Orangish-golden hexagonal grid */}
        <div className="honeycomb-amber-grid" />
        
        {/* Natural warm amber depth wash */}
        <div className="honeycomb-amber-wash" />
      </div>

      {/* Main Foreground Application Shell */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Sovereign Header */}
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          lang={lang}
          onToggleLang={() => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'))}
        />

        {/* Main View Area - Each tab is strictly isolated */}
        <main className="flex-1 w-full pb-20 lg:pb-8">
          {activeTab === 'harvest-batches' && (
            <HarvestBatchesView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
          {activeTab === 'my-beehives' && (
            <MyBeehivesView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
          {activeTab === 'register-batch' && (
            <RegisterBatchView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
          {activeTab === 'nmr-lab-reports' && (
            <NmrLabReportsView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
          {activeTab === 'msp-payouts-and-schemes' && (
            <MspEarningsView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
          {activeTab === 'marketplace-and-challenge' && (
            <MarketplaceView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
        </main>

        {/* Bottom Sticky Mobile Nav for Quick Access */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-1 py-1 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setActiveTab('harvest-batches')}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
              activeTab === 'harvest-batches' ? 'text-amber-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px]">Batches</span>
          </button>
          <button
            onClick={() => setActiveTab('my-beehives')}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
              activeTab === 'my-beehives' ? 'text-amber-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px]">Beehives</span>
          </button>
          <button
            onClick={() => setActiveTab('register-batch')}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
              activeTab === 'register-batch' ? 'text-amber-800 font-bold' : 'text-stone-500'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-[10px]">Register</span>
          </button>
          <button
            onClick={() => setActiveTab('nmr-lab-reports')}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
              activeTab === 'nmr-lab-reports' ? 'text-amber-800 font-bold' : 'text-stone-500'
            }`}
          >
            <FlaskConical className="w-5 h-5" />
            <span className="text-[10px]">Lab Tests</span>
          </button>
          <button
            onClick={() => setActiveTab('msp-payouts-and-schemes')}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
              activeTab === 'msp-payouts-and-schemes' ? 'text-amber-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px]">MSP</span>
          </button>
          <button
            onClick={() => setActiveTab('marketplace-and-challenge')}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
              activeTab === 'marketplace-and-challenge' ? 'text-amber-800 font-bold' : 'text-stone-500'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px]">Market</span>
          </button>
        </div>

        {/* Global Clean Footer */}
        <Footer />
      </div>

      {/* Toast Notification */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
