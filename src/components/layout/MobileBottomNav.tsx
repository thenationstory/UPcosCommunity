import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Plus, MapPin, CreditCard, User } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = () => {
  const { 
    currentView, setCurrentView, 
    currentUser, notifications, 
    setIsCreatePostOpen, setAuthModalType,
    language 
  } = useApp();

  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  const handleCreatePost = () => {
    if (!currentUser) {
      setAuthModalType('login');
    } else {
      setIsCreatePostOpen(true);
    }
  };

  const handleProfileClick = () => {
    if (!currentUser) {
      setAuthModalType('login');
    } else {
      setCurrentView('profile');
    }
  };

  const handleIdCardClick = () => {
    setCurrentView('idcard');
  };

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] select-none"
    >
      <div className="flex items-center justify-around h-14 sm:h-15 px-1 sm:px-3 max-w-lg mx-auto">
        {/* Home / Feed */}
        <button
          onClick={() => setCurrentView('feed')}
          id="mobile-bottom-home"
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center flex-1 py-1 rounded-xl active:scale-95 transition-all ${
            currentView === 'home' || currentView === 'feed'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">
            {language === 'hi' ? 'फीड' : 'Feed'}
          </span>
        </button>

        {/* 75 Districts */}
        <button
          onClick={() => setCurrentView('districts')}
          id="mobile-bottom-districts"
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center flex-1 py-1 rounded-xl active:scale-95 transition-all ${
            currentView === 'districts'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">
            {language === 'hi' ? '75 जिले' : 'Districts'}
          </span>
        </button>

        {/* Center Create Post (+) Button */}
        <button
          onClick={handleCreatePost}
          id="mobile-bottom-create"
          className="min-h-[48px] min-w-[48px] flex flex-col items-center justify-center flex-shrink-0 -mt-4 px-1.5 active:scale-90 transition-transform"
          aria-label="Create Post"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/35 border-[3px] border-white dark:border-slate-900 hover:brightness-105">
            <Plus className="w-6 h-6 stroke-[2.8]" />
          </div>
          <span className="text-[10px] mt-0.5 font-extrabold text-amber-700 dark:text-amber-400 leading-none">
            {language === 'hi' ? 'पोस्ट' : 'Post'}
          </span>
        </button>

        {/* Digital ID Card */}
        <button
          onClick={handleIdCardClick}
          id="mobile-bottom-idcard"
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center flex-1 py-1 rounded-xl active:scale-95 transition-all ${
            currentView === 'idcard'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <CreditCard className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1.5 px-1 py-0.2 rounded-full bg-amber-500 text-[8px] font-black text-white leading-none">
              ID
            </span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">
            {language === 'hi' ? 'पहचान पत्र' : 'ID Card'}
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={handleProfileClick}
          id="mobile-bottom-profile"
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center flex-1 py-1 rounded-xl active:scale-95 transition-all ${
            currentView === 'profile'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            {currentUser ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-5 h-5 rounded-full object-cover border border-amber-500" 
              />
            ) : (
              <User className="w-5 h-5 stroke-[2.2]" />
            )}
            {unreadNotifs > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-red-600 text-white text-[9px] font-extrabold flex items-center justify-center leading-none">
                {unreadNotifs}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">
            {currentUser ? (language === 'hi' ? 'प्रोफाइल' : 'Profile') : (language === 'hi' ? 'खाता' : 'Login')}
          </span>
        </button>
      </div>
    </nav>
  );
};
