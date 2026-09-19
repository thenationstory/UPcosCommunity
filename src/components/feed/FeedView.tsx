import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCard } from './PostCard';
import { 
  Sparkles, Image, FileText, BarChart2, Plus, 
  MapPin, Building2, CreditCard, Bookmark, Users, 
  ShieldCheck, ArrowRight, Flame, HelpCircle, UserCheck, AlertCircle,
  User, LogIn
} from 'lucide-react';

export const FeedView: React.FC = () => {
  const { 
    currentUser, posts, language, t, 
    setIsCreatePostOpen, setCurrentView, 
    allUsers, setSelectedDistrictId, setAuthModalType,
    setViewingUserId 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'district' | 'department' | 'official' | 'trending'>('all');

  // Filter posts based on activeTab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'district') {
      return post.districtTag === (currentUser?.district || 'Lucknow') || post.authorDistrict === (currentUser?.district || 'Lucknow');
    }
    if (activeTab === 'department') {
      return post.departmentTag === (currentUser?.department || 'Medical, Health & Family Welfare') || post.authorDepartment === (currentUser?.department || 'Medical, Health & Family Welfare');
    }
    if (activeTab === 'official') {
      return post.isOfficial || post.category === 'official_order';
    }
    if (activeTab === 'trending') {
      const reactionsCount = (post.reactions.like || 0) + (post.reactions.helpful || 0) + (post.reactions.support || 0);
      return reactionsCount > 20 || post.commentsCount > 10;
    }
    return true;
  });

  const handleOpenCreatePost = () => {
    if (!currentUser) {
      setAuthModalType('login');
    } else {
      setIsCreatePostOpen(true);
    }
  };

  const otherUsers = allUsers.filter(u => u.id !== currentUser?.id).slice(0, 4);

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-2.5 sm:py-4">
      
      {/* Personalized Welcome Header for Logged-in Employee */}
      {currentUser && (
        <div className="mb-3 sm:mb-5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/60 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-500"
              />
              {currentUser.verificationStatus === 'verified' && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              )}
            </div>
            <div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white font-serif leading-tight">
                {language === 'hi' ? `नमस्ते, ${currentUser.name} 👋` : `Hello, ${currentUser.name} 👋`}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {currentUser.designation} • {currentUser.district} ({currentUser.department})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setCurrentView('idcard')}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'मेरा डिजिटल ID' : 'My Digital ID'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid Layout: Left Sidebar + Center Feed + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-start">
        
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-3.5 sticky top-20">
          
          {/* User Mini Profile Card */}
          {currentUser ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-center pb-3 border-b border-slate-100 dark:border-slate-700">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-amber-500 shadow-xs"
                />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.designation}
                </p>

                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                  <MapPin className="w-3 h-3" />
                  <span>{currentUser.district}</span>
                </div>
              </div>

              <div className="pt-3 space-y-2 text-xs font-medium">
                <button
                  onClick={() => setCurrentView('profile')}
                  className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                >
                  <span>{language === 'hi' ? 'मेरी प्रोफाइल देखें' : 'View My Profile'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => setCurrentView('idcard')}
                  className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.idCard}</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold">QR</span>
                </button>

                <button
                  onClick={() => setCurrentView('districts')}
                  className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.myDistrict}</span>
                  </span>
                </button>

                <button
                  onClick={() => setCurrentView('documents')}
                  className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.documents}</span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif mb-1">
                {language === 'hi' ? 'कम्युनिटी से जुड़ें' : 'Join the Community'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {language === 'hi' ? 'अपने जिले के सहकर्मियों से जुड़े रहने हेतु आज ही पंजीकरण करें।' : 'Register to unlock discussions, questions, and Digital ID.'}
              </p>
              <button
                onClick={() => setAuthModalType('register')}
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
              >
                {t.register}
              </button>
            </div>
          )}

          {/* Quick Links / Community Guidelines */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-xs space-y-2.5">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-serif">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'कम्युनिटी दिशानिर्देश' : 'Community Guidelines'}</span>
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'यह मंच आउटसोर्स कर्मचारियों के आपसी सहयोग हेतु है। किसी भी प्रकार की अभद्र भाषा अथवा फर्जी भर्ती सूचना प्रतिबंधित है।'
                : 'UPOSN is dedicated to constructive peer support. Hate speech and unverified recruitment posts are strictly prohibited.'}
            </p>
          </div>

        </aside>

        {/* Center Main Feed */}
        <main className="lg:col-span-6 space-y-3 sm:space-y-4">
          
          {/* Create Post Prompt Box */}
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-xs">
            {currentUser ? (
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-amber-500/30 flex-shrink-0"
                />
                <button
                  onClick={handleOpenCreatePost}
                  id="feed-create-post-prompt-btn"
                  className="flex-1 text-left px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {language === 'hi' 
                    ? 'सहकर्मियों से कुछ साझा करें या सवाल पूछें...' 
                    : "Share updates, ask questions, or report an issue..."}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-300/60 dark:border-amber-700/60 flex items-center justify-center text-amber-700 dark:text-amber-400 flex-shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <button
                    onClick={() => setAuthModalType('login')}
                    id="feed-login-to-post-btn"
                    className="flex-1 text-left px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors truncate font-medium"
                  >
                    {language === 'hi' 
                      ? 'पोस्ट करने के लिए लॉगिन करें (Login to Post)...' 
                      : 'Log in to post updates or ask questions...'}
                  </button>
                </div>
                <button
                  onClick={() => setAuthModalType('login')}
                  id="feed-login-action-btn"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-xs flex-shrink-0 active:scale-95 transition-all min-h-[38px]"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'लॉगिन' : 'Log In'}</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-4 gap-1 pt-2.5 mt-2.5 sm:pt-3 sm:mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
              <button
                onClick={handleOpenCreatePost}
                className="flex items-center justify-center gap-1 sm:gap-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-semibold py-1.5 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-h-[38px] active:scale-95"
              >
                <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">{t.photo}</span>
              </button>

              <button
                onClick={handleOpenCreatePost}
                className="flex items-center justify-center gap-1 sm:gap-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-semibold py-1.5 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-h-[38px] active:scale-95"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">{t.document}</span>
              </button>

              <button
                onClick={handleOpenCreatePost}
                className="flex items-center justify-center gap-1 sm:gap-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-semibold py-1.5 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-h-[38px] active:scale-95"
              >
                <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">{t.poll}</span>
              </button>

              <button
                onClick={() => setCurrentView('qa')}
                className="flex items-center justify-center gap-1 sm:gap-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-semibold py-1.5 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-h-[38px] active:scale-95"
              >
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">{t.question}</span>
              </button>
            </div>
          </div>

          {/* Feed Filter Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'hi' ? 'सभी अपडेट' : 'For You'}
            </button>

            <button
              onClick={() => setActiveTab('district')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'district'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'hi' ? 'मेरा जिला' : 'My District'}
            </button>

            <button
              onClick={() => setActiveTab('department')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'department'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'hi' ? 'मेरा विभाग' : 'My Department'}
            </button>

            <button
              onClick={() => setActiveTab('official')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'official'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.officialOrder}
            </button>

            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 ${
                activeTab === 'trending'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{language === 'hi' ? 'ट्रेंडिंग' : 'Trending'}</span>
            </button>
          </div>

          {/* Posts Render Loop */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-80" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  {language === 'hi' ? 'इस श्रेणी में अभी कोई पोस्ट नहीं है' : 'No posts in this category yet'}
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  {language === 'hi' ? 'आप पहली पोस्ट बनाकर चर्चा शुरू कर सकते हैं।' : 'Be the first to share an update or question.'}
                </p>
                <button
                  onClick={handleOpenCreatePost}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                >
                  {t.createPost}
                </button>
              </div>
            )}
          </div>

        </main>

        {/* Right Sidebar (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-3.5 sticky top-20">
          
          {/* Suggested Colleagues */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>{language === 'hi' ? 'सहकर्मी सुझाव' : 'Suggested Colleagues'}</span>
              <Users className="w-3.5 h-3.5 text-amber-600" />
            </h4>

            <div className="space-y-3">
              {otherUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => {
                      setViewingUserId(user.id);
                      setCurrentView('profile');
                    }}
                    className="flex items-center gap-2 min-w-0 text-left"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white truncate hover:text-amber-600">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {user.district} • {user.department.split(' ')[0]}
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setViewingUserId(user.id);
                      setCurrentView('profile');
                    }}
                    className="px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-amber-800 dark:text-amber-300 font-bold text-[10px] flex-shrink-0"
                  >
                    {language === 'hi' ? 'देखें' : 'View'}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('directory')}
              className="w-full mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-center text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline block"
            >
              {language === 'hi' ? 'कर्मचारी डायरेक्टरी देखें →' : 'Explore Full Directory →'}
            </button>
          </div>

          {/* Trending Topics Box */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{language === 'hi' ? 'ट्रेंडिंग चर्चाएं' : 'Trending Topics'}</span>
            </h4>

            <div className="space-y-2 text-xs">
              <button 
                onClick={() => setActiveTab('trending')}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">#वेतन_विलंब_समस्या</p>
                  <p className="text-[10px] text-slate-400">142 चर्चाएं • स्वास्थ्य व शिक्षा</p>
                </div>
                <span className="text-amber-600 font-bold text-xs">🔥</span>
              </button>

              <button 
                onClick={() => setActiveTab('official')}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">#न्यूनतम_वेतन_शासनादेश</p>
                  <p className="text-[10px] text-slate-400">89 चर्चाएं • समस्त 75 जिले</p>
                </div>
                <span className="text-amber-600 font-bold text-xs">📜</span>
              </button>

              <button 
                onClick={() => setCurrentView('documents')}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">#EPF_पासबुक_पोर्टल</p>
                  <p className="text-[10px] text-slate-400">67 सवाल व जवाब</p>
                </div>
                <span className="text-amber-600 font-bold text-xs">💡</span>
              </button>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-tr from-amber-600 to-orange-600 text-white rounded-2xl p-4 shadow-md text-xs space-y-2">
            <h4 className="font-bold text-sm font-serif">
              {language === 'hi' ? 'मदद या सहायता चाहिए?' : 'Need Help or Guidance?'}
            </h4>
            <p className="text-amber-100 text-[11px] leading-relaxed">
              {language === 'hi'
                ? 'वेतन, ईपीएफ कटौती अथवा आउटसोर्सिंग एजेंसी विवाद पर प्रश्न एवं उत्तर अनुभाग में अनुभवी कर्मचारियों से सलाह लें।'
                : 'Ask questions in our Q&A forum to get insights from verified colleagues and senior staff.'}
            </p>
            <button
              onClick={() => setCurrentView('qa')}
              className="mt-2 w-full py-2 rounded-xl bg-white text-amber-900 font-bold text-xs shadow-xs hover:bg-amber-50"
            >
              {language === 'hi' ? 'सवाल एवं जवाब मंच' : 'Go to Q&A Forum'}
            </button>
          </div>

        </aside>

      </div>

    </div>
  );
};
