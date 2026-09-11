import { useState } from 'react';
import { NavTab, ToastMessage } from '../types';
import {
  Wallet,
  CheckCircle2,
  Clock,
  Download,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldCheck,
  Award,
  CreditCard,
  X
} from 'lucide-react';

interface MspEarningsViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  lang?: 'en' | 'hi';
}

export function MspEarningsView({ onNavigateTab, onShowToast, lang = 'en' }: MspEarningsViewProps) {
  const [filter, setFilter] = useState<'all' | 'credited' | 'processing'>('all');
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);

  const transactions = [
    {
      id: 'TXN-PFMS-99214',
      date: '28 Oct 2025',
      type: 'msp',
      status: 'Processing',
      statusType: 'processing',
      description: 'Kashmir Robinia White Honey (Batch KVIC-2026-JK-8841)',
      descriptionHi: 'कश्मीरी रोबिनिया सफेद शहद एमएसपी खरीद (450 KG)',
      weight: '450 KG @ ₹380/KG',
      amount: '₹1,71,000',
      utr: 'PFMS202510287712',
      buyer: 'KVIC Central Procurement Pool',
    },
    {
      id: 'TXN-PFMS-84192',
      date: '20 Aug 2025',
      type: 'msp',
      status: 'Credited',
      statusType: 'credited',
      description: 'Himachal Wild Mustard Honey (Batch KVIC-2025-JK-7420)',
      descriptionHi: 'सरसों शहद एमएसपी खरीद (600 KG)',
      weight: '600 KG @ ₹310/KG',
      amount: '₹1,86,000',
      utr: 'SBIN00192847192',
      buyer: 'Khadi Kendra Delhi Bhawan',
    },
    {
      id: 'TXN-DBT-40911',
      date: '15 Jun 2025',
      type: 'subsidy',
      status: 'Credited',
      statusType: 'credited',
      description: 'National Honey Mission 80% Bee Box Capital Subsidy',
      descriptionHi: 'राष्ट्रीय मधुमक्खी मिशन 80% बक्सा अनुदान सहायता',
      weight: '10 Standard Langstroth Boxes',
      amount: '₹45,000',
      utr: 'PFMS202506150012',
      buyer: 'Ministry of MSME (Govt. of India)',
    },
    {
      id: 'TXN-PFMS-31902',
      date: '12 Apr 2025',
      type: 'msp',
      status: 'Credited',
      statusType: 'credited',
      description: 'Litchi Blossom Honey (Batch KVIC-2025-JK-5091)',
      descriptionHi: 'लीची पुष्प शहद सरकारी खरीद (400 KG)',
      weight: '400 KG @ ₹390/KG',
      amount: '₹1,56,000',
      utr: 'SBIN00192839918',
      buyer: 'Khadi Kendra Jammu Depot',
    },
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'credited' && t.statusType !== 'credited') return false;
    if (filter === 'processing' && t.statusType !== 'processing') return false;
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <Wallet className="w-4 h-4" />
            <span>Direct Benefit Transfer • एमएसपी व बैंक पासबुक</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            MSP Payouts &amp; Schemes
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Direct government procurement settlements and subsidy grants disbursed through Public Financial Management System (PFMS).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onShowToast({
                title: 'Passbook Statement Exported',
                message: 'Financial year FY2025-26 DBT statement downloaded in PDF.',
                type: 'success',
              });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-stone-500" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Linked Farmer Bank Account Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-green-700 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900 text-sm">J&amp;K Grameen Bank</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-800">
                DBT Active
              </span>
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              A/C: <span className="font-mono text-stone-800 font-medium">•••• •••• 4912</span> • IFSC: <span className="font-mono text-stone-800 font-medium">JAKA0PAHAL</span> • Beneficiary: Ghulam Mohammad
            </div>
          </div>
        </div>
        <div className="text-xs text-stone-500 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-green-700" />
          <span>Aadhaar NPCI Mapped</span>
        </div>
      </div>

      {/* 3 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Total MSP Credited</div>
          <div className="mt-1 text-2xl font-bold text-green-700">₹3,87,000</div>
          <div className="mt-1 text-xs text-stone-500">Paid directly via PFMS DBT</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Payment in Pipeline</div>
          <div className="mt-1 text-2xl font-bold text-amber-800">₹1,71,000</div>
          <div className="mt-1 text-xs text-stone-500">Lot #8841 (NABL NMR Cleared)</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Government Subsidies</div>
          <div className="mt-1 text-2xl font-bold text-stone-900">₹45,000</div>
          <div className="mt-1 text-xs text-green-700 font-medium">80% Box Assistance Availed</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="inline-flex rounded-lg bg-stone-100 p-1 border border-stone-200 text-xs font-medium">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            filter === 'all'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          All Payouts ({transactions.length})
        </button>
        <button
          onClick={() => setFilter('credited')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            filter === 'credited'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Credited to Bank (3)
        </button>
        <button
          onClick={() => setFilter('processing')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            filter === 'processing'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          In Processing (1)
        </button>
      </div>

      {/* Transactions Ledger */}
      <div className="space-y-3">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-amber-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                  {tx.id}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                    tx.statusType === 'credited'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {tx.statusType === 'credited' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                  <span>{tx.status}</span>
                </span>
                <span className="text-xs text-stone-500">• {tx.date}</span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-stone-900">{tx.description}</h3>
              <p className="text-xs text-stone-500">{tx.descriptionHi}</p>

              <div className="text-xs text-stone-500 flex flex-wrap items-center gap-x-4 gap-y-0.5 pt-1">
                <span>Quantity: <strong className="text-stone-700">{tx.weight}</strong></span>
                <span>Procuring Agency: <strong className="text-stone-700">{tx.buyer}</strong></span>
                <span className="font-mono text-stone-400">UTR: {tx.utr}</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
              <div className="text-lg sm:text-xl font-bold text-stone-900">{tx.amount}</div>
              <span className="text-[11px] text-stone-400 font-medium">PFMS Direct Credit</span>
            </div>
          </div>
        ))}
      </div>

      {/* Government Schemes Available Banner */}
      <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide">
            <Award className="w-4 h-4" />
            <span>National Beekeeping &amp; Honey Mission (NBHM)</span>
          </div>
          <h3 className="font-bold text-stone-900 text-sm sm:text-base mt-1">
            Eligible for 80% Subsidy on Honey Processing &amp; Solar Melters
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Registered beekeepers with verified NMR harvest track record qualify for zero-collateral KVIC micro-loans and solar equipment grants.
          </p>
        </div>
        <button
          onClick={() => setIsSchemeModalOpen(true)}
          className="self-start sm:self-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-colors"
        >
          Check Scheme Eligibility
        </button>
      </div>

      {/* Scheme Modal */}
      {isSchemeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-700" />
                <h4 className="text-sm font-bold text-stone-900">National Honey Mission Subsidies</h4>
              </div>
              <button
                onClick={() => setIsSchemeModalOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800">
                <strong>Status: Eligible</strong> • Your Pahalgam apiary holds 42 active hives and 4 cleared NMR lots, satisfying all prerequisite criteria.
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                  <div className="flex justify-between font-semibold text-stone-900">
                    <span>Solar Wax Extractor Subsidy</span>
                    <span className="text-green-700">₹25,000 Grant</span>
                  </div>
                  <p className="text-[11px] text-stone-500">80% financial assistance for eco-friendly solar comb melting.</p>
                </div>

                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                  <div className="flex justify-between font-semibold text-stone-900">
                    <span>Langstroth Box Modernization</span>
                    <span className="text-green-700">₹40,000 Grant</span>
                  </div>
                  <p className="text-[11px] text-stone-500">Assistance for adding 10 certified disease-resistant hive boxes.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onShowToast({
                    title: 'Application Forwarded',
                    message: 'Subsidy application submitted to J&K KVIC District Office.',
                    type: 'success',
                  });
                  setIsSchemeModalOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Submit Direct Application</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
