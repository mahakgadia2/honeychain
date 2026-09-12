import { ShieldCheck, PhoneCall, Link2, Award, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang?: 'en' | 'hi';
}

export function Footer({ lang = 'en' }: FooterProps) {
  return (
    <footer className="w-full bg-white/95 backdrop-blur-xs border-t border-amber-200/70 mt-12">
      {/* Bottom Sovereign Bar */}
      <div className="w-full border-b border-stone-200/80 bg-stone-50/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Left Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="leading-tight text-left">
              <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                {lang === 'hi' ? 'केवीआईसी प्रमाणित प्रामाणिकता' : 'KVIC CERTIFIED AUTHENTICITY'}
              </span>
              <span className="hidden sm:inline text-stone-400 mx-2">•</span>
              <div className="sm:inline text-stone-500 text-[11px]">
                {lang === 'hi'
                  ? 'राष्ट्रीय मधुमक्खी पालन एवं शहद मिशन (NBHM) ब्लॉकचेन बहीखाता'
                  : 'National Beekeeping & Honey Mission (NBHM) Cryptographic Ledger'}
              </div>
            </div>
          </div>

          {/* Right Toll-Free & MoMSME copy */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-stone-600 text-[11px]">
            <a
              href="tel:18004663958"
              className="flex items-center gap-1.5 font-medium hover:text-amber-900 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-800" />
              <span>
                {lang === 'hi'
                  ? 'किसान टोल-फ्री: 1800-HONEY-KVIC (सुबह 9 - शाम 6 बजे)'
                  : 'Kisan Toll-Free: 1800-HONEY-KVIC (9 AM - 6 PM IST)'}
              </span>
            </a>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="font-medium text-stone-500">
              {lang === 'hi'
                ? 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय, भारत सरकार © 2025'
                : 'MoMSME Govt of India © 2025'}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Mission Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-stone-600">
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
              {lang === 'hi'
                ? 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय के अंतर्गत भारत के राष्ट्रीय शहद मिशन के लिए ब्लॉकचेन ट्रेसिबिलिटी व प्रामाणिकता प्रणाली।'
                : 'Cryptographic provenance and blockchain traceability for India\'s National Honey Mission under the Ministry of MSME.'}
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider">
              {lang === 'hi' ? 'शासन एवं मिशन' : 'Governance & Mission'}
            </h4>
            <ul className="space-y-1 text-stone-500">
              <li>{lang === 'hi' ? 'खादी एवं ग्रामोद्योग आयोग (KVIC)' : 'Khadi and Village Industries Commission'}</li>
              <li>{lang === 'hi' ? 'राष्ट्रीय मधुमक्खी पालन एवं शहद मिशन (NBHM)' : 'National Beekeeping & Honey Mission (NBHM)'}</li>
              <li>{lang === 'hi' ? 'FSSAI एनएमआर स्पेक्ट्रोस्कोपी मानक' : 'FSSAI NMR Spectrometry Standards'}</li>
              <li>{lang === 'hi' ? 'ट्राइफेड जनजातीय शहद विपणन' : 'TRIFED Tribal Honey Marketing'}</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider">
              {lang === 'hi' ? 'किसान सहायता केंद्र' : 'Kisan Helpline'}
            </h4>
            <p className="flex items-center gap-1.5 text-stone-800 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
              <span>1800-HONEY-KVIC (46639)</span>
            </p>
            <p className="text-stone-500">Email: kisan-support@kvic.gov.in</p>
            <p className="text-stone-500">
              {lang === 'hi' ? 'सुबह 08:00 - रात 08:00 (सभी दिन)' : '08:00 AM - 08:00 PM IST (All Days)'}
            </p>
          </div>

          {/* Col 4 */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider">
              {lang === 'hi' ? 'प्रमाणन मानक' : 'Verification Standards'}
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 text-[11px] flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3" /> {lang === 'hi' ? 'एनएमआर 100% सत्यापित' : 'NMR 100% Verified'}
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

        <div className="pt-5 mt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-stone-400 text-xs gap-2">
          <p>&copy; 2026 HoneyChain • Khadi &amp; Village Industries Commission, Ministry of MSME, Govt. of India.</p>
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

