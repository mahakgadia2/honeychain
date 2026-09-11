import { ShieldCheck, PhoneCall, Link2, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-white/95 backdrop-blur-xs border-t border-amber-200/70 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-xs text-stone-600">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-amber-800 flex items-center justify-center text-amber-200">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#b45309" />
                </svg>
              </div>
              <span className="font-bold text-stone-900 text-sm">HoneyChain</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                KVIC
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed">
              Cryptographic provenance and blockchain traceability for India&apos;s National Honey Mission under the Ministry of MSME.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider">
              Governance &amp; Mission
            </h4>
            <ul className="space-y-1 text-stone-500">
              <li>Khadi and Village Industries Commission</li>
              <li>National Beekeeping &amp; Honey Mission (NBHM)</li>
              <li>FSSAI NMR Spectrometry Standards</li>
              <li>TRIFED Tribal Honey Marketing</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider">
              Kisan Helpline
            </h4>
            <p className="flex items-center gap-1.5 text-stone-800 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
              <span>1800-HONEY-KVIC (46639)</span>
            </p>
            <p className="text-stone-500">Email: kisan-support@kvic.gov.in</p>
            <p className="text-stone-500">08:00 AM - 08:00 PM IST (All Days)</p>
          </div>

          {/* Col 4 */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider">
              Verification Standards
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 text-[11px] flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3" /> NMR 100% Verified
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] flex items-center gap-1 font-mono">
                <Link2 className="w-3 h-3" /> Polygon Ledger
              </span>
            </div>
            <p className="font-mono text-[10px] text-stone-400 mt-2">
              KVIC Sovereign Contract #18420911
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-stone-400 text-xs gap-2">
          <p>© 2026 HoneyChain • Khadi &amp; Village Industries Commission, Ministry of MSME, Govt. of India.</p>
          <div className="flex gap-4">
            <span className="hover:text-stone-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-600 cursor-pointer">Terms of Traceability</span>
            <span className="hover:text-stone-600 cursor-pointer">National Portal of India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
