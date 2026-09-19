import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UP_DISTRICTS, UP_DEPARTMENTS, DISCUSSION_TOPICS } from '../../data/constants';
import { Check, Sparkles, ArrowRight, ArrowLeft, Camera, Users, Building2, MapPin } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { 
    isOnboardingOpen, setIsOnboardingOpen, 
    currentUser, updateCurrentUserProfile, 
    groups, toggleJoinGroup,
    language 
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  );
  const [district, setDistrict] = useState<string>(currentUser?.district || 'Lucknow');
  const [department, setDepartment] = useState<string>(currentUser?.department || UP_DEPARTMENTS[0].name);
  const [designation, setDesignation] = useState<string>(currentUser?.designation || 'Computer Operator');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Salary Regularity', 'EPF Grievances'
  ]);

  if (!isOnboardingOpen || !currentUser) return null;

  const AVATAR_OPTIONS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  ];

  const handleToggleInterest = (topicName: string) => {
    setSelectedInterests(prev => 
      prev.includes(topicName) ? prev.filter(t => t !== topicName) : [...prev, topicName]
    );
  };

  const handleFinish = () => {
    updateCurrentUserProfile({
      avatar: selectedPhoto,
      district,
      department,
      designation,
      interests: selectedInterests
    });
    setIsOnboardingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">
            <span>{language === 'hi' ? `चरण ${step} / 6` : `Step ${step} of 6`}</span>
            <span>{Math.round((step / 6) * 100)}% {language === 'hi' ? 'पूर्ण' : 'Completed'}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-600 to-orange-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Add Profile Photo */}
        {step === 1 && (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
              {language === 'hi' ? 'अपनी प्रोफाइल फोटो चुनें' : 'Choose Your Profile Avatar'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi' ? 'एक स्पष्ट फोटो चुनें जिससे सहकर्मी आपको पहचान सकें।' : 'Select an avatar to represent you across the community.'}
            </p>
            
            <div className="flex items-center justify-center my-4">
              <div className="relative">
                <img
                  src={selectedPhoto}
                  alt="Selected Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-500 shadow-md"
                />
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-amber-600 text-white shadow-sm">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 justify-center max-w-xs mx-auto">
              {AVATAR_OPTIONS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhoto(url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-transform hover:scale-105 ${
                    selectedPhoto === url ? 'border-amber-600 ring-2 ring-amber-500' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="Preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select District */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'अपना कार्यक्षेत्र जिला चुनें' : 'Select Your Posting District'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'इससे आप अपने जिले के कर्मचारियों के समूह में स्वतः जुड़ जाएंगे।' : 'Connects you automatically to your local district updates.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'जिला (75 जिलों में से)' : 'District (75 Districts)'}
              </label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              >
                {UP_DISTRICTS.map(d => (
                  <option key={d.id} value={d.name}>
                    {language === 'hi' ? d.nameHi : d.name} ({d.zone})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Select Department */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'अपना सरकारी विभाग चुनें' : 'Select Your Department'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'विभागीय आदेश, वेतन नियम एवं सेवा शर्तों के आदान-प्रदान हेतु।' : 'To share department-specific circulars and leave norms.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'विभाग' : 'Department'}
              </label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm"
              >
                {UP_DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.name}>
                    {language === 'hi' ? d.nameHi : d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Add Designation */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'अपना पदनाम दर्ज करें' : 'Enter Your Designation'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'यह पद आपके डिजिटल आईडी कार्ड और प्रोफाइल पर अंकित होगा।' : 'This will appear on your community profile and digital ID card.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'पदनाम (Designation)' : 'Designation'}
              </label>
              <input
                type="text"
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                placeholder="e.g. Data Entry Operator / Computer Operator / Staff Nurse"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>
          </div>
        )}

        {/* Step 5: Select Interests */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'अपनी रुचि के विषय चुनें' : 'Select Topics of Interest'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'हम आपकी फीड में इन्हीं विषयों से संबंधित चर्चाएं प्राथमिकता से दिखाएंगे।' : 'Your feed will be customized with updates on these topics.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {DISCUSSION_TOPICS.map((topic) => {
                const isSelected = Boolean(selectedInterests && selectedInterests.includes(topic.name));
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleToggleInterest(topic.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {language === 'hi' ? topic.nameHi : topic.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 6: Suggested Communities & Finish */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto mb-2 text-2xl">
                🎉
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'आपकी कम्युनिटी तैयार है! 🎉' : 'Your Community is Ready! 🎉'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' 
                  ? 'नीचे दिए गए सुझावों में से अपने पसंदीदा समूहों से जुड़ें और शुरुआत करें।' 
                  : 'Join recommended groups to connect with department and district colleagues.'}
              </p>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {groups.slice(0, 3).map((g) => (
                <div
                  key={g.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {language === 'hi' && g.nameHi ? g.nameHi : g.name}
                    </p>
                    <p className="text-slate-500 text-[11px] truncate">
                      {g.membersCount} {language === 'hi' ? 'सदस्य' : 'members'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleJoinGroup(g.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold flex-shrink-0 text-xs transition-colors ${
                      g.isJoined
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {g.isJoined ? (language === 'hi' ? 'जुड़े हैं' : 'Joined') : (language === 'hi' ? 'जुड़ें' : 'Join')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(prev => (prev - 1) as any)}
              className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(prev => (prev + 1) as any)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              <span>{language === 'hi' ? 'अगला कदम' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'hi' ? 'कम्युनिटी शुरू करें!' : 'Enter Community!'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
