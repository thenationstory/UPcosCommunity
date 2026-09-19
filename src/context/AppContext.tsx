import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, Post, Comment, Question, DocumentResource, CommunityGroup, 
  NotificationItem, MessageItem, Announcement, ModerationReport,
  Language, ThemeMode, ReactionType
} from '../types';
import { 
  INITIAL_USERS, INITIAL_POSTS, INITIAL_QUESTIONS, 
  INITIAL_DOCUMENTS, INITIAL_GROUPS, INITIAL_NOTIFICATIONS, 
  INITIAL_MESSAGES, INITIAL_ANNOUNCEMENTS, INITIAL_REPORTS 
} from '../data/mockData';
import { translations } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  t: typeof translations.hi;
  
  // Navigation & Routing
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedDistrictId: string | null;
  setSelectedDistrictId: (id: string | null) => void;
  selectedDepartmentId: string | null;
  setSelectedDepartmentId: (id: string | null) => void;
  viewingUserId: string | null;
  setViewingUserId: (id: string | null) => void;
  
  // Auth & Current User
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  loginAs: (userId: string) => void;
  logout: () => void;
  allUsers: UserProfile[];
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => void;
  followUser: (targetUserId: string) => void;
  
  // Modals
  authModalType: 'login' | 'register' | null;
  setAuthModalType: (type: 'login' | 'register' | null) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isVerificationModalOpen: boolean;
  setIsVerificationModalOpen: (open: boolean) => void;
  verificationScanTargetId: string | null;
  setVerificationScanTargetId: (id: string | null) => void;
  isDisclaimerOpen: boolean;
  setIsDisclaimerOpen: (open: boolean) => void;
  disclaimerAccepted: boolean;
  acceptDisclaimer: () => void;
  
  // Content operations
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'reactions' | 'commentsCount' | 'sharesCount' | 'savesCount'>) => void;
  reactToPost: (postId: string, reaction: ReactionType) => void;
  addComment: (postId: string, content: string, parentId?: string) => void;
  deletePost: (postId: string) => void;
  savedItemIds: string[];
  toggleSaveItem: (id: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  
  // Questions & Discussions
  questions: Question[];
  addQuestion: (title: string, content: string, category: string, tags: string[]) => void;
  addAnswer: (questionId: string, content: string) => void;
  markBestAnswer: (questionId: string, answerId: string) => void;
  upvoteQuestion: (questionId: string) => void;
  
  // Documents
  documents: DocumentResource[];
  addDocument: (doc: Omit<DocumentResource, 'id' | 'createdAt' | 'downloadsCount'>) => void;
  
  // Groups
  groups: CommunityGroup[];
  toggleJoinGroup: (groupId: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markAllNotificationsAsRead: () => void;
  
  // Messaging
  messages: MessageItem[];
  sendMessage: (receiverId: string, text: string) => void;
  
  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'publishedAt'>) => void;
  announcement: {
    text: string;
    textEn?: string;
    type: 'announcement' | 'emergency' | 'update';
    isActive: boolean;
  };
  updateAnnouncement: (data: { text: string; textEn?: string; type: string; isActive: boolean }) => void;
  
  // Moderation & Admin
  reports: ModerationReport[];
  submitReport: (report: Omit<ModerationReport, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName'>) => void;
  adminApproveVerification: (userId: string, notes?: string) => void;
  adminRejectVerification: (userId: string, notes?: string) => void;
  adminDismissReport: (reportId: string) => void;
  adminTakeReportAction: (reportId: string) => void;
  approveVerification: (userId: string, notes?: string) => void;
  rejectVerification: (userId: string, notes?: string) => void;
  handleReportAction: (reportId: string, action: 'dismiss' | 'remove_content') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('uposn_lang') as Language) || 'hi';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('uposn_theme') as ThemeMode) || 'light';
  });

  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('uposn_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('uposn_current_user');
    if (saved) return JSON.parse(saved);
    // Default to Rahul Kumar (verified member) for demo accessibility
    return INITIAL_USERS[0];
  });

  const [authModalType, setAuthModalType] = useState<'login' | 'register' | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [verificationScanTargetId, setVerificationScanTargetId] = useState<string | null>(null);

  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(() => {
    return localStorage.getItem('uposn_disclaimer_accepted') === 'true';
  });
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(() => {
    return localStorage.getItem('uposn_disclaimer_accepted') !== 'true';
  });

  const acceptDisclaimer = () => {
    localStorage.setItem('uposn_disclaimer_accepted', 'true');
    localStorage.setItem('uposn_disclaimer_accepted_at', new Date().toISOString());
    setDisclaimerAccepted(true);
    setIsDisclaimerOpen(false);
  };

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_posts');
      if (saved) {
        const parsed: Post[] = JSON.parse(saved);
        return parsed.map(p => {
          if (p.poll) {
            return {
              ...p,
              poll: {
                ...p.poll,
                options: (p.poll.options || []).map(opt => ({
                  ...opt,
                  votedUserIds: opt.votedUserIds || []
                }))
              }
            };
          }
          return p;
        });
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_POSTS;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_questions');
      if (saved) {
        const parsed: Question[] = JSON.parse(saved);
        return parsed.map(q => ({
          ...q,
          upvotedUserIds: q.upvotedUserIds || [],
          answers: q.answers || []
        }));
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_QUESTIONS;
  });

  const [documents, setDocuments] = useState<DocumentResource[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_docs');
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  const [groups, setGroups] = useState<CommunityGroup[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_groups');
      return saved ? JSON.parse(saved) : INITIAL_GROUPS;
    } catch {
      return INITIAL_GROUPS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_notifs');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [messages, setMessages] = useState<MessageItem[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_announcements');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [reports, setReports] = useState<ModerationReport[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uposn_saved');
      return saved ? JSON.parse(saved) : ['post-1', 'doc-1'];
    } catch {
      return ['post-1', 'doc-1'];
    }
  });

  // Sync with LocalStorage & DOM
  useEffect(() => {
    localStorage.setItem('uposn_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('uposn_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('uposn_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('uposn_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('uposn_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('uposn_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('uposn_saved', JSON.stringify(savedItemIds));
  }, [savedItemIds]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = translations[language];

  const loginAs = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setAuthModalType(null);
      if (currentView === 'home' && !user.workLocation) {
        setIsOnboardingOpen(true);
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const updateCurrentUserProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const followUser = (targetUserId: string) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    setAllUsers(prev => prev.map(u => {
      if (u.id === targetUserId) {
        return { ...u, followersCount: u.followersCount + 1 };
      }
      return u;
    }));
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: targetUserId,
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorAvatar: currentUser.avatar,
      type: 'follow',
      title: language === 'hi' ? 'नया फॉलोअर' : 'New Follower',
      message: `${currentUser.name} ${language === 'hi' ? 'ने आपको फॉलो करना शुरू किया' : 'started following you'}`,
      isRead: false,
      createdAt: 'अभी-अभी'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addPost = (newPostData: Omit<Post, 'id' | 'createdAt' | 'reactions' | 'commentsCount' | 'sharesCount' | 'savesCount'>) => {
    const created: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      createdAt: 'अभी-अभी',
      reactions: { like: 0, helpful: 0, support: 0, important: 0 },
      commentsCount: 0,
      sharesCount: 0,
      savesCount: 0,
      comments: []
    };
    setPosts(prev => [created, ...prev]);
  };

  const reactToPost = (postId: string, reaction: ReactionType) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const currentReaction = p.userReaction;
        const newReactions = { ...p.reactions };
        
        if (currentReaction === reaction) {
          // toggle off
          newReactions[reaction] = Math.max(0, newReactions[reaction] - 1);
          return { ...p, reactions: newReactions, userReaction: null };
        } else {
          if (currentReaction) {
            newReactions[currentReaction] = Math.max(0, newReactions[currentReaction] - 1);
          }
          newReactions[reaction] = (newReactions[reaction] || 0) + 1;
          return { ...p, reactions: newReactions, userReaction: reaction };
        }
      }
      return p;
    }));
  };

  const addComment = (postId: string, content: string, parentId?: string) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorDepartment: currentUser.department,
      authorDistrict: currentUser.district,
      isVerified: currentUser.verificationStatus === 'verified',
      content,
      createdAt: 'अभी-अभी',
      likesCount: 0,
      parentId
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const comments = p.comments || [];
        if (parentId) {
          // Threaded comment inside reply
          const updatedComments = comments.map(c => {
            if (c.id === parentId) {
              return { ...c, replies: [...(c.replies || []), newComment] };
            }
            return c;
          });
          return { ...p, comments: updatedComments, commentsCount: p.commentsCount + 1 };
        }
        return {
          ...p,
          comments: [newComment, ...comments],
          commentsCount: p.commentsCount + 1
        };
      }
      return p;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const toggleSaveItem = (id: string) => {
    setSavedItemIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const votePoll = (postId: string, optionId: string) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    setPosts(prev => prev.map(p => {
      if (p.id === postId && p.poll) {
        const alreadyVoted = p.poll.options.some(opt => (opt.votedUserIds || []).includes(currentUser.id));
        if (alreadyVoted) return p;

        const updatedOptions = p.poll.options.map(opt => {
          if (opt.id === optionId) {
            return {
              ...opt,
              votes: opt.votes + 1,
              votedUserIds: [...(opt.votedUserIds || []), currentUser.id]
            };
          }
          return opt;
        });

        return {
          ...p,
          poll: {
            ...p.poll,
            options: updatedOptions,
            totalVotes: p.poll.totalVotes + 1
          }
        };
      }
      return p;
    }));
  };

  const addQuestion = (title: string, content: string, category: string, tags: string[]) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    const q: Question = {
      id: `q-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorDepartment: currentUser.department,
      authorDistrict: currentUser.district,
      isVerified: currentUser.verificationStatus === 'verified',
      title,
      content,
      category,
      tags,
      createdAt: 'अभी-अभी',
      answersCount: 0,
      viewsCount: 1,
      upvotes: 0,
      hasBestAnswer: false,
      answers: [],
      upvotedUserIds: []
    };
    setQuestions(prev => [q, ...prev]);
  };

  const addAnswer = (questionId: string, content: string) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    const ans = {
      id: `ans-${Date.now()}`,
      questionId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorDepartment: currentUser.department,
      authorDistrict: currentUser.district,
      isVerified: currentUser.verificationStatus === 'verified',
      content,
      createdAt: 'अभी-अभी',
      upvotes: 0,
    };
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answersCount: q.answersCount + 1,
          answers: [...(q.answers || []), ans]
        };
      }
      return q;
    }));
  };

  const markBestAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const answers = (q.answers || []).map(a => ({
          ...a,
          isBestAnswer: a.id === answerId
        }));
        return { ...q, hasBestAnswer: true, answers };
      }
      return q;
    }));
  };

  const upvoteQuestion = (questionId: string) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const userIds = q.upvotedUserIds || [];
        const alreadyUpvoted = userIds.includes(currentUser.id);
        return {
          ...q,
          upvotes: alreadyUpvoted ? Math.max(0, q.upvotes - 1) : q.upvotes + 1,
          upvotedUserIds: alreadyUpvoted 
            ? userIds.filter(id => id !== currentUser.id)
            : [...userIds, currentUser.id]
        };
      }
      return q;
    }));
  };

  const addDocument = (doc: Omit<DocumentResource, 'id' | 'createdAt' | 'downloadsCount'>) => {
    const newDoc: DocumentResource = {
      ...doc,
      id: `doc-${Date.now()}`,
      createdAt: 'आज',
      downloadsCount: 1
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const toggleJoinGroup = (groupId: string) => {
    if (!currentUser) {
      setAuthModalType('login');
      return;
    }
    setGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        const isJoined = !g.isJoined;
        return {
          ...g,
          isJoined,
          membersCount: isJoined ? g.membersCount + 1 : Math.max(0, g.membersCount - 1)
        };
      }
      return g;
    }));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const sendMessage = (receiverId: string, text: string) => {
    if (!currentUser) return;
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      text,
      createdAt: 'अभी',
      isRead: false
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'publishedAt'>) => {
    const newAnn: Announcement = {
      ...announcement,
      id: `ann-${Date.now()}`,
      publishedAt: 'आज'
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const submitReport = (report: Omit<ModerationReport, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName'>) => {
    if (!currentUser) return;
    const newRep: ModerationReport = {
      ...report,
      id: `rep-${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      status: 'pending',
      createdAt: '2026-09-07'
    };
    setReports(prev => [newRep, ...prev]);
  };

  const adminApproveVerification = (userId: string, notes?: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: 'verified_member',
          verificationStatus: 'verified',
          verificationReviewedAt: '2026-09-07',
          verificationNotes: notes || 'Approved by State Admin after document verification'
        };
      }
      return u;
    }));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? {
        ...prev,
        role: 'verified_member',
        verificationStatus: 'verified',
        verificationReviewedAt: '2026-09-07',
        verificationNotes: notes || 'Approved by State Admin after document verification'
      } : null);
    }
  };

  const adminRejectVerification = (userId: string, notes?: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          verificationStatus: 'rejected',
          verificationReviewedAt: '2026-09-07',
          verificationNotes: notes || 'Supporting documents incomplete or unverified'
        };
      }
      return u;
    }));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? {
        ...prev,
        verificationStatus: 'rejected',
        verificationReviewedAt: '2026-09-07',
        verificationNotes: notes || 'Supporting documents incomplete or unverified'
      } : null);
    }
  };

  const adminDismissReport = (reportId: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'dismissed' } : r));
  };

  const adminTakeReportAction = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report && report.targetType === 'post') {
      deletePost(report.targetId);
    }
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'action_taken' } : r));
  };

  const handleReportAction = (reportId: string, action: 'dismiss' | 'remove_content') => {
    if (action === 'dismiss') {
      adminDismissReport(reportId);
    } else {
      adminTakeReportAction(reportId);
    }
  };

  const pinnedAnn = announcements.find(a => a.isPinned) || announcements[0];
  const announcement = {
    text: pinnedAnn ? (pinnedAnn.titleHi || pinnedAnn.contentHi || '') : 'उत्तर प्रदेश आउटसोर्स सेवा निगम पोर्टल',
    textEn: pinnedAnn ? (pinnedAnn.title || pinnedAnn.content || '') : 'UP Outsource Seva Nigam Community Forum',
    type: ((pinnedAnn?.category === 'urgent' ? 'emergency' : pinnedAnn?.category === 'notice' ? 'announcement' : 'update')) as 'announcement' | 'emergency' | 'update',
    isActive: Boolean(pinnedAnn?.isPinned)
  };

  const updateAnnouncement = (data: { text: string; textEn?: string; type: string; isActive: boolean }) => {
    setAnnouncements(prev => {
      const category = data.type === 'emergency' ? 'urgent' : 'notice';
      if (prev.length === 0) {
        return [{
          id: `ann-${Date.now()}`,
          title: data.textEn || data.text,
          titleHi: data.text,
          content: data.textEn || data.text,
          contentHi: data.text,
          category,
          isPinned: data.isActive,
          publishedAt: 'आज',
          authorName: currentUser?.name || 'राज्य समन्वयक'
        }];
      }
      return prev.map((a, idx) => {
        if (idx === 0 || a.isPinned) {
          return {
            ...a,
            titleHi: data.text,
            title: data.textEn || data.text,
            contentHi: data.text,
            content: data.textEn || data.text,
            category,
            isPinned: data.isActive
          };
        }
        return a;
      });
    });
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      theme, setTheme, toggleTheme,
      t,
      currentView, setCurrentView,
      selectedDistrictId, setSelectedDistrictId,
      selectedDepartmentId, setSelectedDepartmentId,
      viewingUserId, setViewingUserId,
      currentUser, setCurrentUser, loginAs, logout,
      allUsers, updateCurrentUserProfile, followUser,
      authModalType, setAuthModalType,
      isOnboardingOpen, setIsOnboardingOpen,
      isCreatePostOpen, setIsCreatePostOpen,
      isVerificationModalOpen, setIsVerificationModalOpen,
      verificationScanTargetId, setVerificationScanTargetId,
      isDisclaimerOpen, setIsDisclaimerOpen,
      disclaimerAccepted, acceptDisclaimer,
      posts, addPost, reactToPost, addComment, deletePost,
      savedItemIds, toggleSaveItem, votePoll,
      questions, addQuestion, addAnswer, markBestAnswer, upvoteQuestion,
      documents, addDocument,
      groups, toggleJoinGroup,
      notifications, markAllNotificationsAsRead,
      messages, sendMessage,
      announcements, addAnnouncement,
      announcement, updateAnnouncement,
      reports, submitReport,
      adminApproveVerification, adminRejectVerification,
      adminDismissReport, adminTakeReportAction,
      approveVerification: adminApproveVerification,
      rejectVerification: adminRejectVerification,
      handleReportAction
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
