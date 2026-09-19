import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Check, Plus, Shield, ArrowRight, MessageSquare } from 'lucide-react';

export const GroupsView: React.FC = () => {
  const { groups, toggleJoinGroup, language, t, setCurrentView } = useApp();

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold">
          <Users className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'विशेष कर्मचारी समूह' : 'Specialized Employee Groups'}</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
          {t.groups}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'hi'
            ? 'समान पद, विभाग अथवा जिले के कर्मचारियों के साथ विचार-विमर्श हेतु विशेष समूहों में शामिल हों।'
            : 'Join specialized interest groups based on your cadre, department, or district.'}
        </p>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {groups.map(group => (
          <div
            key={group.id}
            className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
                  {group.name[0]}
                </div>

                <button
                  onClick={() => toggleJoinGroup(group.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    group.isJoined
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-amber-600 text-white hover:bg-amber-700 shadow-xs'
                  }`}
                >
                  {group.isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'hi' ? 'जुड़े हैं' : 'Joined'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'समूह से जुड़ें' : 'Join Group'}</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif mb-1">
                {language === 'hi' && group.nameHi ? group.nameHi : group.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {group.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{(group.membersCount ?? 0).toLocaleString()} {language === 'hi' ? 'सक्रिय सदस्य' : 'members'}</span>
              </span>

              <button
                onClick={() => setCurrentView('feed')}
                className="text-amber-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>{language === 'hi' ? 'चर्चा देखें' : 'View Feed'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
