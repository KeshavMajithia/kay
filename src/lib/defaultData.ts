export const DEFAULT_DATA = {
  personal: {
    name: "Keshav Majithia",
    tagline: "Developer in an Infinite Loop",
    currentStatus: "Currently iterating at VIT AP, Vellore",
    iterationStartYear: 2019,
    currentlyLearning: "Advanced System Design & Cloud Architecture",
    lastDeployed: "November 2024",
    nextIteration: "Building something awesome"
  },
  
  education: {
    institution: "Vellore Institute of Technology, AP",
    degree: "Integrated M.Tech in Computer Science and Engineering",
    duration: "Sept 2022 – Present",
    coursework: "AI, Cybersecurity, Data Analytics, DSA, Deep Learning"
  },
  
  certifications: [
    { id: "1", title: "Oracle Cloud Infrastructure Architect Professional", credentialId: "OCI-2023-ARCH-123456", url: "" },
    { id: "2", title: "Oracle Cloud Infrastructure GenAI Professional", credentialId: "OCI-2023-GENAI-234567", url: "" },
    { id: "3", title: "Oracle Cloud Infrastructure Data Science Professional", credentialId: "OCI-2023-DS-345678", url: "" }
  ],
  
  skills: [
    { id: "1", name: "JavaScript", category: "Languages" },
    { id: "2", name: "Python", category: "Languages" },
    { id: "3", name: "Java", category: "Languages" },
    { id: "4", name: "TypeScript", category: "Languages" },
    { id: "5", name: "React", category: "Frameworks" },
    { id: "6", name: "Node.js", category: "Frameworks" },
    { id: "7", name: "Next.js", category: "Frameworks" },
    { id: "8", name: "AWS", category: "Cloud" },
    { id: "9", name: "Azure", category: "Cloud" },
    { id: "10", name: "Oracle Cloud", category: "Cloud" },
    { id: "11", name: "PostgreSQL", category: "Databases" },
    { id: "12", name: "MongoDB", category: "Databases" },
    { id: "13", name: "Redis", category: "Databases" },
    { id: "14", name: "Git", category: "Tools" },
    { id: "15", name: "Docker", category: "Tools" },
    { id: "16", name: "Kubernetes", category: "Tools" }
  ],
  
  projects: [
    {
      id: "1",
      title: "SmartRoute AI",
      description: "Hierarchical navigation with RL agents for autonomous systems",
      techStack: ["Python", "TensorFlow", "ROS", "OpenAI Gym"],
      demoLink: "",
      githubLink: "https://github.com/keshav",
      videoLink: "",
      featured: true,
      iteration: 1
    },
    {
      id: "2",
      title: "Infinite Loop Portfolio",
      description: "A developer portfolio with dynamic content management and particle effects",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Canvas API"],
      demoLink: "https://example.com",
      githubLink: "",
      videoLink: "",
      featured: true,
      iteration: 2
    },
    {
      id: "3",
      title: "Cloud Infrastructure Manager",
      description: "Multi-cloud resource management dashboard with cost optimization",
      techStack: ["Node.js", "React", "PostgreSQL", "AWS", "Azure"],
      demoLink: "",
      githubLink: "https://github.com/keshav",
      videoLink: "",
      featured: false,
      iteration: 3
    }
  ],
  
  achievements: [
    {
      id: "1",
      award: "3rd Place Overall",
      event: "Hoya Hacks 2021",
      organizer: "Georgetown University",
      project: "Wasteless",
      year: "2021",
      projectLink: "https://devpost.com/wasteless"
    },
    {
      id: "2",
      award: "Best Use of Google Cloud",
      event: "Oxford Hack 2020",
      organizer: "University of Oxford",
      project: "ERPG",
      year: "2020",
      projectLink: ""
    },
    {
      id: "3",
      award: "Winner - AI/ML Track",
      event: "MIT HackMIT 2020",
      organizer: "Massachusetts Institute of Technology",
      project: "Neural Navigator",
      year: "2020",
      projectLink: "https://devpost.com/neural-navigator"
    }
  ],
  
  experience: [
    {
      id: "1",
      role: "Sponsorship Lead, Mentor & Judge",
      organization: "HackAlphaX",
      description: [
        "Secured 10+ partnerships including 1Password, MLH, Postman",
        "Mentored 190+ participants across multiple tracks",
        "Judged 50+ projects and provided technical feedback"
      ],
      startDate: "Nov 2020",
      endDate: "Nov 2021",
      isPresent: false
    },
    {
      id: "2",
      role: "Founding Web Developer",
      organization: "Universities@USA",
      description: [
        "Built first official website for 1000+ student community",
        "Implemented responsive design and SEO optimization",
        "Maintained 99.9% uptime with automated monitoring"
      ],
      startDate: "May 2020",
      endDate: "Aug 2021",
      isPresent: false
    },
    {
      id: "3",
      role: "Technical Lead",
      organization: "Student Innovation Lab",
      description: [
        "Led team of 8 developers on 3 major projects",
        "Established CI/CD pipelines and code review processes",
        "Reduced deployment time by 60% through automation"
      ],
      startDate: "Jan 2023",
      endDate: "",
      isPresent: true
    }
  ],
  
  stats: {
    hackathonsWon: 10,
    projectsShipped: 15,
    certificationsEarned: 3
  },
  
  contact: {
    email: "keshav@example.com",
    linkedIn: "https://linkedin.com/in/keshavmajithia",
    github: "https://github.com/keshavmajithia",
    devpost: "https://devpost.com/keshavmajithia",
    resumeUrl: "https://example.com/resume.pdf"
  }
};
