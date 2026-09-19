import React from 'react';
import { useApp } from '../../context/AppContext';
import { UP_DEPARTMENTS } from '../../data/constants';
import { Building2, Users, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export const DepartmentsView: React.FC = () => {
  const { language, t, currentUser, setCurrentView } = useApp();

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold">
          <Building2 className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'विभागीय समुदाय मंच' : 'Departmental Communities'}</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
          {t.departmentsActive}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'hi'
            ? 'स्वास्थ्य, बेसिक शिक्षा, नगर निगम, परिवहन आदि सरकारी विभागों में कार्यरत सहकर्मियों से विभागीय नियमावली व आदेश साझा करें।'
            : 'Connect with peers across Medical Health, Basic Shiksha, Nagar Nigam, Transport and other major UP departments.'}
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {UP_DEPARTMENTS.map((dept, index) => {
          const isUserDept = currentUser?.department === dept.name;
          const memberEstimate = 850 + index * 120;

          return (
            <div
              key={dept.id}
              className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between ${
                isUserDept
                  ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5 text-amber-600" />
                  </div>
                  {isUserDept && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {language === 'hi' ? 'आपका विभाग' : 'Your Dept'}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif mb-1">
                  {language === 'hi' ? dept.nameHi : dept.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {dept.name}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {language === 'hi'
                    ? 'कंप्यूटर ऑपरेटर, संविदा स्टाफ, तकनीकी कर्मी व सहायक कर्मचारियों का संयुक्त समूह।'
                    : 'Group for computer operators, contractual healthcare/admin staff and assistants.'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>{memberEstimate}+ {language === 'hi' ? 'सदस्य' : 'members'}</span>
                </span>

                <button
                  onClick={() => setCurrentView('feed')}
                  className="text-amber-600 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>{language === 'hi' ? 'चर्चाएं देखें' : 'View Feed'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
