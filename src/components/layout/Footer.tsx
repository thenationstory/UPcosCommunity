import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmblemIcon } from '../common/BrandLogo';
import { 
  Bell, CheckCircle2, Mail, Send, Phone, MapPin, 
  ShieldAlert, Lock, ChevronRight, Check
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setAuthModalType, setIsDisclaimerOpen } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#070d18] text-slate-300 text-xs py-8 sm:py-12 px-4 sm:px-8 border-t border-slate-800/80 font-sans">
      <div className="w-full max-w-[1520px] mx-auto space-y-8 sm:space-y-10">
        
        {/* ================= 1. NEWSLETTER DIGEST CARD ================= */}
        <div className="bg-gradient-to-r from-[#0d1627] via-[#101c33] to-[#151c38] rounded-2xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Column: Heading & Information */}
            <div className="space-y-2.5 max-w-3xl">
              {/* Top Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <Bell className="w-3.5 h-3.5 text-rose-400" />
                <span>साप्ताहिक न्यूज़लेटर (Weekly Digest)</span>
              </div>

              {/* Main Headline */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug font-serif">
                आउटसोर्सिंग की हर बड़ी खबर सीधे अपने इनबॉक्स में पाएं
              </h3>

              {/* Subtitle Description */}
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-2xl">
                नए शासनादेश, न्यूनतम वेतन संशोधन, ईपीएफ/ईएसआई विधिक प्रावधान एवं संविदा कर्मियों से जुड़े महत्वपूर्ण फैसलों का हर हफ्ते प्रामाणिक बुलेटिन।
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% निःशुल्क एवं सुरक्षित</span>
                </div>
                <span className="text-slate-600">•</span>
                <span>कोई स्पैम नहीं, कभी भी अनसब्सक्राइब करें</span>
              </div>
            </div>

            {/* Right Column: Input Box and Subscribe Button */}
            <div className="w-full lg:max-w-md flex-shrink-0">
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>धन्यवाद! आप साप्ताहिक न्यूज़लेटर से सफलतापूर्वक जुड़ चुके हैं।</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="अपना ईमेल पता दर्ज करें (Enter email)"
                      className="w-full pl-10 pr-4 py-3 bg-[#0a1222] border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md shadow-red-950/50 transition-all cursor-pointer"
                  >
                    <span>सदस्य बनें</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* ================= 2. FOUR COLUMN MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pt-2">
          
          {/* Column 1: Brand & Social (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <EmblemIcon size={46} className="shadow-md flex-shrink-0" />
              <div>
                <div className="text-lg sm:text-xl font-black tracking-tight leading-tight text-white">
                  UP Outsource <span className="text-red-500">Seva Nigam</span>
                </div>
                <div className="text-[11px] font-extrabold text-sky-400 tracking-wider mt-0.5">
                  NEWS & INFORMATION
                </div>
                <div className="text-[11px] font-semibold text-amber-400 mt-0.5">
                  आउटसोर्स कर्मचारियों की हर जरूरी खबर, एक जगह
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              उत्तर प्रदेश राज्य सरकार के विभिन्न विभागों, निदेशालयों, परिषदों एवं निगमों में सेवा प्रदाता (मैनपावर एजेंसी) के माध्यम से कार्यरत समस्त आउटसोर्स कार्मिकों के लिए समर्पित स्वतंत्र समाचार, शासनादेश एवं सेवा सूचना मंच।
            </p>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-slate-300">
                सोशल मीडिया पर जुड़ें (Follow Us):
              </p>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-300 border border-slate-700/60 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 hover:text-emerald-400 text-slate-300 border border-slate-700/60 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 hover:text-red-500 text-slate-300 border border-slate-700/60 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-300 border border-slate-700/60 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 hover:text-rose-400 text-slate-300 border border-slate-700/60 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: त्वरित लिंक (QUICK LINKS) (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide uppercase">
              त्वरित लिंक (QUICK LINKS)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('feed')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>मुख्य पृष्ठ (Home)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('blog-jobs')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>ताज़ा समाचार (Latest News)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('documents')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>शासनादेश व परिपत्र (Gov Orders)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('departments')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>विभागवार सूची (Departments)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('directory')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>कर्मचारी जानकारी केंद्र (Employee Hub)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('feed')}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>कम्युनिटी फोरम (Community Forum)</span>
                </button>
              </li>
              <li>
                <a
                  href="https://upcos.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>UPCOS संदर्भ पोर्टल (upcos.org)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: नीति एवं सूचना (LEGAL & INFO) (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide uppercase">
              नीति एवं सूचना (LEGAL & INFO)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsDisclaimerOpen(true)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>हमारे बारे में (About Us)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('qa')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>संपर्क एवं सुझाव (Contact Us)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsDisclaimerOpen(true)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>अस्वीकरण (Disclaimer)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsDisclaimerOpen(true)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>गोपनीयता नीति (Privacy Policy)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('qa')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>कर्मचारी सहायता केंद्र (Help Desk)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: हेल्पलाइन सहायता (Help Card) (2 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">
              हेल्पलाइन सहायता
            </h4>
            <div className="bg-[#0c1424] border border-slate-800/90 rounded-xl p-4 space-y-3 shadow-md">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>सीएम हेल्पलाइन: <strong className="text-white font-mono">1076</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="font-mono text-sky-300">contact@uposn.in</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-0.5">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>लखनऊ, उत्तर प्रदेश (स्वतंत्र सूचना मंच)</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= 3. MANDATORY DISCLAIMER BOX ================= */}
        <div className="rounded-xl border border-amber-500/30 bg-[#0c1424] p-4 sm:p-5 text-xs leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-[13px]">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>महत्वपूर्ण अस्वीकरण (Mandatory Non-Government Disclaimer):</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed pl-6">
            “UP Outsource Seva Nigam News & Information एक स्वतंत्र समाचार एवं सूचना मंच है। यह उत्तर प्रदेश सरकार अथवा किसी सरकारी विभाग की आधिकारिक वेबसाइट नहीं है। यहाँ प्रकाशित सामग्री केवल जन-जागरूकता, कर्मचारियों के कल्याण एवं विधिक जानकारी के उद्देश्य से उपलब्ध कराई जाती है। इस पोर्टल पर किसी भी प्रकार की अनधिकृत, अपुष्ट अथवा गोपनीय सूचना का प्रकाशन पूर्णतः वर्जित है। किसी भी आधिकारिक निर्णय या विधिक कार्यवाही से पूर्व कृपया संबंधित विभाग के मूल शासनादेश (shasanadesh.up.gov.in) अथवा आधिकारिक पोर्टल का अवलोकन अवश्य करें।”
          </p>
        </div>

        {/* ================= 4. COPYRIGHT & ADMIN BOTTOM BAR ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-[11px] text-slate-400 border-t border-slate-800/60">
          <p>
            © 2026 UP Outsource Seva Nigam News & Information. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">डिजिटल सशक्तिकरण • निष्पक्ष सूचना</span>
            <button
              onClick={() => setCurrentView('admin')}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>प्रशासक प्रवेश</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
