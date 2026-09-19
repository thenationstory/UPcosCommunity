import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCard } from '../feed/PostCard';
import { UP_DISTRICTS, UP_DEPARTMENTS } from '../../data/constants';
import { 
  User, MapPin, Building2, Briefcase, Calendar, 
  ShieldCheck, CreditCard, Edit3, Settings, 
  MessageSquare, Bookmark, FileText, CheckCircle2, Lock, Eye, EyeOff, Save, X
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, allUsers, viewingUserId, 
    posts, savedItemIds, language, t,
    updateCurrentUserProfile, setCurrentView,
    setViewingUserId 
  } = useApp();

  const isOwnProfile = !viewingUserId || viewingUserId === currentUser?.id;
  const user = (viewingUserId ? allUsers.find(u => u.id === viewingUserId) : currentUser) || currentUser || allUsers[0];

  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'documents' | 'settings'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit Form States
  const [editName, setEditName] = useState(user.name);
  const [editDesignation, setEditDesignation] = useState(user.designation);
  const [editDepartment, setEditDepartment] = useState(user.department);
  const [editDistrict, setEditDistrict] = useState(user.district);
  const [editBio, setEditBio] = useState(user.bio || '');
  const [editPhone, setEditPhone] = useState(user.phone || '');
  const [editAgency, setEditAgency] = useState(user.outsourcingAgency || '');
  
  // Privacy States
  const [showPhone, setShowPhone] = useState(user.privacy?.showPhone ?? false);
  const [showEmail, setShowEmail] = useState(user.privacy?.showEmail ?? false);

  const userPosts = posts.filter(p => p.authorId === user.id);
  const savedPosts = posts.filter(p => (savedItemIds || []).includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name: editName,
      designation: editDesignation,
      department: editDepartment,
      district: editDistrict,
      bio: editBio,
      phone: editPhone,
      outsourcingAgency: editAgency,
      privacy: {
        ...user.privacy,
        showPhone,
        showEmail
      }
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Profile Header & Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        
        {/* Cover Gradient Banner */}
        <div className="h-28 sm:h-44 bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 relative">
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2">
            {isOwnProfile && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/30 shadow-xs transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'संपादित करें' : 'Edit Profile'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 sm:pt-2 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 -mt-12 sm:-mt-18 mb-3 sm:mb-4">
            
            {/* Avatar */}
            <div className="relative inline-block">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl bg-white"
              />
              {user.verificationStatus === 'verified' && (
                <span className="absolute bottom-1 right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm" title="Verified Employee">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-600 text-white" />
                </span>
              )}
            </div>

            {/* Actions for other profiles or ID Card */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  setViewingUserId(user.id);
                  setCurrentView('idcard');
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>{t.idCard}</span>
              </button>
            </div>
          </div>

          {/* User Details */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-serif">
                {user.name}
              </h1>
              {user.verificationStatus === 'verified' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                  {language === 'hi' ? 'सत्यापित कर्मचारी' : 'Verified Employee'}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                  {language === 'hi' ? 'सत्यापन प्रक्रियाधीन' : 'Pending Verification'}
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
              {user.designation} • {user.organization || user.department}
            </p>

            {user.bio && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mb-4 leading-relaxed">
                {user.bio}
              </p>
            )}

            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{user.district}, उत्तर प्रदेश</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{user.department}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>एजेंसी: {user.outsourcingAgency || 'पंजीकृत एजेंसी'}</span>
              </div>
              {user.joiningDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>शामिल होने की तिथि: {user.joiningDate}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'posts'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{language === 'hi' ? `पोस्ट्स (${userPosts.length})` : `Posts (${userPosts.length})`}</span>
        </button>

        {isOwnProfile && (
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{language === 'hi' ? `सहेजी गई पोस्ट्स (${savedPosts.length})` : `Saved (${savedPosts.length})`}</span>
          </button>
        )}

        {isOwnProfile && (
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{language === 'hi' ? 'गोपनीयता सेटिंग्स' : 'Privacy Settings'}</span>
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
              {language === 'hi' ? 'इस कर्मचारी द्वारा अभी तक कोई पोस्ट साझा नहीं की गई है।' : 'No posts shared yet.'}
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedPosts.length > 0 ? (
            savedPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
              {language === 'hi' ? 'आपने अभी तक कोई पोस्ट सहेज कर नहीं रखी है।' : 'No saved posts yet.'}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && isOwnProfile && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4 max-w-xl">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif">
            {language === 'hi' ? 'गोपनीयता एवं सुरक्षा नियंत्रण (Privacy Controls)' : 'Privacy & Security Controls'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'hi'
              ? 'आप नियंत्रित कर सकते हैं कि अन्य कर्मचारी आपकी कौन-सी जानकारी देख सकते हैं। फोन नंबर और व्यक्तिगत विवरण डिफ़ॉल्ट रूप से सुरक्षित रहते हैं।'
              : 'Control what information is visible to other community members. Sensitive details are protected.'}
          </p>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {language === 'hi' ? 'मोबाइल नंबर सार्वजनिक रूप से दिखाएं' : 'Show Mobile Number on Profile'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {showPhone ? (language === 'hi' ? 'सभी को दिखाई देगा' : 'Visible to all') : (language === 'hi' ? 'सुरक्षित (केवल आपको दिखाई देगा)' : 'Hidden (Private)')}
                </span>
              </div>
              <input
                type="checkbox"
                checked={showPhone}
                onChange={e => setShowPhone(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {language === 'hi' ? 'ईमेल पता सार्वजनिक रूप से दिखाएं' : 'Show Email on Profile'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {showEmail ? (language === 'hi' ? 'सभी को दिखाई देगा' : 'Visible to all') : (language === 'hi' ? 'सुरक्षित (केवल आपको दिखाई देगा)' : 'Hidden (Private)')}
                </span>
              </div>
              <input
                type="checkbox"
                checked={showEmail}
                onChange={e => setShowEmail(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300"
              />
            </label>
          </div>

          <button
            onClick={() => {
              updateCurrentUserProfile({
                privacy: {
                  ...user.privacy,
                  showPhone,
                  showEmail
                }
              });
              alert(language === 'hi' ? 'गोपनीयता सेटिंग्स सहेज ली गईं!' : 'Privacy settings saved!');
            }}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
          >
            {language === 'hi' ? 'सेटिंग्स सहेजें' : 'Save Privacy Preferences'}
          </button>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'प्रोफाइल संपादित करें' : 'Edit Profile'}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'पदनाम (Designation)' : 'Designation'}
                </label>
                <input
                  type="text"
                  required
                  value={editDesignation}
                  onChange={e => setEditDesignation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'जिला' : 'District'}
                  </label>
                  <select
                    value={editDistrict}
                    onChange={e => setEditDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {UP_DISTRICTS.map(d => (
                      <option key={d.id} value={d.name}>{language === 'hi' ? d.nameHi : d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'विभाग' : 'Department'}
                  </label>
                  <select
                    value={editDepartment}
                    onChange={e => setEditDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white truncate"
                  >
                    {UP_DEPARTMENTS.map(dep => (
                      <option key={dep.id} value={dep.name}>{language === 'hi' ? dep.nameHi : dep.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'आउटसोर्सिंग एजेंसी' : 'Outsourcing Agency'}
                </label>
                <input
                  type="text"
                  value={editAgency}
                  onChange={e => setEditAgency(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'बायो / परिचय' : 'Bio'}
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 font-semibold"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  {language === 'hi' ? 'सहेजें' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
