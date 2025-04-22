import { Job } from '../types/job';

export const mockJobs: Job[] = [
  // Full-time Jobs
  {
    id: '1',
    title: 'Software Developer',
    employer: 'TechSolutions PH',
    location: 'Makati City',
    hours: 'Full-time',
    salary: '₱40,000 - ₱60,000',
    description: 'Looking for a skilled software developer to join our growing team.',
    aboutRole: 'Join our dynamic team to develop innovative software solutions for local and international clients.',
    requirements: [
      '2+ years of experience in software development',
      'Proficiency in JavaScript/TypeScript',
      'Experience with React and Node.js',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    responsibilities: [
      'Develop and maintain web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews'
    ],
    latitude: 14.5547,
    longitude: 121.0244,
    schedule: 'Monday to Friday, 9:00 AM - 6:00 PM',
    contact: {
      messenger: 'techsolutions_ph',
      email: 'careers@techsolutions.ph',
      phone: '+63 2 8123 4567'
    },
    socialMedia: {
      facebook: 'https://facebook.com/techsolutionsph',
      instagram: 'https://instagram.com/techsolutionsph',
      linkedin: 'https://linkedin.com/company/techsolutionsph'
    }
  },
  {
    id: '2',
    title: 'Marketing Manager',
    employer: 'Growth Marketing PH',
    location: 'Bonifacio Global City',
    hours: 'Full-time',
    salary: '₱50,000 - ₱70,000',
    description: 'Seeking an experienced marketing manager to lead our marketing team.',
    aboutRole: 'Lead our marketing efforts and develop strategies to grow our brand presence in the Philippine market.',
    requirements: [
      '3+ years of experience in marketing',
      'Experience with digital marketing channels',
      'Strong analytical skills',
      'Bachelor\'s degree in Marketing or related field'
    ],
    responsibilities: [
      'Develop marketing strategies',
      'Manage marketing campaigns',
      'Analyze marketing metrics',
      'Lead marketing team'
    ],
    latitude: 14.5535,
    longitude: 121.0503,
    schedule: 'Monday to Friday, 8:30 AM - 5:30 PM',
    contact: {
      messenger: 'growthmarketing_ph',
      email: 'careers@growthmarketing.ph',
      phone: '+63 2 8123 7890'
    },
    socialMedia: {
      facebook: 'https://facebook.com/growthmarketingph',
      instagram: 'https://instagram.com/growthmarketingph',
      linkedin: 'https://linkedin.com/company/growthmarketingph'
    }
  },
  {
    id: '3',
    title: 'Customer Service Manager',
    employer: 'Service Excellence PH',
    location: 'Ortigas Center',
    hours: 'Full-time',
    salary: '₱45,000 - ₱65,000',
    description: 'Looking for a customer service manager to lead our support team.',
    aboutRole: 'Manage our customer service team and ensure excellent service delivery.',
    requirements: [
      '3+ years of experience in customer service',
      'Strong leadership skills',
      'Excellent communication skills',
      'Bachelor\'s degree in Business or related field'
    ],
    responsibilities: [
      'Lead customer service team',
      'Develop service standards',
      'Handle customer escalations',
      'Train and mentor team members'
    ],
    latitude: 14.5890,
    longitude: 121.0567,
    schedule: 'Monday to Friday, 8:00 AM - 5:00 PM',
    contact: {
      messenger: 'serviceexcellence_ph',
      email: 'careers@serviceexcellence.ph',
      phone: '+63 2 8123 1234'
    },
    socialMedia: {
      facebook: 'https://facebook.com/serviceexcellenceph',
      instagram: 'https://instagram.com/serviceexcellenceph',
      linkedin: 'https://linkedin.com/company/serviceexcellenceph'
    }
  },

  // Part-time Jobs
  {
    id: '4',
    title: 'Social Media Specialist',
    employer: 'Digital Creatives PH',
    location: 'Quezon City',
    hours: 'Part-time',
    salary: '₱20,000 - ₱30,000',
    description: 'Looking for a creative social media specialist to manage our online presence.',
    aboutRole: 'Create engaging content and manage our social media platforms.',
    requirements: [
      '1+ years of experience in social media management',
      'Creative content creation skills',
      'Knowledge of social media platforms',
      'Strong communication skills'
    ],
    responsibilities: [
      'Create social media content',
      'Manage social media accounts',
      'Engage with followers',
      'Analyze social media metrics'
    ],
    latitude: 14.6760,
    longitude: 121.0437,
    schedule: '20 hours per week, flexible schedule',
    contact: {
      messenger: 'digitalcreatives_ph',
      email: 'careers@digitalcreatives.ph',
      phone: '+63 2 8123 5678'
    },
    socialMedia: {
      facebook: 'https://facebook.com/digitalcreativesph',
      instagram: 'https://instagram.com/digitalcreativesph',
      linkedin: 'https://linkedin.com/company/digitalcreativesph'
    }
  },
  {
    id: '5',
    title: 'English Tutor',
    employer: 'Language Academy PH',
    location: 'Mandaluyong City',
    hours: 'Part-time',
    salary: '₱15,000 - ₱25,000',
    description: 'Seeking experienced English tutors for online and in-person classes.',
    aboutRole: 'Teach English to students of various levels and backgrounds.',
    requirements: [
      'Teaching experience preferred',
      'Excellent English communication skills',
      'Patient and engaging personality',
      'Bachelor\'s degree in Education or related field'
    ],
    responsibilities: [
      'Prepare lesson plans',
      'Conduct English classes',
      'Assess student progress',
      'Provide feedback to students'
    ],
    latitude: 14.5794,
    longitude: 121.0359,
    schedule: '15-20 hours per week, flexible schedule',
    contact: {
      messenger: 'languageacademy_ph',
      email: 'careers@languageacademy.ph',
      phone: '+63 2 8123 9012'
    },
    socialMedia: {
      facebook: 'https://facebook.com/languageacademyph',
      instagram: 'https://instagram.com/languageacademyph',
      linkedin: 'https://linkedin.com/company/languageacademyph'
    }
  },
  {
    id: '6',
    title: 'Graphic Designer',
    employer: 'Creative Studio PH',
    location: 'Pasig City',
    hours: 'Part-time',
    salary: '₱18,000 - ₱28,000',
    description: 'Looking for a creative graphic designer for various design projects.',
    aboutRole: 'Create visual content for our clients and marketing materials.',
    requirements: [
      '1+ years of experience in graphic design',
      'Proficiency in Adobe Creative Suite',
      'Strong portfolio',
      'Creative thinking skills'
    ],
    responsibilities: [
      'Create visual designs',
      'Work on branding projects',
      'Design marketing materials',
      'Collaborate with marketing team'
    ],
    latitude: 14.5764,
    longitude: 121.0851,
    schedule: '20 hours per week, flexible schedule',
    contact: {
      messenger: 'creativestudio_ph',
      email: 'careers@creativestudio.ph',
      phone: '+63 2 8123 3456'
    },
    socialMedia: {
      facebook: 'https://facebook.com/creativestudioph',
      instagram: 'https://instagram.com/creativestudioph',
      linkedin: 'https://linkedin.com/company/creativestudioph'
    }
  },

  // Flexible Jobs
  {
    id: '7',
    title: 'Virtual Assistant',
    employer: 'Remote Work PH',
    location: 'Remote',
    hours: 'Flexible',
    salary: '₱15,000 - ₱25,000',
    description: 'Looking for a reliable virtual assistant to support various tasks.',
    aboutRole: 'Provide administrative support and handle various tasks remotely.',
    requirements: [
      'Experience in administrative work',
      'Good organizational skills',
      'Proficiency in Microsoft Office',
      'Strong communication skills'
    ],
    responsibilities: [
      'Handle administrative tasks',
      'Manage schedules',
      'Process documents',
      'Coordinate with team members'
    ],
    latitude: 14.5995,
    longitude: 120.9842,
    schedule: 'Flexible hours, work from home',
    contact: {
      messenger: 'remotework_ph',
      email: 'careers@remotework.ph',
      phone: '+63 2 8123 6789'
    },
    socialMedia: {
      facebook: 'https://facebook.com/remoteworkph',
      instagram: 'https://instagram.com/remoteworkph',
      linkedin: 'https://linkedin.com/company/remoteworkph'
    }
  },
  {
    id: '8',
    title: 'Content Writer',
    employer: 'Content Creators PH',
    location: 'Remote',
    hours: 'Flexible',
    salary: '₱20,000 - ₱35,000',
    description: 'Seeking creative content writers for various writing projects.',
    aboutRole: 'Create engaging content for websites, blogs, and social media.',
    requirements: [
      'Strong writing skills',
      'Research abilities',
      'SEO knowledge',
      'Portfolio of writing samples'
    ],
    responsibilities: [
      'Write blog posts',
      'Create website content',
      'Develop social media content',
      'Research topics'
    ],
    latitude: 14.5995,
    longitude: 120.9842,
    schedule: 'Flexible hours, work from home',
    contact: {
      messenger: 'contentcreators_ph',
      email: 'careers@contentcreators.ph',
      phone: '+63 2 8123 2345'
    },
    socialMedia: {
      facebook: 'https://facebook.com/contentcreatorsph',
      instagram: 'https://instagram.com/contentcreatorsph',
      linkedin: 'https://linkedin.com/company/contentcreatorsph'
    }
  },
  {
    id: '9',
    title: 'Online English Teacher',
    employer: 'Global Education PH',
    location: 'Remote',
    hours: 'Flexible',
    salary: '₱25,000 - ₱40,000',
    description: 'Looking for online English teachers for international students.',
    aboutRole: 'Teach English to students from around the world through online platforms.',
    requirements: [
      'Teaching experience',
      'TEFL/TESOL certification preferred',
      'Stable internet connection',
      'Good communication skills'
    ],
    responsibilities: [
      'Conduct online classes',
      'Prepare lesson materials',
      'Assess student progress',
      'Provide feedback'
    ],
    latitude: 14.5995,
    longitude: 120.9842,
    schedule: 'Flexible hours, work from home',
    contact: {
      messenger: 'globaleducation_ph',
      email: 'careers@globaleducation.ph',
      phone: '+63 2 8123 7890'
    },
    socialMedia: {
      facebook: 'https://facebook.com/globaleducationph',
      instagram: 'https://instagram.com/globaleducationph',
      linkedin: 'https://linkedin.com/company/globaleducationph'
    }
  }
]; 