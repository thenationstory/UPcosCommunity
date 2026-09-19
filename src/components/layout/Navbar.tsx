import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandHeader } from '../common/BrandLogo';
import { 
  Shield, Bell, MessageSquare, 
  Menu, X, CheckCircle2, User, CreditCard, Settings, 
  LogOut, ShieldAlert, FileText, Users, HelpCircle, 
  ChevronDown, MapPin, Sparkles, Newspaper, Briefcase
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { 
    language, setLanguage, t,
    currentUser, logout,
    currentView, setCurrentView,
    notifications, messages,
    setAuthModalType,
    setIsDisclaimerOpen
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDirectoryMenuOpen, setIsDirectoryMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);
  const directoryMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.isRead).length;
  const unreadMessages = messages.filter(m => !m.isRead && m.receiverId === currentUser?.id).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDesktop = userMenuRef.current?.contains(target);
      const insideMobile = mobileUserMenuRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsUserMenuOpen(false);
      }
      if (!directoryMenuRef.current?.contains(target)) {
        setIsDirectoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'feed', label: t.feed, icon: Sparkles },
    { id: 'directory', label: t.directory, icon: Users },
    { id: 'districts', label: t.districts, icon: MapPin },
    { id: 'blog-jobs', label: t.newsJobs, icon: Newspaper },
    { id: 'qa', label: t.qa, icon: HelpCircle },
  ];

  const renderUserMenuDropdown = () => {
    if (!currentUser) return null;
    return (
      <div className="absolute right-0 mt-2 w-64 sm:w-72 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 text-slate-800 dark:text-slate-200 text-sm animate-in fade-in zoom-in-95 duration-150">
        {/* Header in Menu */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </p>
                {currentUser.verificationStatus === 'verified' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {currentUser.designation || currentUser.department}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {currentUser.district}
                </span>
                {currentUser.role === 'admin' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Menu links */}
        <div className="py-1">
          <button
            onClick={() => { setCurrentView('profile'); setIsUserMenuOpen(false); }}
            className="w-full px-4 py-2 flex items-center gap-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>{t.profile}</span>
          </button>

          <button
            onClick={() => { setCurrentView('idcard'); setIsUserMenuOpen(false); }}
            className="w-full px-4 py-2 flex items-center gap-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-amber-700 dark:text-amber-400"
          >
            <CreditCard className="w-4 h-4 text-amber-500" />
            <span>{t.idCard}</span>
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => { setCurrentView('admin'); setIsUserMenuOpen(false); }}
              className="w-full px-4 py-2 flex items-center gap-2.5 text-xs font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/40 text-purple-700 dark:text-purple-300"
            >
              <ShieldAlert className="w-4 h-4 text-purple-500" />
              <span>{t.admin}</span>
            </button>
          )}

          <button
            onClick={() => { setCurrentView('settings'); setIsUserMenuOpen(false); }}
            className="w-full px-4 py-2 flex items-center gap-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>{t.settings}</span>
          </button>

          <button
            id="nav-disclaimer-btn"
            onClick={() => { setIsDisclaimerOpen(true); setIsUserMenuOpen(false); }}
            className="w-full px-4 py-2 flex items-center gap-2.5 text-xs font-semibold hover:bg-amber-50/60 dark:hover:bg-amber-950/20 text-amber-700 dark:text-amber-400"
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>{language === 'hi' ? 'वैधानिक अस्वीकरण' : 'Statutory Disclaimer'}</span>
          </button>
        </div>

        {/* Logout */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
          <button
            onClick={() => { logout(); setIsUserMenuOpen(false); }}
            className="w-full px-4 py-2 flex items-center gap-2.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <header 
      id="main-header"
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
      className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm w-full"
    >
      <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[3.4rem] sm:min-h-[3.85rem] py-1 sm:py-1.5 gap-1.5 sm:gap-2.5 w-full min-w-0">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink">
            <button
              onClick={() => setCurrentView('home')}
              className="text-left group focus:outline-hidden"
              id="brand-logo-btn"
            >
              <BrandHeader size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 min-w-0 flex-shrink">
            {/* Feed Button */}
            <button
              id="nav-link-feed"
              onClick={() => setCurrentView('feed')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentView === 'feed'
                  ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${currentView === 'feed' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
              <span>{t.feed}</span>
            </button>

            {/* Employee Directory Component with Districts shifted under it */}
            <div 
              className="relative group" 
              ref={directoryMenuRef}
              onMouseEnter={() => setIsDirectoryMenuOpen(true)}
              onMouseLeave={() => setIsDirectoryMenuOpen(false)}
            >
              <button
                id="nav-link-directory"
                onClick={() => {
                  setCurrentView('directory');
                  setIsDirectoryMenuOpen(prev => !prev);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  currentView === 'directory' || currentView === 'districts'
                    ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className={`w-3.5 h-3.5 ${currentView === 'directory' || currentView === 'districts' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
                <span>{t.directory}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 transition-transform group-hover:rotate-180" />
              </button>

              {/* Submenu shifted under Employee Directory */}
              {isDirectoryMenuOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'hi' ? 'कर्मचारी व जिला डायरेक्टरी' : 'Staff & District Directory'}
                  </div>
                  
                  <button
                    onClick={() => {
                      setCurrentView('directory');
                      setIsDirectoryMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      currentView === 'directory' ? 'font-bold text-amber-600 bg-amber-50/60 dark:bg-amber-950/20' : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="font-semibold leading-tight">{language === 'hi' ? 'समस्त कर्मचारी डायरेक्टरी' : 'All Staff Directory'}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{language === 'hi' ? 'पद, विभाग व नाम द्वारा खोजें' : 'Search by name, role & dept'}</p>
                      </div>
                    </div>
                  </button>

                  {/* Districts button shifted under Employee Directory */}
                  <button
                    id="nav-link-districts"
                    onClick={() => {
                      setCurrentView('districts');
                      setIsDirectoryMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-t border-slate-100 dark:border-slate-800/60 ${
                      currentView === 'districts' ? 'font-bold text-amber-600 bg-amber-50/60 dark:bg-amber-950/20' : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="font-semibold leading-tight">{language === 'hi' ? '75 जिलेवार डायरेक्टरी' : '75 Districts Directory'}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{language === 'hi' ? 'जिलेवार कम्युनिटी व कर्मचारी' : 'District community & staff'}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      75
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* News & Outsourcing Jobs Page Link */}
            <button
              id="nav-link-jobs"
              onClick={() => setCurrentView('blog-jobs')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentView === 'blog-jobs' || currentView === 'jobs' || currentView === 'news'
                  ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Newspaper className={`w-3.5 h-3.5 ${currentView === 'blog-jobs' || currentView === 'jobs' || currentView === 'news' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
              <span>{t.newsJobs}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            </button>

            {/* Q&A Button */}
            <button
              id="nav-link-qa"
              onClick={() => setCurrentView('qa')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentView === 'qa'
                  ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className={`w-3.5 h-3.5 ${currentView === 'qa' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
              <span>{t.qa}</span>
            </button>
          </nav>

          {/* Right Tools: Language, Notifications, User Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 flex-shrink-0">
            {/* Language Switcher (Desktop/Tablet) */}
            <div className="hidden sm:flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 text-xs font-bold flex-shrink-0">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1.5 sm:px-2 py-1 rounded-md transition-all ${
                  language === 'hi'
                    ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="हिंदी में देखें"
              >
                हिं
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 sm:px-2 py-1 rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="View in English"
              >
                EN
              </button>
            </div>

            {/* If Logged In: Notifications & Messages */}
            {currentUser && (
              <>
                <button
                  onClick={() => setCurrentView('notifications')}
                  id="notifications-nav-btn"
                  className="hidden sm:inline-flex relative p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                  title={t.notifications}
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                      {unreadNotifs}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentView('messages')}
                  id="messages-nav-btn"
                  className="hidden sm:inline-flex relative p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                  title={t.messages}
                >
                  <MessageSquare className="w-4 h-4" />
                  {unreadMessages > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* User Profile or Login CTA */}
            {currentUser ? (
              <div className="hidden sm:block relative flex-shrink-0" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  id="user-profile-menu-btn"
                  className="flex items-center gap-1.5 sm:gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors flex-shrink-0"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-amber-500/40"
                    />
                    {currentUser.verificationStatus === 'verified' && (
                      <span className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-900 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 text-white" />
                      </span>
                    )}
                  </div>
                  <span className="hidden md:inline-block font-semibold text-xs text-slate-800 dark:text-slate-200 max-w-[85px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="hidden md:inline-block w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && renderUserMenuDropdown()}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setAuthModalType('login')}
                  id="nav-login-btn"
                  className="text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
                >
                  {t.login}
                </button>
                <button
                  onClick={() => setAuthModalType('register')}
                  id="nav-register-btn"
                  className="text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xs transition-all whitespace-nowrap min-h-[36px]"
                >
                  {t.register}
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="xl:hidden p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Dedicated Mobile Bar Below Header (Mobile View Only) */}
      <div id="mobile-header-subbar" className="sm:hidden border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xs px-2.5 py-1.5 transition-colors">
        <div className="flex items-center justify-between gap-2 max-w-full">
          {/* Language Switcher */}
          <div className="flex items-center rounded-lg bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 text-xs font-bold shadow-2xs flex-shrink-0">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-md transition-all text-xs font-bold ${
                language === 'hi'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="हिंदी में देखें"
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-all text-xs font-bold ${
                language === 'en'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="View in English"
            >
              English
            </button>
          </div>

          {/* Shifted Auth Buttons for Unregistered/Logout Users */}
          {!currentUser ? (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setAuthModalType('login')}
                id="mobile-nav-login-btn"
                className="text-xs font-bold px-3 py-1.5 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs min-h-[32px]"
              >
                {t.login}
              </button>
              <button
                onClick={() => setAuthModalType('register')}
                id="mobile-nav-register-btn"
                className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xs transition-all min-h-[32px]"
              >
                {t.register}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Notifications Button shifted into mobile subbar */}
              <button
                onClick={() => setCurrentView('notifications')}
                id="mobile-notifications-btn"
                className="relative p-1.5 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs flex-shrink-0 min-h-[32px] min-w-[32px] flex items-center justify-center"
                title={t.notifications}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9.5px] font-extrabold flex items-center justify-center shadow-xs">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrentView('idcard')}
                className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 min-h-[32px] flex items-center"
              >
                {language === 'hi' ? 'ID कार्ड' : 'ID Card'}
              </button>

              {/* Shifted User Profile Menu Button in mobile view beside ID card right side */}
              <div className="relative flex-shrink-0" ref={mobileUserMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  id="mobile-user-profile-menu-btn"
                  className="flex items-center p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors flex-shrink-0"
                  title={currentUser.name}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
                    />
                    {currentUser.verificationStatus === 'verified' && (
                      <span className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-900 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-600 text-white" />
                      </span>
                    )}
                  </div>
                </button>

                {/* Mobile Dropdown Menu */}
                {isUserMenuOpen && renderUserMenuDropdown()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 sm:px-4 pt-3 pb-6 space-y-2 text-sm shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold min-h-[44px] transition-colors ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border border-amber-400/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}

            {/* Documents & Official Orders Link in drawer */}
            <button
              onClick={() => {
                setCurrentView('documents');
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold min-h-[44px] transition-colors ${
                currentView === 'documents'
                  ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border border-amber-400/30'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="truncate">{language === 'hi' ? 'शासनादेश व प्रपत्र' : 'Orders & Docs'}</span>
            </button>

            {/* Admin Dashboard if admin */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold min-h-[44px] transition-colors ${
                  currentView === 'admin'
                    ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border border-amber-400/30'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="truncate">{language === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-1 px-1 text-xs text-slate-500">
            <span className="truncate">{language === 'hi' ? 'उत्तर प्रदेश आउटसोर्स सेवा निगम' : 'UP Outsource Seva Nigam'}</span>
            <button
              id="mobile-drawer-disclaimer-btn"
              onClick={() => {
                setIsDisclaimerOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="hover:underline flex-shrink-0 ml-2 font-semibold text-amber-600 dark:text-amber-400"
            >
              {language === 'hi' ? 'वैधानिक अस्वीकरण' : 'Disclaimer'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
