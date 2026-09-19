import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Users, FileText, MapPin, Building2, MessageSquare, ArrowRight } from 'lucide-react';
import { UP_DISTRICTS, UP_DEPARTMENTS } from '../../data/constants';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { 
    allUsers, posts, documents, 
    setCurrentView, setViewingUserId, 
    setSelectedDistrictId, language 
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedUsers = q ? allUsers.filter(u => 
    (u.name && u.name.toLowerCase().includes(q)) || 
    (u.designation && u.designation.toLowerCase().includes(q)) || 
    (u.district && u.district.toLowerCase().includes(q))
  ).slice(0, 4) : [];

  const matchedPosts = q ? posts.filter(p => 
    p.content && p.content.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedDocs = q ? documents.filter(d => 
    (d.title && d.title.toLowerCase().includes(q)) || 
    (d.description && d.description.toLowerCase().includes(q)) ||
    (d.titleHi && d.titleHi.toLowerCase().includes(q))
  ).slice(0, 3) : [];

  const matchedDistricts = q ? UP_DISTRICTS.filter(d => 
    (d.name && d.name.toLowerCase().includes(q)) || 
    (d.nameHi && d.nameHi.includes(query.trim()))
  ).slice(0, 4) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-2.5 sm:px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-3.5 sm:p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-3 sm:space-y-4 max-h-[88vh] flex flex-col">
        
        {/* Search Bar Input */}
        <div className="relative">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'कर्मचारी, जिला, शासनादेश, अथवा चर्चा खोजें...'
                : 'Search employees, districts, documents, or topics...'
            }
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 absolute right-3 top-3"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        {q ? (
          <div className="max-h-96 overflow-y-auto space-y-4 text-xs pr-1">
            
            {/* Districts Match */}
            {matchedDistricts.length > 0 && (
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>{language === 'hi' ? 'जिले' : 'Districts'}</span>
                </p>
                <div className="space-y-1">
                  {matchedDistricts.map(d => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setSelectedDistrictId(d.id);
                        setCurrentView('districts');
                        onClose();
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between font-medium text-slate-800 dark:text-slate-200"
                    >
                      <span>{language === 'hi' ? d.nameHi : d.name} ({d.zone})</span>
                      <ArrowRight className="w-3 h-3 text-amber-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Employees Match */}
            {matchedUsers.length > 0 && (
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-600" />
                  <span>{language === 'hi' ? 'कर्मचारी' : 'Employees'}</span>
                </p>
                <div className="space-y-1">
                  {matchedUsers.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setViewingUserId(u.id);
                        setCurrentView('profile');
                        onClose();
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img src={u.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-bold text-slate-900 dark:text-white">{u.name}</span>
                        <span className="text-slate-400 text-[11px]">({u.designation} • {u.district})</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-amber-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Match */}
            {matchedDocs.length > 0 && (
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-red-600" />
                  <span>{language === 'hi' ? 'शासनादेश व दस्तावेज' : 'Documents & Orders'}</span>
                </p>
                <div className="space-y-1">
                  {matchedDocs.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setCurrentView('documents');
                        onClose();
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span className="truncate font-medium text-slate-800 dark:text-slate-200">{doc.title}</span>
                      <ArrowRight className="w-3 h-3 text-amber-600 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Match */}
            {matchedPosts.length > 0 && (
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-blue-600" />
                  <span>{language === 'hi' ? 'चर्चाएं व पोस्ट्स' : 'Discussions'}</span>
                </p>
                <div className="space-y-1">
                  {matchedPosts.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setCurrentView('feed');
                        onClose();
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span className="truncate text-slate-700 dark:text-slate-300">{p.content}</span>
                      <ArrowRight className="w-3 h-3 text-amber-600 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchedDistricts.length === 0 && matchedUsers.length === 0 && matchedDocs.length === 0 && matchedPosts.length === 0 && (
              <p className="text-center text-slate-400 py-6">
                {language === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No matching items found.'}
              </p>
            )}

          </div>
        ) : (
          <div className="py-6 text-center text-slate-400 text-xs">
            {language === 'hi' ? 'खोजने हेतु कुछ अक्षर टाइप करें (उदा. लखनऊ, वेतन, ईपीएफ, ऑपरेटर)' : 'Type to search across employees, districts, documents...'}
          </div>
        )}

      </div>
    </div>
  );
};
