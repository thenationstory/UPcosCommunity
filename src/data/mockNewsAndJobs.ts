export interface JobVacancy {
  id: string;
  title: string;
  titleHi: string;
  department: string;
  departmentHi: string;
  districts: string[];
  totalPosts: number;
  salary: string;
  outsourcingAgency: string;
  qualification: string;
  qualificationHi: string;
  experience?: string;
  ageLimit: string;
  lastDate: string;
  publishedDate: string;
  portalUrl: string;
  isVerified: boolean;
  isUrgent?: boolean;
  category: 'technical' | 'administrative' | 'healthcare' | 'education' | 'field';
  description: string;
  descriptionHi: string;
  requiredDocuments: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  titleHi: string;
  category: 'salary_order' | 'policy_update' | 'agency_action' | 'court_ruling' | 'welfare';
  department: string;
  departmentHi: string;
  publishedDate: string;
  author: string;
  readTime: string;
  summary: string;
  summaryHi: string;
  content: string;
  contentHi: string;
  orderNumber?: string;
  documentName?: string;
  documentSize?: string;
  isPinned?: boolean;
  tags: string[];
  imageUrl?: string;
}

export const MOCK_JOBS: JobVacancy[] = [
  {
    id: 'job-1',
    title: 'Senior Data Entry Operator & MIS Assistant',
    titleHi: 'वरिष्ठ डाटा एंट्री ऑपरेटर एवं एमआईएस सहायक',
    department: 'National Health Mission (NHM)',
    departmentHi: 'राष्ट्रीय स्वास्थ्य मिशन (एनएचएम यूपी)',
    districts: ['लखनऊ', 'कानपुर नगर', 'वाराणसी', 'गोरखपुर', 'प्रयागराज', 'आगरा', 'मेरठ'],
    totalPosts: 380,
    salary: '₹19,800 - ₹23,500 / माह + EPF/ESIC',
    outsourcingAgency: 'यूपी सेवायोजन अधिकृत एजेंसी (GeM / Sewayojan)',
    qualification: 'Graduation in any stream with CCC or O Level computer certificate & typing speed 30 WPM',
    qualificationHi: 'किसी भी विषय में स्नातक + सीसीसी (CCC) या ओ-लेवल कंप्यूटर प्रमाणपत्र व हिंदी/अंग्रेजी टाइपिंग 30 शब्द/मिनट',
    experience: '1 वर्ष डाटा एंट्री अनुभव (शासकीय/अशासकीय)',
    ageLimit: '21 से 40 वर्ष (नियमानुसार छूट)',
    lastDate: '30 मार्च 2026',
    publishedDate: '16 मार्च 2026',
    portalUrl: 'https://sewayojan.up.nic.in',
    isVerified: true,
    isUrgent: true,
    category: 'technical',
    description: 'Recruitment for HMIS and Ayushman Bharat data entry operations in district hospitals and community health centers.',
    descriptionHi: 'जनपदीय अस्पतालों एवं सामुदायिक स्वास्थ्य केंद्रों में एचएमआईएस (HMIS) एवं आयुष्मान भारत पोर्टल संचालन हेतु डाटा एंट्री कार्य। चयन सेवायोजन पोर्टल के माध्यम से सीधे मेरिट एवं कंप्यूटर टाइपिंग दक्षता के आधार पर होगा।',
    requiredDocuments: ['आधार कार्ड', 'स्नातक अंकपत्र', 'सीसीसी/ओ-लेवल प्रमाण पत्र', 'निवास प्रमाण पत्र', 'सेवायोजन पोर्टल पंजीयन संख्या']
  },
  {
    id: 'job-2',
    title: 'Panchayat Computer Assistant / DEO',
    titleHi: 'ग्राम पंचायत कंप्यूटर सहायक / एकाउंटेंट-कम-डीईओ',
    department: 'Panchayati Raj Department',
    departmentHi: 'पंचायती राज विभाग, उत्तर प्रदेश',
    districts: ['अयोध्या', 'बरेली', 'झांसी', 'अलीगढ़', 'मुरादाबाद', 'सहारनपुर', 'मिर्जापुर', 'बस्ती'],
    totalPosts: 520,
    salary: '₹16,500 / माह (मानदेय + पीएफ अंशदान)',
    outsourcingAgency: 'जिला पंचायत राज अधिकारी (DPRO) अधिकृत वेंडर',
    qualification: 'Intermediate (10+2) with Computer diploma (DCA/ADCA/CCC)',
    qualificationHi: 'इंटरमीडिएट (12वीं) उत्तीर्ण एवं न्यूनतम 6 माह का कंप्यूटर डिप्लोमा (DCA/CCC/ADCA)',
    ageLimit: '18 से 40 वर्ष',
    lastDate: '05 अप्रैल 2026',
    publishedDate: '18 मार्च 2026',
    portalUrl: 'https://sewayojan.up.nic.in',
    isVerified: true,
    category: 'administrative',
    description: 'Handling e-Gram Swaraj portal, birth-death registration and family register entries in Gram Panchayat secretariats.',
    descriptionHi: 'ग्राम सचिवालयों में ई-ग्राम स्वराज पोर्टल, परिवार रजिस्टर, जन्म-मृत्यु प्रमाण पत्र एवं ग्राम पंचायत विकास योजना (GPDP) फीडिंग का कार्य।',
    requiredDocuments: ['हाईस्कूल व इंटर अंकपत्र', 'कंप्यूटर प्रमाणपत्र', 'जाति/निवास प्रमाणपत्र', 'चरित्र प्रमाणपत्र']
  },
  {
    id: 'job-3',
    title: 'Paramedical Staff & Lab Technician',
    titleHi: 'लैब तकनीशियन एवं ओटी सहायक (आउटसोर्स)',
    department: 'Medical Education Department',
    departmentHi: 'चिकित्सा शिक्षा विभाग (राजकीय मेडिकल कॉलेज)',
    districts: ['गोरखपुर', 'कन्नौज', 'जालौन', 'बांदा', 'बदायूं', 'आजमगढ़'],
    totalPosts: 145,
    salary: '₹22,000 - ₹26,500 / माह + ईएसआई स्वास्थ्य बीमा',
    outsourcingAgency: 'अवनी हेल्थकेयर सॉल्यूशंस प्राइवेट लिमिटेड',
    qualification: 'Diploma in Medical Laboratory Technology (DMLT) from State Medical Faculty',
    qualificationHi: 'उत्तर प्रदेश स्टेट मेडिकल फैकल्टी से मान्यता प्राप्त डीएमएलटी (DMLT) डिप्लोमा',
    experience: 'न्यूनतम 6 माह क्लिनिकल अनुभव',
    ageLimit: '21 से 45 वर्ष',
    lastDate: '28 मार्च 2026',
    publishedDate: '14 मार्च 2026',
    portalUrl: 'https://sewayojan.up.nic.in',
    isVerified: true,
    category: 'healthcare',
    description: 'Pathology and diagnostic sample testing in newly established Autonomous State Medical Colleges.',
    descriptionHi: 'राजकीय मेडिकल कॉलेजों के पैथोलॉजी व ब्लड बैंक विभाग में सैंपल टेस्टिंग एवं रिपोर्टिंग कार्य। ईएसआई कार्ड व दुर्घटना बीमा अनिवार्य रूप से देय।',
    requiredDocuments: ['DMLT डिप्लोमा व अंकपत्र', 'स्टेट मेडिकल फैकल्टी रजिस्ट्रेशन', 'अनुभव प्रमाण पत्र']
  },
  {
    id: 'job-4',
    title: 'Junior Electrical & Pump Operator',
    titleHi: 'पंप ऑपरेटर एवं इलेक्ट्रीशियन (पेयजल योजना)',
    department: 'Jal Nigam (Rural) / Namami Gange',
    departmentHi: 'उ.प्र. जल निगम (ग्रामीण) / नमामि गंगे एवं ग्रामीण जलापूर्ति',
    districts: ['सोनभद्र', 'ललितपुर', 'चित्रकूट', 'महोबा', 'हमीरपुर', 'मिर्जापुर'],
    totalPosts: 310,
    salary: '₹17,200 / माह + सुरक्षा किट भत्ता',
    outsourcingAgency: 'एलएंडटी एवं एनसीसी कंस्ट्रक्शन एसोसिएट्स',
    qualification: 'ITI in Electrician / Wireman / Fitter trade',
    qualificationHi: 'आईटीआई (ITI) इलेक्ट्रीशियन या वायरमैन/फिटर ट्रेड से उत्तीर्ण',
    ageLimit: '18 से 42 वर्ष',
    lastDate: '10 अप्रैल 2026',
    publishedDate: '17 मार्च 2026',
    portalUrl: 'https://sewayojan.up.nic.in',
    isVerified: true,
    category: 'field',
    description: 'Operation and maintenance of solar and electric tube-well pump houses under Har Ghar Jal mission.',
    descriptionHi: 'हर घर जल योजना के अंतर्गत ग्रामीण पेयजल टंकियों व पंप हाउस का सुचारू संचालन एवं फॉल्ट सुधार कार्य।',
    requiredDocuments: ['आईटीआई प्रमाण पत्र', 'आधार कार्ड', 'बैंक पासबुक']
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Govt Mandates Direct Benefit Transfer (DBT) Verification for Outsource EPF Deductions',
    titleHi: 'आउटसोर्सिंग कर्मियों के ईपीएफ/ईएसआई का पारदर्शी सत्यापन अनिवार्य, शासन ने जारी किए कड़े निर्देश',
    category: 'salary_order',
    department: 'Department of Labour, UP',
    departmentHi: 'श्रम एवं सेवायोजन विभाग, उ.प्र. शासन',
    publishedDate: '18 मार्च 2026',
    author: 'शासन सचिवालय ब्यूरो, लखनऊ',
    readTime: '3 मिनट',
    isPinned: true,
    orderNumber: 'पत्रांक: 1142/श्रम-2026/ईपीएफ-निगरानी',
    documentName: 'GO_EPF_Direct_Verification_March_2026.pdf',
    documentSize: '1.2 MB',
    summary: 'The UP Government has issued an order directing all state departments to clear outsourcing agency bills only after verifying individual Universal Account Numbers (UAN) and monthly challan deposits.',
    summaryHi: 'उत्तर प्रदेश शासन ने स्पष्ट आदेश जारी किया है कि किसी भी आउटसोर्सिंग एजेंसी का मासिक बिल तभी पास किया जाएगा, जब प्रत्येक कर्मचारी के यूएएन (UAN) खाते में ईपीएफ व ईएसआई की कटौती ऑनलाइन पोर्टल पर सत्यापित हो।',
    content: `लखनऊ। आउटसोर्सिंग कर्मचारियों के भविष्य निधि (EPF) और कर्मचारी राज्य बीमा (ESIC) में हो रही धांधली पर शासन ने कड़ा रुख अपनाया है।

प्रमुख सचिव (श्रम) द्वारा जारी शासनादेश में समस्त विभागाध्यक्षों, मंडलायुक्तों और जिलाधिकारियों को निर्देशित किया गया है कि:
1. आउटसोर्सिंग एजेंसियों द्वारा प्रस्तुत किए जाने वाले मासिक विपत्रों (Bills) के साथ ईसीआर (Electronic Challan cum Return) और बैंक ट्रांजैक्शन रसीद संलग्न करना अनिवार्य होगा।
2. बिल पास करने से पूर्व संबंधित विभाग के आहरण-वितरण अधिकारी (DDO) औचक रूप से कम से कम 10% कर्मचारियों के ईपीएफओ पासबुक में अंशदान जमा होने की पुष्टि करेंगे।
3. कटौती करने के बाद भी समय पर जमा न करने वाली एजेंसियों पर 'उत्तर प्रदेश सेवायोजन अनुबंध अधिनियम' के तहत एफआईआर दर्ज की जाएगी।

यह कदम उन शिकायतों के बाद उठाया गया है जिसमें एजेंसियों द्वारा कर्मचारियों के वेतन से 12% कटौती तो की जा रही थी, लेकिन पीएफ खाते में महीनों तक जमा नहीं किया जा रहा था।`,
    contentHi: `लखनऊ। आउटसोर्सिंग कर्मचारियों के भविष्य निधि (EPF) और कर्मचारी राज्य बीमा (ESIC) में हो रही धांधली पर शासन ने कड़ा रुख अपनाया है।

प्रमुख सचिव (श्रम) द्वारा जारी शासनादेश में समस्त विभागाध्यक्षों, मंडलायुक्तों और जिलाधिकारियों को निर्देशित किया गया है कि:
1. आउटसोर्सिंग एजेंसियों द्वारा प्रस्तुत किए जाने वाले मासिक विपत्रों (Bills) के साथ ईसीआर (Electronic Challan cum Return) और बैंक ट्रांजैक्शन रसीद संलग्न करना अनिवार्य होगा।
2. बिल पास करने से पूर्व संबंधित विभाग के आहरण-वितरण अधिकारी (DDO) औचक रूप से कम से कम 10% कर्मचारियों के ईपीएफओ पासबुक में अंशदान जमा होने की पुष्टि करेंगे।
3. कटौती करने के बाद भी समय पर जमा न करने वाली एजेंसियों पर 'उत्तर प्रदेश सेवायोजन अनुबंध अधिनियम' के तहत एफआईआर दर्ज की जाएगी।

यह कदम उन शिकायतों के बाद उठाया गया है जिसमें एजेंसियों द्वारा कर्मचारियों के वेतन से 12% कटौती तो की जा रही थी, लेकिन पीएफ खाते में महीनों तक जमा नहीं किया जा रहा था।`,
    tags: ['ईपीएफ शासनादेश', 'वेतन सुरक्षा', 'श्रम विभाग', 'यूएएन वेरिफिकेशन']
  },
  {
    id: 'news-2',
    title: 'Minimum Wage Revision Advisory for Skilled and Semi-Skilled Outsource Staff',
    titleHi: 'कुशल व अर्धकुशल आउटसोर्स कर्मचारियों के परिवर्तनशील महंगाई भत्ते (VDA) में वृद्धि की संस्तुति',
    category: 'policy_update',
    department: 'Finance & Labour Department',
    departmentHi: 'वित्त एवं श्रम विभाग',
    publishedDate: '15 मार्च 2026',
    author: 'राज्य वेतन परामर्श समिति',
    readTime: '4 मिनट',
    orderNumber: 'पत्रांक: 678/वेतन-संशोधन/2026',
    documentName: 'VDA_Minimum_Wages_UP_2026.pdf',
    documentSize: '950 KB',
    summary: 'Cost of living adjustment announced for outsourced staff across 75 districts. Monthly honorarium to see an upward revision of ₹850 to ₹1,420 starting next quarter.',
    summaryHi: 'अखिल भारतीय उपभोक्ता मूल्य सूचकांक के आधार पर आउटसोर्स कर्मियों के परिवर्तनशील महंगाई भत्ते में संशोधन प्रस्तावित है। इससे कर्मचारियों के मासिक मानदेय में लगभग ₹850 से ₹1,420 तक की बढ़ोतरी संभव है।',
    content: `उत्तर प्रदेश में सरकारी विभागों में कार्यरत संविदा एवं आउटसोर्स कर्मचारियों के मासिक मानदेय में महंगाई भत्ते के समायोजन हेतु राज्य परामर्शदात्री समिति ने अपनी रिपोर्ट प्रेषित की है।

मुख्य बिंदु:
- अकुशल श्रेणी (सफाईकर्मी, चपरासी): न्यूनतम ₹11,200 प्रतिमाह
- अर्धकुशल श्रेणी (सुरक्षा गार्ड, हेल्पर, पंप चालक): न्यूनतम ₹13,450 प्रतिमाह
- कुशल श्रेणी (कंप्यूटर ऑपरेटर, क्लर्क, लैब असिस्टेंट): न्यूनतम ₹17,800 प्रतिमाह
- अति कुशल श्रेणी (वरिष्ठ प्रोग्रामर, लेखाकार, तकनीकी विशेषज्ञ): न्यूनतम ₹22,500 प्रतिमाह

यह दरें समस्त शासकीय कार्यालयों, निगमों, स्वायत्त निकायों एवं विकास प्राधिकरणों में लागू होंगी।`,
    contentHi: `उत्तर प्रदेश में सरकारी विभागों में कार्यरत संविदा एवं आउटसोर्स कर्मचारियों के मासिक मानदेय में महंगाई भत्ते के समायोजन हेतु राज्य परामर्शदात्री समिति ने अपनी रिपोर्ट प्रेषित की है।

मुख्य बिंदु:
- अकुशल श्रेणी (सफाईकर्मी, चपरासी): न्यूनतम ₹11,200 प्रतिमाह
- अर्धकुशल श्रेणी (सुरक्षा गार्ड, हेल्पर, पंप चालक): न्यूनतम ₹13,450 प्रतिमाह
- कुशल श्रेणी (कंप्यूटर ऑपरेटर, क्लर्क, लैब असिस्टेंट): न्यूनतम ₹17,800 प्रतिमाह
- अति कुशल श्रेणी (वरिष्ठ प्रोग्रामर, लेखाकार, तकनीकी विशेषज्ञ): न्यूनतम ₹22,500 प्रतिमाह

यह दरें समस्त शासकीय कार्यालयों, निगमों, स्वायत्त निकायों एवं विकास प्राधिकरणों में लागू होंगी।`,
    tags: ['वेतन वृद्धि', 'न्यूनतम वेतन', 'महंगाई भत्ता', 'फाइनेंस अपडेट']
  },
  {
    id: 'news-3',
    title: '14 Outsource Manpower Agencies Blacklisted Over Wage Delays and Irregularities',
    titleHi: 'वेतन विलंब और कमीशनखोरी की दोषी 14 आउटसोर्सिंग मानव संसाधन एजेंसियां काली सूची (Blacklist) में दर्ज',
    category: 'agency_action',
    department: 'GeM & Sewayojan Monitoring Cell',
    departmentHi: 'सेवायोजन एवं जेम (GeM) पोर्टल निगरानी प्रकोष्ठ',
    publishedDate: '10 मार्च 2026',
    author: 'जांच ब्यूरो, लखनऊ',
    readTime: '2 मिनट',
    orderNumber: 'का.वि./जेम-डीबार/88/2026',
    summary: 'Action taken against agencies that charged illegal onboarding fees or held employee salary for over 45 days. 3-year ban from participating in government procurement.',
    summaryHi: 'आउटसोर्सिंग भर्ती के नाम पर अवैध वसूली करने तथा कर्मचारियों का मानदेय 45 दिन से अधिक रोकने वाली 14 कंपनियों को 3 वर्ष के लिए जेम पोर्टल और सेवायोजन से डीबार (ब्लैकलिस्ट) कर दिया गया है।',
    content: `शासन ने कर्मचारियों की शिकायतों पर सख्त कार्रवाई करते हुए कानपुर, लखनऊ, वाराणसी और मेरठ की 14 एजेंसियों का अनुबंध निरस्त कर दिया है। 

आरोप था कि एजेंसियां जॉइनिंग कराने के नाम पर पैसे की मांग कर रही थीं और कर्मचारियों के खातों में समय पर वेतन नहीं भेज रही थीं। अब उनका अनुबंध निरस्त कर जमानत राशि जब्त कर ली गई है।`,
    contentHi: `शासन ने कर्मचारियों की शिकायतों पर सख्त कार्रवाई करते हुए कानपुर, लखनऊ, वाराणसी और मेरठ की 14 एजेंसियों का अनुबंध निरस्त कर दिया है। 

आरोप था कि एजेंसियां जॉइनिंग कराने के नाम पर पैसे की मांग कर रही थीं और कर्मचारियों के खातों में समय पर वेतन नहीं भेज रही थीं। अब उनका अनुबंध निरस्त कर जमानत राशि जब्त कर ली गई है।`,
    tags: ['ब्लैकलिस्ट', 'एजेंसी कार्रवाई', 'भ्रष्टाचार पर रोक', 'कर्मचारी सुरक्षा']
  }
];
