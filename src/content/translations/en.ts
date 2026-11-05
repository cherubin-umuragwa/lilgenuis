import type { Translation } from "@/types";

const en: Translation = {
  nav: {
    home: "Home",
    subjects: "Subjects",
    explore: "Explore",
    dashboard: "Dashboard",
    achievements: "Achievements",
    profile: "Profile",
    dailyChallenge: "Daily Challenge",
    about: "About",
    parents: "For Parents",
    teachers: "For Teachers",
    login: "Log In",
    register: "Get Started",
  },

  landing: {
    hero: {
      headline: "Big Dreams Start With Little Discoveries.",
      tagline:
        "LilGenius is the interactive learning universe where children explore, play, and grow every day.",
      ctaPrimary: "Start Learning Free",
      ctaSecondary: "See How It Works",
      badge: "Trusted by families across Africa",
    },
    subjectPreview: {
      title: "Eight Subjects to Explore",
      subtitle:
        "From numbers to nature, from maps to code — every curiosity has a home here.",
    },
    howItWorks: {
      title: "How LilGenius Works",
      subtitle:
        "Three simple steps to spark a lifelong love of learning in your child.",
      step1Title: "Choose a Subject",
      step1Description:
        "Pick from mathematics, science, geography, history, languages and more.",
      step2Title: "Play and Learn",
      step2Description:
        "Explore interactive lessons, fun quizzes, and exciting challenges.",
      step3Title: "Earn and Grow",
      step3Description:
        "Collect points, unlock achievements, and level up your knowledge.",
    },
    featuredActivities: {
      title: "Featured Activities",
      subtitle: "Discover what children are loving right now.",
    },
    benefits: {
      title: "Why Families Choose LilGenius",
      subtitle:
        "Built with educators and parents to support real learning outcomes.",
      benefit1Title: "Curriculum-Aligned",
      benefit1Description:
        "Content aligned to primary school curricula across Africa.",
      benefit2Title: "Two Languages",
      benefit2Description:
        "Full support for English and French, with more languages coming soon.",
      benefit3Title: "Safe and Ad-Free",
      benefit3Description:
        "A clean, safe space designed entirely for children.",
      benefit4Title: "Progress Tracking",
      benefit4Description:
        "Parents and teachers can follow every child's learning journey.",
    },
    cta: {
      title: "Ready to Start the Adventure?",
      subtitle:
        "Join thousands of children who are discovering the joy of learning with LilGenius.",
      button: "Create a Free Account",
    },
  },

  onboarding: {
    welcome: "Welcome to LilGenius!",
    step1Label: "Your Name",
    step2Label: "Your Age",
    step3Label: "Your Language",
    step4Label: "Your Character",
    step5Label: "Your Interests",
    step6Label: "Almost Done",
    step7Label: "Start Learning",
    chooseName: "What is your name?",
    chooseAge: "How old are you?",
    chooseLanguage: "Choose your language",
    chooseCharacter: "Choose your learning character",
    chooseInterests: "What do you love to learn about?",
    ready: "You are all set! Let the adventure begin.",
    namePlaceholder: "Enter your name",
    next: "Next",
    back: "Back",
    finish: "Start Learning",
    ageGroup68: "Ages 6–8",
    ageGroup910: "Ages 9–10",
    ageGroup1112: "Ages 11–12",
    characterExplorer: "Explorer",
    characterScientist: "Scientist",
    characterArtist: "Artist",
    characterExplorerDesc: "Curious, adventurous, and loves discovering new worlds.",
    characterScientistDesc: "Analytical, methodical, and loves experiments.",
    characterArtistDesc: "Creative, expressive, and sees beauty in everything.",
  },

  dashboard: {
    greeting: "Welcome back, {name}!",
    dailyGoal: "Daily Goal",
    continueLearning: "Continue Learning",
    subjects: "My Subjects",
    achievements: "Recent Achievements",
    recommendations: "Recommended for You",
    streak: "Day Streak",
    level: "Level",
    points: "Points",
    lessonsCompleted: "Lessons Completed",
    dailyChallengeReady: "Daily challenge is ready for you!",
    noRecentActivity: "No recent activity yet. Start learning today!",
  },

  subjects: {
    title: "Choose a Subject",
    subtitle: "Pick any subject and dive right in.",
    mathematics: {
      name: "Mathematics",
      description:
        "Numbers, shapes, patterns and problem-solving adventures.",
    },
    science: {
      name: "Science",
      description:
        "Explore the natural world through experiments and discoveries.",
    },
    geography: {
      name: "Geography",
      description:
        "Discover countries, continents, rivers and cultures of the world.",
    },
    history: {
      name: "History",
      description:
        "Journey through time and learn about civilisations and great events.",
    },
    languages: {
      name: "Languages",
      description:
        "Read, write and communicate in English, French and more.",
    },
    generalKnowledge: {
      name: "General Knowledge",
      description:
        "Fascinating facts about the world around us.",
    },
    logic: {
      name: "Logic & Reasoning",
      description:
        "Puzzles, riddles and brain challenges to sharpen your thinking.",
    },
    programming: {
      name: "Programming",
      description:
        "Introduction to computational thinking and coding basics.",
    },
    startLesson: "Start Lesson",
    continueLesson: "Continue",
    lessonsCount: "{count} lessons",
    minutesCount: "{count} min",
    difficulty: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
  },

  quiz: {
    question: "Question {current} of {total}",
    correct: "Correct!",
    incorrect: "Not quite — try again!",
    next: "Next Question",
    submit: "Submit Answer",
    score: "Your Score",
    retry: "Try Again",
    explanation: "Explanation",
    timeLeft: "Time Left",
    finished: "Quiz Complete!",
    pointsEarned: "+{points} points",
    perfectScore: "Perfect score!",
    goodJob: "Good effort, keep going!",
    multipleChoice: "Choose the correct answer.",
    trueFalse: "Is this statement true or false?",
    fillInBlank: "Fill in the blank.",
    matchingPairs: "Match each item to its pair.",
    true: "True",
    false: "False",
    results: {
      title: "Quiz Results",
      youScored: "You scored {score} out of {total}",
      correct: "Correct answers: {count}",
      incorrect: "Incorrect answers: {count}",
      points: "Points earned: {points}",
      tryAgain: "Try Again",
      nextLesson: "Next Lesson",
      backToSubject: "Back to Subject",
    },
    feedback: {
      excellent: "Excellent! You nailed it!",
      great: "Great work, keep it up!",
      good: "Good job! A little more practice and you will master it.",
      keepPracticing: "Keep practising — you are improving every time!",
    },
  },

  achievements: {
    title: "Achievements",
    subtitle: "Every milestone you reach earns a badge.",
    unlocked: "Unlocked",
    locked: "Locked",
    points: "{points} points",
    new: "New Achievement!",
    keepGoing: "Keep going to unlock more achievements.",
    earnedOn: "Earned on {date}",
    condition: {
      lessonsCompleted: "Complete {threshold} lessons",
      quizScore: "Score {threshold}% on a quiz",
      streakDays: "Study {threshold} days in a row",
      pointsEarned: "Earn {threshold} points",
      subjectsStarted: "Start {threshold} subjects",
      firstLogin: "Log in for the first time",
    },
  },

  profile: {
    title: "My Profile",
    character: "My Character",
    language: "Language",
    ageGroup: "Age Group",
    editProfile: "Edit Profile",
    level: "Level {level}",
    totalPoints: "{points} Total Points",
    memberSince: "Member since {date}",
    streak: "{count} day streak",
    lessonsCompleted: "Lessons Completed",
    subjectsExplored: "Subjects Explored",
    changeCharacter: "Change Character",
    changeLanguage: "Change Language",
    deleteAccount: "Delete Account",
    deleteConfirm: "Are you sure you want to delete your account? This cannot be undone.",
  },

  explore: {
    title: "Explore",
    subtitle: "Browse lessons, topics, and activities from all subjects.",
    search: "Search lessons and topics...",
    filter: "Filter by subject",
    filterAll: "All Subjects",
    noResults: "No lessons found for that search.",
    featured: "Featured",
    new: "New",
    popular: "Popular",
    trending: "Trending Now",
    recommended: "Recommended for You",
    sortBy: "Sort by",
    sortNewest: "Newest",
    sortPopular: "Most Popular",
    sortDifficulty: "By Difficulty",
  },

  challenges: {
    title: "Daily Challenges",
    subtitle: "A new challenge every day to keep your skills sharp.",
    todayChallenge: "Today's Challenge",
    completed: "Completed",
    bonusPoints: "+{points} bonus points",
    complete: "Complete Challenge",
    completedMessage: "You completed today's challenge! Come back tomorrow for a new one.",
    locked: "Complete more lessons to unlock daily challenges.",
    streak: "Challenge streak: {count} days",
    history: "Past Challenges",
    noPastChallenges: "No completed challenges yet.",
  },

  about: {
    title: "About LilGenius",
    mission: {
      title: "Our Mission",
      body:
        "LilGenius was created to give every child — regardless of where they live — access to joyful, high-quality learning. We believe curiosity is the greatest engine of achievement, and our platform is built to keep that flame burning.",
    },
    story: {
      title: "Our Story",
      body:
        "LilGenius was founded by educators and technologists who saw firsthand how children across Africa hunger for engaging, relevant learning experiences. Starting with English and French, we are building a platform that grows with every learner.",
    },
    team: {
      title: "Built with Heart",
      body:
        "Every lesson, every mascot, every animation has been crafted to delight and inspire children aged 6 to 12. We work alongside educators to ensure our content is accurate, curriculum-aligned, and genuinely fun.",
    },
    values: {
      title: "What We Stand For",
      inclusive: "Inclusive — built for all children, everywhere.",
      safe: "Safe — no ads, no tracking, no inappropriate content.",
      joyful: "Joyful — learning should feel like play.",
      rigorous: "Rigorous — content that meets real educational standards.",
    },
  },

  parents: {
    title: "For Parents",
    subtitle: "Everything you need to support your child's learning journey.",
    safeTitle: "Safe by Design",
    safeBody:
      "LilGenius contains no advertisements, no in-app purchases, and no social features. Your child learns in a fully closed, age-appropriate environment.",
    progressTitle: "Track Every Step",
    progressBody:
      "See which subjects your child has explored, how many lessons they have completed, and which achievements they have unlocked.",
    languagesTitle: "Two Languages, One Platform",
    languagesBody:
      "Switch between English and French at any time. Your child's progress carries across both languages.",
    ageGroupsTitle: "Age-Appropriate Content",
    ageGroupsBody:
      "Lessons are tailored to three age groups — 6–8, 9–10, and 11–12 — so the difficulty always matches your child's stage.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Is LilGenius free?",
    faq1A:
      "Yes. The core experience is completely free. We are committed to keeping learning accessible for every family.",
    faq2Q: "Does my child need an account?",
    faq2A:
      "A lightweight profile (first name, age group, and preferred language) is all we need. No email address required.",
    faq3Q: "Can I monitor my child's progress?",
    faq3A:
      "Yes. Log in to your child's account to view their progress dashboard and recent achievements.",
    getStarted: "Help Your Child Get Started",
  },

  teachers: {
    title: "For Teachers",
    subtitle:
      "Use LilGenius to complement your classroom and inspire independent learners.",
    classroomTitle: "Classroom Ready",
    classroomBody:
      "Every subject on LilGenius is aligned to primary school curricula. Use lessons as warm-ups, homework tasks, or revision activities.",
    trackingTitle: "Track Student Progress",
    trackingBody:
      "See which topics each student has studied, where they excelled, and where they may need extra support.",
    bilingualTitle: "Bilingual Support",
    bilingualBody:
      "Perfect for bilingual classrooms. Students can switch between English and French without losing any progress.",
    resourcesTitle: "Educator Resources",
    resourcesBody:
      "We provide lesson summaries and topic guides so teachers can preview content before assigning it to students.",
    getInTouch: "Get in Touch",
    getInTouchBody:
      "Interested in using LilGenius with your class? Reach out — we would love to hear from you.",
    contactButton: "Contact Us",
    faqTitle: "Teacher FAQ",
    faq1Q: "Can I assign specific lessons?",
    faq1A:
      "Students can navigate freely to any lesson. We are working on a teacher dashboard to enable direct assignment.",
    faq2Q: "Is the content curriculum-aligned?",
    faq2A:
      "Yes. All content is reviewed against primary school curricula across African education systems and benchmarked internationally.",
  },

  auth: {
    login: {
      title: "Welcome Back",
      subtitle: "Log in to continue your learning adventure.",
      namePlaceholder: "Your name",
      nameLabel: "Name",
      submit: "Log In",
      noAccount: "New to LilGenius?",
      register: "Create a free account",
      error: "We could not find a profile with that name. Try again.",
    },
    register: {
      title: "Create Your Account",
      subtitle: "Join thousands of young learners and start exploring today.",
      namePlaceholder: "Your first name",
      nameLabel: "First Name",
      submit: "Create Account",
      hasAccount: "Already have an account?",
      login: "Log in",
      terms:
        "By creating an account you agree to our Terms of Service and Privacy Policy.",
      successTitle: "Welcome to LilGenius, {name}!",
      successBody: "Your profile has been created. Let the adventure begin!",
    },
  },

  errors: {
    notFound: {
      title: "Page Not Found",
      message:
        "The page you are looking for does not exist or has been moved.",
      back: "Go Back",
      home: "Return to Home",
    },
    generic: {
      title: "Something Went Wrong",
      message:
        "An unexpected error occurred. Please try again in a moment.",
      retry: "Try Again",
    },
    noProfile: {
      title: "No Profile Found",
      message: "Set up your profile to start learning.",
      cta: "Create Profile",
    },
    offline: {
      title: "You are Offline",
      message:
        "Check your internet connection and try again.",
    },
  },

  common: {
    loading: "Loading...",
    error: "Something went wrong. Please try again.",
    empty: "Nothing here yet.",
    retry: "Try Again",
    back: "Back",
    next: "Next",
    start: "Start",
    continue: "Continue",
    finish: "Finish",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    filter: "Filter",
    all: "All",
    or: "or",
    and: "and",
    yes: "Yes",
    no: "No",
    close: "Close",
    open: "Open",
    home: "Home",
    minutes: "{count} min",
  },
};

export default en;
