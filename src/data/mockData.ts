import { 
  UserProfile, Post, Question, DocumentResource, CommunityGroup, 
  NotificationItem, MessageItem, Announcement, ModerationReport 
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Rahul Kumar',
    nameHi: 'राहुल कुमार',
    email: 'rahul.kumar.uposn@gmail.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80',
    role: 'verified_member',
    verificationStatus: 'verified',
    verificationReviewedAt: '2026-08-15',
    employeeId: 'UP-HLT-LKO-4821',
    department: 'Medical, Health & Family Welfare',
    departmentHi: 'चिकित्सा, स्वास्थ्य एवं परिवार कल्याण विभाग',
    organization: 'Dr. Ram Manohar Lohia Hospital, Gomti Nagar',
    designation: 'Senior Data Entry Operator',
    designationHi: 'वरिष्ठ डाटा एंट्री ऑपरेटर',
    district: 'Lucknow',
    districtHi: 'लखनऊ',
    blockTehsil: 'Sarojini Nagar',
    workLocation: 'Gomti Nagar Health Complex',
    joiningDate: '2022-03-12',
    outsourcingAgency: 'Avani Paramedical & IT Services Pvt Ltd',
    employeeCategory: 'deo',
    bio: 'लखनऊ चिकित्सा विभाग में 4 वर्षों से आउटसोर्स पर कार्यरत। स्वास्थ्य कर्मियों एवं डाटा ऑपरेटरों के अधिकारों और समय पर वेतन के लिए प्रयासरत।',
    skills: ['MIS Reporting', 'HMIS Portal', 'Data Entry', 'Ayushman Bharat Processing', 'Excel & DB'],
    interests: ['Salary Regularity', 'EPF Grievances', 'Employee Rights', 'Tech in Healthcare'],
    privacy: {
      profileVisibility: 'public',
      showPhone: false,
      showEmail: false,
      showEmployeeId: true,
      showJoiningDate: true,
    },
    followersCount: 342,
    followingCount: 118,
    createdAt: '2025-01-10',
  },
  {
    id: 'user-2',
    name: 'Amit Singh',
    nameHi: 'अमित सिंह',
    email: 'amit.singh.kanpur@gmail.com',
    phone: '+91 94150 11223',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80',
    role: 'verified_member',
    verificationStatus: 'verified',
    verificationReviewedAt: '2026-08-20',
    employeeId: 'UP-EDU-KNP-1092',
    department: 'Basic Education Department (बेसिक शिक्षा)',
    departmentHi: 'बेसिक शिक्षा विभाग',
    organization: 'BSA Office Kanpur Nagar, Civil Lines',
    designation: 'Computer Operator & Prerna Portal Incharge',
    designationHi: 'कंप्यूटर ऑपरेटर एवं प्रेरणा पोर्टल प्रभारी',
    district: 'Kanpur Nagar',
    districtHi: 'कानपुर नगर',
    blockTehsil: 'Kalyanpur',
    workLocation: 'BSA Compound, Mall Road',
    joiningDate: '2021-07-01',
    outsourcingAgency: 'U.P. Electronics Corporation (UPLC) vendor',
    employeeCategory: 'deo',
    bio: 'बेसिक शिक्षा विभाग कानपुर नगर में प्रेरणा पोर्टल व शिक्षक सेवा सत्यापन का कार्य। कानपुर आउटसोर्स संघ का सक्रिय सदस्य।',
    skills: ['Prerna Portal', 'Mid-Day Meal Reporting', 'Office Automation', 'PF Tracking'],
    interests: ['Education Updates', 'Salary Revision', 'District Support'],
    privacy: {
      profileVisibility: 'public',
      showPhone: false,
      showEmail: false,
      showEmployeeId: true,
      showJoiningDate: true,
    },
    followersCount: 512,
    followingCount: 94,
    createdAt: '2025-02-05',
  },
  {
    id: 'user-3',
    name: 'Pooja Verma',
    nameHi: 'पूजा वर्मा',
    email: 'pooja.verma.pryg@gmail.com',
    phone: '+91 88997 76655',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    role: 'verified_member',
    verificationStatus: 'verified',
    verificationReviewedAt: '2026-08-25',
    employeeId: 'UP-MNC-PRY-3041',
    department: 'Urban Development & Municipalities (नगर विकास एवं नगर निगम)',
    departmentHi: 'नगर विकास एवं नगर निगम',
    organization: 'Prayagraj Nagar Nigam, Civil Lines',
    designation: 'Accounts & Billing Clerk',
    designationHi: 'लेखा एवं बिलिंग सहायक',
    district: 'Prayagraj (Allahabad)',
    districtHi: 'प्रयागराज',
    blockTehsil: 'Sadar',
    workLocation: 'Nagar Nigam Head Office',
    joiningDate: '2023-01-15',
    outsourcingAgency: 'Carepro Facility Management Services',
    employeeCategory: 'clerical',
    bio: 'प्रयागराज नगर निगम में जल मूल्य एवं गृह कर बिलिंग संविदा पर। सभी महिला आउटसोर्स कर्मचारियों के सम्मान व सुविधाओं की समर्थक।',
    skills: ['Billing Software', 'Tally ERP', 'Property Tax Database', 'MS Office'],
    interests: ['Maternity Leave for Contract Employees', 'Equal Pay for Equal Work'],
    privacy: {
      profileVisibility: 'public',
      showPhone: false,
      showEmail: false,
      showEmployeeId: true,
      showJoiningDate: true,
    },
    followersCount: 289,
    followingCount: 140,
    createdAt: '2025-03-12',
  },
  {
    id: 'user-4',
    name: 'Sandeep Yadav',
    nameHi: 'संदीप यादव',
    email: 'sandeep.yadav.agr@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    role: 'member',
    verificationStatus: 'pending',
    verificationRequestedAt: '2026-09-02',
    employeeId: 'UP-DEV-AGR-8812',
    department: 'Development Authorities (LDA, KDA, GDA, NOIDA)',
    departmentHi: 'विकास प्राधिकरण (ADA आगरा)',
    organization: 'Agra Development Authority (ADA)',
    designation: 'Junior Surveyor Assistant',
    designationHi: 'कनिष्ठ सर्वेक्षक सहायक',
    district: 'Agra',
    districtHi: 'आगरा',
    blockTehsil: 'Tajganj',
    workLocation: 'ADA Jaipur House, Agra',
    joiningDate: '2024-04-10',
    outsourcingAgency: 'Apex Security & Allied Services',
    employeeCategory: 'field',
    bio: 'आगरा विकास प्राधिकरण में साइट मैपिंग एवं रिकॉर्ड मेंटेनेंस। हाल ही में कम्युनिटी से जुड़ा हूं।',
    skills: ['Site Survey', 'AutoCAD basic', 'Field Verification'],
    interests: ['Job Stability', 'Insurance Benefits'],
    privacy: {
      profileVisibility: 'public',
      showPhone: false,
      showEmail: false,
      showEmployeeId: false,
      showJoiningDate: true,
    },
    followersCount: 78,
    followingCount: 65,
    createdAt: '2025-05-20',
  },
  {
    id: 'user-admin',
    name: 'Rajesh Sharma (Admin)',
    nameHi: 'राजेश शर्मा (एडमिन)',
    email: 'admin.uposn@govcommunity.org',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    role: 'admin',
    verificationStatus: 'verified',
    verificationReviewedAt: '2025-01-01',
    employeeId: 'UPOSN-ADMIN-001',
    department: 'Revenue & Tehsil Administration (राजस्व परिषद)',
    departmentHi: 'राजस्व परिषद एवं तहसील प्रशासन',
    organization: 'UP Outsource Seva Nigam Core Team, Lucknow',
    designation: 'State Coordinator & Portal Admin',
    designationHi: 'राज्य समन्वयक एवं पोर्टल व्यवस्थापक',
    district: 'Lucknow',
    districtHi: 'लखनऊ',
    workLocation: 'Vidhan Sabha Marg, Lucknow',
    joiningDate: '2020-01-01',
    outsourcingAgency: 'UPOSN Employee Forum Registry',
    employeeCategory: 'clerical',
    bio: 'उत्तर प्रदेश आउटसोर्स सेवा निगम डिजिटल मंच के मुख्य व्यवस्थापक। सभी 75 जिलों के आउटसोर्स कर्मियों को एकजुट और सशक्त बनाना हमारा संकल्प है।',
    skills: ['Community Leadership', 'Legal Advocacy', 'Outsourcing Policy Analysis', 'Portal Administration'],
    interests: ['Policy Reforms', 'Service Security', 'District Welfare'],
    privacy: {
      profileVisibility: 'public',
      showPhone: false,
      showEmail: true,
      showEmployeeId: true,
      showJoiningDate: true,
    },
    followersCount: 1420,
    followingCount: 45,
    createdAt: '2024-12-01',
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Important: Revised Minimum Wages Notification for Outsourced Manpower (UP Govt)',
    titleHi: 'महत्वपूर्ण सूचना: उत्तर प्रदेश सरकार द्वारा आउटसोर्सिंग कार्मिकों के न्यूनतम वेतन में पुनरीक्षण आदेश',
    content: 'All outsourcing personnel working across UP departments are advised to check their respective category minimum wage revision circular. Ensure your agency is not deducting arbitrary administrative charges.',
    contentHi: 'समस्त विभागों में कार्यरत आउटसोर्स कर्मचारियों को सूचित किया जाता है कि श्रम विभाग के नवीनतम आदेशानुसार वेतन पुनरीक्षण विवरण पोर्टल पर अपलोड कर दिया गया है। अपनी एजेंसी द्वारा की जाने वाली कटौतियों पर नजर रखें।',
    category: 'urgent',
    isPinned: true,
    publishedAt: '2026-09-04',
    authorName: 'राजेश शर्मा (राज्य समन्वयक)'
  },
  {
    id: 'ann-2',
    title: 'Digital Employee Community ID Generation Now Live with Instant QR Verification',
    titleHi: 'डिजिटल कर्मचारी कम्युनिटी ID कार्ड जनरेशन एवं लाइव QR सत्यापन सुविधा शुरू',
    content: 'Verified members can now generate and download their official UPOSN Digital ID Card with tamper-proof QR code. Submit your verification in profile settings if not yet verified.',
    contentHi: 'सत्यापित कर्मचारी अब अपनी प्रोफाइल से डिजिटल आईडी कार्ड डाउनलोड कर सकते हैं। कार्ड पर मौजूद क्यूआर कोड से कोई भी व्यक्ति आपकी कम्युनिटी सदस्यता का सत्यापन कर सकता है।',
    category: 'notice',
    isPinned: false,
    publishedAt: '2026-09-01',
    authorName: 'UPOSN IT सेल'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-admin',
    authorName: 'राजेश शर्मा (एडमिन)',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    authorDepartment: 'राजस्व परिषद एवं तहसील प्रशासन',
    authorDistrict: 'लखनऊ',
    authorDesignation: 'राज्य समन्वयक',
    isVerified: true,
    isOfficial: true,
    isPinned: true,
    content: '📢 आवश्यक सूचना समस्त आउटसोर्स कर्मचारियों के लिए:\n\nउत्तर प्रदेश शासन द्वारा सेवायोजन पोर्टल (Rojgar Sangam) एवं जेम (GeM) पोर्टल के माध्यम से कार्यरत सभी आउटसोर्सिंग कर्मियों के ईपीएफ (EPF) और ईएसआई (ESI) अंशदान को समय पर जमा करने का कड़ा निर्देश जारी हुआ है।\n\nयदि किसी भी जिले में एजेंसी द्वारा आपका ईपीएफ यूएएन (UAN) लिंक नहीं किया गया है या पासबुक में कटौती नहीं दिख रही है, तो तुरंत अपने आहरण-वितरण अधिकारी (DDO) को लिखित शिकायत दें। नीचे दिए गए प्रारूप को डाउनलोड करें।',
    category: 'official_order',
    document: {
      name: 'UP_Govt_Outsource_EPF_Directives_2026.pdf',
      url: '#',
      size: '1.4 MB',
      type: 'PDF'
    },
    createdAt: '2 घंटे पहले',
    reactions: { like: 142, helpful: 89, support: 230, important: 175 },
    userReaction: 'important',
    commentsCount: 38,
    sharesCount: 64,
    savesCount: 88,
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        authorId: 'user-2',
        authorName: 'अमित सिंह',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        authorDepartment: 'बेसिक शिक्षा विभाग',
        authorDistrict: 'कानपुर नगर',
        isVerified: true,
        content: 'बहुत ही सराहनीय पहल! कानपुर नगर में हमारे कई साथियों का पिछले 4 माह का ईपीएफ जमा नहीं हुआ था। इस आदेश की प्रति लेकर कल ही हम बीएसए महोदय से मिलेंगे।',
        createdAt: '1 घंटा पहले',
        likesCount: 24,
        userLiked: true,
        replies: [
          {
            id: 'c-1-1',
            postId: 'post-1',
            authorId: 'user-admin',
            authorName: 'राजेश शर्मा (एडमिन)',
            authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
            authorDepartment: 'राजस्व परिषद',
            authorDistrict: 'लखनऊ',
            isVerified: true,
            content: 'अमित जी, ज्ञापन की प्रति देने के बाद रिसीविंग अवश्य लें और उसकी फोटो कम्युनिटी में साझा करें ताकि अन्य जिलों को भी मार्गदर्शन मिले।',
            createdAt: '45 मिनट पहले',
            likesCount: 16,
            parentId: 'c-1'
          }
        ]
      },
      {
        id: 'c-2',
        postId: 'post-1',
        authorId: 'user-3',
        authorName: 'पूजा वर्मा',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        authorDepartment: 'नगर विकास एवं नगर निगम',
        authorDistrict: 'प्रयागराज',
        isVerified: true,
        content: 'नगर निगम प्रयागराज में भी यही स्थिति है। एजेंसी वेतन से तो 12% काट लेती है लेकिन ईपीएफओ पोर्टल पर महीनों तक अपडेट नहीं होता। क्या इसके लिए सीधे लेबर कमिश्नर को शिकायत कर सकते हैं?',
        createdAt: '30 मिनट पहले',
        likesCount: 12
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'user-1',
    authorName: 'Rahul Kumar',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorDepartment: 'चिकित्सा, स्वास्थ्य एवं परिवार कल्याण विभाग',
    authorDistrict: 'Lucknow',
    authorDesignation: 'Senior Data Entry Operator',
    isVerified: true,
    isOfficial: false,
    content: 'साथियों, हमारे स्वास्थ्य विभाग में पिछले 2 महीने से एजेंसी द्वारा वेतन जारी नहीं हुआ है। सभी साथियों से राय चाहिए:\n\nक्या आपके जिले/विभाग में माह अगस्त 2026 का वेतन प्राप्त हो चुका है?',
    category: 'salary',
    poll: {
      id: 'poll-1',
      question: 'आपके विभाग में पिछले माह का वेतन कब मिला?',
      totalVotes: 328,
      options: [
        { id: 'opt-1', text: '1 से 7 तारीख के बीच (समय पर)', votes: 42, votedUserIds: [] },
        { id: 'opt-2', text: '8 से 15 तारीख के बीच', votes: 85, votedUserIds: [] },
        { id: 'opt-3', text: '15 तारीख के बाद मिला', votes: 76, votedUserIds: [] },
        { id: 'opt-4', text: 'अभी तक बकाया है (लंबित)', votes: 125, votedUserIds: ['user-1'] }
      ]
    },
    createdAt: '5 घंटे पहले',
    reactions: { like: 88, helpful: 32, support: 195, important: 110 },
    userReaction: 'support',
    commentsCount: 22,
    sharesCount: 19,
    savesCount: 14
  },
  {
    id: 'post-3',
    authorId: 'user-2',
    authorName: 'Amit Singh',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorDepartment: 'Basic Education Department (बेसिक शिक्षा)',
    authorDistrict: 'Kanpur Nagar',
    authorDesignation: 'Computer Operator',
    isVerified: true,
    content: 'कानपुर नगर के सभी आउटसोर्सिंग कर्मचारी साथियों के लिए खुशी का समाचार! आज हमारे संगठन द्वारा मुख्य विकास अधिकारी (CDO) महोदय को दिए गए ज्ञापन का संज्ञान लेते हुए बेसिक शिक्षा के सभी 40 ऑपरेटरों का रुका हुआ मानदेय निर्गत करने का आदेश दे दिया गया है।\n\nएकजुटता में ही शक्ति है। यूपी आउटसोर्स सेवा निगम मंच से हमें एक मंच पर आने में बहुत मदद मिली!',
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: '1 दिन पहले',
    reactions: { like: 260, helpful: 45, support: 310, important: 95 },
    userReaction: 'like',
    commentsCount: 45,
    sharesCount: 52,
    savesCount: 30
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    authorId: 'user-4',
    authorName: 'Sandeep Yadav',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    authorDepartment: 'विकास प्राधिकरण (ADA आगरा)',
    authorDistrict: 'Agra',
    isVerified: false,
    title: 'क्या आउटसोर्स कर्मचारियों को आकस्मिक अवकाश (CL) और मातृत्व अवकाश (Maternity Leave) का अधिकार है?',
    content: 'नमस्ते साथियों, हमारी एजेंसी कहती है कि आउटसोर्सिंग में कोई छुट्टी नहीं मिलती, अगर छुट्टी ली तो उस दिन का वेतन कटेगा। क्या उत्तर प्रदेश शासन का इस संबंध में कोई स्पष्ट शासनादेश है? कृपया मार्गदर्शन करें।',
    category: 'leave',
    tags: ['Leave Rules', 'Maternity Leave', 'Govt Order', 'Outsourcing Rights'],
    createdAt: '1 दिन पहले',
    answersCount: 3,
    viewsCount: 412,
    upvotes: 48,
    upvotedUserIds: ['user-1'],
    hasBestAnswer: true,
    answers: [
      {
        id: 'ans-1',
        questionId: 'q-1',
        authorId: 'user-admin',
        authorName: 'राजेश शर्मा (एडमिन)',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        authorDepartment: 'राजस्व परिषद',
        authorDistrict: 'लखनऊ',
        isVerified: true,
        content: 'हाँ संदीप जी! उत्तर प्रदेश शासन कार्मिक अनुभाग के शासनादेश संख्या 12/2019/कार्मिक-2 के अनुसार, समस्त सरकारी विभागों में सेवा प्रदाता (आउटसोर्सिंग एजेंसी) के माध्यम से कार्यरत कार्मिकों को वर्ष में न्यूनतम 14 आकस्मिक अवकाश (Casual Leave) की अनुमन्यता है। इसके अतिरिक्त महिला कार्मिकों को मातृत्व प्रसुविधा अधिनियम (Maternity Benefit Act 1961) के तहत सवेतन 26 सप्ताह के मातृत्व अवकाश का विधिक अधिकार है। एजेंसी इसका वेतन नहीं काट सकती। आप शासनादेश हमारी "दस्तावेज लाइब्रेरी" से डाउनलोड कर सकते हैं।',
        createdAt: '22 घंटे पहले',
        upvotes: 62,
        isBestAnswer: true
      },
      {
        id: 'ans-2',
        questionId: 'q-1',
        authorId: 'user-1',
        authorName: 'Rahul Kumar',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        authorDepartment: 'चिकित्सा स्वास्थ्य',
        authorDistrict: 'लखनऊ',
        isVerified: true,
        content: 'स्वास्थ्य विभाग में भी पहले एजेंसी मनमानी करती थी, लेकिन मुख्य चिकित्सा अधिकारी (CMO) के पत्र के बाद अब 14 सीएल स्वीकृत की जाती हैं। अपने विभागीय नोडल अधिकारी से लिखित शिकायत करें।',
        createdAt: '18 घंटे पहले',
        upvotes: 19
      }
    ]
  },
  {
    id: 'q-2',
    authorId: 'user-3',
    authorName: 'Pooja Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorDepartment: 'नगर विकास एवं नगर निगम',
    authorDistrict: 'Prayagraj (Allahabad)',
    isVerified: true,
    title: 'आउटसोर्सिंग एजेंसी बदलने पर पुराने कर्मचारियों को हटाने का प्रयास किया जा रहा है, इसके खिलाफ क्या कानूनी उपाय है?',
    content: 'हमारे कार्यालय में नई एजेंसी का टेंडर हुआ है। नई एजेंसी पुराने अनुभवी कर्मचारियों को हटाकर नए लोगों से कमीशन लेकर भर्ती करना चाहती है। जेम पोर्टल के नियमानुसार क्या पुराने कर्मचारियों को प्राथमिकता दी जानी चाहिए?',
    category: 'agency',
    tags: ['New Tender', 'Job Security', 'GeM Portal', 'Agency Grievance'],
    createdAt: '3 दिन पहले',
    answersCount: 2,
    viewsCount: 680,
    upvotes: 94,
    upvotedUserIds: [],
    hasBestAnswer: false,
    answers: [
      {
        id: 'ans-3',
        questionId: 'q-2',
        authorId: 'user-2',
        authorName: 'Amit Singh',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        authorDepartment: 'बेसिक शिक्षा विभाग',
        authorDistrict: 'कानपुर नगर',
        isVerified: true,
        content: 'माननीय उच्च न्यायालय इलाहाबाद की विभिन्न याचिकाओं (यथा- आनंद कुमार बनाम स्टेट ऑफ यूपी) में स्पष्ट निर्णय है कि "एक संविदा/आउटसोर्स कर्मी को दूसरे संविदा कर्मी द्वारा प्रतिस्थापित नहीं किया जा सकता (Contract employee cannot be replaced by another contract employee)"। आप सभी साथी एकजुट होकर अपने विभागाध्यक्ष को कोर्ट ऑर्डर की प्रति संलग्न करते हुए तुरंत प्रत्यावेदन दें।',
        createdAt: '2 दिन पहले',
        upvotes: 81
      }
    ]
  }
];

