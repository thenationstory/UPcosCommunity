import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UP_DISTRICTS, UP_DEPARTMENTS, EMPLOYEE_CATEGORIES } from '../../data/constants';
import { UserProfile } from '../../types';
import { X, Shield, ArrowRight, ArrowLeft, Check, Lock, Sparkles, User } from 'lucide-react';

export const RegisterModal: React.FC = () => {
  const { 
    authModalType, setAuthModalType, 
    setCurrentUser, setIsOnboardingOpen, 
    language, t, setCurrentView 
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');

  // Professional Fields
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState(UP_DEPARTMENTS[0].name);
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [district, setDistrict] = useState(UP_DISTRICTS[0].name);
  const [blockTehsil, setBlockTehsil] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [joiningDate, setJoiningDate] = useState('2023-01-01');
  const [outsourcingAgency, setOutsourcingAgency] = useState('');
  const [category, setCategory] = useState(EMPLOYEE_CATEGORIES[0].id);

  if (authModalType !== 'register') return null;

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: fullName || 'New Outsource Member',
      email: email || `user.${Date.now()}@uposn.in`,
      phone: mobile,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
      role: 'member',
      verificationStatus: 'unverified',
      employeeId: employeeId || `UP-OS-${Math.floor(1000 + Math.random() * 9000)}`,
      department,
      organization: organization || 'Government Office',
      designation: designation || 'Computer Operator / Staff',
      district,
      blockTehsil,
      workLocation,
      joiningDate,
      outsourcingAgency: outsourcingAgency || 'Registered Vendor Agency',
      employeeCategory: category,
      bio: 'उत्तर प्रदेश आउटसोर्स सेवा निगम का नया सदस्य।',
      skills: ['Office Administration', 'Communication'],
      interests: ['Salary Regularity', 'EPF Grievance'],
      privacy: {
        profileVisibility: 'public',
        showPhone: false,
        showEmail: false,
        showEmployeeId: true,
        showJoiningDate: true,
      },
      followersCount: 1,
      followingCount: 3,
      createdAt: '2026-09-07'
    };

    setCurrentUser(newUser);
    setAuthModalType(null);
    setIsOnboardingOpen(true);
    setCurrentView('feed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-4 sm:p-6 my-3 sm:my-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalType(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
              {language === 'hi' ? 'कम्युनिटी सदस्यता पंजीकरण' : 'Register for UPOSN'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'hi' 
              ? 'केवल उत्तर प्रदेश के सरकारी विभागों एवं कार्यालयों के आउटसोर्स कर्मचारियों के लिए।' 
              : 'Dedicated exclusively to outsourcing employees working in UP government departments.'}
          </p>

          {/* Stepper indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-amber-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-amber-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
          </div>
          <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-1">
            {step === 1 
              ? (language === 'hi' ? 'चरण 1: व्यक्तिगत जानकारी' : 'Step 1: Personal Details')
              : (language === 'hi' ? 'चरण 2: विभागीय व व्यावसायिक जानकारी' : 'Step 2: Professional & Posting Details')}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'पूरा नाम (Full Name) *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Chandra / रश्मि सिंह"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'मोबाइल नंबर (Mobile) *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'ईमेल (Email) *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'पासवर्ड (Password) *' : 'Create Password *'}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="न्यूनतम 6 अक्षर / Minimum 6 characters"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'लिंग (Gender)' : 'Gender'}
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="Male">पुरुष (Male)</option>
                  <option value="Female">महिला (Female)</option>
                  <option value="Other">अन्य (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'जन्म तिथि (ऐच्छिक)' : 'Date of Birth (Optional)'}
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
              🔒 <strong>{language === 'hi' ? 'गोपनीयता गारंटी:' : 'Privacy Protection:'}</strong>{' '}
              {language === 'hi' 
                ? 'आपका फोन नंबर और जन्मतिथि डिफ़ॉल्ट रूप से किसी को नहीं दिखाई जाएगी।' 
                : 'Your phone number and private records are never made public by default.'}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setAuthModalType('login')}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                {language === 'hi' ? 'पहले से खाता है? लॉगिन करें' : 'Already registered? Login'}
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>{language === 'hi' ? 'आगे बढ़ें (Next Step)' : 'Continue to Step 2'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCompleteRegistration} className="space-y-3.5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* District - All 75 districts */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'कार्यरत जिला (75 जिलों में से) *' : 'Working District (75 UP Districts) *'}
                </label>
                <select
                  required
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  {UP_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name}>
                      {language === 'hi' ? d.nameHi : d.name} ({d.zone})
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'विभागीय श्रेणी *' : 'Department Category *'}
                </label>
                <select
                  required
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  {UP_DEPARTMENTS.map(dep => (
                    <option key={dep.id} value={dep.name}>
                      {language === 'hi' ? dep.nameHi : dep.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'पदनाम (Designation) *' : 'Designation *'}
                </label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  placeholder="e.g. Data Entry Operator / Staff Nurse"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'कर्मचारी श्रेणी (Category)' : 'Employee Category'}
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  {EMPLOYEE_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>
                      {language === 'hi' ? c.nameHi : c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'कार्यालय / संस्थान (Office / Organization) *' : 'Office / Organization *'}
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  placeholder="e.g. CMO Office / Nagar Nigam / BSA Office"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'आउटसोर्सिंग सेवा प्रदाता (Agency Name) *' : 'Outsourcing Agency Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={outsourcingAgency}
                  onChange={e => setOutsourcingAgency(e.target.value)}
                  placeholder="e.g. UPLC / Avani / Carepro / Orion"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'ब्लॉक / तहसील (Block / Tehsil)' : 'Block / Tehsil'}
                </label>
                <input
                  type="text"
                  value={blockTehsil}
                  onChange={e => setBlockTehsil(e.target.value)}
                  placeholder="e.g. Sadar / Kalyanpur / Mohanlalganj"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'आउटसोर्सिंग ID (यदि उपलब्ध हो)' : 'Outsource / Employee ID (Optional)'}
                </label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={e => setEmployeeId(e.target.value)}
                  placeholder="e.g. UP-HLT-2024"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पीछे जाएं' : 'Back'}</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === 'hi' ? 'पंजीकरण पूरा करें' : 'Complete Registration'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
