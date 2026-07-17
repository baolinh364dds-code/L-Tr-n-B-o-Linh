/**
 * AuraPortfolio - Cute & Fresh Theme Configuration
 * 
 * Edit this file to customize all website text, images, skills, achievements, 
 * and contact info without touching HTML, CSS, or main JavaScript files.
 */

const profileData = {
  personalInfo: {
    name: "Lê Trần Bảo Linh",
    koreanName: "Lee Do Na",
    title: "Journalism Student & Storyteller",
    profileImage: "background.jpg", // Uses your uploaded profile picture
    
    // Catchy short introduction displayed on the Hero section
    introShort: "3rd-year Journalism student at the University of Science and Education - The University of Da Nang.",
    
    // Sentences used for the typing animation in the Hero section
    typingSentences: [
      "Student Journalist",
      "Multimedia Creator",
      "Visual Storyteller",
      "Creative Writer"
    ],
    
    // Longer description in the About Me section
    bio: "Hello! I'm Lê Trần Bảo Linh (Korean name: Lee Do Na), a Journalism student at the University of Education – The University of Da Nang, Vietnam.\n\nBesides studying, I actively participate in student research, volunteer activities, media production, and university clubs. I always strive to learn, grow, and create meaningful work through creativity and technology.",
    
    // Education details
    education: [
      {
        period: "2023 - Present",
        degree: "Bachelor of Journalism",
        school: "University of Science and Education - The University of Da Nang"
      }
    ],
    
    // Personal interests shown in cards
    interests: [
      { icon: "✍️", title: "Creative Writing", desc: "Crafting narratives and feature articles." },
      { icon: "📸", title: "Photojournalism", desc: "Telling stories through camera lenses." },
      { icon: "🎙️", title: "Podcast Production", desc: "Recording and editing audio stories." },
      { icon: "✈️", title: "Cultural Exploration", desc: "Discovering heritage and local history." }
    ]
  },
  
  // Skills with animated progress bars and cute icons
  skills: [
    { name: "News Reporting & Writing", value: 90, icon: "📝" },
    { name: "Interviewing Techniques", "value": 85, icon: "💬" },
    { name: "Video Editing (Premiere Pro)", value: 80, icon: "🎬" },
    { name: "Photography & Layout", value: 85, icon: "📷" },
    { name: "Social Media Strategy", value: 88, icon: "📱" }
  ],
  
  // Project listing showing cards with cute icons and descriptions
  projects: [
    {
      icon: "🌪️",
      title: "Disaster Communication Research",
      desc: "Conducted a student research project on disaster communication in Da Nang, focusing on communication strategies for floods and heatwaves in the context of climate change.",
      link: "#"
    },
    {
      icon: "🧠",
      title: "Mental Health Media Research",
      desc: "Conducted research on media coverage of mental health in Vietnamese online newspapers, analyzing communication trends and public awareness related to mental health.",
      link: "#"
    },
    {
      icon: "📰",
      title: "Journalism & Multimedia Projects",
      desc: "Produced news articles, feature stories, radio programs, podcasts, and multimedia journalism projects as part of my journalism studies.",
      link: "#"
    },
    {
      icon: "🎤",
      title: "Public Relations & Communication Projects",
      desc: "Developed communication campaigns, event proposals, media plans, and promotional content for university courses and student activities.",
      link: "#"
    },
    {
      icon: "📷",
      title: "Photography & Content Creation",
      desc: "Creating visual content through photography, graphic design, and digital storytelling to document people, places, and meaningful moments.",
      link: "#"
    }
  ],
  
  // Achievements list displayed as modern cards
  achievements: [
    {
      icon: "🌟",
      title: "Vietnamese Student with Five Good Merits (University Level)",
      desc: "Recognized for excellence in academics, ethics, volunteer activities, physical fitness, and community engagement."
    },
    {
      icon: "🎓",
      title: "Academic Scholarship Recipient",
      desc: "Awarded academic scholarships for three consecutive semesters in recognition of outstanding academic performance."
    },
    {
      icon: "📚",
      title: "Student Research Participant",
      desc: "Actively involved in university research projects, focusing on journalism, communication, and artificial intelligence."
    },
    {
      icon: "📖",
      title: "Member of the Book & Youth Club (UED)",
      desc: "Participated in activities promoting reading culture, personal development, and community engagement."
    },
    {
      icon: "🤝",
      title: "Volunteer in University and Community Activities",
      desc: "Contributed to various volunteer programs and social activities organized by the university and local communities."
    },
    {
      icon: "📰",
      title: "Experience in Multimedia Journalism Projects",
      desc: "Produced news articles, podcasts, radio programs, and multimedia storytelling projects during university studies."
    }
  ],
  
  // Gallery images classified by categories for filtering
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
      category: "academic",
      alt: "Presenting my student research project on disaster communications."
    },
    {
      url: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80",
      category: "academic",
      alt: "Studying journalism and media trends in the university library."
    },
    {
      url: "https://images.unsplash.com/photo-1559027615-cd44874e90e5?w=600&auto=format&fit=crop&q=80",
      category: "activities",
      alt: "Volunteering with the Book & Youth Club for local children."
    },
    {
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80",
      category: "activities",
      alt: "Organizing multimedia presentations at the student journalism summit."
    },
    {
      url: "gallery_personal_1.jpg", // Your uploaded photo
      category: "personal",
      alt: "Documenting life behind the lens in Da Nang 📷"
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
      category: "personal",
      alt: "Sunsets and calming waves along the Da Nang coastline."
    }
  ],
  
  // Contact details and social links
  contact: {
    email: "baolinh.letran@example.com",
    phone: "+84 905 XXX XXX",
    location: "Da Nang City, Vietnam",
    socials: [
      { platform: "Facebook", url: "#", icon: "🔗" },
      { platform: "Instagram", url: "#", icon: "📸" },
      { platform: "LinkedIn", url: "#", icon: "💼" },
      { platform: "GitHub", url: "#", icon: "💻" }
    ]
  }
};
