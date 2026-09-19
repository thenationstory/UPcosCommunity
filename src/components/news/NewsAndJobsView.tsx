import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_JOBS, MOCK_NEWS, JobVacancy, NewsArticle } from '../../data/mockNewsAndJobs';
import { UP_DISTRICTS } from '../../data/constants';
import { JobFullPageView } from './JobFullPageView';
import { NewsFullPageView } from './NewsFullPageView';
import { 
  Briefcase, Newspaper, Search, Filter, Calendar, MapPin, 
  Building2, ExternalLink, FileText, CheckCircle2, AlertTriangle, 
  Bookmark, Share2, Download, ArrowRight, Clock, UserCheck, 
  Sparkles, X, ChevronRight, Send, Check
} from 'lucide-react';

export const NewsAndJobsView: React.FC = () => {
  const { language, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'jobs' | 'news'>('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>('ALL');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('ALL');

  // Bookmarks
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [savedNewsIds, setSavedNewsIds] = useState<string[]>([]);

  // Modals & Details
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter Jobs
  const filteredJobs = MOCK_JOBS.filter(job => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || 
      job.title.toLowerCase().includes(q) ||
      job.titleHi.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q) ||
      job.departmentHi.toLowerCase().includes(q) ||
      job.qualification.toLowerCase().includes(q) ||
      job.qualificationHi.toLowerCase().includes(q);

    const matchDistrict = selectedDistrict === 'ALL' || job.districts.some(d => d.includes(selectedDistrict));
    const matchCategory = selectedJobCategory === 'ALL' || job.category === selectedJobCategory;

    return matchSearch && matchDistrict && matchCategory;
  });

  // Filter News
  const filteredNews = MOCK_NEWS.filter(article => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q ||
      article.title.toLowerCase().includes(q) ||
      article.titleHi.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.summaryHi.toLowerCase().includes(q) ||
      article.department.toLowerCase().includes(q) ||
      article.tags.some(t => t.toLowerCase().includes(q));

    const matchCategory = selectedNewsCategory === 'ALL' || article.category === selectedNewsCategory;

    return matchSearch && matchCategory;
  });

  const handleCopyLink = (id: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSaveJob = (id: string) => {
    setSavedJobIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleSaveNews = (id: string) => {
    setSavedNewsIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleOpenJob = (job: JobVacancy) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNews = (article: NewsArticle) => {
    setSelectedNews(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FULL PAGE VIEW FOR SELECTED JOB
  if (selectedJob) {
    return (
      <JobFullPageView
        job={selectedJob}
        onBack={() => {
          setSelectedJob(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectJob={(job) => {
          setSelectedJob(job);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isSaved={savedJobIds.includes(selectedJob.id)}
        onToggleSave={() => toggleSaveJob(selectedJob.id)}
        onShare={() => handleCopyLink(selectedJob.id)}
        isCopied={copiedId === selectedJob.id}
        allJobs={MOCK_JOBS}
      />
    );
  }

  // FULL PAGE VIEW FOR SELECTED NEWS ARTICLE
  if (selectedNews) {
    return (
      <NewsFullPageView
        article={selectedNews}
        onBack={() => {
          setSelectedNews(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectNews={(article) => {
          setSelectedNews(article);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isSaved={savedNewsIds.includes(selectedNews.id)}
        onToggleSave={() => toggleSaveNews(selectedNews.id)}
        onShare={() => handleCopyLink(selectedNews.id)}
        isCopied={copiedId === selectedNews.id}
        allNews={MOCK_NEWS}
      />
    );
  }

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-4 sm:space-y-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-7 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-2 sm:space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] sm:text-xs font-bold border border-white/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'दैनिक रोजगार व शासनादेश बुलेटिन' : 'Daily Outsource News & Vacancy Bulletin'}</span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-serif leading-tight">
            {language === 'hi' 
              ? 'आउटसोर्सिंग समाचार एवं रोजगार अलर्ट' 
              : 'Outsourcing News & Job Alerts'}
          </h1>

          <p className="text-xs sm:text-sm text-amber-50 leading-relaxed font-normal">
            {language === 'hi'
              ? 'उत्तर प्रदेश के 75 जिलों में सेवायोजन पोर्टल की आधिकारिक आउटसोर्स भर्तियां, न्यूनतम वेतन संशोधन, ईपीएफ/ईएसआई शासनादेश एवं विभागीय ताजा खबरें।'
              : 'Official verified vacancies on UP Sewayojan portal, salary notifications, EPF/ESIC circulars, and departmental updates across all 75 districts.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-black/20 font-semibold flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>42+ सक्रिय भर्तियां</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/20 font-semibold flex items-center gap-1">
              <Newspaper className="w-3.5 h-3.5" />
              <span>18+ नवीनतम शासनादेश</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/20 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>समस्त 75 जनपद</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'jobs'
                ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span>{language === 'hi' ? 'आउटसोर्सिंग भर्तियां (Job Vacancies)' : 'Job Vacancies'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {MOCK_JOBS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'news'
                ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4 text-orange-600" />
            <span>{language === 'hi' ? 'शासनादेश व समाचार (News & Blog)' : 'News & Blog'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
              {MOCK_NEWS.length}
            </span>
          </button>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'भर्ती / समाचार साझा करें' : 'Post Vacancy / News'}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={
                activeTab === 'jobs'
                  ? (language === 'hi' ? 'पद नाम, विभाग, योग्यता खोजें...' : 'Search role, dept, qualification...')
                  : (language === 'hi' ? 'शासनादेश, वेतन आदेश, खबर खोजें...' : 'Search circulars, wage orders, topics...')
              }
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* District Filter (For Jobs) */}
          {activeTab === 'jobs' && (
            <div className="sm:col-span-3">
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="ALL">{language === 'hi' ? 'समस्त 75 जिले (All Districts)' : 'All 75 Districts'}</option>
                {UP_DISTRICTS.slice(0, 30).map(d => (
                  <option key={d.id} value={d.nameHi}>
                    {language === 'hi' ? d.nameHi : d.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category Filter */}
          <div className={activeTab === 'jobs' ? 'sm:col-span-3' : 'sm:col-span-6'}>
            {activeTab === 'jobs' ? (
              <select
                value={selectedJobCategory}
                onChange={e => setSelectedJobCategory(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="ALL">{language === 'hi' ? 'सभी श्रेणियां (All Categories)' : 'All Categories'}</option>
                <option value="technical">{language === 'hi' ? 'कंप्यूटर व DEO ऑपरेटर' : 'Computer & DEO'}</option>
                <option value="administrative">{language === 'hi' ? 'प्रशासनिक व लिपिकीय' : 'Administrative & Clerical'}</option>
                <option value="healthcare">{language === 'hi' ? 'स्वास्थ्य व पैरामेडिकल' : 'Healthcare & Paramedical'}</option>
                <option value="field">{language === 'hi' ? 'तकनीकी व फील्ड स्टाफ' : 'Technical & Field'}</option>
              </select>
            ) : (
              <select
                value={selectedNewsCategory}
                onChange={e => setSelectedNewsCategory(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="ALL">{language === 'hi' ? 'सभी समाचार श्रेणियां' : 'All News Categories'}</option>
                <option value="salary_order">{language === 'hi' ? 'वेतन व ईपीएफ शासनादेश' : 'Salary & EPF Orders'}</option>
                <option value="policy_update">{language === 'hi' ? 'नीतिगत बदलाव व महंगाई भत्ता' : 'Policy & VDA Updates'}</option>
                <option value="agency_action">{language === 'hi' ? 'एजेंसियों पर कार्रवाई व ब्लैकलिस्ट' : 'Agency Blacklist & Action'}</option>
              </select>
            )}
          </div>

        </div>
      </div>

      {/* CONTENT LISTING: JOBS TAB */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          
          {/* Sewayojan Official Alert Box */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'महत्वपूर्ण चेतावनी (Advisory)' : 'Important Advisory'}:
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {language === 'hi'
                    ? 'आउटसोर्सिंग भर्तियों हेतु किसी भी बिचौलिए या अनधिकृत व्यक्ति को कोई शुल्क न दें। आवेदन केवल आधिकारिक सेवायोजन पोर्टल (sewayojan.up.nic.in) के माध्यम से निःशुल्क होते हैं।'
                    : 'Do not pay any unauthorized fee for outsourcing recruitment. All official applications are strictly processed via sewayojan.up.nic.in without bribe.'}
                </p>
              </div>
            </div>
            <a
              href="https://sewayojan.up.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold whitespace-nowrap shadow-2xs self-start sm:self-auto"
            >
              <span>{language === 'hi' ? 'सेवायोजन पोर्टल खोलें' : 'Open Sewayojan'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Job Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map(job => {
              const isSaved = savedJobIds.includes(job.id);

              return (
                <div 
                  key={job.id} 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          {job.totalPosts} {language === 'hi' ? 'पद (Posts)' : 'Posts'}
                        </span>
                        {job.isVerified && (
                          <span className="px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{language === 'hi' ? 'सत्यापित' : 'Verified'}</span>
                          </span>
                        )}
                        {job.isUrgent && (
                          <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300">
                            {language === 'hi' ? 'अंतिम तिथि निकट' : 'Closing Soon'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                            isSaved ? 'text-amber-600' : 'text-slate-400'
                          }`}
                          title="Save Job"
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleCopyLink(job.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          title="Copy Link"
                        >
                          {copiedId === job.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Job Title */}
                    <div>
                      <h3 
                        onClick={() => handleOpenJob(job)}
                        className="font-bold text-base text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        {language === 'hi' ? job.titleHi : job.title}
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{language === 'hi' ? job.departmentHi : job.department}</span>
                      </p>
                    </div>

                    {/* Meta Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-700/60 text-slate-600 dark:text-slate-300">
                      <div>
                        <span className="text-[10.5px] text-slate-400 block">{language === 'hi' ? 'मासिक मानदेय' : 'Salary'}:</span>
                        <span className="font-bold text-slate-900 dark:text-white text-xs">{job.salary}</span>
                      </div>
                      <div>
                        <span className="text-[10.5px] text-slate-400 block">{language === 'hi' ? 'अंतिम तिथि' : 'Deadline'}:</span>
                        <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{job.lastDate}</span>
                        </span>
                      </div>
                    </div>

                    {/* Qualification Snippet */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      <strong>{language === 'hi' ? 'योग्यता' : 'Eligibility'}:</strong> {language === 'hi' ? job.qualificationHi : job.qualification}
                    </p>

                    {/* Districts tags */}
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="text-[10.5px] text-slate-400 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" />
                      </span>
                      {job.districts.slice(0, 4).map((dist, idx) => (
                        <span key={idx} className="text-[10.5px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300">
                          {dist}
                        </span>
                      ))}
                      {job.districts.length > 4 && (
                        <span className="text-[10px] text-slate-400">+{job.districts.length - 4} {language === 'hi' ? 'अन्य जिले' : 'more'}</span>
                      )}
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-3.5 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenJob(job)}
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                    >
                      <span>{language === 'hi' ? 'पूरा विवरण देखें' : 'View Details'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={job.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <span>{language === 'hi' ? 'आवेदन करें' : 'Apply Link'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <div className="p-10 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-slate-800 dark:text-white">कोई भर्ती नहीं मिली</h4>
              <p className="text-xs text-slate-500 mt-1">कृपया फिल्टर या खोज शब्द बदलें।</p>
            </div>
          )}
        </div>
      )}

      {/* CONTENT LISTING: NEWS & BLOG TAB */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews.map(article => {
              const isSaved = savedNewsIds.includes(article.id);

              return (
                <article 
                  key={article.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-orange-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                        {article.category === 'salary_order' ? 'वेतन व ईपीएफ आदेश' : article.category === 'policy_update' ? 'नीतिगत संशोधन' : 'कार्रवाई / अपडेट'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleSaveNews(article.id)}
                          className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                            isSaved ? 'text-orange-600' : 'text-slate-400'
                          }`}
                          title="Bookmark"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-orange-600' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleCopyLink(article.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 
                      onClick={() => handleOpenNews(article)}
                      className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-orange-600 transition-colors"
                    >
                      {language === 'hi' ? article.titleHi : article.title}
                    </h3>

                    {/* Dept & Date */}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{language === 'hi' ? article.departmentHi : article.department}</span>
                      <span>•</span>
                      <span>{article.publishedDate}</span>
                    </p>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {language === 'hi' ? article.summaryHi : article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {article.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          #{tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Footer & Read More */}
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">{article.readTime} पठन</span>
                    <button
                      onClick={() => handleOpenNews(article)}
                      className="font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                    >
                      <span>पूरा पढ़ें</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT JOB OR NEWS TIP */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">भर्ती सूचना या समाचार साझा करें</h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('धन्यवाद! आपकी सूचना सत्यापन हेतु एडमिन को भेज दी गई है।');
              setIsSubmitModalOpen(false);
            }} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">प्रकार चुनें</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium">
                  <option value="job">नई आउटसोर्सिंग भर्ती विज्ञप्ति (Job Alert)</option>
                  <option value="news">नवीनतम शासनादेश / समाचार (Govt Order / News)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">शीर्षक / पद नाम</label>
                <input required type="text" placeholder="उदा. स्वास्थ्य विभाग में 50 डीईओ भर्ती" className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">संबंधित विभाग व जिला</label>
                <input required type="text" placeholder="उदा. बेसिक शिक्षा विभाग, कानपुर नगर" className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">विवरण / सेवायोजन लिंक</label>
                <textarea rows={3} placeholder="विज्ञप्ति का विवरण या शासनादेश की मुख्य बातें..." className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsSubmitModalOpen(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold">
                  रद्द करें
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs">
                  सबमिट करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
