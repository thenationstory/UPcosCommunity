import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Post, ReactionType, Comment } from '../../types';
import { 
  Heart, ThumbsUp, ShieldCheck, Share2, Bookmark, 
  Flag, MoreHorizontal, MessageSquare, CheckCircle2, 
  FileText, Download, BarChart2, CornerDownRight, 
  Trash2, Copy, Check, Pin, Sparkles, AlertTriangle, X
} from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { 
    currentUser, language, t,
    reactToPost, addComment, deletePost, 
    savedItemIds, toggleSaveItem, votePoll,
    submitReport, setAuthModalType,
    setViewingUserId, setCurrentView 
  } = useApp();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState<'spam' | 'fake_info' | 'abuse' | 'harassment' | 'fraud' | 'misleading' | 'inappropriate'>('spam');
  const [reportNotes, setReportNotes] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

  const isSaved = Boolean(savedItemIds && savedItemIds.includes(post.id));
  const isAuthor = currentUser?.id === post.authorId;
  const isAdmin = currentUser?.role === 'admin';

  const totalReactions = 
    (post.reactions.like || 0) + 
    (post.reactions.helpful || 0) + 
    (post.reactions.support || 0) + 
    (post.reactions.important || 0);

  const handleReactionClick = (type: ReactionType) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    reactToPost(post.id, type);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText('');
    setIsCommentsOpen(true);
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;
    addComment(post.id, replyText.trim(), parentId);
    setReplyText('');
    setReplyToCommentId(null);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      targetType: 'post',
      targetId: post.id,
      targetTitleOrSnippet: post.content.slice(0, 80),
      reason: reportReason,
      notes: reportNotes
    });
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setIsReportModalOpen(false);
    }, 2000);
  };

  const handleAuthorClick = () => {
    setViewingUserId(post.authorId);
    setCurrentView('profile');
  };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-sm transition-all overflow-hidden">
      
      {/* Official Order / Pinned Banner */}
      {post.isOfficial && (
        <div className="bg-amber-500/10 dark:bg-amber-500/20 border-b border-amber-200 dark:border-amber-800/60 px-4 py-1.5 flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.officialOrder}</span>
          </div>
          {post.isPinned && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
              <Pin className="w-3 h-3" />
              <span>{language === 'hi' ? 'पिन किया गया' : 'Pinned'}</span>
            </span>
          )}
        </div>
      )}

      <div className="p-3 sm:p-5">
        
        {/* Post Header: Avatar, Name, Verification, District, Dept, Options */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-2.5 sm:mb-3.5">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={handleAuthorClick}
              className="relative focus:outline-hidden group flex-shrink-0"
            >
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border border-amber-500/30 group-hover:ring-2 group-hover:ring-amber-500 transition-all"
              />
              {post.isVerified && (
                <span className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-800 rounded-full" title="Verified Employee">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                </span>
              )}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={handleAuthorClick}
                  className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate"
                >
                  {post.authorName}
                </button>
                {post.authorDesignation && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline truncate">
                    • {post.authorDesignation}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap mt-0.5">
                <span className="px-1.5 py-0.2 rounded font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {post.authorDistrict}
                </span>
                <span>•</span>
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {post.authorDepartment}
                </span>
                <span>•</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Context Options Menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showOptionsDropdown && (
              <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-20 text-xs">
                <button
                  onClick={() => { toggleSaveItem(post.id); setShowOptionsDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-amber-600 fill-amber-600' : ''}`} />
                  <span>{isSaved ? t.saved : t.save}</span>
                </button>

                <button
                  onClick={() => { setIsShareModalOpen(true); setShowOptionsDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t.share}</span>
                </button>

                <button
                  onClick={() => { setIsReportModalOpen(true); setShowOptionsDropdown(false); }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{t.report}</span>
                </button>

                {(isAuthor || isAdmin) && (
                  <button
                    onClick={() => { deletePost(post.id); setShowOptionsDropdown(false); }}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 border-t border-slate-100 dark:border-slate-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'पोस्ट हटाएं' : 'Delete Post'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Post Text Content */}
        <div className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed mb-3.5">
          {post.content}
        </div>

        {/* Attached Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-3.5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <img
              src={post.images[0]}
              alt="Post attachment"
              className="w-full max-h-96 object-cover hover:scale-[1.01] transition-transform"
            />
          </div>
        )}

        {/* Attached Document (GO / Notice) */}
        {post.document && (
          <div className="mb-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {post.document.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {post.document.type} • {post.document.size}
                </p>
              </div>
            </div>
            <button
              onClick={() => alert(`दस्तावेज डाउनलोड शुरू: ${post.document?.name}`)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-600 flex items-center gap-1.5 transition-colors flex-shrink-0 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'डाउनलोड' : 'Download'}</span>
            </button>
          </div>
        )}

        {/* Interactive Poll */}
        {post.poll && (
          <div className="mb-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-amber-600" />
                <span>{post.poll.question}</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {post.poll.totalVotes} {language === 'hi' ? 'वोट' : 'votes'}
              </span>
            </div>

            <div className="space-y-2">
              {post.poll.options?.filter(Boolean).map((opt) => {
                const total = post.poll?.totalVotes || 1;
                const percentage = Math.round(((opt?.votes || 0) / total) * 100);
                const hasVotedThis = Boolean(currentUser && opt?.votedUserIds?.includes(currentUser.id));

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => votePoll(post.id, opt.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs relative overflow-hidden transition-all ${
                      hasVotedThis 
                        ? 'border-amber-500 bg-amber-500/10 font-bold' 
                        : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-amber-400'
                    }`}
                  >
                    {/* Background Progress Bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-amber-500/15 dark:bg-amber-500/25 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex items-center justify-between gap-2">
                      <span className="truncate text-slate-800 dark:text-slate-200">
                        {opt?.text || ''}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex-shrink-0">
                        {percentage}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Reaction Counter & Stats Bar */}
        <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            {totalReactions > 0 && (
              <div className="flex items-center -space-x-1">
                <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center text-[10px]" title="Likes">❤️</span>
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-[10px]" title="Support">🤝</span>
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-[10px]" title="Important">⚠️</span>
              </div>
            )}
            <span>
              {totalReactions} {language === 'hi' ? 'प्रतिक्रियाएं' : 'reactions'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="hover:underline"
            >
              {post.commentsCount} {t.comments}
            </button>
            <span>•</span>
            <span>{post.sharesCount} {language === 'hi' ? 'शेयर' : 'shares'}</span>
          </div>
        </div>

        {/* Action Buttons: 4 Reactions, Comment, Share, Save */}
        <div className="grid grid-cols-4 gap-1 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          
          {/* Reaction Button with Multi-Reactions Popup */}
          <div className="relative group">
            <button
              onClick={() => handleReactionClick(post.userReaction || 'like')}
              className={`w-full min-h-[40px] py-1.5 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 transition-all ${
                post.userReaction
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 flex-shrink-0 ${post.userReaction === 'like' ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-[11px] sm:text-xs truncate">
                {post.userReaction === 'helpful' ? t.helpful : 
                 post.userReaction === 'support' ? t.supportAction :
                 post.userReaction === 'important' ? t.important : t.like}
              </span>
            </button>

            {/* Hover Multi-Reaction Popover */}
            <div className="hidden group-hover:flex absolute bottom-full left-0 mb-1 bg-white dark:bg-slate-900 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 px-2 py-1.5 items-center gap-2 z-30 animate-in fade-in zoom-in-95">
              <button
                onClick={() => handleReactionClick('like')}
                className="hover:scale-125 transition-transform p-1"
                title={t.like}
              >
                ❤️
              </button>
              <button
                onClick={() => handleReactionClick('helpful')}
                className="hover:scale-125 transition-transform p-1"
                title={t.helpful}
              >
                💡
              </button>
              <button
                onClick={() => handleReactionClick('support')}
                className="hover:scale-125 transition-transform p-1"
                title={t.supportAction}
              >
                🤝
              </button>
              <button
                onClick={() => handleReactionClick('important')}
                className="hover:scale-125 transition-transform p-1"
                title={t.important}
              >
                ⚠️
              </button>
            </div>
          </div>

          {/* Comment Button */}
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="w-full min-h-[40px] py-1.5 px-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="text-[11px] sm:text-xs truncate">{t.comment}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-full min-h-[40px] py-1.5 px-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4 flex-shrink-0" />
            <span className="text-[11px] sm:text-xs truncate">{t.share}</span>
          </button>

          {/* Save Button */}
          <button
            onClick={() => toggleSaveItem(post.id)}
            className={`w-full min-h-[40px] py-1.5 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 transition-all ${
              isSaved
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 flex-shrink-0 ${isSaved ? 'fill-amber-600' : ''}`} />
            <span className="text-[11px] sm:text-xs truncate">{isSaved ? t.saved : t.save}</span>
          </button>

        </div>

      </div>

      {/* Threaded Comments Section */}
      {isCommentsOpen && (
        <div className="bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-700/80 p-3 sm:p-4 space-y-3 sm:space-y-4">
          
          {/* New Comment Input Box */}
          {currentUser ? (
            <form onSubmit={handleAddComment} className="flex items-start gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-500/30 flex-shrink-0"
              />
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder={language === 'hi' ? 'अपनी राय या अनुभव साझा करें...' : 'Write a constructive comment...'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs shadow-xs transition-colors flex-shrink-0"
                >
                  {language === 'hi' ? 'भेजें' : 'Send'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-2 text-xs text-slate-500">
              <button onClick={() => setAuthModalType('login')} className="text-amber-600 font-bold hover:underline">
                {t.login}
              </button>{' '}
              {language === 'hi' ? 'करके टिप्पणी में भाग लें।' : 'to join the discussion.'}
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-3 pt-1">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-300 flex-shrink-0"
                    />
                    <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                          <span>{comment.authorName}</span>
                          {comment.isVerified && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          )}
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({comment.authorDistrict})
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                        <button
                          onClick={() => setReplyToCommentId(replyToCommentId === comment.id ? null : comment.id)}
                          className="hover:underline font-semibold text-amber-700 dark:text-amber-400"
                        >
                          {language === 'hi' ? 'उत्तर दें (Reply)' : 'Reply'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Replies Thread */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-9 space-y-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2">
                          <CornerDownRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-2" />
                          <div className="flex-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl p-2.5 border border-slate-200 dark:border-slate-700 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-900 dark:text-white">
                                {reply.authorName}
                              </span>
                              <span className="text-[10px] text-slate-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-slate-800 dark:text-slate-200">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input Box */}
                  {replyToCommentId === comment.id && currentUser && (
                    <div className="pl-9 flex items-center gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder={language === 'hi' ? 'उत्तर लिखें...' : 'Write reply...'}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddReply(comment.id)}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                      >
                        {language === 'hi' ? 'जवाब दें' : 'Reply'}
                      </button>
                    </div>
                  )}

                </div>
              ))
            ) : (
              <p className="text-center text-xs text-slate-400 py-2">
                {t.emptyComments}
              </p>
            )}
          </div>

        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm font-serif">
                {language === 'hi' ? 'पोस्ट साझा करें' : 'Share Post'}
              </h4>
              <button onClick={() => setIsShareModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {language === 'hi' ? 'यह जानकारी अपने सहकर्मियों के साथ साझा करें:' : 'Share this update with colleagues:'}
            </p>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => {
                  alert(language === 'hi' ? 'पोस्ट आपके जिले के समूह में साझा कर दी गई!' : 'Shared to district group!');
                  setIsShareModalOpen(false);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-semibold flex items-center justify-between"
              >
                <span>{language === 'hi' ? 'जिले की कम्युनिटी में साझा करें' : 'Share to District Community'}</span>
                <span className="text-amber-600">→</span>
              </button>

              <button
                onClick={() => {
                  alert(language === 'hi' ? 'पोस्ट आपके विभाग में साझा कर दी गई!' : 'Shared to department group!');
                  setIsShareModalOpen(false);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-semibold flex items-center justify-between"
              >
                <span>{language === 'hi' ? 'विभागीय समूह में साझा करें' : 'Share to Department Group'}</span>
                <span className="text-amber-600">→</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-bold flex items-center justify-center gap-2"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? (language === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link Copied!') : (language === 'hi' ? 'लिंक कॉपी करें' : 'Copy Post Link')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-red-600 dark:text-red-400 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{language === 'hi' ? 'अनुचित सामग्री की शिकायत' : 'Report Post'}</span>
              </h4>
              <button onClick={() => setIsReportModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-xs text-center font-bold">
                ✓ {language === 'hi' ? 'रिपोर्ट व्यवस्थापक को भेज दी गई है। धन्यवाद।' : 'Report submitted to moderators. Thank you.'}
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'शिकायत का कारण चुनें:' : 'Select violation reason:'}
                  </label>
                  <select
                    value={reportReason}
                    onChange={e => setReportReason(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value="spam">स्पैम / अनचाही सामग्री (Spam)</option>
                    <option value="fake_info">भ्रामक या गलत जानकारी (Misleading Info)</option>
                    <option value="abuse">गाली-गलौज / अभद्र भाषा (Abusive)</option>
                    <option value="harassment">उत्पीड़न / धमकी (Harassment)</option>
                    <option value="fraud">नौकरी के नाम पर धोखाधड़ी (Scam / Fraud)</option>
                    <option value="inappropriate">अन्य आपत्तिजनक (Inappropriate)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'अतिरिक्त विवरण (यदि हो):' : 'Additional Notes (Optional):'}
                  </label>
                  <textarea
                    rows={2}
                    value={reportNotes}
                    onChange={e => setReportNotes(e.target.value)}
                    placeholder="e.g. This link asks for payment for recruitment"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800"
                  >
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    {language === 'hi' ? 'रिपोर्ट भेजें' : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </article>
  );
};
