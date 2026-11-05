import type { Translation } from "@/types";

const fr: Translation = {
  nav: {
    home: "Accueil",
    subjects: "Matières",
    explore: "Explorer",
    dashboard: "Tableau de bord",
    achievements: "Succès",
    profile: "Profil",
    dailyChallenge: "Défi du Jour",
    about: "À propos",
    parents: "Pour les Parents",
    teachers: "Pour les Enseignants",
    login: "Connexion",
    register: "Commencer",
  },

  landing: {
    hero: {
      headline: "Les Grands Rêves Commencent Par de Petites Découvertes.",
      tagline:
        "LilGenius est l'univers d'apprentissage interactif où les enfants explorent, jouent et grandissent chaque jour.",
      ctaPrimary: "Commencer Gratuitement",
      ctaSecondary: "Voir Comment Ça Marche",
      badge: "Choisi par des familles à travers l'Afrique",
    },
    subjectPreview: {
      title: "Huit Matières à Explorer",
      subtitle:
        "Des chiffres à la nature, des cartes au code — chaque curiosité trouve sa place ici.",
    },
    howItWorks: {
      title: "Comment Fonctionne LilGenius",
      subtitle:
        "Trois étapes simples pour allumer en votre enfant un amour de l'apprentissage.",
      step1Title: "Choisir une Matière",
      step1Description:
        "Choisissez parmi les mathématiques, les sciences, la géographie, l'histoire, les langues et bien plus.",
      step2Title: "Jouer et Apprendre",
      step2Description:
        "Explorez des leçons interactives, des quiz amusants et des défis passionnants.",
      step3Title: "Gagner et Progresser",
      step3Description:
        "Collectez des points, débloquez des succès et montez en niveau.",
    },
    featuredActivities: {
      title: "Activités à la Une",
      subtitle: "Découvrez ce que les enfants adorent en ce moment.",
    },
    benefits: {
      title: "Pourquoi les Familles Choisissent LilGenius",
      subtitle:
        "Conçu avec des éducateurs et des parents pour soutenir de vrais résultats d'apprentissage.",
      benefit1Title: "Aligné sur les Programmes",
      benefit1Description:
        "Contenu aligné sur les programmes des écoles primaires d'Afrique.",
      benefit2Title: "Deux Langues",
      benefit2Description:
        "Prise en charge complète de l'anglais et du français, avec d'autres langues bientôt disponibles.",
      benefit3Title: "Sécurisé et Sans Publicité",
      benefit3Description:
        "Un espace propre et sécurisé conçu entièrement pour les enfants.",
      benefit4Title: "Suivi des Progrès",
      benefit4Description:
        "Les parents et les enseignants peuvent suivre le parcours d'apprentissage de chaque enfant.",
    },
    cta: {
      title: "Prêt à Commencer l'Aventure ?",
      subtitle:
        "Rejoignez des milliers d'enfants qui découvrent la joie d'apprendre avec LilGenius.",
      button: "Créer un Compte Gratuit",
    },
  },

  onboarding: {
    welcome: "Bienvenue sur LilGenius !",
    step1Label: "Ton Prénom",
    step2Label: "Ton Âge",
    step3Label: "Ta Langue",
    step4Label: "Ton Personnage",
    step5Label: "Tes Intérêts",
    step6Label: "Presque Fini",
    step7Label: "Commencer à Apprendre",
    chooseName: "Comment tu t'appelles ?",
    chooseAge: "Quel âge as-tu ?",
    chooseLanguage: "Choisir ta langue",
    chooseCharacter: "Choisir ton personnage d'apprentissage",
    chooseInterests: "Qu'est-ce que tu aimes apprendre ?",
    ready: "C'est parti ! Que l'aventure commence.",
    namePlaceholder: "Entre ton prénom",
    next: "Suivant",
    back: "Retour",
    finish: "Commencer à Apprendre",
    ageGroup68: "6–8 ans",
    ageGroup910: "9–10 ans",
    ageGroup1112: "11–12 ans",
    characterExplorer: "Explorateur",
    characterScientist: "Scientifique",
    characterArtist: "Artiste",
    characterExplorerDesc: "Curieux, aventureux et aime découvrir de nouveaux mondes.",
    characterScientistDesc: "Analytique, méthodique et adore les expériences.",
    characterArtistDesc: "Créatif, expressif et voit la beauté partout.",
  },

  dashboard: {
    greeting: "Bon retour, {name} !",
    dailyGoal: "Objectif du Jour",
    continueLearning: "Continuer à Apprendre",
    subjects: "Mes Matières",
    achievements: "Succès Récents",
    recommendations: "Recommandé pour Toi",
    streak: "Jours Consécutifs",
    level: "Niveau",
    points: "Points",
    lessonsCompleted: "Leçons Terminées",
    dailyChallengeReady: "Le défi du jour t'attend !",
    noRecentActivity: "Pas encore d'activité récente. Commence à apprendre aujourd'hui !",
  },

  subjects: {
    title: "Choisir une Matière",
    subtitle: "Choisis une matière et plonge-toi dedans.",
    mathematics: {
      name: "Mathématiques",
      description:
        "Chiffres, formes, schémas et aventures de résolution de problèmes.",
    },
    science: {
      name: "Sciences",
      description:
        "Explorez le monde naturel à travers des expériences et des découvertes.",
    },
    geography: {
      name: "Géographie",
      description:
        "Découvrez les pays, les continents, les rivières et les cultures du monde.",
    },
    history: {
      name: "Histoire",
      description:
        "Voyagez dans le temps et apprenez les civilisations et les grands événements.",
    },
    languages: {
      name: "Langues",
      description:
        "Lire, écrire et communiquer en anglais, en français et plus encore.",
    },
    generalKnowledge: {
      name: "Culture Générale",
      description:
        "Des faits fascinants sur le monde qui nous entoure.",
    },
    logic: {
      name: "Logique et Raisonnement",
      description:
        "Puzzles, énigmes et défis cérébraux pour affûter votre réflexion.",
    },
    programming: {
      name: "Programmation",
      description:
        "Introduction à la pensée computationnelle et aux bases du codage.",
    },
    startLesson: "Commencer la Leçon",
    continueLesson: "Continuer",
    lessonsCount: "{count} leçons",
    minutesCount: "{count} min",
    difficulty: {
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      advanced: "Avancé",
    },
  },

  quiz: {
    question: "Question {current} sur {total}",
    correct: "Correct !",
    incorrect: "Pas tout à fait — réessaie !",
    next: "Question Suivante",
    submit: "Soumettre la Réponse",
    score: "Ton Score",
    retry: "Réessayer",
    explanation: "Explication",
    timeLeft: "Temps Restant",
    finished: "Quiz Terminé !",
    pointsEarned: "+{points} points",
    perfectScore: "Score parfait !",
    goodJob: "Bon effort, continue !",
    multipleChoice: "Choisis la bonne réponse.",
    trueFalse: "Cette affirmation est-elle vraie ou fausse ?",
    fillInBlank: "Complète la phrase.",
    matchingPairs: "Associe chaque élément à sa paire.",
    true: "Vrai",
    false: "Faux",
    results: {
      title: "Résultats du Quiz",
      youScored: "Tu as obtenu {score} sur {total}",
      correct: "Bonnes réponses : {count}",
      incorrect: "Mauvaises réponses : {count}",
      points: "Points gagnés : {points}",
      tryAgain: "Réessayer",
      nextLesson: "Leçon Suivante",
      backToSubject: "Retour à la Matière",
    },
    feedback: {
      excellent: "Excellent ! Tu as tout réussi !",
      great: "Très bien, continue comme ça !",
      good: "Bon travail ! Un peu de pratique et tu vas maîtriser ça.",
      keepPracticing: "Continue à pratiquer — tu t'améliores à chaque fois !",
    },
  },

  achievements: {
    title: "Succès",
    subtitle: "Chaque étape franchie te rapporte un badge.",
    unlocked: "Débloqué",
    locked: "Verrouillé",
    points: "{points} points",
    new: "Nouveau Succès !",
    keepGoing: "Continue pour débloquer plus de succès.",
    earnedOn: "Obtenu le {date}",
    condition: {
      lessonsCompleted: "Terminer {threshold} leçons",
      quizScore: "Obtenir {threshold} % à un quiz",
      streakDays: "Étudier {threshold} jours de suite",
      pointsEarned: "Gagner {threshold} points",
      subjectsStarted: "Commencer {threshold} matières",
      firstLogin: "Se connecter pour la première fois",
    },
  },

  profile: {
    title: "Mon Profil",
    character: "Mon Personnage",
    language: "Langue",
    ageGroup: "Tranche d'Âge",
    editProfile: "Modifier le Profil",
    level: "Niveau {level}",
    totalPoints: "{points} Points au Total",
    memberSince: "Membre depuis {date}",
    streak: "Série de {count} jours",
    lessonsCompleted: "Leçons Terminées",
    subjectsExplored: "Matières Explorées",
    changeCharacter: "Changer de Personnage",
    changeLanguage: "Changer de Langue",
    deleteAccount: "Supprimer le Compte",
    deleteConfirm: "Tu es sûr de vouloir supprimer ton compte ? Cette action est irréversible.",
  },

  explore: {
    title: "Explorer",
    subtitle: "Parcourez les leçons, sujets et activités de toutes les matières.",
    search: "Rechercher des leçons et sujets...",
    filter: "Filtrer par matière",
    filterAll: "Toutes les Matières",
    noResults: "Aucune leçon trouvée pour cette recherche.",
    featured: "À la Une",
    new: "Nouveau",
    popular: "Populaire",
    trending: "Tendance Maintenant",
    recommended: "Recommandé pour Toi",
    sortBy: "Trier par",
    sortNewest: "Plus Récent",
    sortPopular: "Plus Populaire",
    sortDifficulty: "Par Difficulté",
  },

  challenges: {
    title: "Défis du Jour",
    subtitle: "Un nouveau défi chaque jour pour garder tes compétences aiguisées.",
    todayChallenge: "Le Défi d'Aujourd'hui",
    completed: "Terminé",
    bonusPoints: "+{points} points bonus",
    complete: "Relever le Défi",
    completedMessage: "Tu as relevé le défi du jour ! Reviens demain pour un nouveau défi.",
    locked: "Termine plus de leçons pour débloquer les défis quotidiens.",
    streak: "Série de défis : {count} jours",
    history: "Défis Passés",
    noPastChallenges: "Pas encore de défis terminés.",
  },

  about: {
    title: "À Propos de LilGenius",
    mission: {
      title: "Notre Mission",
      body:
        "LilGenius a été créé pour donner à chaque enfant — peu importe où il vit — l'accès à un apprentissage joyeux et de haute qualité. Nous croyons que la curiosité est le plus grand moteur de la réussite, et notre plateforme est conçue pour garder cette flamme allumée.",
    },
    story: {
      title: "Notre Histoire",
      body:
        "LilGenius a été fondé par des éducateurs et des technologues qui ont vu de leurs propres yeux à quel point les enfants d'Afrique ont soif d'expériences d'apprentissage engageantes et pertinentes. Commençant par l'anglais et le français, nous construisons une plateforme qui grandit avec chaque apprenant.",
    },
    team: {
      title: "Conçu avec Passion",
      body:
        "Chaque leçon, chaque mascotte, chaque animation a été créée pour enchanter et inspirer les enfants de 6 à 12 ans. Nous travaillons aux côtés d'éducateurs pour garantir que notre contenu est exact, aligné sur les programmes et vraiment amusant.",
    },
    values: {
      title: "Ce Qui Nous Tient à Cœur",
      inclusive: "Inclusif — conçu pour tous les enfants, partout.",
      safe: "Sécurisé — pas de publicités, pas de pistage, pas de contenu inapproprié.",
      joyful: "Joyeux — l'apprentissage doit ressembler à un jeu.",
      rigorous: "Rigoureux — un contenu qui répond aux vrais standards éducatifs.",
    },
  },

  parents: {
    title: "Pour les Parents",
    subtitle: "Tout ce dont vous avez besoin pour soutenir le parcours d'apprentissage de votre enfant.",
    safeTitle: "Sécurisé par Conception",
    safeBody:
      "LilGenius ne contient aucune publicité, aucun achat intégré et aucune fonctionnalité sociale. Votre enfant apprend dans un environnement entièrement fermé et adapté à son âge.",
    progressTitle: "Suivre Chaque Étape",
    progressBody:
      "Voyez quelles matières votre enfant a explorées, combien de leçons il a terminées et quels succès il a débloqués.",
    languagesTitle: "Deux Langues, Une Plateforme",
    languagesBody:
      "Basculez entre l'anglais et le français à tout moment. Les progrès de votre enfant sont conservés dans les deux langues.",
    ageGroupsTitle: "Contenu Adapté à l'Âge",
    ageGroupsBody:
      "Les leçons sont adaptées à trois groupes d'âge — 6–8, 9–10 et 11–12 ans — pour que la difficulté corresponde toujours au niveau de votre enfant.",
    faqTitle: "Questions Fréquentes",
    faq1Q: "LilGenius est-il gratuit ?",
    faq1A:
      "Oui. L'expérience de base est entièrement gratuite. Nous nous engageons à rendre l'apprentissage accessible à toutes les familles.",
    faq2Q: "Mon enfant a-t-il besoin d'un compte ?",
    faq2A:
      "Un profil léger (prénom, tranche d'âge et langue préférée) est tout ce dont nous avons besoin. Aucune adresse e-mail n'est requise.",
    faq3Q: "Puis-je suivre les progrès de mon enfant ?",
    faq3A:
      "Oui. Connectez-vous au compte de votre enfant pour consulter son tableau de bord et ses succès récents.",
    getStarted: "Aidez Votre Enfant à Commencer",
  },

  teachers: {
    title: "Pour les Enseignants",
    subtitle:
      "Utilisez LilGenius pour compléter votre classe et inspirer des apprenants autonomes.",
    classroomTitle: "Prêt pour la Classe",
    classroomBody:
      "Chaque matière sur LilGenius est alignée sur les programmes des écoles primaires. Utilisez les leçons comme exercices d'échauffement, devoirs ou activités de révision.",
    trackingTitle: "Suivre les Progrès des Élèves",
    trackingBody:
      "Voyez quels sujets chaque élève a étudiés, où il a excellé et où il pourrait avoir besoin d'un soutien supplémentaire.",
    bilingualTitle: "Support Bilingue",
    bilingualBody:
      "Parfait pour les classes bilingues. Les élèves peuvent passer de l'anglais au français sans perdre leurs progrès.",
    resourcesTitle: "Ressources pour Enseignants",
    resourcesBody:
      "Nous fournissons des résumés de leçons et des guides de sujets pour que les enseignants puissent prévisualiser le contenu avant de l'attribuer aux élèves.",
    getInTouch: "Nous Contacter",
    getInTouchBody:
      "Vous souhaitez utiliser LilGenius avec votre classe ? Contactez-nous — nous serions ravis d'avoir de vos nouvelles.",
    contactButton: "Nous Écrire",
    faqTitle: "FAQ pour Enseignants",
    faq1Q: "Puis-je assigner des leçons spécifiques ?",
    faq1A:
      "Les élèves peuvent naviguer librement vers n'importe quelle leçon. Nous travaillons sur un tableau de bord enseignant pour permettre l'attribution directe.",
    faq2Q: "Le contenu est-il aligné sur les programmes ?",
    faq2A:
      "Oui. Tout le contenu est revu par rapport aux programmes des écoles primaires des systèmes éducatifs africains et référencé au niveau international.",
  },

  auth: {
    login: {
      title: "Bon Retour",
      subtitle: "Connecte-toi pour continuer ton aventure d'apprentissage.",
      namePlaceholder: "Ton prénom",
      nameLabel: "Prénom",
      submit: "Se Connecter",
      noAccount: "Nouveau sur LilGenius ?",
      register: "Créer un compte gratuit",
      error: "Nous n'avons pas trouvé de profil avec ce prénom. Réessaie.",
    },
    register: {
      title: "Créer Ton Compte",
      subtitle: "Rejoins des milliers de jeunes apprenants et commence à explorer aujourd'hui.",
      namePlaceholder: "Ton prénom",
      nameLabel: "Prénom",
      submit: "Créer le Compte",
      hasAccount: "Tu as déjà un compte ?",
      login: "Se connecter",
      terms:
        "En créant un compte, tu acceptes nos Conditions d'Utilisation et notre Politique de Confidentialité.",
      successTitle: "Bienvenue sur LilGenius, {name} !",
      successBody: "Ton profil a été créé. Que l'aventure commence !",
    },
  },

  errors: {
    notFound: {
      title: "Page Introuvable",
      message:
        "La page que tu cherches n'existe pas ou a été déplacée.",
      back: "Retour",
      home: "Retour à l'Accueil",
    },
    generic: {
      title: "Une Erreur s'est Produite",
      message:
        "Une erreur inattendue s'est produite. Veuillez réessayer dans un instant.",
      retry: "Réessayer",
    },
    noProfile: {
      title: "Aucun Profil Trouvé",
      message: "Crée ton profil pour commencer à apprendre.",
      cta: "Créer un Profil",
    },
    offline: {
      title: "Tu es Hors Ligne",
      message:
        "Vérifie ta connexion internet et réessaie.",
    },
  },

  common: {
    loading: "Chargement...",
    error: "Une erreur est survenue. Veuillez réessayer.",
    empty: "Rien ici pour le moment.",
    retry: "Réessayer",
    back: "Retour",
    next: "Suivant",
    start: "Démarrer",
    continue: "Continuer",
    finish: "Terminer",
    save: "Enregistrer",
    cancel: "Annuler",
    search: "Rechercher",
    filter: "Filtrer",
    all: "Tout",
    or: "ou",
    and: "et",
    yes: "Oui",
    no: "Non",
    close: "Fermer",
    open: "Ouvrir",
    home: "Accueil",
    minutes: "{count} min",
  },
};

export default fr;
