import { useState, FormEvent } from 'react';
import { NavTab, ToastMessage } from '../types';
import {
  PlusCircle,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Scale,
  ShieldCheck,
  QrCode,
  Download,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface RegisterBatchViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  lang?: 'en' | 'hi';
}

export function RegisterBatchView({ onNavigateTab, onShowToast, lang = 'en' }: RegisterBatchViewProps) {
  const [selectedNectar, setSelectedNectar] = useState('robinia');
  const [weight, setWeight] = useState<number>(450);
  const [extractionMethod, setExtractionMethod] = useState<'cold' | 'centrifugal'>('cold');
  const [containerType, setContainerType] = useState('steel_drum');
  const [selectedHives, setSelectedHives] = useState<string[]>(['Hive #01', 'Hive #07 (Super)']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBatch, setCreatedBatch] = useState<any | null>(null);

  const nectarOptions = [
    {
      id: 'robinia',
      name: 'Kashmir Valley White Honey (Robinia)',
      hiName: 'कश्मीरी रोबिनिया सफेद कीकर शहद',
      badge: 'Monofloral Grade A+',
      mspRate: 380,
      description: 'Extracted from Robinia pseudoacacia blossom in high-altitude zones',
    },
    {
      id: 'wild_forest',
      name: 'Wild Forest Multiflora (जंगली बहुपुष्पी)',
      hiName: 'हिमालयी जंगली जड़ी-बूटी शहद',
      badge: 'Organic Wild Grade',
      mspRate: 410,
      description: 'Forest herbs and wild flora collected by Apis cerana bees',
    },
    {
      id: 'mustard',
      name: 'Mustard Honey (पीली सरसों)',
      hiName: 'कांगड़ा सरसों शहद',
      badge: 'General Flora',
      mspRate: 310,
      description: 'Naturally creamed winter harvest with natural floral glucose',
    },
    {
      id: 'litchi',
      name: 'Litchi & Jamun (लीची मौसमी)',
      hiName: 'लीची पुष्प शहद',
      badge: 'Seasonal Monofloral',
      mspRate: 390,
      description: 'Mild fruity aroma harvested from organic fruit orchards',
    },
  ];

  const currentNectar = nectarOptions.find((n) => n.id === selectedNectar) || nectarOptions[0];
  const jarCount = Math.round(weight * 2); // 500g jars
  const totalMspValuation = weight * currentNectar.mspRate;

  const toggleHive = (hiveName: string) => {
    if (selectedHives.includes(hiveName)) {
      setSelectedHives(selectedHives.filter((h) => h !== hiveName));
    } else {
      setSelectedHives([...selectedHives, hiveName]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newId = `KVIC-2026-JK-${Math.floor(1000 + Math.random() * 9000)}`;
      const batchData = {
        id: newId,
        title: currentNectar.name,
        titleHi: currentNectar.hiName,
        weight: `${weight} KG`,
        jars: `${jarCount} Jars (500g)`,
        mspValuation: `₹${totalMspValuation.toLocaleString('en-IN')}`,
        hives: selectedHives.join(', '),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      setCreatedBatch(batchData);
      onShowToast({
        title: 'Honey Lot Minted',
        message: `Batch ${newId} registered on KVIC blockchain. Tamper-evident QR stickers generated.`,
        type: 'success',
      });
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Header */}
      <div className="pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
          <PlusCircle className="w-4 h-4" />
          <span>New Extraction Registry • नई फसल दर्ज करें</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
          Register Honey Harvest
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Enter harvest details to generate an immutable KVIC blockchain QR code and initiate NABL lab testing.
        </p>
      </div>

      {createdBatch ? (
        /* Success Card */
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3 text-green-700">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-green-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                Harvest Batch Successfully Minted!
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Block confirmed on KVIC Polygon Ledger • Ready for NABL Sample Collection
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500">Assigned Batch ID:</span>
              <div className="text-base font-mono font-bold text-amber-900 mt-0.5">
                {createdBatch.id}
              </div>
            </div>
            <div>
              <span className="text-stone-500">Floral Variety:</span>
              <div className="font-semibold text-stone-900 mt-0.5">{createdBatch.title}</div>
            </div>
            <div>
              <span className="text-stone-500">Net Quantity:</span>
              <div className="font-semibold text-stone-900 mt-0.5">{createdBatch.weight} ({createdBatch.jars})</div>
            </div>
            <div>
              <span className="text-stone-500">Estimated MSP Value:</span>
              <div className="text-base font-bold text-amber-800 mt-0.5">{createdBatch.mspValuation}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onNavigateTab('harvest-batches')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Go to Harvest Batches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onShowToast({
                  title: 'Stickers Downloaded',
                  message: `300 DPI PDF sticker sheet for ${createdBatch.id} downloaded.`,
                  type: 'success',
                });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Jar QR Stickers (PDF)</span>
            </button>
            <button
              onClick={() => setCreatedBatch(null)}
              className="w-full sm:w-auto px-4 py-2.5 text-xs text-stone-500 hover:text-stone-800 font-medium sm:ml-auto"
            >
              + Register Another Lot
            </button>
          </div>
        </div>
      ) : (
        /* Clean Registration Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Floral Source Selection */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                1. Select Floral Nectar Source (वानस्पतिक शहद प्रकार)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Government MSP procurement rate is fixed based on monofloral botanical purity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nectarOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedNectar(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedNectar === opt.id
                      ? 'border-amber-700 bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-900">{opt.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                        {opt.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500">{opt.hiName}</div>
                    <p className="text-xs text-stone-600 mt-1">{opt.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">KVIC Base MSP:</span>
                    <strong className="text-xs font-bold text-amber-800">₹{opt.mspRate} / KG</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Weight & Origin */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                2. Harvest Quantity &amp; Apiary Boxes
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Net honey extracted from apiary cluster and filled into food-grade vessels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Weight input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Net Extracted Weight (KG)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWeight((w) => Math.max(10, w - 50))}
                    className="w-9 h-9 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={10}
                    max={5000}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value) || 0)}
                    className="flex-1 text-center font-bold text-lg py-1.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                  <button
                    type="button"
                    onClick={() => setWeight((w) => w + 50)}
                    className="w-9 h-9 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Calculates to <strong className="text-stone-800">{jarCount} standard 500g glass jars</strong>
                </p>
              </div>

              {/* Extraction method */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Extraction Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExtractionMethod('cold')}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      extractionMethod === 'cold'
                        ? 'border-amber-700 bg-amber-50 text-amber-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Cold-Pressed Raw
                  </button>
                  <button
                    type="button"
                    onClick={() => setExtractionMethod('centrifugal')}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      extractionMethod === 'centrifugal'
                        ? 'border-amber-700 bg-amber-50 text-amber-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Centrifugal Raw
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Unheated raw honey retains 100% natural diastase enzymes
                </p>
              </div>
            </div>

            {/* Source Hives Selection */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="text-xs font-semibold text-stone-700 block">
                Origin Beehive Boxes
              </label>
              <div className="flex flex-wrap gap-2">
                {['Hive #01', 'Hive #02', 'Hive #05', 'Hive #07 (Super)', 'Hive #09'].map((box) => (
                  <button
                    key={box}
                    type="button"
                    onClick={() => toggleHive(box)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedHives.includes(box)
                        ? 'border-green-700 bg-green-50 text-green-800 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {box}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Summary & Mint Button */}
          <div className="p-5 sm:p-6 rounded-xl bg-amber-50/60 border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-amber-900 font-medium">ESTIMATED MSP VALUATION</div>
              <div className="text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                ₹{totalMspValuation.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {weight} KG @ ₹{currentNectar.mspRate}/KG • Protected by Minimum Support Price Scheme
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || weight <= 0}
              className="px-6 py-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Minting Cryptographic Lot...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate QR Seal &amp; Register</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
