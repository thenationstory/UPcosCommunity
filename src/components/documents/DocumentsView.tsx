import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, Download, Search, Filter, 
  Calendar, Building2, CheckCircle2, ArrowDownToLine 
} from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { documents, language, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredDocs = documents.filter(doc => {
    const q = searchTerm.trim().toLowerCase();
    const matchSearch = 
      !q ||
      (doc.title && doc.title.toLowerCase().includes(q)) ||
      (doc.titleHi && doc.titleHi.toLowerCase().includes(q)) ||
      (doc.description && doc.description.toLowerCase().includes(q)) ||
      (doc.department && doc.department.toLowerCase().includes(q));

    if (!matchSearch) return false;

    if (categoryFilter === 'ALL') return true;
    if (categoryFilter === 'order') return doc.category === 'government_order';
    if (categoryFilter === 'circular') return doc.category === 'circular';
    if (categoryFilter === 'format') return doc.category === 'form' || doc.category === 'rule_guideline';
    return doc.category === categoryFilter;
  });

  const handleDownload = (docName: string) => {
    alert(language === 'hi' ? `डाउनलोड प्रारंभ: ${docName}` : `Starting download for: ${docName}`);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'government_order':
        return language === 'hi' ? 'शासनादेश' : 'Govt Order';
      case 'circular':
        return language === 'hi' ? 'परिपत्र' : 'Circular';
      case 'form':
        return language === 'hi' ? 'आवेदन प्रारूप' : 'Format / Form';
      case 'rule_guideline':
        return language === 'hi' ? 'न्यायालय आदेश / नियम' : 'Court Order / Rule';
      default:
        return language === 'hi' ? 'दस्तावेज' : 'Resource';
    }
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'शासनादेश एवं संसाधन केंद्र' : 'Govt Orders & Documents Hub'}</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
          {t.documents}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'hi'
            ? 'उत्तर प्रदेश शासन के महत्वपूर्ण आदेश, न्यूनतम मजदूरी अधिसूचना, ईपीएफ गाइड व आवेदन प्रारूप डाउनलोड करें।'
            : 'Download official UP Government orders, minimum wage notifications, EPF passbook guides and grievance formats.'}
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5 sm:space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'शासनादेश संख्या अथवा शीर्षक खोजें...' : 'Search documents by title or department...'}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3.5" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              categoryFilter === 'ALL'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'hi' ? 'सभी दस्तावेज' : 'All Documents'}
          </button>
          <button
            onClick={() => setCategoryFilter('order')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              categoryFilter === 'order'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'hi' ? 'शासनादेश (Govt Orders)' : 'Government Orders'}
          </button>
          <button
            onClick={() => setCategoryFilter('circular')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              categoryFilter === 'circular'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'hi' ? 'विभागीय परिपत्र (Circulars)' : 'Circulars'}
          </button>
          <button
            onClick={() => setCategoryFilter('format')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              categoryFilter === 'format'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'hi' ? 'आवेदन प्रारूप व नियम (Templates)' : 'Templates & Rules'}
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 flex items-center justify-center font-bold flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                  {getCategoryLabel(doc.category)}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif mb-1 leading-snug">
                {language === 'hi' && doc.titleHi ? doc.titleHi : doc.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {doc.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>{doc.department || (language === 'hi' ? 'उत्तर प्रदेश शासन' : 'UP Government')}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{doc.createdAt || '2026'}</span>
                </span>
                <span>•</span>
                <span className="font-mono">{doc.fileSize || 'PDF'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {(doc.downloadsCount ?? 0).toLocaleString()} {language === 'hi' ? 'डाउनलोड्स' : 'downloads'}
              </span>

              <button
                onClick={() => handleDownload(language === 'hi' && doc.titleHi ? doc.titleHi : doc.title)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'PDF डाउनलोड' : 'Download PDF'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
