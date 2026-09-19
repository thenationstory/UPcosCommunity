import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UP_DISTRICTS, UP_DEPARTMENTS } from '../../data/constants';
import { 
  Users, Search, Filter, CheckCircle2, 
  MapPin, Building2, CreditCard, ArrowRight, ShieldCheck 
} from 'lucide-react';

export const DirectoryView: React.FC = () => {
  const { 
    allUsers, language, t, 
    setCurrentView, setViewingUserId 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter employees
  const filteredUsers = allUsers.filter(user => {
    // Search query
    const query = searchTerm.toLowerCase();
    const matchSearch = 
      !query ||
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.designation && user.designation.toLowerCase().includes(query)) ||
      (user.employeeId && user.employeeId.toLowerCase().includes(query)) ||
      (user.outsourcingAgency && user.outsourcingAgency.toLowerCase().includes(query));

    // District filter
    const matchDistrict = districtFilter === 'ALL' || user.district === districtFilter;

    // Department filter
    const matchDepartment = departmentFilter === 'ALL' || user.department === departmentFilter;

    // Verified filter
    const matchVerified = !verifiedOnly || user.verificationStatus === 'verified';

    return matchSearch && matchDistrict && matchDepartment && matchVerified;
  });

  const handleUserClick = (userId: string) => {
    setViewingUserId(userId);
    setCurrentView('profile');
  };

  const handleIdCardClick = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewingUserId(userId);
    setCurrentView('idcard');
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold">
          <Users className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'राज्यव्यापी कर्मचारी डायरेक्टरी' : 'Statewide Employee Directory'}</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
          {t.directory}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'hi'
            ? 'उत्तर प्रदेश के सभी 75 जिलों एवं सरकारी विभागों में कार्यरत आउटसोर्स सहकर्मियों को खोजें व उनसे जुड़ें।'
            : 'Search and connect with outsourced colleagues across all 75 districts and government departments.'}
        </p>

        {/* Directory Sub-navigation: Districts shifted under Employee Directory */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <button
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? 'समस्त कर्मचारी सूची' : 'All Staff Directory'}</span>
            </button>
            <button
              id="nav-link-districts"
              onClick={() => setCurrentView('districts')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>{language === 'hi' ? '75 जिलेवार डायरेक्टरी' : '75 Districts Directory'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                75
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={
              language === 'hi' 
                ? 'नाम, पदनाम, आउटसोर्स आईडी अथवा एजेंसी के नाम से खोजें...' 
                : 'Search by employee name, designation, employee ID, or agency...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* District Filter (75 Districts) */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              {language === 'hi' ? 'जिला चुनें (75 जिले)' : 'Filter by District (75 UP Districts)'}
            </label>
            <select
              value={districtFilter}
              onChange={e => setDistrictFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
            >
              <option value="ALL">{language === 'hi' ? 'समस्त 75 जिले (All Districts)' : 'All 75 Districts'}</option>
              {UP_DISTRICTS.map(d => (
                <option key={d.id} value={d.name}>{language === 'hi' ? d.nameHi : d.name} ({d.zone})</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              {language === 'hi' ? 'विभाग चुनें' : 'Filter by Department'}
            </label>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
            >
              <option value="ALL">{language === 'hi' ? 'सभी विभाग (All Departments)' : 'All Departments'}</option>
              {UP_DEPARTMENTS.map(dep => (
                <option key={dep.id} value={dep.name}>{language === 'hi' ? dep.nameHi : dep.name}</option>
              ))}
            </select>
          </div>

          {/* Verified Toggle */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 w-full cursor-pointer h-[38px]">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={e => setVerifiedOnly(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'hi' ? 'केवल सत्यापित सदस्य' : 'Verified Only'}</span>
              </span>
            </label>
          </div>

        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          {language === 'hi' ? `कुल ${filteredUsers.length} कर्मचारी पाए गए` : `Showing ${filteredUsers.length} employees`}
        </span>
        {(districtFilter !== 'ALL' || departmentFilter !== 'ALL' || verifiedOnly || searchTerm) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setDistrictFilter('ALL');
              setDepartmentFilter('ALL');
              setVerifiedOnly(false);
            }}
            className="text-amber-600 hover:underline font-semibold"
          >
            {language === 'hi' ? 'फ़िल्टर हटाएं (Reset)' : 'Reset Filters'}
          </button>
        )}
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.id)}
            className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4.5 border border-slate-200 dark:border-slate-700/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Card Top: Avatar + Verification + District Pill */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40 group-hover:border-amber-600 transition-colors"
                  />
                  {user.verificationStatus === 'verified' && (
                    <span className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-800 rounded-full p-0.5" title="Verified">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/40 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{user.district}</span>
                  </span>
                  {user.employeeId && (
                    <span className="text-[10px] font-mono text-slate-400">
                      {user.employeeId}
                    </span>
                  )}
                </div>
              </div>

              {/* Name & Designation */}
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors truncate">
                {user.name}
              </h3>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 truncate mb-1">
                {user.designation}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                {user.department}
              </p>

              {user.outsourcingAgency && (
                <div className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-700/40 rounded-lg p-1.5 truncate">
                  🏢 {user.outsourcingAgency}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs">
              <button
                onClick={(e) => handleIdCardClick(user.id, e)}
                className="text-slate-600 dark:text-slate-300 hover:text-amber-600 font-semibold flex items-center gap-1"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'hi' ? 'डिजिटल ID' : 'View ID'}</span>
              </button>

              <span className="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{language === 'hi' ? 'प्रोफाइल' : 'Profile'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
