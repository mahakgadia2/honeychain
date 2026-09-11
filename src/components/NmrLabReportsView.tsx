import { useState } from 'react';
import { NavTab, ToastMessage } from '../types';
import {
  FlaskConical,
  CheckCircle2,
  Download,
  FileText,
  Search,
  ShieldCheck,
  Award,
  X,
  Building2,
  Calendar
} from 'lucide-react';

interface NmrLabReportsViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  lang?: 'en' | 'hi';
}

export function NmrLabReportsView({ onNavigateTab, onShowToast, lang = 'en' }: NmrLabReportsViewProps) {
  const [filter, setFilter] = useState<'all' | 'monofloral' | 'multiflora' | 'mustard'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  const reports = [
    {
      id: 'KVIC-2026-JK-8841',
      category: 'monofloral',
      title: 'Kashmir Valley White Honey (Robinia Pseudoacacia)',
      titleHi: 'कश्मीरी रोबिनिया सफेद कीकर शहद',
      certId: 'NABL-CBRTI-99214',
      lab: 'Central Bee Research & Training Institute (CBRTI Pune)',
      testDate: '28 Oct 2025',
      harvestDate: '24 Oct 2025',
      grade: 'Grade A+ (100% Pure)',
      moisture: '17.4%',
      moistureStatus: 'Standard: < 20.0%',
      nmrStatus: '100% Authentic Natural',
      c4Sugar: '0.0% (Absent / Negative)',
      c4Status: 'Zero C4 Cane/Corn Syrup',
      hmf: '11.2 mg/kg',
      hmfStatus: 'Standard: < 80 mg/kg (Ultra Fresh)',
      pollenCount: '91% Robinia Botanical Pollen',
      fssaiReg: 'FSSAI Lic #10019011002340',
    },
    {
      id: 'KVIC-2025-JK-6112',
      category: 'multiflora',
      title: 'Wild Forest Multiflora Honey',
      titleHi: 'हिमालयी जंगली बहुपुष्पी शहद',
      certId: 'NABL-CBRTI-84192',
      lab: 'National Dairy Development Board (CALF Anand)',
      testDate: '18 May 2025',
      harvestDate: '15 May 2025',
      grade: 'Grade A (Organic Raw)',
      moisture: '18.1%',
      moistureStatus: 'Standard: < 20.0%',
      nmrStatus: '100% Authentic Natural',
      c4Sugar: '0.0% (Negative)',
      c4Status: 'Zero Invert Sugar Detected',
      hmf: '14.5 mg/kg',
      hmfStatus: 'Standard: < 80 mg/kg',
      pollenCount: '84% Mixed Wild Alpine Flora',
      fssaiReg: 'FSSAI Lic #10019011002340',
    },
    {
      id: 'KVIC-2025-JK-7420',
      category: 'mustard',
      title: 'Himachal Wild Mustard Honey',
      titleHi: 'कांगड़ा सरसों शुद्ध शहद',
      certId: 'NABL-CBRTI-30940',
      lab: 'CBRTI Regional Honey Testing Lab',
      testDate: '16 Aug 2025',
      harvestDate: '12 Aug 2025',
      grade: 'Grade A (Creamed Pure)',
      moisture: '16.9%',
      moistureStatus: 'Standard: < 20.0%',
      nmrStatus: '100% Pure Natural',
      c4Sugar: '0.0% (Negative)',
      c4Status: 'Zero Foreign Sugar',
      hmf: '8.4 mg/kg',
      hmfStatus: 'Standard: < 80 mg/kg',
      pollenCount: '89% Brassica Campestris',
      fssaiReg: 'FSSAI Lic #10019011002340',
    },
    {
      id: 'KVIC-2025-JK-5091',
      category: 'monofloral',
      title: 'Litchi Orchard Blossom Honey',
      titleHi: 'लीची पुष्प शुद्ध शहद',
      certId: 'NABL-CBRTI-50912',
      lab: 'CBRTI Pune Central Facility',
      testDate: '08 Apr 2025',
      harvestDate: '04 Apr 2025',
      grade: 'Grade A+',
      moisture: '17.8%',
      moistureStatus: 'Standard: < 20.0%',
      nmrStatus: '100% Pure Natural',
      c4Sugar: '0.0% (Negative)',
      c4Status: 'Zero Syrup Adulteration',
      hmf: '10.1 mg/kg',
      hmfStatus: 'Standard: < 80 mg/kg',
      pollenCount: '88% Litchi Chinensis',
      fssaiReg: 'FSSAI Lic #10019011002340',
    },
  ];

  const filteredReports = reports.filter((r) => {
    if (filter === 'monofloral' && r.category !== 'monofloral') return false;
    if (filter === 'multiflora' && r.category !== 'multiflora') return false;
    if (filter === 'mustard' && r.category !== 'mustard') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.certId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>NABL CBRTI Accreditation • प्रयोगशाला परीक्षण</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            NMR Lab Reports &amp; Certificates
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Nuclear Magnetic Resonance (NMR) spectrometry test certificates proving 100% pure honey with zero sugar syrup adulteration.
          </p>
        </div>
      </div>

      {/* 3 Clean Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Tested Harvest Batches</div>
          <div className="mt-1 text-2xl font-bold text-stone-900">4 <span className="text-sm font-normal text-stone-500">Batches Cleared</span></div>
          <div className="mt-1 text-xs text-green-700 font-medium">100% NABL NMR Approval</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">C4 / C3 Foreign Sugar</div>
          <div className="mt-1 text-2xl font-bold text-green-700">0.00% <span className="text-sm font-normal text-stone-500">Zero Detected</span></div>
          <div className="mt-1 text-xs text-stone-500">Rice / Corn / Cane Syrup Absent</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Average Moisture</div>
          <div className="mt-1 text-2xl font-bold text-stone-900">17.5% <span className="text-sm font-normal text-stone-500">Moisture Content</span></div>
          <div className="mt-1 text-xs text-stone-500">Well below 20.0% limit (No Fermentation)</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex rounded-lg bg-stone-100 p-1 border border-stone-200 text-xs font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filter === 'all'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Reports ({reports.length})
          </button>
          <button
            onClick={() => setFilter('monofloral')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filter === 'monofloral'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            White Honey / Robinia (2)
          </button>
          <button
            onClick={() => setFilter('multiflora')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filter === 'multiflora'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Wild Forest (1)
          </button>
          <button
            onClick={() => setFilter('mustard')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filter === 'mustard'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Mustard (1)
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search certificate or lot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700 shadow-xs"
          />
        </div>
      </div>

      {/* Lab Report Cards List */}
      <div className="space-y-4">
        {filteredReports.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-amber-400 transition-colors space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                    {r.id}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {r.grade}
                  </span>
                  <span className="text-xs font-mono text-stone-500">Cert #{r.certId}</span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 mt-1">{r.title}</h3>
                <p className="text-xs text-stone-500">{r.titleHi}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(r)}
                  className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
                <button
                  onClick={() => {
                    onShowToast({
                      title: 'Certificate Downloaded',
                      message: `Official NABL PDF for report ${r.certId} saved.`,
                      type: 'success',
                    });
                  }}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Key Scientific Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-100 text-xs">
              <div>
                <span className="text-[11px] text-stone-500 block">NMR Spectrometry</span>
                <strong className="text-stone-900 block mt-0.5">{r.nmrStatus}</strong>
                <span className="text-[10px] text-green-700 font-medium">FSSAI Certified</span>
              </div>

              <div>
                <span className="text-[11px] text-stone-500 block">Moisture Content</span>
                <strong className="text-stone-900 block mt-0.5">{r.moisture}</strong>
                <span className="text-[10px] text-stone-500">{r.moistureStatus}</span>
              </div>

              <div>
                <span className="text-[11px] text-stone-500 block">C4 / Invert Sugar</span>
                <strong className="text-green-700 block mt-0.5">{r.c4Sugar}</strong>
                <span className="text-[10px] text-stone-500">{r.c4Status}</span>
              </div>

              <div>
                <span className="text-[11px] text-stone-500 block">HMF Freshness</span>
                <strong className="text-stone-900 block mt-0.5">{r.hmf}</strong>
                <span className="text-[10px] text-stone-500">{r.hmfStatus}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 pt-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                <span>Testing Lab: {r.lab}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Sample Date: {r.harvestDate} • Cleared: {r.testDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-700" />
                <h4 className="text-sm font-bold text-stone-900">Official NABL Certificate of Analysis</h4>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="border-b border-stone-100 pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{selectedReport.title}</h3>
                    <p className="text-stone-500">{selectedReport.titleHi}</p>
                  </div>
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                    {selectedReport.grade}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  Accredited Facility: {selectedReport.lab}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-stone-800">Spectrometric &amp; Physicochemical Results:</h4>
                <div className="border border-stone-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                      <tr>
                        <th className="p-2">Test Parameter</th>
                        <th className="p-2">Observed Value</th>
                        <th className="p-2">Regulatory Norm</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr>
                        <td className="p-2 font-medium">NMR Spectrometry</td>
                        <td className="p-2 text-stone-900 font-semibold">{selectedReport.nmrStatus}</td>
                        <td className="p-2 text-stone-500">Clean Resonance</td>
                        <td className="p-2 text-green-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">C4 Cane Sugar</td>
                        <td className="p-2 text-stone-900 font-semibold">{selectedReport.c4Sugar}</td>
                        <td className="p-2 text-stone-500">&lt; 7.0% Max</td>
                        <td className="p-2 text-green-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Moisture Content</td>
                        <td className="p-2 text-stone-900 font-semibold">{selectedReport.moisture}</td>
                        <td className="p-2 text-stone-500">&lt; 20.0% Max</td>
                        <td className="p-2 text-green-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">HMF Freshness</td>
                        <td className="p-2 text-stone-900 font-semibold">{selectedReport.hmf}</td>
                        <td className="p-2 text-stone-500">&lt; 80 mg/kg</td>
                        <td className="p-2 text-green-700 font-bold">PASS</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Botanical Pollen</td>
                        <td className="p-2 text-stone-900 font-semibold">{selectedReport.pollenCount}</td>
                        <td className="p-2 text-stone-500">&gt; 45% Monofloral</td>
                        <td className="p-2 text-green-700 font-bold">PASS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-50 text-[11px] text-stone-500 flex items-center justify-between">
                <span>Verification QR Hash: 0x9f4a13d78c2e...</span>
                <span className="text-green-700 font-semibold">Digitally Signed</span>
              </div>

              <button
                onClick={() => {
                  onShowToast({
                    title: 'Dossier Downloaded',
                    message: `Official signed PDF certificate ${selectedReport.certId} saved.`,
                    type: 'success',
                  });
                  setSelectedReport(null);
                }}
                className="w-full py-2 px-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified NABL PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