export const INITIAL_DOCUMENTS: DocumentResource[] = [
  {
    id: 'doc-1',
    title: 'UP Government Outsourcing Manpower Policy & Minimum Wage Rates 2026',
    titleHi: 'उत्तर प्रदेश आउटसोर्सिंग नीति एवं न्यूनतम वेतन दर निर्धारण शासनादेश',
    description: 'Latest official notification by Department of Labor and Finance regarding outsourcing service provider regulations, mandatory EPF/ESI credit and minimum remuneration.',
    category: 'government_order',
    department: 'Labor & Finance Department',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    fileUrl: '#',
    downloadsCount: 1420,
    uploadedBy: 'राजेश शर्मा (एडमिन)',
    isOfficial: true,
    createdAt: '2026-08-10'
  },
  {
    id: 'doc-2',
    title: 'Standard Format for EPF / ESI Non-Deposition Grievance to DDO / Treasury',
    titleHi: 'ईपीएफ एवं ईएसआई जमा न होने पर आहरण वितरण अधिकारी को शिकायत का प्रारूप',
    description: 'Editable Word format application to submit to your department head and District Magistrate regarding delayed provident fund credit by vendor.',
    category: 'form',
    department: 'All UP Departments',
    fileType: 'doc',
    fileSize: '340 KB',
    fileUrl: '#',
    downloadsCount: 890,
    uploadedBy: 'अमित सिंह (कानपुर नगर)',
    isOfficial: false,
    createdAt: '2026-08-22'
  },
  {
    id: 'doc-3',
    title: 'High Court Order on Replacement of Contractual Outsource Employees',
    titleHi: 'संविदा एवं आउटसोर्स कार्मिकों को न हटाने संबंधी उच्च न्यायालय का महत्वपूर्ण निर्णय',
    description: 'Certified copy of judgment directing departments not to displace working outsourced staff during agency transitions without valid inquiry.',
    category: 'rule_guideline',
    department: 'Judiciary / Law Department',
    fileType: 'pdf',
    fileSize: '1.8 MB',
    fileUrl: '#',
    downloadsCount: 2310,
    uploadedBy: 'UPOSN Legal Cell',
    isOfficial: true,
    createdAt: '2026-07-15'
  },
  {
    id: 'doc-4',
    title: 'Maternity Leave & Casual Leave Sanction Rules for Outsourced Staff',
    titleHi: 'आउटसोर्सिंग कार्मिकों हेतु आकस्मिक व मातृत्व अवकाश अनुमन्यता शासनादेश',
    description: 'Government order establishing entitlement to 14 days annual casual leave and maternity benefits for contractual workers.',
    category: 'circular',
    department: 'Personnel Department (कार्मिक अनुभाग)',
    fileType: 'pdf',
    fileSize: '950 KB',
    fileUrl: '#',
    downloadsCount: 1150,
    uploadedBy: 'पूजा वर्मा (प्रयागराज)',
    isOfficial: true,
    createdAt: '2026-08-01'
  }
];

