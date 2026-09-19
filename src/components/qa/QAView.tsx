import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DISCUSSION_TOPICS } from '../../data/constants';
import { 
  HelpCircle, Plus, Search, ThumbsUp, MessageSquare, 
  CheckCircle2, Filter, ArrowRight, User, X, Sparkles 
} from 'lucide-react';

export const QAView: React.FC = () => {
  const { 
    questions, upvoteQuestion, addAnswer, 
    addQuestion, currentUser, language, t,
    setAuthModalType 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(questions[0]?.id || null);
  
  // Ask Question Modal
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTopic, setNewTopic] = useState(DISCUSSION_TOPICS[0]?.id || 'general');

  // New Answer Text per question
  const [answerInputText, setAnswerInputText] = useState<{ [key: string]: string }>({});

  const filteredQuestions = questions.filter(q => {
    const term = searchTerm.trim().toLowerCase();
    const matchSearch = 
      !term ||
      (q.title && q.title.toLowerCase().includes(term)) || 
      (q.content && q.content.toLowerCase().includes(term));
    const matchTopic = selectedTopic === 'ALL' || q.category === selectedTopic;
    return matchSearch && matchTopic;
  });

  const handleOpenAskModal = () => {
    if (!currentUser) {
      setAuthModalType('login');
    } else {
      setIsAskModalOpen(true);
    }
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addQuestion(
      newTitle.trim(),
      newDesc.trim() || newTitle.trim(),
      newTopic,
      ['OutsourceRights', 'UPGovt']
    );

    setNewTitle('');
    setNewDesc('');
    setIsAskModalOpen(false);
  };

  const handleAddAnswerSubmit = (qId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = answerInputText[qId]?.trim();
    if (!text) return;
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }

    addAnswer(qId, text);
    setAnswerInputText({ ...answerInputText, [qId]: '' });
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-3.5 sm:space-y-5">
      
      {/* Header & Ask Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सवाल एवं समाधान मंच' : 'Q&A Helpdesk'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
            {language === 'hi' ? 'आउटसोर्स कर्मचारी सवाल-जवाब' : 'Peer Q&A Forum'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {language === 'hi' 
              ? 'वेतन, ईपीएफ, ईएसआई, अवकाश नियमावली एवं एजेंसी समस्याओं पर अनुभवी साथियों से सलाह लें।' 
              : 'Ask workplace questions and receive answers from verified colleagues and specialists.'}
          </p>
        </div>

        <button
          onClick={handleOpenAskModal}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all w-full sm:w-auto min-h-[44px] active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? 'सवाल पूछें' : 'Ask Question'}</span>
        </button>
      </div>

      {/* Search & Topic Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5 sm:space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'सवाल, नियम अथवा समस्या खोजें...' : 'Search questions or keywords...'}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3.5" />
        </div>

        {/* Topics Scroll */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
          <button
            onClick={() => setSelectedTopic('ALL')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedTopic === 'ALL'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'hi' ? 'सभी विषय' : 'All Topics'}
          </button>
          {DISCUSSION_TOPICS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedTopic === t.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {language === 'hi' ? t.nameHi : t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map(q => {
          const isExpanded = expandedQuestionId === q.id;
          const hasVoted = Boolean(currentUser && q.upvotedUserIds?.includes(currentUser.id));
          const answersList = q.answers || [];
          const answersCount = answersList.length || q.answersCount || 0;

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs overflow-hidden transition-all"
            >
              <div className="p-4 sm:p-5">
                
                {/* Topic Pill & Author */}
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40 uppercase text-[10px]">
                    {q.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    {q.authorAvatar && (
                      <img src={q.authorAvatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                    )}
                    <span>{q.authorName} {q.authorDistrict ? `(${q.authorDistrict})` : ''}</span>
                    <span>•</span>
                    <span>{q.createdAt}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="text-base font-bold text-slate-900 dark:text-white font-serif hover:text-amber-600 cursor-pointer transition-colors"
                >
                  {q.title}
                </h3>

                {/* Content */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
                  {q.content}
                </p>

                {/* Question Footer: Upvotes & Answers Count */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setAuthModalType('login');
                      } else {
                        upvoteQuestion(q.id);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      hasVoted
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{q.upvotes || 0} {language === 'hi' ? 'सहमति' : 'Upvotes'}</span>
                  </button>

                  <button
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="text-amber-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{answersCount} {language === 'hi' ? 'उत्तर देखें / लिखें' : 'Answers'}</span>
                  </button>
                </div>

              </div>

              {/* Expanded Answers Thread */}
              {isExpanded && (
                <div className="bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-700 p-4 sm:p-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-serif">
                    {language === 'hi' ? `कर्मचारियों द्वारा दिए गए उत्तर (${answersCount}):` : `Answers (${answersCount}):`}
                  </h4>

                  {/* Answers list */}
                  <div className="space-y-3">
                    {answersList.map(ans => {
                      const isBest = ans.isBestAnswer || (ans as any).isAccepted;
                      return (
                        <div
                          key={ans.id}
                          className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                            isBest
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {ans.authorAvatar && (
                                <img src={ans.authorAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                              )}
                              <span className="font-bold text-slate-900 dark:text-white">{ans.authorName}</span>
                              {ans.isVerified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              )}
                              {ans.authorDistrict && (
                                <span className="text-[10px] text-slate-400 font-medium">({ans.authorDistrict})</span>
                              )}
                            </div>

                            {isBest && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                                ✓ {language === 'hi' ? 'स्वीकृत समाधान' : 'Accepted Solution'}
                              </span>
                            )}
                          </div>

                          <p className="text-slate-800 dark:text-slate-200 leading-relaxed pl-8">
                            {ans.content}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Answer Box */}
                  <form onSubmit={(e) => handleAddAnswerSubmit(q.id, e)} className="pt-2 flex items-start gap-2">
                    <input
                      type="text"
                      value={answerInputText[q.id] || ''}
                      onChange={e => setAnswerInputText({ ...answerInputText, [q.id]: e.target.value })}
                      placeholder={language === 'hi' ? 'अपना अनुभवी उत्तर या समाधान लिखें...' : 'Write an informative answer...'}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
                    >
                      {language === 'hi' ? 'उत्तर दें' : 'Submit'}
                    </button>
                  </form>

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Ask Question Modal */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto pb-safe">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                {language === 'hi' ? 'नया प्रश्न पूछें' : 'Ask a New Question'}
              </h3>
              <button onClick={() => setIsAskModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'प्रश्न का शीर्षक (Question Title) *' : 'Question Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. संविदा कर्मियों के लिए ईपीएफ शिकायत का प्रारूप क्या है?"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'विषय श्रेणी (Category) *' : 'Category *'}
                </label>
                <select
                  value={newTopic}
                  onChange={e => setNewTopic(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm"
                >
                  {DISCUSSION_TOPICS.map(t => (
                    <option key={t.id} value={t.id}>{language === 'hi' ? t.nameHi : t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'विस्तृत विवरण (Details) *' : 'Detailed Description *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder={language === 'hi' ? 'अपनी समस्या का संपूर्ण विवरण दें ताकि सहकर्मी सही सलाह दे सकें...' : 'Describe your issue in detail...'}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAskModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 min-h-[44px] flex items-center justify-center order-2 sm:order-1"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs min-h-[44px] flex items-center justify-center active:scale-95 transition-all order-1 sm:order-2"
                >
                  {language === 'hi' ? 'प्रश्न प्रकाशित करें' : 'Post Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
