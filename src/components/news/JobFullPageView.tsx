import React from 'react';
import { useApp } from '../../context/AppContext';
import { JobVacancy } from '../../data/mockNewsAndJobs';
import { 
  Briefcase, Calendar, MapPin, Building2, ExternalLink, 
  CheckCircle2, Clock, Bookmark, Share2, ArrowLeft, 
  Check, ShieldAlert, Award, FileCheck2, UserCheck, 
  HelpCircle, Printer, ChevronRight
} from 'lucide-react';

interface JobFullPageViewProps {
  job: JobVacancy;
  onBack: () => void;
  onSelectJob: (job: JobVacancy) => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
  isCopied: boolean;
  allJobs: JobVacancy[];
}

export const JobFullPageView: React.FC<JobFullPageViewProps> = ({
  job,
  onBack,
  onSelectJob,
  isSaved,
  onToggleSave,
  onShare,
  isCopied,
  allJobs
}) => {
  const { language } = useApp();

  const relatedJobs = allJobs.filter(j => j.id !== job.id).slice(0, 3);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="job-full-page-view" className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6 space-y-5 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Back Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            onClick={onBack}
            id="job-back-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 font-bold transition-colors border border-amber-200 dark:border-amber-800/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'सभी भर्तियों पर वापस जाएं' : 'Back to All Jobs'}</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px] sm:max-w-[400px]">
            {language === 'hi' ? job.titleHi : job.title}
          </span>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSave}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              isSaved
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>{isSaved ? (language === 'hi' ? 'सहेजा गया' : 'Saved') : (language === 'hi' ? 'सहेजें' : 'Save')}</span>
          </button>

          <button
            onClick={onShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{isCopied ? (language === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (language === 'hi' ? 'साझा करें' : 'Share')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'प्रिंट' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Main Full-Page Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-gradient-to-r from-amber-700 via-amber-800 to-orange-800 text-white shadow-lg border border-amber-900">
        <div className="relative z-10 space-y-3 sm:space-y-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-amber-100 border border-white/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'hi' ? 'सेवायोजन सत्यापित आउटसोर्स भर्ती' : 'Verified UP Sewayojan Vacancy'}</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-amber-950/60 text-amber-200 text-xs font-bold border border-amber-400/40">
              {job.totalPosts} {language === 'hi' ? 'कुल पद (Vacancies)' : 'Total Vacancies'}
            </span>

            {job.isUrgent && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'अंतिम तिथि निकट' : 'Urgent / Closing Soon'}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif tracking-tight leading-tight">
            {language === 'hi' ? job.titleHi : job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-amber-100/90">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span className="font-semibold">{language === 'hi' ? job.departmentHi : job.department}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>{language === 'hi' ? 'प्रकाशन:' : 'Posted:'} {job.publishedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-amber-200 bg-black/25 px-2 py-0.5 rounded">ID: UP-OSN-{job.id.toUpperCase()}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 6 Key Highlights Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'मासिक मानदेय' : 'Monthly Salary'}
          </span>
          <div>
            <p className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 font-serif leading-tight">
              {job.salary}
            </p>
            <p className="text-[10.5px] text-slate-500 mt-1">{language === 'hi' ? '+ ईपीएफ / ईएसआई लाभ' : '+ EPF / ESIC Benefits'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'अंतिम तिथि' : 'Last Date'}
          </span>
          <div>
            <p className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 font-serif leading-tight flex items-center gap-1">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{job.lastDate}</span>
            </p>
            <p className="text-[10.5px] text-slate-500 mt-1">{language === 'hi' ? 'ऑनलाइन आवेदन अनिवार्य' : 'Online Registration'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'आयु सीमा' : 'Age Limit'}
          </span>
          <div>
            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-serif leading-tight">
              {job.ageLimit}
            </p>
            <p className="text-[10.5px] text-slate-500 mt-1">{language === 'hi' ? 'नियमानुसार छूट देय' : 'Standard Relaxation'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'कार्य अनुभव' : 'Experience'}
          </span>
          <div>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              {job.experience || (language === 'hi' ? 'फ्रेशर्स पात्र' : 'Freshers Eligible')}
            </p>
            <p className="text-[10.5px] text-slate-500 mt-1">{language === 'hi' ? 'प्राथमिकता व दक्षता' : 'Preference for Exp'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'तैनाती जनपद' : 'Districts'}
          </span>
          <div>
            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-serif leading-tight">
              {job.districts.length} {language === 'hi' ? 'जिले' : 'Districts'}
            </p>
            <p className="text-[10.5px] text-slate-500 mt-1">{language === 'hi' ? 'उत्तर प्रदेश' : 'Across UP'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'भर्ती पोर्टल' : 'Portal'}
          </span>
          <div>
            <p className="text-sm sm:text-base font-bold text-amber-700 dark:text-amber-400 leading-tight">
              UP Sewayojan
            </p>
            <p className="text-[10.5px] text-slate-500 mt-1">sewayojan.up.nic.in</p>
          </div>
        </div>

      </div>

      {/* Main Full-Page Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 2 Columns: In-depth Information */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Section 1: Detailed Job Profile */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'विस्तृत कार्य विवरण एवं कार्यक्षेत्र' : 'Job Role & Scope of Work'}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              {language === 'hi' ? job.descriptionHi : job.description}
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>{language === 'hi' ? 'पद की प्रकृति:' : 'Nature of Employment:'}</strong>{' '}
              {language === 'hi' 
                ? 'यह पद उत्तर प्रदेश शासन के संबंधित विभाग में अधिकृत आउटसोर्सिंग एजेंसी के माध्यम से संविदा/आउटसोर्स आधार पर भरा जा रहा है।'
                : 'This position is filled on an outsource contract basis through an authorized service provider agency on GeM/Sewayojan portal.'}
            </div>
          </div>

          {/* Section 2: Educational & Technical Eligibility */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'शैक्षणिक एवं तकनीकी पात्रता (Eligibility Criteria)' : 'Educational & Technical Eligibility'}</span>
            </h2>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
              <p className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100">
                {language === 'hi' ? job.qualificationHi : job.qualification}
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                {language === 'hi' 
                  ? 'अभ्यर्थी के पास आवेदन की अंतिम तिथि से पूर्व मान्यता प्राप्त बोर्ड / विश्वविद्यालय से प्रमाणपत्र होना आवश्यक है।'
                  : 'Certificates must be issued by a recognized Board/University prior to the application closing date.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{language === 'hi' ? 'कंप्यूटर दक्षता' : 'Computer Proficiency'}</p>
                  <p className="text-slate-500 mt-0.5">{language === 'hi' ? 'CCC, O Level या समकक्ष डिप्लोमा' : 'CCC, O Level or equivalent'}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{language === 'hi' ? 'मूल निवास' : 'Domicile'}</p>
                  <p className="text-slate-500 mt-0.5">{language === 'hi' ? 'उत्तर प्रदेश का वैध मूल निवास' : 'Valid UP Domicile'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Required Documents Checklist */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'आवश्यक दस्तावेज चेकलिस्ट (Required Documents)' : 'Required Documents Checklist'}</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {language === 'hi' 
                ? 'पोर्टल पर आवेदन एवं सत्यापन के समय निम्नलिखित दस्तावेजों की मूल व स्वप्रमाणित प्रति संलग्न करनी होगी:'
                : 'Keep original and self-attested photocopies of the following documents ready for verification:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {job.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ✓
                  </span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Eligible Districts */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>{language === 'hi' ? 'चयनित जनपद सूची (Posting Locations)' : 'Eligible Districts for Posting'}</span>
              </h2>
              <span className="text-xs font-bold text-slate-500">
                {job.districts.length} {language === 'hi' ? 'जनपद' : 'Districts'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {job.districts.map((dist, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>{dist}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Section 5: Step-by-Step How to Apply */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'सेवायोजन पोर्टल पर आवेदन कैसे करें?' : 'How to Apply on UP Sewayojan'}</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  उत्तर प्रदेश रोजगार संगम / सेवायोजन पोर्टल (<a href="https://sewayojan.up.nic.in" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline font-semibold">sewayojan.up.nic.in</a>) पर अपना पंजीकरण करें या लॉगिन करें।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  लॉगिन के उपरांत <strong>'आउटसोर्सिंग नौकरियां' (Outsourced Jobs)</strong> विकल्प का चयन करें।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  विभाग का नाम <strong>"{language === 'hi' ? job.departmentHi : job.department}"</strong> एवं पद नाम <strong>"{language === 'hi' ? job.titleHi : job.title}"</strong> फिल्टर कर सर्च करें।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  4
                </span>
                <p>
                  'आवेदन करें' बटन पर क्लिक कर अपने प्रोफाइल को सबमिट करें। कोई भी अलग से शुल्क देय नहीं है।
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Sticky Action & Information Sidebar */}
        <div className="space-y-5">
          
          {/* Main Apply Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border-2 border-amber-500/40 shadow-md space-y-4 sticky top-20">
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                {language === 'hi' ? 'आधिकारिक आवेदन' : 'Official Portal'}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {language === 'hi' ? 'तुरंत ऑनलाइन आवेदन करें' : 'Apply Online Now'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'hi' ? 'अंतिम तिथि से पूर्व अपना आवेदन पंजीकृत करें।' : 'Submit application before deadline.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">{language === 'hi' ? 'आवेदन शुल्क:' : 'Fee:'}</span>
                <span className="font-bold text-emerald-600">{language === 'hi' ? '₹0 (नि:शुल्क)' : '₹0 (Free)'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">{language === 'hi' ? 'अंतिम तिथि:' : 'Deadline:'}</span>
                <span className="font-bold text-rose-600">{job.lastDate}</span>
              </div>
            </div>

            <a
              href={job.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="job-apply-direct-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>{language === 'hi' ? 'सेवायोजन पोर्टल पर आवेदन करें' : 'Apply on Sewayojan Portal'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onBack}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {language === 'hi' ? '← सभी भर्तियों पर वापस जाएं' : '← Back to All Vacancies'}
            </button>

            {/* Anti-fraud advisory */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{language === 'hi' ? 'सावधानी एवं पारदर्शी चेतावनी' : 'Fraud Alert'}</span>
              </div>
              <p className="leading-relaxed">
                {language === 'hi'
                  ? 'आउटसोर्सिंग भर्ती प्रक्रिया में किसी भी व्यक्ति अथवा बिचौलिए को धन न दें। सेवायोजन पर चयन पूर्णतः पारदर्शी व नियमों के अधीन होता है।'
                  : 'Never pay any money or fee to middlemen for outsourcing recruitment. All selections are merit-driven via portal.'}
              </p>
            </div>
          </div>

          {/* Agency & Support Info */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'आउटसोर्सिंग सेवा प्रदाता' : 'Outsourcing Agency'}</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              {job.outsourcingAgency}
            </p>
            <p className="text-[11px] text-slate-400">
              {language === 'hi' 
                ? 'GeM पोर्टल / सेवायोजन अनुबंधित वेंडर द्वारा तैनाती व वेतन वितरण।'
                : 'Deployed and paid through GeM/Sewayojan empanelled vendors.'}
            </p>
          </div>

          {/* Related Vacancies */}
          {relatedJobs.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'hi' ? 'अन्य संबंधित भर्तियां' : 'Other Related Vacancies'}
              </h4>

              <div className="space-y-2.5">
                {relatedJobs.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectJob(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-amber-50/70 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700/70 transition-all cursor-pointer group"
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 line-clamp-1">
                      {language === 'hi' ? rel.titleHi : rel.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {language === 'hi' ? rel.departmentHi : rel.department}
                    </p>
                    <div className="flex items-center justify-between text-[10.5px] mt-1.5 text-amber-700 dark:text-amber-400 font-semibold">
                      <span>{rel.salary}</span>
                      <span className="flex items-center gap-0.5 text-slate-400 group-hover:text-amber-600">
                        <span>{language === 'hi' ? 'देखें' : 'View'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
