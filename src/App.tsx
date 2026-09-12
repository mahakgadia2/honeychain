/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { NavTab, ToastMessage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomeDashboardView } from './components/HomeDashboardView';
import { HarvestBatchesView } from './components/HarvestBatchesView';
import { MyBeehivesView } from './components/MyBeehivesView';
import { RegisterBatchView } from './components/RegisterBatchView';
import { NmrLabReportsView } from './components/NmrLabReportsView';
import { CooperativePoolsView } from './components/CooperativePoolsView';
import { MarketplaceView } from './components/MarketplaceView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
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
          onSetLang={(newLang) => setLang(newLang)}
        />

        {/* Main View Area - Each tab is strictly isolated */}
        <main className="flex-1 w-full pb-8">
          {activeTab === 'home' && (
            <HomeDashboardView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
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
          {(activeTab === 'cooperative-pools' || activeTab === 'msp-payouts-and-schemes') && (
            <CooperativePoolsView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
          {activeTab === 'marketplace-and-challenge' && (
            <MarketplaceView lang={lang} onNavigateTab={setActiveTab} onShowToast={showToast} />
          )}
        </main>

        {/* Global Clean Footer */}
        <Footer lang={lang} />
      </div>

      {/* Toast Notification */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
