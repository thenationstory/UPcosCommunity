import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, X, ChevronRight, AlertCircle } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const { announcements, language, setCurrentView } = useApp();
  const [isDismissed, setIsDismissed] = useState(false);

  const pinned = announcements.find(a => a.isPinned);
  if (!pinned || isDismissed) return null;

  const title = language === 'hi' ? pinned.titleHi : pinned.title;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white shadow-xs border-b border-amber-800">
      <div className="w-full max-w-[1720px] mx-auto px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="flex-shrink-0 bg-white/20 p-1 rounded-full text-amber-100 animate-pulse">
            <Megaphone className="w-4 h-4" />
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-950/40 text-amber-200 border border-amber-400/30 flex-shrink-0">
            {language === 'hi' ? 'महत्वपूर्ण सूचना' : 'Urgent Notice'}
          </span>
          <p className="truncate font-medium text-amber-50">
            {title}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setCurrentView('news')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full transition-colors"
          >
            <span>{language === 'hi' ? 'विवरण पढ़ें' : 'Read Details'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
