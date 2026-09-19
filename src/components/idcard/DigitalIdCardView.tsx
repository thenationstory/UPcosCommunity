import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EmblemIcon } from '../common/BrandLogo';
import QRCode from 'qrcode';
import { 
  CreditCard, ShieldCheck, Download, Printer, Share2, 
  CheckCircle2, AlertCircle, RefreshCw, QrCode as QrIcon, Lock, Sparkles, X 
} from 'lucide-react';

export const DigitalIdCardView: React.FC = () => {
  const { 
    currentUser, allUsers, viewingUserId, 
    setViewingUserId, language, t, 
    requestVerification, setAuthModalType 
  } = useApp();

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine which user's ID card is being displayed - only for logged in users
  const targetUser = (viewingUserId ? allUsers.find(u => u.id === viewingUserId) : currentUser) || currentUser;

  useEffect(() => {
    if (targetUser) {
      const verifyUrl = `https://uposn.in/verify/${targetUser.id}?emp=${encodeURIComponent(targetUser.employeeId || '')}`;
      QRCode.toDataURL(verifyUrl, {
        width: 240,
        margin: 1,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      }).then(url => {
        setQrCodeDataUrl(url);
      }).catch(err => console.error('QR Error:', err));
    }
  }, [targetUser]);

  const handlePrint = () => {
    window.print();
  };

  const handleRequestVerification = () => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    requestVerification(currentUser.id);
    setVerificationSubmitted(true);
  };

  // Show digital ID card ONLY to logged-in candidates
  if (!currentUser || !targetUser) {
    return (
      <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-14 space-y-6">
        {/* Page Title & Summary */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold border border-amber-300/40">
            <CreditCard className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'डिजिटल कर्मचारी पहचान पत्र' : 'Digital Employee Community Card'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
            {language === 'hi' ? 'डिजिटल आईडी कार्ड एवं क्यूआर सत्यापन' : 'Digital ID Card & QR Verification'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {language === 'hi'
              ? 'डिजिटल कम्युनिटी आईडी कार्ड केवल पंजीकृत एवं लॉगिन उम्मीदवारों/कर्मचारियों के लिए ही उपलब्ध है।'
              : 'Official digital membership card is available exclusively to registered and logged-in candidates.'}
          </p>
        </div>

        {/* Lock Gate Card */}
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif">
              {language === 'hi' ? 'आईडी कार्ड देखने के लिए कृपया लॉगिन करें' : 'Please Log In to View Digital ID Card'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'सुरक्षा, गोपनीयता एवं प्रमाणिकता सुनिश्चित करने हेतु आपका व्यक्तिगत डिजिटल आईडी कार्ड, फोटो, कर्मचारी कोड व क्यूआर सत्यापन केवल लॉगिन के उपरांत ही प्रदर्शित होता है।'
                : 'To ensure safety, data privacy, and credential authenticity, your personal digital ID card, employee code, photo, and verification QR code are visible only to logged-in members.'}
            </p>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => setAuthModalType('login')}
              id="idcard-login-gate-btn"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{t.login}</span>
            </button>
            <button
              onClick={() => setAuthModalType('register')}
              id="idcard-register-gate-btn"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all"
            >
              <span>{t.register}</span>
            </button>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="max-w-2xl mx-auto bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>{language === 'hi' ? 'डिजिटल आईडी कार्ड संबंधित वैधानिक अस्वीकरण' : 'Statutory Disclaimer regarding Digital ID'}</span>
          </h5>
          <p className="leading-relaxed">
            {language === 'hi'
              ? 'यह डिजिटल आईडी कार्ड केवल "यूपी आउटसोर्स सेवा निगम" डिजिटल कम्युनिटी की आंतरिक सदस्यता पहचान हेतु जारी किया जाता है। यह उत्तर प्रदेश सरकार का आधिकारिक परिचय पत्र नहीं है।'
              : 'This digital ID card is issued solely for internal membership verification within the "UP Outsource Seva Nigam" community platform.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6 space-y-4 sm:space-y-6">
      
      {/* Page Title & Summary */}
      <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold border border-amber-300/40">
          <CreditCard className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'डिजिटल कर्मचारी पहचान पत्र' : 'Digital Employee Community Card'}</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
          {language === 'hi' ? 'डिजिटल आईडी कार्ड एवं क्यूआर सत्यापन' : 'Digital ID Card & QR Verification'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {language === 'hi'
            ? 'उत्तर प्रदेश आउटसोर्स सेवा निगम के सत्यापित सदस्यों हेतु आधिकारिक डिजिटल पहचान पत्र।'
            : 'Official digital membership card for verified members of UP Outsource Seva Nigam.'}
        </p>
      </div>

      {/* Main Interactive Card Container */}
      <div className="flex flex-col items-center justify-center space-y-6">
        
        {/* Flip Controls */}
        <div className="inline-flex p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveSide('front')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeSide === 'front' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {language === 'hi' ? 'सामने का भाग (Front)' : 'Front Side'}
          </button>
          <button
            onClick={() => setActiveSide('back')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeSide === 'back' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {language === 'hi' ? 'पीछे का भाग (Back / QR)' : 'Back Side (QR Code)'}
          </button>
        </div>

        {/* The Digital ID Card */}
        <div 
          ref={cardRef}
          className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 relative transition-transform duration-300"
        >
          
          {activeSide === 'front' ? (
            /* Front of Card */
            <div className="flex flex-col justify-between min-h-[440px]">
              
              {/* Card Header */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-3.5 text-center relative border-b border-amber-500/30">
                <div className="flex items-center justify-center gap-2.5 mb-0.5">
                  <EmblemIcon size={34} className="shadow-xs" />
                  <div className="text-left">
                    <h3 className="font-black text-sm tracking-tight leading-tight">
                      UP Outsource <span className="text-red-500">Seva Nigam</span>
                    </h3>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                      Community Forum • Member ID
                    </p>
                  </div>
                </div>
                <div className="absolute top-3.5 right-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col items-center text-center space-y-3">
                
                {/* Profile Photo */}
                <div className="relative">
                  <img
                    src={targetUser.avatar}
                    alt={targetUser.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-amber-600 shadow-md"
                  />
                  {targetUser.verificationStatus === 'verified' ? (
                    <span className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm" title="Verified Member">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-600 text-white" />
                    </span>
                  ) : (
                    <span className="absolute bottom-0 right-0 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                      Pending
                    </span>
                  )}
                </div>

                {/* Name & Designation */}
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    {targetUser.name}
                  </h4>
                  <p className="text-xs font-bold text-amber-700">
                    {targetUser.designation}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {targetUser.department}
                  </p>
                </div>

                {/* Key Metadata Table */}
                <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'कर्मचारी आईडी' : 'ID Number'}</span>
                    <span className="font-mono font-bold text-slate-800">{targetUser.employeeId || 'UP-OS-2024'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'कार्यरत जिला' : 'District'}</span>
                    <span className="font-bold text-slate-800">{targetUser.district}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'आउटसोर्सिंग एजेंसी' : 'Agency / Vendor'}</span>
                    <span className="font-semibold text-slate-800 truncate block">{targetUser.outsourcingAgency || 'Registered Vendor'}</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-[11px]">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                    targetUser.verificationStatus === 'verified'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {targetUser.verificationStatus === 'verified' 
                      ? (language === 'hi' ? 'सत्यापित कम्युनिटी सदस्य' : 'Verified Member')
                      : (language === 'hi' ? 'सत्यापन प्रक्रियाधीन' : 'Verification Pending')}
                  </span>
                </div>

              </div>

              {/* Card Footer */}
              <div className="bg-slate-100 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500">
                <span>सदस्यता वर्ष: 2024-2027</span>
                <span className="font-mono font-semibold">VALID COMMUNITY ID</span>
              </div>

            </div>
          ) : (
            /* Back of Card */
            <div className="flex flex-col justify-between min-h-[440px] p-5 text-center">
              
              {/* Back Header */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 font-serif">
                  {language === 'hi' ? 'त्वरित क्यूआर कोड सत्यापन' : 'Instant QR Code Verification'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'hi' ? 'स्मार्टफोन कैमरे से स्कैन कर सदस्यता विवरण की पुष्टि करें।' : 'Scan with any phone camera to verify membership.'}
                </p>
              </div>

              {/* Real QR Code Image */}
              <div className="my-3 flex flex-col items-center justify-center">
                <div className="p-3 bg-white rounded-xl border-2 border-amber-600 shadow-md">
                  {qrCodeDataUrl ? (
                    <img src={qrCodeDataUrl} alt="Employee QR Code" className="w-40 h-40" />
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center bg-slate-100 text-slate-400">
                      Generating QR...
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-2">
                  CODE: {targetUser.id.toUpperCase()}
                </span>
              </div>

              {/* Card Instructions & Security Notice */}
              <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-[10px] text-amber-900 text-left space-y-1">
                <p className="font-bold">सत्यापन निर्देश (Verification Instructions):</p>
                <p>1. यह क्यूआर कोड कर्मचारी के पद, विभाग व जिले की ऑनलाइन पुष्टि करता है।</p>
                <p>2. किसी भी समस्या की स्थिति में UPOSN सहायता डेस्क से संपर्क करें।</p>
              </div>

              {/* Back Footer */}
              <div className="pt-2 text-[9px] text-slate-400 border-t border-slate-100">
                Official Network of Outsource Employees in Uttar Pradesh • www.uposn.in
              </div>

            </div>
          )}

        </div>

        {/* Toast confirmation for download */}
        {downloadToast && (
          <div className="w-full max-w-sm sm:max-w-md mx-auto p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between gap-2 shadow-xs animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{language === 'hi' ? 'डिजिटल आईडी कार्ड सफलतापूर्वक सहेजा गया!' : 'Digital ID Card successfully saved!'}</span>
            </div>
            <button onClick={() => setDownloadToast(false)} className="p-1 text-emerald-600 hover:text-emerald-800">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Action Controls: Download, Print, Share, Verification Request */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full max-w-sm sm:max-w-md mx-auto">
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 min-h-[44px] active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4 text-amber-600" />
            <span>{language === 'hi' ? 'प्रिंट करें' : 'Print ID Card'}</span>
          </button>

          <button
            onClick={() => {
              setDownloadToast(true);
              setTimeout(() => setDownloadToast(false), 4000);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md min-h-[44px] active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'hi' ? 'आईडी कार्ड डाउनलोड करें' : 'Download ID Card'}</span>
          </button>

          {/* If the current user is unverified, show Request Verification trigger */}
          {currentUser && currentUser.verificationStatus !== 'verified' && (
            <button
              onClick={handleRequestVerification}
              disabled={verificationSubmitted}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs min-h-[44px] active:scale-95 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {verificationSubmitted
                  ? (language === 'hi' ? 'सत्यापन अनुरोध भेजा गया' : 'Verification Requested')
                  : (language === 'hi' ? 'सत्यापन अनुरोध भेजें' : 'Request Verification')}
              </span>
            </button>
          )}
        </div>

      </div>

      {/* Prominent Legal Disclaimer Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
        <h5 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>{language === 'hi' ? 'डिजिटल आईडी कार्ड संबंधित वैधानिक अस्वीकरण' : 'Statutory Disclaimer regarding Digital ID'}</span>
        </h5>
        <p className="leading-relaxed">
          {language === 'hi'
            ? 'यह डिजिटल आईडी कार्ड केवल "यूपी आउटसोर्स सेवा निगम" डिजिटल कम्युनिटी की आंतरिक सदस्यता पहचान हेतु जारी किया गया है। यह उत्तर प्रदेश सरकार अथवा किसी राजकीय विभाग का आधिकारिक परिचय पत्र नहीं है, और न ही यह किसी सरकारी अधिकार या सेवा की स्थायी गारंटी प्रदान करता है। इसे किसी सरकारी पहचान पत्र (जैसे आधार, निर्वाचन कार्ड अथवा विभागीय सेवा पहचान पत्र) के विकल्प के रूप में प्रयोग न करें।'
            : 'This digital ID card is issued solely for internal membership verification within the "UP Outsource Seva Nigam" community platform. It does not represent an official Government of Uttar Pradesh identity document and cannot be used as an official government pass or permanent employment credential.'}
        </p>
      </div>

    </div>
  );
};
