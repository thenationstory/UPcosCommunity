import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, FileText, 
  ExternalLink, Building2, UserCheck, Lock, ArrowRight, X 
} from 'lucide-react';
import { EmblemIcon } from './BrandLogo';

export const DisclaimerModal: React.FC = () => {
  const { isDisclaimerOpen, setIsDisclaimerOpen, acceptDisclaimer, disclaimerAccepted, language } = useApp();
  const [isChecked, setIsChecked] = useState(false);

  if (!isDisclaimerOpen) return null;

  const handleAccept = () => {
    if (!isChecked && !disclaimerAccepted) return;
    acceptDisclaimer();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-amber-500/40 dark:border-amber-500/30 overflow-hidden my-auto">
        
        {/* Top Decorative Stripe */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 bg-amber-50/60 dark:bg-amber-950/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex-shrink-0">
                <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 mb-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{language === 'hi' ? 'अनाधिकारिक मंच • वैधानिक स्पष्टीकरण' : 'Unofficial Platform • Statutory Notice'}</span>
                </div>
                <h2 
                  id="disclaimer-title"
                  className="text-base sm:text-xl font-black text-slate-900 dark:text-white font-serif tracking-tight leading-snug"
                >
                  {language === 'hi'
                    ? 'महत्वपूर्ण सूचना, अस्वीकरण एवं सहमति प्रपत्र'
                    : 'Statutory Disclaimer & Content Usage Consent'}
                </h2>
              </div>
            </div>

            {/* Close button only available if user has already accepted before and is re-reviewing */}
            {disclaimerAccepted && (
              <button
                onClick={() => setIsDisclaimerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[60vh] sm:max-h-[55vh] overflow-y-auto text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
          
          {/* Section 1: Non-Government Platform */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
              <Building2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>१. गैर-सरकारी एवं अनाधिकारिक मंच (Non-Governmental Entity)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 pl-6">
              यह वेबसाइट/पोर्टल (<strong>UP Outsource Seva Nigam</strong>) उत्तर प्रदेश सरकार, किसी मंत्रालय, विभाग या निगम की <strong>आधिकारिक वेबसाइट नहीं है</strong>। यह उत्तर प्रदेश के 75 जिलों के विभिन्न विभागों में संविदा एवं आउटसोर्स पर कार्यरत कर्मचारियों का एक <strong>स्वतंत्र, लोकतांत्रिक एवं गैर-सरकारी सामाजिक विचार-विमर्श मंच (Community Forum)</strong> है।
            </p>
          </div>

          {/* Section 2: Content & Information Usage */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
              <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>२. सामग्री व सूचनाओं का उपयोग (Content & Information Usage Policy)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 pl-6">
              इस मंच पर प्रकाशित शासनादेश (GOs), परिपत्र, मानदेय चार्ट, एवं सेवायोजन भर्ती सूचनाएं केवल <strong>जन-जागरूकता, शैक्षणिक अध्ययन एवं पारस्परिक सहायता</strong> हेतु संकलित हैं। किसी भी विधिक, वित्तीय या भर्ती आवेदन संबंधी निर्णय से पूर्व मूल सरकारी गजट, संबंधित विभाग अथवा अधिकृत सेवायोजन पोर्टल (<code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[11px]">sewayojan.up.nic.in</code>) से पुष्टि अवश्य करें।
            </p>
          </div>

          {/* Section 3: Digital ID Card Limitations */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
              <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>३. डिजिटल पहचान पत्र की सीमा (Digital ID Card Scope)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 pl-6">
              पोर्टल द्वारा जारी किया जाने वाला डिजिटल आईडी कार्ड केवल <strong>आंतरिक कम्युनिटी प्रोफाइल व सदस्य नेटवर्किंग</strong> के लिए है। इसका उपयोग किसी भी सरकारी कार्यालय में आधिकारिक शासकीय सेवा पहचान पत्र (Govt Identity Card) या प्राधिकरण पत्र के रूप में <strong>नहीं</strong> किया जा सकता।
            </p>
          </div>

          {/* Section 4: Community Conduct */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
              <Lock className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>४. उपयोगकर्ता आचार संहिता एवं दायित्व (User Responsibility & Conduct)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 pl-6">
              मंच पर पोस्ट या चर्चा करते समय कर्मचारी गरिमा व मर्यादा का पालन करें। किसी भी प्रकार की असत्य, भ्रामक, भड़काऊ अथवा अवैध सामग्री पोस्ट करना वर्जित है। सदस्यों द्वारा व्यक्त विचार उनके निजी हैं, जिसके लिए मंच प्रबंधन उत्तरदायी नहीं होगा।
            </p>
          </div>

        </div>

        {/* Consent Checkbox & Action Area */}
        <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 space-y-4">
          
          {/* Explicit Consent Checkbox */}
          <label className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 cursor-pointer select-none transition-colors hover:bg-amber-500/20">
            <input
              id="disclaimer-consent-checkbox"
              type="checkbox"
              checked={isChecked || disclaimerAccepted}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 dark:border-slate-600 cursor-pointer"
            />
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">
              <span className="text-amber-800 dark:text-amber-300 font-bold block mb-0.5">
                {language === 'hi' ? 'सहमति एवं अभिस्वीकृति (Declaration of Consent):' : 'Consent & Declaration:'}
              </span>
              <span>
                {language === 'hi'
                  ? 'मैंने उपर्युक्त वैधानिक अस्वीकरण, गैर-सरकारी स्थिति एवं सामग्री उपयोग की शर्तों को ध्यानपूर्वक पढ़ लिया है। मैं पूर्णतः सहमत हूँ कि यह एक अनाधिकारिक सामाजिक मंच है और मैं इन नियमों का अनुपालन करने के लिए प्रतिबद्ध हूँ।'
                  : 'I have read and understood that this is an unofficial community platform and agree to the content usage terms and guidelines.'}
              </span>
            </div>
          </label>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            
            {/* Secondary Link to Official Portal */}
            <a
              href="https://sewayojan.up.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <span>{language === 'hi' ? 'आधिकारिक सेवायोजन पोर्टल पर जाएं' : 'Go to Official Sewayojan'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Primary Acceptance Button */}
            <button
              id="disclaimer-accept-btn"
              disabled={!isChecked && !disclaimerAccepted}
              onClick={handleAccept}
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
                isChecked || disclaimerAccepted
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer active:scale-95'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {language === 'hi' 
                  ? 'सहमति स्वीकार करें एवं मंच में प्रवेश करें' 
                  : 'Accept Consent & Enter Portal'}
              </span>
            </button>

          </div>

          {/* Micro Footer Notice */}
          <p className="text-[10.5px] text-center text-slate-400">
            {language === 'hi'
              ? 'आपकी सहमति इस ब्राउज़र में सुरक्षित दर्ज कर ली जाएगी। इसे कभी भी फुटर में "वैधानिक अस्वीकरण" लिंक से दोबारा देखा जा सकता है।'
              : 'Your acceptance is recorded in this browser. You can re-read this statutory notice anytime from the footer.'}
          </p>

        </div>

      </div>
    </div>
  );
};
