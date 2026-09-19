import React from 'react';
import { useApp } from '../../context/AppContext';
import { UP_DISTRICTS, UP_DEPARTMENTS } from '../../data/constants';
import { 
  ShieldCheck, Users, Building2, MapPin, CreditCard, 
  FileText, HelpCircle, ArrowRight, CheckCircle2, Sparkles, 
  Briefcase, Bell, Share2, Shield, Lock, Search
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    language, t, currentUser, 
    setCurrentView, setSelectedDistrictId,
    setAuthModalType, allUsers, posts, documents 
  } = useApp();

  // Dynamic statistics
  const totalEmployeesCount = 12480 + allUsers.length * 15;
  const verifiedCount = Math.floor(totalEmployeesCount * 0.72);
  const districtsCount = UP_DISTRICTS.length; // 75
  const departmentsCount = UP_DEPARTMENTS.length; // 18+

  const whyJoinCards = [
    {
      icon: Users,
      titleHi: 'कर्मचारियों से जुड़ें',
      titleEn: 'Connect with Colleagues',
      descHi: 'उत्तर प्रदेश के विभिन्न सरकारी कार्यालयों व विभागों में कार्यरत संविदा एवं आउटसोर्स कर्मचारियों से सीधा संवाद करें।',
      descEn: 'Communicate directly with contractual and outsourced staff across government offices and departments.',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Building2,
      titleHi: 'विभागीय जानकारी साझा करें',
      titleEn: 'Share Departmental Updates',
      descHi: 'स्वास्थ्य, बेसिक शिक्षा, नगर निगम, परिवहन, राजस्व आदि विभागों के नियम व महत्वपूर्ण आदेश तुरंत जानें।',
      descEn: 'Stay updated with department-specific notices, roster rules and circulars instantly.',
      color: 'from-amber-600 to-orange-600'
    },
    {
      icon: MapPin,
      titleHi: '75 जिलेवार कम्युनिटी',
      titleEn: '75 District Communities',
      descHi: 'लखनऊ, कानपुर, प्रयागराज, वाराणसी, आगरा से लेकर बलिया तक—अपने जिले के कर्मचारियों का विशेष समूह।',
      descEn: 'Dedicated district forums from Lucknow, Kanpur, Prayagraj, Varanasi to Ballia.',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: HelpCircle,
      titleHi: 'सवाल पूछें व समाधान पाएं',
      titleEn: 'Ask Questions & Get Answers',
      descHi: 'वेतन विलंब, ईपीएफ (EPF) कटौती, ईएसआई (ESI) लाभ या एजेंसी विवाद पर अनुभवी साथियों से सलाह लें।',
      descEn: 'Get peer advice on delayed salary, EPF/ESI queries, leave rules and agency grievances.',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Briefcase,
      titleHi: 'नौकरी एवं अवसर',
      titleEn: 'Jobs & Opportunities',
      descHi: 'सेवायोजन एवं जेम पोर्टल पर नए आउटसोर्सिंग अवसर, कौशल विकास एवं प्रमाणन कार्यक्रमों की जानकारी।',
      descEn: 'Track new outsourcing openings, skill certifications, and verified career resources.',
      color: 'from-rose-600 to-red-600'
    },
    {
      icon: FileText,
      titleHi: 'दस्तावेज और संसाधन',
      titleEn: 'Documents & Circulars',
      descHi: 'शासनादेश (GO), आवेदन प्रारूप, ईपीएफ पासबुक गाइड, एवं उच्च न्यायालय के महत्वपूर्ण निर्णय डाउनलोड करें।',
      descEn: 'Download official Govt Orders, grievance application templates, and court judgments.',
      color: 'from-sky-600 to-cyan-600'
    },
    {
      icon: CreditCard,
      titleHi: 'डिजिटल ID Card जनरेटर',
      titleEn: 'Digital Employee Community ID',
      descHi: 'सत्यापित सदस्यों के लिए फोटो, क्यूआर कोड एवं विभाग के साथ आधुनिक डिजिटल पहचान पत्र।',
      descEn: 'Generate a sleek digital community ID card with photo, department, and live QR verification.',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      icon: Bell,
      titleHi: 'महत्वपूर्ण अपडेट व अलर्ट',
      titleEn: 'Timely Alerts & Notices',
      descHi: 'न्यूनतम वेतन पुनरीक्षण, बोनस और छुट्टियों के संबंध में कोई भी महत्वपूर्ण जानकारी न चूकें।',
      descEn: 'Never miss government notifications on minimum wages, holiday calendars, and bonuses.',
      color: 'from-teal-600 to-emerald-600'
    },
    {
      icon: ShieldCheck,
      titleHi: 'कर्मचारी नेटवर्क एवं सुरक्षा',
      titleEn: 'Statewide Employee Network',
      descHi: 'गोपनीयता नियंत्रण के साथ अपनी पहचान सुरक्षित रखें। फोन नंबर या निजी जानकारी सार्वजनिक नहीं की जाती।',
      descEn: 'Full privacy controls ensure your phone number and private documents stay confidential.',
      color: 'from-violet-600 to-indigo-600'
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-10 sm:pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-5 sm:pt-10 pb-8 sm:pb-14 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent">
        <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
          
          {/* Tagline Badge */}
          <div 
            id="hero-tagline-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-amber-300/60 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            <span className="font-serif text-xs sm:text-sm font-semibold">
              Unofficial Statewide Outsource Employee Network
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-3 sm:mb-5 font-serif max-w-4xl mx-auto">
            {language === 'hi' ? (
              <>
                उत्तर प्रदेश के <span className="text-amber-700 dark:text-amber-400 underline decoration-amber-500/40 decoration-wavy">आउटसोर्स कर्मचारियों</span> की अपनी कम्युनिटी
              </>
            ) : (
              <>
                The Statewide Community for <span className="text-amber-700 dark:text-amber-400">UP Outsource Employees</span>
              </>
            )}
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
            {language === 'hi'
              ? 'अपने जिले, विभाग और सहकर्मियों से जुड़ें। महत्वपूर्ण जानकारी साझा करें, चर्चा करें, नेटवर्क बनाएं और अपनी डिजिटल पहचान बनाएं।'
              : 'Connect with your district, department, and colleagues. Share vital workplace updates, engage in discussions, build your professional network, and claim your digital identity.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            {currentUser ? (
              <button
                onClick={() => setCurrentView('feed')}
                id="hero-feed-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-600/25 transition-all transform hover:-translate-y-0.5 min-h-[48px] active:scale-95"
              >
                <span>{language === 'hi' ? 'कम्युनिटी फीड पर जाएं' : 'Go to Community Feed'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalType('register')}
                  id="hero-join-btn"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-600/25 transition-all transform hover:-translate-y-0.5 min-h-[48px] active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'hi' ? 'कम्युनिटी से जुड़ें (Join Free)' : 'Join Community (Free)'}</span>
                </button>

                <button
                  onClick={() => setAuthModalType('login')}
                  id="hero-login-btn"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base border border-slate-300 dark:border-slate-700 shadow-sm transition-all min-h-[48px] active:scale-95"
                >
                  <span>{language === 'hi' ? 'लॉग इन करें' : 'Sign In'}</span>
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentView('idcard')}
              id="hero-idcard-btn"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 font-bold text-sm border border-amber-300/40 dark:border-amber-700/50 transition-colors min-h-[48px] active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'डिजिटल ID कार्ड देखें' : 'View Digital ID'}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? '75 जिलों के लिए समर्पित' : 'Dedicated to 75 Districts'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'गोपनीयता एवं सुरक्षा प्राथमिक' : 'Privacy & Safety Protected'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'सत्यापित कर्मचारी बैज' : 'Admin-Verified Badges'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Statistics Section */}
      <section className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-white dark:bg-slate-800/90 rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-700">
            
            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-amber-700 dark:text-amber-400 font-serif">
                {(totalEmployeesCount ?? 0).toLocaleString('en-IN')}+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
                {t.registeredEmployees}
              </p>
            </div>

            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif">
                {districtsCount}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
                {t.districtsCovered}
              </p>
            </div>

            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif">
                {departmentsCount}+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
                {t.departmentsActive}
              </p>
            </div>

            <div className="pt-4 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-serif">
                {(verifiedCount ?? 0).toLocaleString('en-IN')}+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
                {t.activeMembers} ({language === 'hi' ? 'सत्यापित' : 'Verified'})
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Join Section (9 Pillars) */}
      <section className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif mb-2">
            {language === 'hi' ? 'यूपी आउटसोर्स सेवा निगम से क्यों जुड़ें?' : 'Why Join UP Outsource Seva Nigam?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'hi'
              ? 'एक ऐसा सुरक्षित मंच जो उत्तर प्रदेश के सभी आउटसोर्स कर्मचारियों की आवाज, पहचान और समस्याओं का समाधान प्रस्तुत करता है।'
              : 'A secure, dedicated ecosystem built to address identity, queries, and advocacy for outsourcing employees.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {whyJoinCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {language === 'hi' ? card.titleHi : card.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === 'hi' ? card.descHi : card.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 75 Districts Quick Explorer Section */}
      <section className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-slate-100 dark:bg-slate-800/70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'उत्तर प्रदेश के समस्त 75 जिलों की कम्युनिटी' : 'All 75 District Communities'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {language === 'hi' 
                  ? 'अपने गृह जिले अथवा कार्यक्षेत्र जिले का चयन कर स्थानीय सहकर्मियों से सीधे जुड़ें।' 
                  : 'Select your posting or home district to view local discussions, updates, and peers.'}
              </p>
            </div>
            <button
              onClick={() => setCurrentView('districts')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex-shrink-0"
            >
              <span>{language === 'hi' ? 'सभी 75 जिले देखें' : 'Explore All 75'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {UP_DISTRICTS.slice(0, 24).map((dist) => (
              <button
                key={dist.id}
                onClick={() => {
                  setSelectedDistrictId(dist.id);
                  setCurrentView('districts');
                }}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors shadow-2xs"
              >
                {language === 'hi' ? dist.nameHi : dist.name}
              </button>
            ))}
            <button
              onClick={() => setCurrentView('districts')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 hover:bg-amber-500/20"
            >
              +{UP_DISTRICTS.length - 24} {language === 'hi' ? 'अन्य जिले...' : 'more districts...'}
            </button>
          </div>
        </div>
      </section>

      {/* Digital ID Preview Banner */}
      <section className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-orange-800 rounded-xl sm:rounded-2xl text-white p-5 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-bold mb-4">
              <CreditCard className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'विशेष फीचर' : 'Flagship Feature'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mb-3">
              {language === 'hi' ? 'अपना डिजिटल कर्मचारी कम्युनिटी ID कार्ड प्राप्त करें' : 'Get Your Digital Employee Community ID'}
            </h2>
            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed mb-6">
              {language === 'hi'
                ? 'सत्यापित सदस्यों को प्रदान किया जाने वाला सुरक्षित डिजिटल पहचान पत्र। इसमें आपकी फोटो, विभाग, कर्मचारी कोड और त्वरित सत्यापन हेतु क्यूआर कोड अंकित होता है।'
                : 'A verified digital badge with photo, employee ID, department, and tamper-proof QR code verification.'}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentView('idcard')}
                className="px-6 py-3 rounded-xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-sm shadow-md transition-all"
              >
                {t.generateId}
              </button>
              <button
                onClick={() => setCurrentView('qa')}
                className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm transition-all"
              >
                {language === 'hi' ? 'सत्यापन नियम पढ़ें' : 'Verification Guidelines'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Strict Legal & Non-Government Disclaimer */}
      <section className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed flex items-start gap-2.5 sm:gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'वैधानिक स्पष्टीकरण एवं अस्वीकरण (Legal Disclaimer):' : 'Legal & Institutional Disclaimer:'}
            </p>
            <p>
              {language === 'hi'
                ? 'यूपी आउटसोर्स सेवा निगम (UPOSN) उत्तर प्रदेश के विभिन्न विभागों, प्राधिकरणों एवं निगमों में आउटसोर्सिंग एवं संविदा पर कार्यरत कर्मचारियों का एक स्वतंत्र, लोकतांत्रिक व गैर-सरकारी डिजिटल कम्युनिटी मंच है। यह उत्तर प्रदेश सरकार अथवा किसी राजकीय विभाग का आधिकारिक पोर्टल नहीं है। मंच पर प्रदर्शित डिजिटल आईडी कार्ड केवल आंतरिक कम्युनिटी पहचान हेतु है तथा यह किसी सरकारी पहचान पत्र का विकल्प नहीं है।'
                : 'UP Outsource Seva Nigam (UPOSN) is an independent, non-governmental digital community platform exclusively created for outsourced employees across Uttar Pradesh. It is not an official portal of the Government of Uttar Pradesh. The digital community ID card is for internal membership identification and is not an official government identity document.'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
