import { Trophy, Hash, Zap, Users, Heart, Star, Lightbulb, Crown } from "lucide-react"

export interface Nominee {
  id: string
  name: string
  description: string
  votes: number
  image: string
}

export interface JudgingCriteria {
  criteria: string
  weightage: string
}

export interface AwardCategory {
  id: string
  slug: string
  title: string
  emoji: string
  icon: any
  color: "red" | "teal" | "yellow" | "blue" | "green" | "purple"
  category: string
  shortDescription: string
  description: string
  eligibility: string[]
  judgingCriteria: JudgingCriteria[]
  submissionRequirements: string[]
  benefits: string[]
  nominees: Nominee[]
}

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const awardCategories: AwardCategory[] = [
  {
    id: "fitness-trainer-of-the-year",
    slug: "fitness-trainer-of-the-year",
    title: "Fitness Trainer of the Year",
    emoji: "💪",
    icon: Trophy,
    color: "red",
    category: "Professional Excellence",
    shortDescription:
      "Celebrating outstanding fitness professionals who demonstrate excellence in training and client transformation.",
    description:
      "This award celebrates an outstanding fitness professional who has demonstrated excellence in personal training, client transformation, professional development, and positive community influence. The recipient will exemplify passion, expertise, and commitment to improving lives through health and fitness. Whether through one-on-one training, group classes, online coaching, or holistic fitness programs, the winner will be someone who goes beyond workouts to inspire lasting change and uplift the fitness culture in Bengaluru.",
    eligibility: [
      "Minimum 3 years of active fitness training experience",
      "Currently practicing as a certified fitness trainer",
      "Demonstrated client success stories and transformations",
      "Active in the Bengaluru fitness community",
      "Holds relevant fitness certifications from recognized bodies",
    ],
    judgingCriteria: [
      { criteria: "Client Transformation Results", weightage: "30%" },
      { criteria: "Professional Certifications & Education", weightage: "20%" },
      { criteria: "Community Impact & Engagement", weightage: "20%" },
      { criteria: "Innovation in Training Methods", weightage: "15%" },
      { criteria: "Client Testimonials & Retention", weightage: "15%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Professional Resume with Training Experience",
      "Client Transformation Case Studies (min. 3)",
      "Professional Certifications",
      "Client Testimonials (min. 5)",
      "Professional Photos and Training Videos",
    ],
    benefits: [
      "Trophy and Certificate of Excellence",
      "Feature Article and Social Media Recognition",
      "Networking Opportunities with Industry Leaders",
      "Speaking Opportunity at Future Events",
      "One Year of Free Professional Development Resources",
    ],
    nominees: [
      {
        id: "sarah-johnson",
        name: "Sarah Johnson",
        description: "Transformed over 200 lives this year with innovative training methods and community programs.",
        votes: 245,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "michael-patel",
        name: "Michael Patel",
        description: "Specializes in rehabilitation fitness, helping clients recover from injuries and surgeries.",
        votes: 189,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "jessica-lee",
        name: "Jessica Lee",
        description: "Pioneer in adaptive fitness, making training accessible for people with disabilities.",
        votes: 217,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "nutritionist-dietitian-of-the-year",
    slug: "nutritionist-dietitian-of-the-year",
    title: "Nutritionist/Dietitian of the Year",
    emoji: "🥗",
    icon: Hash,
    color: "teal",
    category: "Health & Nutrition",
    shortDescription:
      "Honoring exceptional nutrition professionals who transform lives through evidence-based dietary strategies.",
    description:
      "This award honors an exceptional nutritionist or dietitian who has made a transformative impact on the health and wellbeing of individuals and communities through evidence-based, personalized nutrition strategies. The ideal candidate champions sustainable dietary change, merges science with practical application, and works collaboratively to empower clients to lead healthier lives. From clinical diet plans to fitness-focused nutrition coaching, this award celebrates professionals who educate, inspire, and deliver real, measurable outcomes through ethical and professional nutrition practice.",
    eligibility: [
      "Licensed nutritionist or dietitian with minimum 2 years experience",
      "Demonstrated expertise in evidence-based nutrition counseling",
      "Active practice in Bengaluru or serving Bengaluru clients",
      "Proven track record of client success and health improvements",
      "Commitment to continuing education and professional development",
    ],
    judgingCriteria: [
      { criteria: "Client Health Outcomes & Success Stories", weightage: "35%" },
      { criteria: "Evidence-Based Practice & Scientific Approach", weightage: "25%" },
      { criteria: "Community Education & Outreach", weightage: "20%" },
      { criteria: "Professional Credentials & Continuing Education", weightage: "15%" },
      { criteria: "Innovation in Nutrition Counseling", weightage: "5%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Professional License and Certifications",
      "Client Success Case Studies (min. 3)",
      "Professional Bio and Career Summary",
      "Client Testimonials and References",
      "Evidence of Community Involvement or Education",
    ],
    benefits: [
      "Professional Recognition Trophy",
      "Feature in Health & Wellness Publications",
      "Invitation to Speak at Nutrition Conferences",
      "Networking with Healthcare Professionals",
      "Complimentary Continuing Education Credits",
    ],
    nominees: [
      {
        id: "mark-williams",
        name: "Dr. Mark Williams",
        description:
          "Creates science-based nutrition content that has inspired thousands to begin their wellness journey.",
        votes: 312,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "aisha-rodriguez",
        name: "Aisha Rodriguez",
        description: "Promotes sustainable nutrition and inclusive wellness through her evidence-based practice.",
        votes: 287,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "tyler-chen",
        name: "Tyler Chen",
        description: "Specializes in sports nutrition and debunking harmful diet myths through education.",
        votes: 265,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "best-group-class-instructor",
    slug: "best-group-class-instructor",
    title: "Best Group Class Instructor",
    emoji: "🎵",
    icon: Zap,
    color: "yellow",
    category: "Group Fitness",
    shortDescription: "Celebrating dynamic instructors who energize rooms and create lasting community connections.",
    description:
      "This award celebrates the most dynamic and inspiring group fitness instructor who knows how to energize a room, motivate movement, and create a lasting community vibe. Whether leading Zumba, DanceFit, Spinning, HIIT, Aerobics, or Functional Training sessions, this individual commands the class with infectious enthusiasm, music-driven momentum, and seamless program delivery. This award honors an instructor whose classes are more than workouts — they're experiences that people look forward to, return to, and talk about. From choreography to cueing, this professional delivers high-energy, safe, and inclusive group sessions that leave every participant empowered.",
    eligibility: [
      "Minimum 2 years of group fitness instruction experience",
      "Currently teaching regular group fitness classes",
      "Certified in relevant group fitness disciplines",
      "Demonstrated high class attendance and member retention",
      "Active in Bengaluru fitness community",
    ],
    judgingCriteria: [
      { criteria: "Class Energy & Participant Engagement", weightage: "30%" },
      { criteria: "Safety & Proper Form Instruction", weightage: "25%" },
      { criteria: "Class Attendance & Member Retention", weightage: "20%" },
      { criteria: "Music & Choreography Creativity", weightage: "15%" },
      { criteria: "Inclusivity & Community Building", weightage: "10%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Group Fitness Certifications",
      "Class Schedule and Attendance Records",
      "Video Samples of Class Instruction",
      "Participant Testimonials (min. 5)",
      "Professional References from Fitness Facilities",
    ],
    benefits: [
      "Group Fitness Excellence Trophy",
      "Feature in Fitness Industry Publications",
      "Opportunity to Lead Masterclasses",
      "Free Access to Fitness Education Workshops",
      "Professional Photography Session",
    ],
    nominees: [
      {
        id: "alex-chen",
        name: "Alex Chen",
        description:
          "High-energy HIIT instructor known for creating challenging yet accessible workouts for all fitness levels.",
        votes: 178,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "maya-johnson",
        name: "Maya Johnson",
        description: "Zumba instructor who brings Latin dance culture to Bengaluru with infectious energy and joy.",
        votes: 156,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "devon-smith",
        name: "Devon Smith",
        description: "Spinning instructor who combines motivational coaching with heart-pumping cycling workouts.",
        votes: 203,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "physiotherapist-of-the-year",
    slug: "physiotherapist-of-the-year",
    title: "Physiotherapist of the Year",
    emoji: "🏥",
    icon: Heart,
    color: "blue",
    category: "Healthcare & Rehabilitation",
    shortDescription:
      "Recognizing physiotherapists who restore mobility and empower recovery with expertise and compassion.",
    description:
      "This award honors an outstanding physiotherapist whose expertise, compassion, and dedication have empowered individuals to recover from injuries, manage chronic pain, and return to active, fulfilling lives. From athletes and fitness clients to the elderly and rehabilitating patients, this professional plays a pivotal role in restoring mobility and function—safely and sustainably. The 'Physiotherapist of the Year' recognizes a licensed practitioner who not only demonstrates clinical excellence but also builds trust, educates clients, and contributes to the greater physiotherapy and wellness ecosystem.",
    eligibility: [
      "Licensed physiotherapist with minimum 3 years clinical experience",
      "Active practice in Bengaluru or serving Bengaluru patients",
      "Demonstrated expertise in rehabilitation and recovery",
      "Proven track record of successful patient outcomes",
      "Commitment to evidence-based practice and continuing education",
    ],
    judgingCriteria: [
      { criteria: "Patient Recovery Outcomes & Success Stories", weightage: "35%" },
      { criteria: "Clinical Expertise & Treatment Innovation", weightage: "25%" },
      { criteria: "Patient Education & Empowerment", weightage: "20%" },
      { criteria: "Professional Development & Continuing Education", weightage: "15%" },
      { criteria: "Community Contribution & Outreach", weightage: "5%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Professional License and Certifications",
      "Patient Case Studies and Outcomes (anonymized)",
      "Professional Development Records",
      "Patient Testimonials and References",
      "Evidence of Community Involvement",
    ],
    benefits: [
      "Healthcare Excellence Trophy",
      "Recognition in Medical Publications",
      "Invitation to Healthcare Conferences",
      "Networking with Medical Professionals",
      "Continuing Education Scholarship",
    ],
    nominees: [
      {
        id: "dr-priya-sharma",
        name: "Dr. Priya Sharma",
        description:
          "Specializes in sports injury rehabilitation with innovative treatment approaches and exceptional patient care.",
        votes: 245,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "rajesh-kumar",
        name: "Rajesh Kumar",
        description:
          "Expert in neurological rehabilitation, helping stroke and spinal injury patients regain independence.",
        votes: 189,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "dr-anita-reddy",
        name: "Dr. Anita Reddy",
        description:
          "Pioneer in geriatric physiotherapy, improving quality of life for elderly patients through specialized care.",
        votes: 217,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "rising-star-young-fitness-professional",
    slug: "rising-star-young-fitness-professional",
    title: "Rising Star – Young Fitness Professional (Under 30)",
    emoji: "⭐",
    icon: Star,
    color: "purple",
    category: "Emerging Talent",
    shortDescription: "Spotting tomorrow's fitness leaders today - young professionals making meaningful impact.",
    description:
      "This award celebrates emerging talent in the fitness and wellness industry — young professionals under the age of 30 who are already making a meaningful impact. Whether through client transformations, innovative training styles, entrepreneurial ventures, or digital influence, the Rising Star exemplifies drive, creativity, and a deep passion for health and fitness. It's about spotting tomorrow's leaders today — those who combine skill, science, and social influence to inspire change in their community.",
    eligibility: [
      "Must be under 30 years of age as of December 31, 2024",
      "Minimum 1 year of professional experience in fitness/wellness",
      "Demonstrated innovation or unique approach in their field",
      "Evidence of positive impact on clients or community",
      "Active in Bengaluru fitness ecosystem",
    ],
    judgingCriteria: [
      { criteria: "Innovation & Creativity in Approach", weightage: "30%" },
      { criteria: "Client/Community Impact & Results", weightage: "25%" },
      { criteria: "Professional Growth & Development", weightage: "20%" },
      { criteria: "Leadership Potential & Vision", weightage: "15%" },
      { criteria: "Digital Presence & Influence", weightage: "10%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Age Verification Document",
      "Portfolio of Work and Achievements",
      "Client Success Stories or Community Impact Evidence",
      "Professional References (min. 2)",
      "Social Media or Digital Presence Examples",
    ],
    benefits: [
      "Rising Star Trophy and Certificate",
      "Mentorship Program with Industry Veterans",
      "Feature in Youth Fitness Publications",
      "Free Professional Development Opportunities",
      "Networking Access to Industry Leaders",
    ],
    nominees: [
      {
        id: "arjun-mehta",
        name: "Arjun Mehta",
        description: "25-year-old fitness entrepreneur who created an innovative app connecting trainers with clients.",
        votes: 245,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "kavya-singh",
        name: "Kavya Singh",
        description:
          "28-year-old yoga instructor revolutionizing traditional practices with modern wellness approaches.",
        votes: 189,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "rohit-das",
        name: "Rohit Das",
        description: "26-year-old strength coach using data analytics to optimize training programs for athletes.",
        votes: 217,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "lifetime-achievement-in-fitness",
    slug: "lifetime-achievement-in-fitness",
    title: "Lifetime Achievement in Fitness",
    emoji: "🏆",
    icon: Crown,
    color: "red",
    category: "Lifetime Achievement",
    shortDescription: "Honoring visionaries whose lifelong dedication has shaped the fitness landscape in India.",
    description:
      "This prestigious award honors an individual whose lifelong dedication, leadership, and vision have significantly shaped the fitness and wellness landscape in India — particularly in Bengaluru. Through decades of tireless work as a coach, educator, advocate, or pioneer, this individual has inspired generations to lead healthier, more active lives. The Lifetime Achievement Award is not just for professional accomplishments but also for the profound legacy left behind — in knowledge, influence, and service to the industry.",
    eligibility: [
      "Have a minimum of 20 years of active involvement in the fitness, wellness, or physical education space",
      "Be recognized as a mentor, leader, or pioneer in the fitness community",
      "Have made substantial contributions as a trainer, educator, studio/gym owner, researcher, physiologist, yoga master, or public wellness advocate",
      "Have demonstrated integrity, consistency, and influence across their career",
      "Be based in India, with strong contributions in or to the Bengaluru fitness ecosystem",
      "Be nominated by peers, organizations, or industry bodies (self-nominations allowed with support letters)",
    ],
    judgingCriteria: [
      { criteria: "Years of Active Contribution", weightage: "25%" },
      { criteria: "Industry Impact & Innovation", weightage: "25%" },
      { criteria: "Legacy of Mentorship, Education & Leadership", weightage: "20%" },
      { criteria: "Public Awareness or Community Engagement", weightage: "15%" },
      { criteria: "National/Regional Recognition, Awards, or Publications", weightage: "10%" },
      { criteria: "Endorsements & Testimonials from Industry Leaders", weightage: "5%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Professional CV or Career Timeline – Highlighting key achievements, milestones, and contributions",
      "Profile Bio – Up to 500 words, written by nominator or nominee",
      "Letters of Endorsement – From industry professionals, mentees, institutions, or clients (min. 2)",
      "Photos – Current headshot and archival images from career",
      "Media/Public Recognition – Press articles, interviews, published work, awards (if any)",
      "Optional Video Message – 1–2 min from nominee or supporters (can be informal)",
    ],
    benefits: [
      "Special Trophy & Lifetime Achievement Medal",
      "On-stage recognition during the Awards Night",
      "Video Tribute and Presentation at Event",
      "Exclusive Feature Article on Event Website and Social Media",
      "Inclusion in the Hall of Fame of Bengaluru Fitness Festival",
    ],
    nominees: [
      {
        id: "dr-krishna-murthy",
        name: "Dr. Krishna Murthy",
        description:
          "Fitness pioneer with 35 years of dedication, founded multiple gyms and trained thousands of trainers.",
        votes: 245,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "smt-lakshmi-devi",
        name: "Smt. Lakshmi Devi",
        description: "Yoga master who brought traditional Indian wellness practices to modern fitness centers.",
        votes: 189,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "prof-rajesh-gupta",
        name: "Prof. Rajesh Gupta",
        description: "Sports scientist and educator who revolutionized fitness education in South India.",
        votes: 217,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "community-fitness-hero",
    slug: "community-fitness-hero",
    title: "Community Fitness Hero",
    emoji: "❤️",
    icon: Users,
    color: "green",
    category: "Community Impact",
    shortDescription:
      "Celebrating grassroots heroes bringing wellness to underserved communities with purpose and compassion.",
    description:
      "This award honors a fitness professional, coach, or mentor who is making a real difference at the grassroots level — offering free, low-cost, or volunteer-led fitness services to underserved communities. From slums and government schools to parks and shelters, this unsung hero brings wellness where it's needed most — not for fame or fortune, but out of purpose and compassion.",
    eligibility: [
      "Actively providing free or low-cost fitness services to underserved communities",
      "Minimum 1 year of consistent community service in fitness/wellness",
      "Demonstrated positive impact on community health and wellness",
      "Serving communities in or around Bengaluru",
      "Volunteer or non-profit approach to community fitness",
    ],
    judgingCriteria: [
      { criteria: "Community Impact & Reach", weightage: "40%" },
      { criteria: "Consistency & Dedication to Service", weightage: "25%" },
      { criteria: "Innovation in Community Engagement", weightage: "15%" },
      { criteria: "Sustainability of Programs", weightage: "15%" },
      { criteria: "Community Testimonials & Support", weightage: "5%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Documentation of Community Programs",
      "Community Impact Stories and Testimonials",
      "Photos/Videos of Community Activities",
      "References from Community Leaders",
      "Evidence of Consistent Service",
    ],
    benefits: [
      "Community Hero Trophy",
      "Grant for Community Fitness Equipment",
      "Feature in Community Impact Publications",
      "Recognition at Community Events",
      "Support for Expanding Community Programs",
    ],
    nominees: [
      {
        id: "ravi-kumar",
        name: "Ravi Kumar",
        description: "Runs free fitness classes in government schools, impacting over 500 children weekly.",
        votes: 245,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "meera-joseph",
        name: "Meera Joseph",
        description: "Organizes women's fitness groups in urban slums, promoting health and empowerment.",
        votes: 189,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "suresh-babu",
        name: "Suresh Babu",
        description: "Converted public parks into outdoor gyms, serving hundreds of families for free.",
        votes: 217,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "innovator-in-fitness-tech",
    slug: "innovator-in-fitness-tech",
    title: "Innovator in Fitness Tech",
    emoji: "💡",
    icon: Lightbulb,
    color: "blue",
    category: "Technology & Innovation",
    shortDescription: "Recognizing pioneers who leverage technology to revolutionize the fitness experience.",
    description:
      "This award celebrates the forward-thinking individuals, startups, or companies that are leveraging technology to revolutionize the fitness experience. From cutting-edge fitness apps and wearable devices to AI-driven workout programs, data trackers, and virtual fitness solutions, the Innovator in Fitness Tech award recognizes those transforming how we train, monitor progress, and stay motivated. Whether it's streamlining fitness tracking, enhancing remote coaching, or gamifying physical activity, this award honors the pioneers pushing the boundaries of tech-driven wellness.",
    eligibility: [
      "Developed or contributed to innovative fitness technology solutions",
      "Technology must be actively used by fitness community",
      "Demonstrated positive impact on user fitness outcomes",
      "Innovation must be accessible to Bengaluru fitness community",
      "Evidence of technological advancement in fitness industry",
    ],
    judgingCriteria: [
      { criteria: "Innovation & Technological Advancement", weightage: "35%" },
      { criteria: "User Adoption & Community Impact", weightage: "25%" },
      { criteria: "Measurable Fitness Outcomes", weightage: "20%" },
      { criteria: "Accessibility & User Experience", weightage: "15%" },
      { criteria: "Scalability & Future Potential", weightage: "5%" },
    ],
    submissionRequirements: [
      "Completed Nomination Form",
      "Technology Product Demo or Presentation",
      "User Testimonials and Case Studies",
      "Technical Documentation and Features",
      "Usage Statistics and Impact Metrics",
      "Future Development Roadmap",
    ],
    benefits: [
      "Innovation Excellence Trophy",
      "Tech Industry Recognition",
      "Investor Networking Opportunities",
      "Feature in Tech Publications",
      "Mentorship from Industry Veterans",
    ],
    nominees: [
      {
        id: "fittech-solutions",
        name: "FitTech Solutions",
        description: "AI-powered personal training app that adapts workouts based on user performance and goals.",
        votes: 245,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "wellness-wearables",
        name: "Wellness Wearables",
        description: "Smart fitness tracker with advanced biometric monitoring and health insights.",
        votes: 189,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "virtual-gym-pro",
        name: "Virtual Gym Pro",
        description: "VR fitness platform bringing immersive workout experiences to home users.",
        votes: 217,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

export const getAwardBySlug = (slug: string): AwardCategory | undefined => {
  return awardCategories.find((award) => award.slug === slug)
}

export const getAwardById = (id: string): AwardCategory | undefined => {
  return awardCategories.find((award) => award.id === id)
}

export const getAllAwardSlugs = (): string[] => {
  return awardCategories.map((award) => award.slug)
}
