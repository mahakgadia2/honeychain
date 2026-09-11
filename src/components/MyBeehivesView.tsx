import { useState, FormEvent } from 'react';
import { NavTab, ToastMessage } from '../types';
import {
  Layers,
  PhoneCall,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  BatteryCharging,
  Wifi,
  Thermometer,
  Scale,
  Volume2,
  Sparkles,
  X,
  Send
} from 'lucide-react';

interface MyBeehivesViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (msg: Omit<ToastMessage, 'id'>) => void;
  lang?: 'en' | 'hi';
}

export function MyBeehivesView({ onNavigateTab, onShowToast, lang = 'en' }: MyBeehivesViewProps) {
  const [filter, setFilter] = useState<'all' | 'calm' | 'alerts' | 'ready'>('all');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportNote, setSupportNote] = useState('');
  const [isSendingSupport, setIsSendingSupport] = useState(false);

  const hives = [
    {
      id: '01',
      name: 'Hive Box #01',
      location: 'Pahalgam Ridge South',
      flora: 'Robinia Pseudoacacia (White Blossom)',
      status: 'Calm & Normal',
      statusType: 'calm',
      weight: '41.2 KG',
      weightChange: '+1.2 kg/day',
      temp: '34.8°C',
      tempStatus: 'Optimal Brood Range',
      buzzFreq: '220 Hz',
      buzzStatus: 'Peaceful Foraging',
      capping: '75% Comb Capped',
      battery: '94%',
      signal: 'LoraWAN 4G Active',
    },
    {
      id: '04',
      name: 'Hive Box #04',
      location: 'Pahalgam Orchard Gate',
      flora: 'Robinia & Wild Flora',
      status: 'Pre-Swarm Alert',
      statusType: 'alert',
      weight: '44.8 KG',
      weightChange: '+2.1 kg/day (Full Capacity)',
      temp: '37.2°C',
      tempStatus: 'Warm Spike (Heat Wave)',
      buzzFreq: '480 Hz',
      buzzStatus: 'Swarm Piping Detected',
      capping: '88% Comb Capped',
      battery: '88%',
      signal: 'LoraWAN 4G Active',
    },
    {
      id: '07',
      name: 'Hive Box #07 (Super)',
      location: 'Meadow Apiary Cluster',
      flora: 'High-Altitude Robinia Pure',
      status: 'Ready for Extraction',
      statusType: 'ready',
      weight: '46.5 KG',
      weightChange: '~24 KG Extractable Honey',
      temp: '35.2°C',
      tempStatus: 'Ideal Ripening Temp',
      buzzFreq: '215 Hz',
      buzzStatus: 'Gentle Wax Capping',
      capping: '92% Comb Capped',
      battery: '96%',
      signal: 'LoraWAN 4G Active',
    },
    {
      id: '02',
      name: 'Hive Box #02',
      location: 'Pahalgam Ridge North',
      flora: 'Wild Mountain Lavender & Robinia',
      status: 'Calm & Normal',
      statusType: 'calm',
      weight: '38.0 KG',
      weightChange: '+0.8 kg/day',
      temp: '35.1°C',
      tempStatus: 'Stable Range',
      buzzFreq: '235 Hz',
      buzzStatus: 'Normal Colony Activity',
      capping: '60% Comb Capped',
      battery: '91%',
      signal: 'LoraWAN 4G Active',
    },
    {
      id: '05',
      name: 'Hive Box #05',
      location: 'Alpine Stream Bank',
      flora: 'Mustard & Clover',
      status: 'Calm & Normal',
      statusType: 'calm',
      weight: '36.4 KG',
      weightChange: '+0.6 kg/day',
      temp: '35.0°C',
      tempStatus: 'Brood Optimum',
      buzzFreq: '225 Hz',
      buzzStatus: 'Steady Foraging',
      capping: '55% Comb Capped',
      battery: '93%',
      signal: 'LoraWAN 4G Active',
    },
    {
      id: '12',
      name: 'Hive Box #12',
      location: 'Pahalgam Meadow West',
      flora: 'Wild Flora & Forest Herbs',
      status: 'Temperature Spike',
      statusType: 'alert',
      weight: '40.5 KG',
      weightChange: '+0.4 kg/day',
      temp: '36.9°C',
      tempStatus: 'Direct Sunlight Heat',
      buzzFreq: '340 Hz',
      buzzStatus: 'Fan Cooling Wings',
      capping: '68% Comb Capped',
      battery: '82%',
      signal: 'LoraWAN 4G Active',
    },
  ];

  const filteredHives = hives.filter((h) => {
    if (filter === 'calm' && h.statusType !== 'calm') return false;
    if (filter === 'alerts' && h.statusType !== 'alert') return false;
    if (filter === 'ready' && h.statusType !== 'ready') return false;
    return true;
  });

  const handleSupportSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSendingSupport(true);
    setTimeout(() => {
      setIsSendingSupport(false);
      setIsSupportModalOpen(false);
      setSupportNote('');
      onShowToast({
        title: 'Bee Mitra Assigned',
        message: 'KVIC field officer Tariq Ahmad notified. Arrival scheduled within 4 hours for Hive #04 inspection.',
        type: 'success',
      });
    }, 1200);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Pahalgam Apiary Cluster • आईओटी स्मार्ट बक्से</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            My Beehives &amp; Telemetry
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Live weight scales, acoustic buzzing frequency, and brood nest temperature monitoring for 42 Langstroth beehives.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Bee Mitra (सहायता)</span>
          </button>
          <button
            onClick={() => {
              onShowToast({
                title: 'Sensors Refreshed',
                message: 'All 42 Langstroth nodes updated via LoraWAN gateway.',
                type: 'success',
              });
            }}
            className="p-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-xs transition-colors"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4 text-stone-500" />
          </button>
        </div>
      </div>

      {/* 3 Clean Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Total Active Boxes</div>
          <div className="mt-1 text-2xl font-bold text-stone-900">42 <span className="text-sm font-normal text-stone-500">Langstroth Hives</span></div>
          <div className="mt-1 text-xs text-green-700 font-medium">100% LoraWAN Telemetry Online</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Calm &amp; Healthy</div>
          <div className="mt-1 text-2xl font-bold text-green-700">39 <span className="text-sm font-normal text-stone-500">Boxes</span></div>
          <div className="mt-1 text-xs text-stone-500">Average Brood Temp: 35.0°C (Optimal)</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <div className="text-xs font-medium text-stone-500 uppercase">Action Needed</div>
          <div className="mt-1 text-2xl font-bold text-amber-800">3 <span className="text-sm font-normal text-stone-500">Boxes</span></div>
          <div className="mt-1 text-xs text-amber-800 font-medium">1 Pre-Swarm • 1 Temp Spike • 1 Ready</div>
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
          All Boxes (6 Sampled)
        </button>
        <button
          onClick={() => setFilter('calm')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            filter === 'calm'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Calm &amp; Normal (3)
        </button>
        <button
          onClick={() => setFilter('alerts')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            filter === 'alerts'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Attention Needed (2)
        </button>
        <button
          onClick={() => setFilter('ready')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            filter === 'ready'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Ready for Harvest (1)
        </button>
      </div>

      {/* Hive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHives.map((h) => (
          <div
            key={h.id}
            className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-colors"
          >
            <div className="space-y-3">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900">{h.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                    h.statusType === 'calm'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : h.statusType === 'ready'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold'
                      : 'bg-red-50 text-red-700 border border-red-200 font-semibold'
                  }`}
                >
                  {h.statusType === 'calm' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {h.statusType === 'ready' && <Sparkles className="w-3.5 h-3.5" />}
                  {h.statusType === 'alert' && <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>{h.status}</span>
                </span>
              </div>

              <div className="text-xs text-stone-500">
                <div>Flora: <strong className="text-stone-700 font-medium">{h.flora}</strong></div>
                <div className="text-[11px] text-stone-400 mt-0.5">{h.location}</div>
              </div>

              {/* Sensor Data Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-stone-50 border border-stone-100 text-xs">
                <div>
                  <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                    <Scale className="w-3 h-3 text-amber-700" />
                    <span>Weight Scale</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">{h.weight}</div>
                  <div className="text-[10px] text-stone-500">{h.weightChange}</div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                    <Thermometer className="w-3 h-3 text-red-600" />
                    <span>Brood Temp</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">{h.temp}</div>
                  <div className="text-[10px] text-stone-500">{h.tempStatus}</div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                    <Volume2 className="w-3 h-3 text-blue-600" />
                    <span>Acoustic Pitch</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">{h.buzzFreq}</div>
                  <div className="text-[10px] text-stone-500">{h.buzzStatus}</div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                    <Flame className="w-3 h-3 text-amber-600" />
                    <span>Honey Comb</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">{h.capping}</div>
                  <div className="text-[10px] text-stone-500">Ripened Wax</div>
                </div>
              </div>

              {/* Bottom Connectivity Bar */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-green-700" />
                  <span>{h.signal}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BatteryCharging className="w-3 h-3 text-stone-500" />
                  <span>{h.battery}</span>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-2">
              {h.statusType === 'ready' ? (
                <button
                  onClick={() => onNavigateTab('register-batch')}
                  className="w-full py-1.5 px-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Extract Honey Now (+Register)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onShowToast({
                      title: `Inspection Logged: ${h.name}`,
                      message: 'Brood comb health and queen activity marked as verified.',
                      type: 'success',
                    });
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
                >
                  Log Routine Inspection
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Support / Bee Mitra Assistance Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <h4 className="text-sm font-bold text-stone-900">Bee Mitra Assistance (बी मित्र सहायता)</h4>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSupportSubmit} className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                Direct on-field assistance by KVIC trained master beekeepers for swarm control, box division, and queen health.
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Issue Category</label>
                <select className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700">
                  <option>Swarm Prevention (Hive #04 alert detected)</option>
                  <option>Super Box Expansion Assistance</option>
                  <option>Varroa Mite / Disease Inspection</option>
                  <option>Emergency Hive Migration Assistance</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Farmer Notes / Observation (Optional)</label>
                <textarea
                  rows={3}
                  value={supportNote}
                  onChange={(e) => setSupportNote(e.target.value)}
                  placeholder="Describe bees behavior or urgent requirement..."
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSupportModalOpen(false)}
                  className="flex-1 py-2 px-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingSupport}
                  className="flex-1 py-2 px-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
                >
                  {isSendingSupport ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
