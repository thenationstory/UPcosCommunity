import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UP_DISTRICTS, DISTRICT_ZONES } from '../../data/constants';
import { MapPin, Search, Users, MessageSquare, ArrowRight, Check } from 'lucide-react';

export const DistrictsView: React.FC = () => {
  const { 
    language, t, setSelectedDistrictId, 
    setCurrentView, currentUser 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');

  const filteredDistricts = UP_DISTRICTS.filter(d => {
    const matchSearch = 
      !searchTerm.trim() ||
      (d.name && d.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (d.nameHi && d.nameHi.includes(searchTerm.trim()));
    const matchZone = selectedZone === 'ALL' || d.zone === selectedZone;
    return matchSearch && matchZone;
  });

  const handleSelectDistrict = (districtId: string) => {
    setSelectedDistrictId(districtId);
    setCurrentView('feed');
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold">
          <MapPin className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'समस्त 75 जनपद कम्युनिटी' : 'All 75 District Communities'}</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
          {t.districtsCovered}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'hi'
            ? 'उत्तर प्रदेश के अपने जिले का चयन करें और स्थानीय आउटसोर्स कर्मचारियों से सीधा संपर्क बनाएं।'
            : 'Select your district to join local employee discussions, news, and official orders.'}
        </p>
      </div>

      {/* Search and Zone Filter */}
      <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5 sm:space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'जिले का नाम खोजें (उदा. लखनऊ, वाराणसी, गोरखपुर, आगरा)...' : 'Search district name...'}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3.5" />
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setSelectedZone('ALL')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedZone === 'ALL'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'hi' ? 'सभी अंचल (All)' : 'All Zones'}
          </button>
          {DISTRICT_ZONES.map(z => (
            <button
              key={z.id}
              onClick={() => setSelectedZone(z.id)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedZone === z.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {language === 'hi' ? z.nameHi : z.name}
            </button>
          ))}
        </div>
      </div>

      {/* 75 Districts Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3">
        {filteredDistricts.map(dist => {
          const isUserDistrict = currentUser?.district === dist.name;
          const members = Math.floor(180 + (dist.name.charCodeAt(0) * 12));

          return (
            <div
              key={dist.id}
              onClick={() => handleSelectDistrict(dist.id)}
              className={`p-2.5 sm:p-3.5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                isUserDistrict
                  ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:border-amber-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {dist.zone}
                  </span>
                  {isUserDistrict && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Your District" />
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  {language === 'hi' ? dist.nameHi : dist.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {dist.name}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  <span>{members}+</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
