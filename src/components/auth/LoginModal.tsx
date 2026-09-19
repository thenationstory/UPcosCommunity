import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, Phone, Shield, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    authModalType, setAuthModalType, 
    loginAs, allUsers, language, t,
    setCurrentView 
  } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (authModalType !== 'login') return null;

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Match by email or phone or default to first user
    const term = identifier.trim().toLowerCase();
    const matched = allUsers.find(
      u => (u.email && u.email.toLowerCase() === term) || (u.phone && identifier && u.phone.includes(identifier.trim()))
    );
    if (matched) {
      loginAs(matched.id);
      setCurrentView('feed');
    } else {
      // Default to Rahul Kumar if custom login entered
      loginAs(allUsers[0].id);
      setCurrentView('feed');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setIsForgotPassword(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalType(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
            {isForgotPassword 
              ? (language === 'hi' ? 'पासवर्ड रीसेट करें' : 'Reset Password')
              : (language === 'hi' ? 'यूपी आउटसोर्स सेवा निगम में लॉगिन' : 'Sign in to UPOSN')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi' 
              ? 'उत्तर प्रदेश आउटसोर्स कर्मचारियों की अपनी डिजिटल कम्युनिटी' 
              : 'Community exclusively for UP Outsource Employees'}
          </p>
        </div>

        {isForgotPassword ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 flex-shrink-0" />
                <span>
                  {language === 'hi' 
                    ? 'पासवर्ड रीसेट लिंक आपके मोबाइल/ईमेल पर भेज दिया गया है।' 
                    : 'Password reset link sent to your registered contact.'}
                </span>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {language === 'hi'
                    ? 'अपना पंजीकृत मोबाइल नंबर अथवा ईमेल दर्ज करें। हम आपको पासवर्ड रीसेट ओटीपी/लिंक भेजेंगे।'
                    : 'Enter your registered mobile number or email to receive reset instructions.'}
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर / ईमेल' : 'Mobile / Email'}
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  {language === 'hi' ? 'ओटीपी / रीसेट लिंक भेजें' : 'Send Reset Link'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  {language === 'hi' ? 'लॉगिन पर वापस जाएं' : 'Back to Login'}
                </button>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={handleStandardSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'मोबाइल नंबर / ईमेल' : 'Mobile Number or Email'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="e.g. 9876543210 / rahul.kumar@..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  {language === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>{language === 'hi' ? 'मुझे याद रखें' : 'Remember Me'}</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{t.login}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Switch to Register */}
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              {language === 'hi' ? 'क्या आपका खाता नहीं है?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setAuthModalType('register')}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                {t.register}
              </button>
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
