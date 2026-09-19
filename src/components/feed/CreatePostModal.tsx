import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UP_DISTRICTS, UP_DEPARTMENTS } from '../../data/constants';
import { X, Image, FileText, BarChart2, HelpCircle, Send, Check, Shield } from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const { 
    isCreatePostOpen, setIsCreatePostOpen, 
    currentUser, addPost, language, t 
  } = useApp();

  const [postType, setPostType] = useState<'text' | 'photo' | 'document' | 'poll' | 'question'>('text');
  const [content, setContent] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(currentUser?.district || 'Lucknow');
  const [selectedDepartment, setSelectedDepartment] = useState(currentUser?.department || UP_DEPARTMENTS[0].name);
  
  // Photo
  const [photoUrl, setPhotoUrl] = useState('');
  
  // Document
  const [docName, setDocName] = useState('');
  
  // Poll
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

  if (!isCreatePostOpen || !currentUser) return null;

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  const handleUpdatePollOption = (index: number, val: string) => {
    const updated = [...pollOptions];
    updated[index] = val;
    setPollOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && postType === 'text') return;

    let pollData = undefined;
    if (postType === 'poll' && pollQuestion.trim()) {
      pollData = {
        id: `poll-${Date.now()}`,
        question: pollQuestion,
        totalVotes: 0,
        options: pollOptions.filter(o => o.trim()).map((opt, i) => ({
          id: `opt-${i}-${Date.now()}`,
          text: opt,
          votes: 0,
          votedUserIds: []
        }))
      };
    }

    let docData = undefined;
    if (postType === 'document' && docName.trim()) {
      docData = {
        name: docName.endsWith('.pdf') ? docName : `${docName}.pdf`,
        url: '#',
        size: '1.2 MB',
        type: 'PDF'
      };
    }

    addPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorDepartment: currentUser.department,
      authorDistrict: currentUser.district,
      authorDesignation: currentUser.designation,
      isVerified: currentUser.verificationStatus === 'verified',
      isOfficial: currentUser.role === 'admin',
      content: content.trim() || (pollQuestion ? pollQuestion : 'Attached document'),
      images: photoUrl.trim() ? [photoUrl] : undefined,
      document: docData,
      poll: pollData,
      category: postType === 'poll' ? 'salary' : (currentUser.role === 'admin' ? 'official_order' : 'general'),
      districtTag: selectedDistrict,
      departmentTag: selectedDepartment
    });

    // Reset & close
    setContent('');
    setPhotoUrl('');
    setDocName('');
    setPollQuestion('');
    setPostType('text');
    setIsCreatePostOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl max-w-xl w-full p-4 sm:p-5 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] sm:max-h-[90vh] overflow-y-auto pb-safe">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
            {language === 'hi' ? 'कम्युनिटी पोस्ट बनाएं' : 'Create Community Post'}
          </h3>
          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Author Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {currentUser.name}
              </span>
              {currentUser.verificationStatus === 'verified' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {language === 'hi' ? 'सत्यापित' : 'Verified'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {currentUser.designation} • {currentUser.district}
            </p>
          </div>
        </div>

        {/* Post Type Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 text-xs">
          <button
            type="button"
            onClick={() => setPostType('text')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              postType === 'text' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <span>{language === 'hi' ? 'संदेश' : 'Text'}</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('photo')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              postType === 'photo' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>{t.photo}</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('document')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              postType === 'document' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.document}</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('poll')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              postType === 'poll' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{t.poll}</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Main Textarea */}
          <textarea
            required={postType !== 'poll'}
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={
              language === 'hi' 
                ? 'अपने जिले व विभाग के सहकर्मियों से महत्वपूर्ण सूचना, वेतन स्थिति या सवाल साझा करें...' 
                : "Share updates, delayed salary issues, government orders or questions with peers..."
            }
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden resize-none"
          />

          {/* If Photo Selected */}
          {postType === 'photo' && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === 'hi' ? 'तस्वीर / फोटो लिंक दर्ज करें' : 'Image URL or Upload Preview'}
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={e => setPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80')}
                  className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
                >
                  + {language === 'hi' ? 'नमूना ज्ञापन फोटो जोड़ें' : 'Add sample meeting photo'}
                </button>
              </div>
            </div>
          )}

          {/* If Document Selected */}
          {postType === 'document' && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === 'hi' ? 'शासनादेश / दस्तावेज का नाम (PDF)' : 'Document / GO Title (PDF)'}
              </label>
              <input
                type="text"
                value={docName}
                onChange={e => setDocName(e.target.value)}
                placeholder="e.g. UP_Govt_Outsource_Minimum_Wages_Order.pdf"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          )}

          {/* If Poll Selected */}
          {postType === 'poll' && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'पोल का मुख्य प्रश्न:' : 'Poll Question:'}
                </label>
                <input
                  type="text"
                  required
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  placeholder="e.g. आपके विभाग में वेतन कब प्राप्त होता है?"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  {language === 'hi' ? 'विकल्प (Options):' : 'Options:'}
                </label>
                {pollOptions.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    value={opt}
                    onChange={e => handleUpdatePollOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                ))}
                {pollOptions.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="text-xs text-amber-600 font-semibold hover:underline"
                  >
                    + {language === 'hi' ? 'एक और विकल्प जोड़ें' : 'Add another option'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Posting Tags & Target */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                {language === 'hi' ? 'जिला टैग' : 'District Tag'}
              </label>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs"
              >
                {UP_DISTRICTS.slice(0, 30).map(d => (
                  <option key={d.id} value={d.name}>{language === 'hi' ? d.nameHi : d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                {language === 'hi' ? 'विभागीय टैग' : 'Department Tag'}
              </label>
              <select
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs"
              >
                {UP_DEPARTMENTS.slice(0, 10).map(dep => (
                  <option key={dep.id} value={dep.name}>{language === 'hi' ? dep.nameHi : dep.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 text-center sm:text-left">
              {language === 'hi' ? 'सम्मानजनक व उपयोगी भाषा का प्रयोग करें' : 'Keep discussions constructive'}
            </span>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all min-h-[44px] active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.publishPost}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
