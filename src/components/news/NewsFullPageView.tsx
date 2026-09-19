import React from 'react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../data/mockNewsAndJobs';
import { 
  FileText, Calendar, Building2, Download, 
  Bookmark, Share2, ArrowLeft, Check, 
  Printer, ChevronRight, ShieldCheck, Clock
} from 'lucide-react';

interface NewsFullPageViewProps {
  article: NewsArticle;
  onBack: () => void;
  onSelectNews: (article: NewsArticle) => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
  isCopied: boolean;
  allNews: NewsArticle[];
}

export const NewsFullPageView: React.FC<NewsFullPageViewProps> = ({
  article,
  onBack,
  onSelectNews,
  isSaved,
  onToggleSave,
  onShare,
  isCopied,
  allNews
}) => {
  const { language } = useApp();

  const relatedNews = allNews.filter(n => n.id !== article.id).slice(0, 3);

  const handleDownload = () => {
    alert(language === 'hi' 
      ? `शासनादेश डाउनलोड हो रहा है: ${article.documentName || article.titleHi}` 
      : `Downloading official document: ${article.documentName || article.title}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const getCategoryBadge = () => {
    switch (article.category) {
      case 'salary_order':
        return language === 'hi' ? 'वेतन व ईपीएफ शासनादेश' : 'Salary & EPF Order';
      case 'policy_update':
        return language === 'hi' ? 'नीतिगत संशोधन' : 'Policy Amendment';
      case 'court_ruling':
        return language === 'hi' ? 'उच्च न्यायालय निर्णय' : 'High Court Ruling';
      case 'agency_action':
        return language === 'hi' ? 'एजेंसी कार्रवाई व ब्लैकलिस्ट' : 'Agency Blacklist Action';
      default:
        return language === 'hi' ? 'विभागीय बुलेटिन' : 'Departmental News';
    }
  };

  return (
    <div id="news-full-page-view" className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6 space-y-5 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            onClick={onBack}
            id="news-back-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 font-bold transition-colors border border-amber-200 dark:border-amber-800/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'सभी समाचारों पर वापस जाएं' : 'Back to News'}</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px] sm:max-w-[400px]">
            {language === 'hi' ? article.titleHi : article.title}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSave}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              isSaved
                ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 text-orange-700 dark:text-orange-300'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-orange-600 text-orange-600' : ''}`} />
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

      {/* Main Full-Page Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 2 Columns: Full News & Order Body */}
        <div className="lg:col-span-2 space-y-5">
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-5">
            
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                {getCategoryBadge()}
              </span>

              {article.orderNumber && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {article.orderNumber}
                </span>
              )}

              <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-slate-900 dark:text-white leading-snug">
              {language === 'hi' ? article.titleHi : article.title}
            </h1>

            {/* Department & Author Info */}
            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-orange-600" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {language === 'hi' ? article.departmentHi : article.department}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{article.publishedDate}</span>
              </div>
              <span>•</span>
              <div>
                <span>{language === 'hi' ? 'स्रोत / संपादक:' : 'Source:'} {article.author}</span>
              </div>
            </div>

            {/* Summary Highlights Box */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border-l-4 border-amber-500 text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
              <p className="font-bold mb-1">{language === 'hi' ? 'संक्षिप्त सारांश (Key Summary):' : 'Key Summary:'}</p>
              <p>{language === 'hi' ? article.summaryHi : article.summary}</p>
            </div>

            {/* Main Content Body */}
            <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {language === 'hi' ? article.contentHi : article.content}
            </div>

            {/* Attached Government Order PDF Card */}
            {article.documentName && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center flex-shrink-0 font-bold">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {article.documentName}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {article.documentSize || 'PDF Document'} • {language === 'hi' ? 'उत्तर प्रदेश शासन अधिकृत प्रति' : 'Official UP Govt Document'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'hi' ? 'मूल आदेश डाउनलोड करें' : 'Download Order PDF'}</span>
                </button>
              </div>
            )}

            {/* Tags */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">{language === 'hi' ? 'संबंधित विषय:' : 'Tags:'}</span>
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

        </div>

        {/* Right 1 Column: Sidebar & Related Updates */}
        <div className="space-y-5">
          
          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'hi' ? 'शासनादेश सूचना' : 'Official Notice Info'}
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-400">{language === 'hi' ? 'शासनादेश संख्या' : 'Order No'}:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{article.orderNumber || 'विभागीय परिपत्र'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-400">{language === 'hi' ? 'विभाग' : 'Department'}:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-right max-w-[170px] truncate">
                  {language === 'hi' ? article.departmentHi : article.department}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-400">{language === 'hi' ? 'दिनांक' : 'Date'}:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{article.publishedDate}</span>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {language === 'hi' ? '← सभी समाचारों पर वापस जाएं' : '← Back to News'}
            </button>
          </div>

          {/* Legal / Non-Government Disclaimer */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-500 dark:text-slate-400 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{language === 'hi' ? 'प्रामाणिकता व सूचना' : 'Authenticity Note'}</span>
            </div>
            <p>
              {language === 'hi'
                ? 'यह सूचना उत्तर प्रदेश शासन एवं संबंधित विभागों द्वारा निर्गत सार्वजनिक परिपत्रों पर आधारित है। किसी भी विधिक संदर्भ हेतु मूल सरकारी राजपत्र को ही अंतिम प्रमाण माना जाए।'
                : 'This digest is collated from publicly published state government notifications. Official gazettes remain primary legal reference.'}
            </p>
          </div>

          {/* Related Articles */}
          {relatedNews.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'hi' ? 'अन्य महत्वपूर्ण समाचार' : 'Other Important Updates'}
              </h4>

              <div className="space-y-2.5">
                {relatedNews.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectNews(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-orange-50/70 dark:hover:bg-orange-950/30 border border-slate-200 dark:border-slate-700/70 transition-all cursor-pointer group"
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-300 line-clamp-2">
                      {language === 'hi' ? rel.titleHi : rel.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                      <span>{rel.publishedDate}</span>
                      <span className="flex items-center gap-0.5 text-orange-600 font-semibold group-hover:underline">
                        <span>{language === 'hi' ? 'पढ़ें' : 'Read'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </p>
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
