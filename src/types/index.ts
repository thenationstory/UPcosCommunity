export type Language = 'hi' | 'en';
export type ThemeMode = 'light' | 'dark';

export type UserRole = 'member' | 'verified_member' | 'group_moderator' | 'moderator' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface UserPrivacySettings {
  profileVisibility: 'public' | 'members_only' | 'district_only';
  showPhone: boolean;
  showEmail: boolean;
  showEmployeeId: boolean;
  showJoiningDate: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  nameHi?: string;
  email: string;
  phone?: string;
  avatar: string;
  coverImage?: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  verificationRequestedAt?: string;
  verificationReviewedAt?: string;
  verificationDocumentUrl?: string;
  verificationNotes?: string;
  
  // Professional details
  employeeId?: string;
  department: string;
  departmentHi?: string;
  organization: string; // Office / Institution
  designation: string;
  designationHi?: string;
  district: string;
  districtHi?: string;
  blockTehsil?: string;
  workLocation?: string;
  joiningDate?: string;
  outsourcingAgency: string;
  employeeCategory?: string; // e.g. Technical, Administrative, Paramedical, Support Staff
  
  bio?: string;
  skills: string[];
  interests: string[];
  privacy: UserPrivacySettings;
  followersCount: number;
  followingCount: number;
  createdAt: string;
}

export type ReactionType = 'like' | 'helpful' | 'support' | 'important';

export interface ReactionCount {
  like: number;
  helpful: number;
  support: number;
  important: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: string;
  authorDistrict: string;
  isVerified: boolean;
  content: string;
  createdAt: string;
  likesCount: number;
  userLiked?: boolean;
  parentId?: string; // For threaded comments
  replies?: Comment[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  votedUserIds: string[];
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt?: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: string;
  authorDistrict: string;
  authorDesignation?: string;
  isVerified: boolean;
  isOfficial?: boolean;
  isPinned?: boolean;
  content: string;
  images?: string[];
  videoUrl?: string;
  document?: {
    name: string;
    url: string;
    size: string;
    type: string;
  };
  poll?: Poll;
  category?: 'general' | 'salary' | 'official_order' | 'district' | 'department' | 'question';
  districtTag?: string;
  departmentTag?: string;
  createdAt: string;
  reactions: ReactionCount;
  userReaction?: ReactionType | null;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  comments?: Comment[];
}

export interface DistrictInfo {
  id: string;
  name: string;
  nameHi: string;
  zone: string;
  hq: string;
  memberCount: number;
  activeDiscussions: number;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  nameHi: string;
  category: string;
  iconName: string;
  memberCount: number;
  openIssuesCount: number;
}

export interface QuestionAnswer {
  id: string;
  questionId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: string;
  authorDistrict: string;
  isVerified: boolean;
  content: string;
  createdAt: string;
  upvotes: number;
  isBestAnswer?: boolean;
}

export interface Question {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: string;
  authorDistrict: string;
  isVerified: boolean;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  answersCount: number;
  viewsCount: number;
  upvotes: number;
  hasBestAnswer: boolean;
  answers?: QuestionAnswer[];
  upvotedUserIds?: string[];
}

export interface DocumentResource {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  category: 'government_order' | 'circular' | 'form' | 'rule_guideline' | 'employee_resource';
  department?: string;
  fileType: 'pdf' | 'doc' | 'image';
  fileSize: string;
  fileUrl: string;
  downloadsCount: number;
  uploadedBy: string;
  isOfficial: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  actorId: string;
  actorName: string;
  actorAvatar: string;
  type: 'like' | 'comment' | 'reply' | 'follow' | 'verification_approved' | 'verification_rejected' | 'announcement' | 'id_ready';
  title: string;
  message: string;
  targetId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  imageUrl?: string;
  createdAt: string;
  isRead: boolean;
}

export interface CommunityGroup {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  coverImage: string;
  category: 'district' | 'department' | 'special_interest' | 'union';
  district?: string;
  department?: string;
  membersCount: number;
  isJoined?: boolean;
  isPrivate?: boolean;
  rules: string[];
  createdAt: string;
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'post' | 'comment' | 'user' | 'document';
  targetId: string;
  targetTitleOrSnippet: string;
  reason: 'spam' | 'fake_info' | 'abuse' | 'harassment' | 'fraud' | 'misleading' | 'inappropriate' | 'other';
  notes?: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'action_taken';
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  titleHi: string;
  content: string;
  contentHi: string;
  category: 'urgent' | 'policy' | 'notice' | 'event';
  isPinned: boolean;
  publishedAt: string;
  authorName: string;
}
