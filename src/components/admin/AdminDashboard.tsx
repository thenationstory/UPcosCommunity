import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, CheckCircle2, XCircle, AlertTriangle, 
  Users, FileText, Bell, Check, Trash2, Eye 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, allUsers, approveVerification, 
    rejectVerification, reports, handleReportAction, 
    announcement, updateAnnouncement, language, t,
    posts, deletePost, setCurrentView, setViewingUserId 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'reports' | 'announcement'>('verifications');

  // Announcement Editor State
  const [annTextHi, setAnnTextHi] = useState(announcement?.text || '');
  const [annTextEn, setAnnTextEn] = useState(announcement?.textEn || '');
  const [annType, setAnnType] = useState(announcement?.type || 'announcement');
  const [annActive, setAnnActive] = useState(Boolean(announcement?.isActive));
  const [annSaved, setAnnSaved] = useState(false);

  // Filter pending verification users
  const pendingUsers = allUsers.filter(u => u.verificationStatus === 'unverified' || u.verificationStatus === 'pending');
  const verifiedUsers = allUsers.filter(u => u.verificationStatus === 'verified');
  const pendingReports = reports.filter(r => r.status === 'pending');

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateAnnouncement) {
      updateAnnouncement({
        text: annTextHi,
        textEn: annTextEn,
        type: annType,
        isActive: annActive
      });
    }
    setAnnSaved(true);
    setTimeout(() => setAnnSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-300 text-[11px] sm:text-xs font-bold mb-1">
            <Shield className="w-3.5 h-3.5 text-purple-600" />
            <span>{language === 'hi' ? 'कम्युनिटी प्रशासन व मॉडरेशन' : 'Portal Administration'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
            {t.adminDashboard}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {language === 'hi'
              ? 'कर्मचारी सत्यापन, आपत्तिजनक सामग्री मॉडरेशन एवं आपातकालीन सूचना प्रबंधन।'
              : 'Approve employee verifications, moderate reported posts, and broadcast announcements.'}
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
          {language === 'hi' ? 'लॉगिन व्यवस्थापक:' : 'Admin:'} <span className="font-bold text-amber-600">{currentUser?.name}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white dark:bg-slate-800 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-1">
            {t.registeredEmployees}
          </span>
          <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
            {allUsers.length + 12480}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-1">
            {language === 'hi' ? 'सत्यापित कर्मचारी' : 'Verified Staff'}
          </span>
          <span className="text-xl sm:text-3xl font-black text-emerald-600 font-serif">
            {verifiedUsers.length}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-1">
            {language === 'hi' ? 'लंबित सत्यापन' : 'Pending Approvals'}
          </span>
          <span className="text-xl sm:text-3xl font-black text-amber-600 font-serif">
            {pendingUsers.length}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            {language === 'hi' ? 'समीक्षा हेतु रिपोर्टें' : 'Pending Reports'}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-red-600 font-serif">
            {pendingReports.length}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'verifications'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{language === 'hi' ? `कर्मचारी सत्यापन (${pendingUsers.length})` : `Verifications (${pendingUsers.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{language === 'hi' ? `आपत्तिजनक रिपोर्टें (${pendingReports.length})` : `Reports (${pendingReports.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('announcement')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'announcement'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{language === 'hi' ? 'शीर्ष सूचना पट्टी (Announcement)' : 'Live Announcement'}</span>
        </button>
      </div>

      {/* Tab 1: Verification Approvals */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {language === 'hi' ? 'सत्यापन के पश्चात कर्मचारी के नाम के आगे हरा बैज व डिजिटल आईडी सक्रिय होगी।' : 'Approving grants the green verification checkmark and valid digital ID.'}
            </span>
          </div>

          {pendingUsers.length > 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden shadow-2xs">
              {pendingUsers.map(user => (
                <div key={user.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  
                  <div className="flex items-start gap-3">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {user.name}
                      </h4>
                      <p className="text-amber-700 dark:text-amber-400 font-semibold">
                        {user.designation} • {user.department}
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        जिला: <strong>{user.district}</strong> • एजेंसी: {user.outsourcingAgency || 'Registered Vendor'}
                      </p>
                      {user.employeeId && (
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                          आईडी: {user.employeeId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setViewingUserId(user.id);
                        setCurrentView('profile');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50"
                    >
                      {language === 'hi' ? 'विवरण देखें' : 'View'}
                    </button>

                    <button
                      onClick={() => rejectVerification(user.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-bold hover:bg-red-200"
                    >
                      {language === 'hi' ? 'अस्वीकार' : 'Reject'}
                    </button>

                    <button
                      onClick={() => approveVerification(user.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'स्वीकृत करें (Verify)' : 'Approve'}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
              ✓ {language === 'hi' ? 'कोई लंबित सत्यापन अनुरोध नहीं है।' : 'No pending verification requests.'}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Reports Moderation */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {pendingReports.length > 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden shadow-2xs">
              {pendingReports.map(report => (
                <div key={report.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] uppercase">
                        {report.reason}
                      </span>
                      <span className="text-slate-400 text-[11px]">{report.createdAt}</span>
                    </div>

                    <p className="font-bold text-slate-900 dark:text-white">
                      "{report.targetTitleOrSnippet}"
                    </p>
                    {report.notes && (
                      <p className="text-slate-500 mt-1">
                        विवरण: {report.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleReportAction(report.id, 'dismiss')}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                    >
                      {language === 'hi' ? 'खारिज करें' : 'Dismiss'}
                    </button>

                    <button
                      onClick={() => {
                        deletePost(report.targetId);
                        handleReportAction(report.id, 'remove_content');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 shadow-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'सामग्री हटाएं' : 'Remove Content'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
              ✓ {language === 'hi' ? 'कोई लंबित रिपोर्ट नहीं है। मंच सुरक्षित है।' : 'No reports pending review.'}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Announcement Bar Manager */}
      {activeTab === 'announcement' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 max-w-2xl space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif">
            {language === 'hi' ? 'शीर्ष घोषणा पट्टी संपादित करें' : 'Edit Top Announcement Ticker'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'यह घोषणा मंच के प्रत्येक पृष्ठ के सबसे ऊपर सभी कर्मचारियों को दिखाई देती है।'
              : 'This banner appears across the top of all pages for statewide updates.'}
          </p>

          <form onSubmit={handleSaveAnnouncement} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'घोषणा संदेश (हिंदी में)' : 'Announcement Text (Hindi)'}
              </label>
              <input
                type="text"
                required
                value={annTextHi}
                onChange={e => setAnnTextHi(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'hi' ? 'घोषणा संदेश (अंग्रेजी में)' : 'Announcement Text (English)'}
              </label>
              <input
                type="text"
                value={annTextEn}
                onChange={e => setAnnTextEn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'सूचना प्रकार (Type)' : 'Alert Type'}
                </label>
                <select
                  value={annType}
                  onChange={e => setAnnType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                >
                  <option value="announcement">सामान्य घोषणा (Announcement - Amber)</option>
                  <option value="emergency">आपातकालीन / महत्वपूर्ण (Urgent - Red)</option>
                  <option value="update">नया अपडेट (Update - Blue)</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 w-full cursor-pointer h-[38px]">
                  <input
                    type="checkbox"
                    checked={annActive}
                    onChange={e => setAnnActive(e.target.checked)}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {language === 'hi' ? 'पट्टी सक्रिय रखें (Show Banner)' : 'Active (Show)'}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
              >
                {language === 'hi' ? 'सूचना अपडेट करें' : 'Broadcast Update'}
              </button>
              {annSaved && (
                <span className="text-emerald-600 font-bold flex items-center gap-1 text-xs">
                  <Check className="w-4 h-4" />
                  <span>{language === 'hi' ? 'सफलतापूर्वक लाइव अपडेट हो गया!' : 'Updated live!'}</span>
                </span>
              )}
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