export const INITIAL_GROUPS: CommunityGroup[] = [
  {
    id: 'grp-health',
    name: 'UP Health Outsource Employees Forum',
    nameHi: 'उत्तर प्रदेश स्वास्थ्य आउटसोर्स कर्मचारी महासंघ',
    description: 'चिकित्सा एवं स्वास्थ्य विभाग, एनएचएम (NHM), जिला अस्पतालों एवं सीएचसी/पीएचसी में कार्यरत समस्त आउटसोर्सिंग कर्मियों का साझा मंच।',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    category: 'department',
    department: 'Medical, Health & Family Welfare',
    membersCount: 2840,
    isJoined: true,
    isPrivate: false,
    rules: [
      'केवल विभागीय एवं आउटसोर्स कर्मचारियों के हितों से संबंधित चर्चा करें।',
      'शालीन भाषा का प्रयोग करें, किसी भी व्यक्ति या अधिकारी पर व्यक्तिगत आक्षेप न लगाएं।',
      'वेतन विसंगति या आदेश साझा करते समय प्रमाण अवश्य संलग्न करें।'
    ],
    createdAt: '2025-01-05'
  },
  {
    id: 'grp-kanpur',
    name: 'Kanpur Nagar Outsource Employees Ekta Sangh',
    nameHi: 'कानपुर नगर आउटसोर्स कर्मचारी एकता संघ',
    description: 'कानपुर नगर के सभी विभागों (बेसिक शिक्षा, केडीए, नगर निगम, स्वास्थ्य, विकास भवन) के संविदा कर्मियों का जिला स्तरीय संगठन।',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    category: 'district',
    district: 'Kanpur Nagar',
    membersCount: 1420,
    isJoined: true,
    isPrivate: false,
    rules: [
      'कानपुर नगर जिले से संबंधित समस्याओं को प्रमुखता से उठाएं।',
      'जिलाधिकारी एवं सीडीओ ज्ञापन की प्रगति रिपोर्ट साझा करें।'
    ],
    createdAt: '2025-02-12'
  },
  {
    id: 'grp-deo',
    name: 'All UP Computer Operators & DEO Welfare Forum',
    nameHi: 'समस्त उप्र कंप्यूटर ऑपरेटर एवं डीईओ कल्याण मंच',
    description: 'उत्तर प्रदेश के सभी 75 जिलों में तहसीलों, विकास खंडों एवं विभागों में कार्यरत डाटा एंट्री ऑपरेटरों की राज्यस्तरीय कम्युनिटी।',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    category: 'special_interest',
    membersCount: 3950,
    isJoined: false,
    isPrivate: false,
    rules: [
      'सॉफ्टवेयर एवं पोर्टल तकनीकी समस्याओं पर आपसी सहयोग करें।',
      'मानदेय वृद्धि एवं पदोन्नति नीति की जानकारी साझा करें।'
    ],
    createdAt: '2025-01-20'
  },
  {
    id: 'grp-municipal',
    name: 'UP Nagar Nigam & Municipalities Workers Union',
    nameHi: 'उ.प्र. नगर निगम एवं स्थानीय निकाय कर्मचारी मंच',
    description: 'लखनऊ, कानपुर, प्रयागराज, वाराणसी, आगरा आदि नगर निगमों के सफाई, बिलिंग व तकनीकी आउटसोर्स कर्मियों का समूह।',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
    category: 'department',
    department: 'Urban Development & Municipalities',
    membersCount: 2150,
    isJoined: false,
    isPrivate: false,
    rules: ['निकाय कर्मचारियों के सुरक्षा उपकरण व ईएसआई लाभ संबंधी चर्चा।'],
    createdAt: '2025-03-01'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    actorId: 'user-admin',
    actorName: 'राजेश शर्मा (एडमिन)',
    actorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    type: 'verification_approved',
    title: 'पहचान सत्यापन स्वीकृत! 🎉',
    message: 'आपका यूपी आउटसोर्स सेवा निगम कर्मचारी सत्यापन स्वीकृत हो चुका है। अब आप अपना डिजिटल ID कार्ड डाउनलोड कर सकते हैं।',
    targetId: 'idcard',
    isRead: false,
    createdAt: '10 मिनट पहले'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    actorId: 'user-2',
    actorName: 'अमित सिंह',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    type: 'comment',
    title: 'नई टिप्पणी',
    message: 'अमित सिंह ने आपके वेतन संबंधी पोल पर टिप्पणी की।',
    targetId: 'post-2',
    isRead: false,
    createdAt: '2 घंटे पहले'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    actorId: 'user-3',
    actorName: 'पूजा वर्मा',
    actorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    type: 'follow',
    title: 'नया फॉलोअर',
    message: 'पूजा वर्मा ने आपको फॉलो करना शुरू किया।',
    targetId: 'profile-user-3',
    isRead: true,
    createdAt: '1 दिन पहले'
  }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    senderId: 'user-2',
    receiverId: 'user-1',
    text: 'नमस्ते राहुल भाई, लखनऊ में स्वास्थ्य विभाग के डीईओ का मानदेय किस मद से आ रहा है? हमारे कानपुर में बजट न होने का बहाना बना रहे हैं।',
    createdAt: '10:45 AM',
    isRead: true
  },
  {
    id: 'msg-2',
    senderId: 'user-1',
    receiverId: 'user-2',
    text: 'नमस्ते अमित जी! हमारे यहां एनएचएम (NHM) फ्लेक्सीपूल बजट हेड से सीधे एजेंसी को भुगतान होता है। यदि बजट नहीं है तो मुख्य चिकित्सा अधिकारी स्तर से अतिरिक्त मांग पत्र शासन को भेजा जाता है।',
    createdAt: '10:50 AM',
    isRead: true
  },
  {
    id: 'msg-3',
    senderId: 'user-2',
    receiverId: 'user-1',
    text: 'धन्यवाद! क्या आप इसके शासनादेश का पत्रांक नंबर दे सकते हैं ताकि हम इसे ज्ञापन में लिख सकें?',
    createdAt: '11:02 AM',
    isRead: true
  },
  {
    id: 'msg-4',
    senderId: 'user-1',
    receiverId: 'user-2',
    text: 'जी बिल्कुल, शासनादेश संख्या 142/2025/एनएचएम-बजट है। मैंने कम्युनिटी की "दस्तावेज लाइब्रेरी" में भी अपलोड कर दिया है।',
    createdAt: '11:05 AM',
    isRead: false
  }
];

export const INITIAL_REPORTS: ModerationReport[] = [
  {
    id: 'rep-1',
    reporterId: 'user-2',
    reporterName: 'अमित सिंह',
    targetType: 'post',
    targetId: 'sample-spam-post',
    targetTitleOrSnippet: 'बिना परीक्षा आउटसोर्सिंग पर स्थायी नौकरी का झांसा देने वाला फर्जी लिंक',
    reason: 'fraud',
    notes: 'यह यूजर पैसे लेकर फर्जी नियुक्ति पत्र देने का दावा कर रहा है। तुरंत ब्लॉक करें।',
    status: 'pending',
    createdAt: '2026-09-06'
  }
];
