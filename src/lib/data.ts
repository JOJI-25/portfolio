// ============================================================
// Static Data — Replace with your actual content
// ============================================================

import type {
  Project,
  Skill,
  Certification,
  Achievement,
  JourneyItem,
  NavItem,
  MetricItem,
  DashboardItem,
} from "@/types";

// ─── Navigation ─────────────────────────────────────────────
export const navItems: NavItem[] = [
  { label: "Home", href: "#home", icon: "Home" },
  { label: "Projects", href: "#projects", icon: "FolderKanban" },
  { label: "About", href: "#about", icon: "User" },
  { label: "Journey", href: "#journey", icon: "Route" },
  { label: "Skills", href: "#skills", icon: "Layers" },
  { label: "Dashboards", href: "#dashboards", icon: "BarChart3" },
  { label: "Certifications", href: "#certifications", icon: "Award" },
  { label: "Achievements", href: "#achievements", icon: "Shield" },
  { label: "GitHub", href: "#github", icon: "Github" },
  { label: "Contact", href: "#contact", icon: "Mail" },
];

// ─── Recruiter Dashboard Metrics ────────────────────────────
export const metrics: MetricItem[] = [
  { label: "Projects Completed", value: 12, icon: "FolderKanban", suffix: "+" },
  { label: "Skills Mastered", value: 8, icon: "Layers" },
  { label: "Certifications Earned", value: 5, icon: "Award" },
  { label: "GitHub Repositories", value: 15, icon: "Github", suffix: "+" },
  { label: "Dashboards Created", value: 4, icon: "BarChart3" },
];

// ─── Featured Projects ─────────────────────────────────────
export const projects: Project[] = [];

// ─── Learning Journey ───────────────────────────────────────
export const journeyItems: JourneyItem[] = [
  { id: 'j-1', title: 'Excel', role: 'Foundation', company: 'Data Entry', date: '2026', skill: 'Excel', icon: '📊', status: 'upcoming', description: 'Formulas, Pivot Tables, and Macros.', type: 'education', skills: [] },
  { id: 'j-2', title: 'Linux & Python', role: 'Core', company: 'Programming', date: '2026', skill: 'Linux & Python', icon: '🐧', status: 'upcoming', description: 'Command line operations and core Python programming.', type: 'education', skills: [] },
  { id: 'j-3', title: 'SQL', role: 'Database', company: 'Querying', date: '2026', skill: 'SQL', icon: '💾', status: 'upcoming', description: 'Relational databases, joins, and queries.', type: 'education', skills: [] },
  { id: 'j-4', title: 'NumPy & Pandas', role: 'Library', company: 'Data Prep', date: '2026', skill: 'NumPy & Pandas', icon: '🐼', status: 'upcoming', description: 'Data manipulation and numerical computing.', type: 'education', skills: [] },
  { id: 'j-5', title: 'Statistics & Linear Algebra', role: 'Math', company: 'Foundation', date: '2026', skill: 'Statistics & Linear Algebra', icon: '📐', status: 'upcoming', description: 'Probability, matrices, and statistical inference.', type: 'education', skills: [] },
  { id: 'j-6', title: 'Data Visualization', role: 'Analysis', company: 'Visuals', date: '2026', skill: 'Data Visualization', icon: '🎨', status: 'upcoming', description: 'Matplotlib, Seaborn, and visual storytelling.', type: 'education', skills: [] },
  { id: 'j-7', title: 'Machine Learning', role: 'AI', company: 'Algorithms', date: '2026', skill: 'Machine Learning', icon: '🤖', status: 'upcoming', description: 'Core predictive modeling concepts.', type: 'education', skills: [] },
  { id: 'j-8', title: 'Supervised Learning', role: 'AI', company: 'Modeling', date: '2026', skill: 'Supervised Learning', icon: '🎯', status: 'upcoming', description: 'Regression, Classification, SVM, Trees.', type: 'education', skills: [] },
  { id: 'j-9', title: 'Unsupervised Learning', role: 'AI', company: 'Modeling', date: '2026', skill: 'Unsupervised Learning', icon: '🌌', status: 'upcoming', description: 'Clustering, PCA, Anomaly Detection.', type: 'education', skills: [] },
  { id: 'j-10', title: 'Deep Learning', role: 'AI', company: 'Neural Networks', date: '2026', skill: 'Deep Learning', icon: '🧠', status: 'upcoming', description: 'Neural network architectures and perceptrons.', type: 'education', skills: [] },
  { id: 'j-11', title: 'TensorFlow', role: 'Library', company: 'Framework', date: '2026', skill: 'TensorFlow', icon: '🛠️', status: 'upcoming', description: 'Building models with the TensorFlow framework.', type: 'education', skills: [] },
  { id: 'j-12', title: 'Capstone Project', role: 'Project', company: 'Implementation', date: '2026', skill: 'Capstone Project', icon: '🏆', status: 'upcoming', description: 'End-to-end data science project implementation.', type: 'education', skills: [] },
  { id: 'j-13', title: 'Business Case Studies', role: 'Strategy', company: 'Application', date: '2026', skill: 'Business Case Studies', icon: '💼', status: 'upcoming', description: 'Applying algorithms to real-world business problems.', type: 'education', skills: [] },
  { id: 'j-14', title: 'Generative AI', role: 'AI', company: 'LLMs', date: '2026', skill: 'Generative AI', icon: '✨', status: 'upcoming', description: 'Large Language Models and Prompt Engineering.', type: 'education', skills: [] },
  { id: 'j-15', title: 'Power BI', role: 'Tool', company: 'Dashboards', date: '2026', skill: 'Power BI', icon: '📈', status: 'upcoming', description: 'Interactive business intelligence dashboards.', type: 'education', skills: [] },
  { id: 'j-16', title: 'Git', role: 'Tool', company: 'Version Control', date: '2026', skill: 'Git', icon: '🔄', status: 'upcoming', description: 'Source code management and collaboration.', type: 'education', skills: [] },
  { id: 'j-17', title: 'MLOps', role: 'Operations', company: 'Deployment', date: '2026', skill: 'MLOps', icon: '⚙️', status: 'upcoming', description: 'Model deployment, CI/CD, and monitoring pipelines.', type: 'education', skills: [] },
  { id: 'j-18', title: 'Cloud Deployment', role: 'Infrastructure', company: 'Cloud', date: '2026', skill: 'Cloud Deployment', icon: '☁️', status: 'upcoming', description: 'AWS, Azure, or GCP scalable deployment.', type: 'education', skills: [] }
];

// ─── Skills Roadmap ─────────────────────────────────────────
export const skills: Skill[] = [
  { id: 's-excel', name: 'Excel', icon: '📊', status: 'upcoming', progress: 0, description: 'Data cleaning, formulas, and dashboards.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-linux-python', name: 'Linux & Python', icon: '🐧', status: 'upcoming', progress: 0, description: 'Command line operations and core Python programming.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-sql', name: 'SQL', icon: '💾', status: 'upcoming', progress: 0, description: 'Relational databases, joins, and querying data.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-numpy-pandas', name: 'NumPy & Pandas', icon: '🐼', status: 'upcoming', progress: 0, description: 'Data manipulation and numerical computing arrays.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-stats', name: 'Statistics & Linear Algebra', icon: '📐', status: 'upcoming', progress: 0, description: 'Probability, matrices, and statistical inference.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-dataviz', name: 'Data Visualization', icon: '🎨', status: 'upcoming', progress: 0, description: 'Matplotlib, Seaborn, and visual storytelling.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-ml', name: 'Machine Learning', icon: '🤖', status: 'upcoming', progress: 0, description: 'Core predictive modeling concepts.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-supervised', name: 'Supervised Learning', icon: '🎯', status: 'upcoming', progress: 0, description: 'Regression, Classification, SVM, Trees.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-unsupervised', name: 'Unsupervised Learning', icon: '🌌', status: 'upcoming', progress: 0, description: 'Clustering, PCA, Anomaly Detection.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-dl', name: 'Deep Learning', icon: '🧠', status: 'upcoming', progress: 0, description: 'Neural network architectures and perceptrons.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-tensorflow', name: 'TensorFlow', icon: '🛠️', status: 'upcoming', progress: 0, description: 'Building models with the TensorFlow framework.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-capstone', name: 'Capstone Project', icon: '🏆', status: 'upcoming', progress: 0, description: 'End-to-end data science project implementation.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-business', name: 'Business Case Studies', icon: '💼', status: 'upcoming', progress: 0, description: 'Applying algorithms to real-world business problems.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-genai', name: 'Generative AI', icon: '✨', status: 'upcoming', progress: 0, description: 'Large Language Models and Prompt Engineering.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-powerbi', name: 'Power BI', icon: '📈', status: 'upcoming', progress: 0, description: 'Interactive business intelligence dashboards.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-git', name: 'Git', icon: '🔄', status: 'upcoming', progress: 0, description: 'Source code management and collaboration.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-mlops', name: 'MLOps', icon: '⚙️', status: 'upcoming', progress: 0, description: 'Model deployment, CI/CD, and monitoring pipelines.', relatedProjects: [], parentSkill: null, children: null, notes: null },
  { id: 's-cloud', name: 'Cloud Deployment', icon: '☁️', status: 'upcoming', progress: 0, description: 'AWS, Azure, or GCP scalable deployment.', relatedProjects: [], parentSkill: null, children: null, notes: null }
];

// ─── Certifications ─────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: "cert-google-data",
    title: "Google Advanced Data Analytics",
    issuer: "Google / Coursera",
    date: "2026-03",
    image: "/images/certs/google.png",
    skills: ["Python", "Regression Analysis", "Data Visualization"],
    verifyUrl: "https://coursera.org/verify/example-google"
  },
  {
    id: "cert-deep-learning",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "2026-05",
    image: "/images/certs/deeplearning.png",
    skills: ["TensorFlow", "Neural Networks", "Deep Learning"],
    verifyUrl: "https://coursera.org/verify/example-deeplearning"
  },
  {
    id: "cert-powerbi",
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    date: "2026-04",
    image: "/images/certs/microsoft.png",
    skills: ["Power BI", "DAX", "Data Modeling"],
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/example"
  }
];

// ─── Achievement Badges ─────────────────────────────────────
export const achievements: Achievement[] = [
  {
    id: "ach-numpy",
    title: "NumPy Ninja",
    icon: "🐼",
    status: "earned",
    level: 4,
    description: "Completed NumPy & Pandas fundamentals"
  },
  {
    id: "ach-sql",
    title: "SQL Samurai",
    icon: "💾",
    status: "earned",
    level: 4,
    description: "Mastered joins, subqueries, and window functions"
  },
  {
    id: "ach-ml",
    title: "ML Apprentice",
    icon: "🤖",
    status: "in-progress",
    level: 2,
    description: "Studying supervised and unsupervised learning algorithms",
    progress: 40
  },
  {
    id: "ach-deep",
    title: "Deep Explorer",
    icon: "🧠",
    status: "locked",
    level: 0,
    description: "Unlocks after finishing TensorFlow topics"
  }
];

// ─── Dashboard Gallery ──────────────────────────────────────
export const dashboards: DashboardItem[] = [
  {
    id: "dash-sales",
    title: "Sales Performance Tracker",
    tool: "Power BI",
    image: "/images/dashboards/sales.png",
    description: "Interactive executive dashboard tracking global sales metrics and regional performance."
  },
  {
    id: "dash-finance",
    title: "Financial Analysis Dashboard",
    tool: "Excel",
    image: "/images/dashboards/finance.png",
    description: "Dynamic pivot tables, charts, and conditional formatting analyzing company expenses."
  },
  {
    id: "dash-churn",
    title: "Customer Churn Analytics",
    tool: "Analytics",
    image: "/images/dashboards/churn.png",
    description: "Cohort analysis and trend predictions segmenting customer churn risks."
  }
];

// ─── Personal Info ──────────────────────────────────────────
export const personalInfo = {
  name: "Your Name",
  title: "Aspiring Data Scientist & AI Engineer",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  bio: "Engineering Graduate passionate about transforming raw data into actionable insights. Currently building expertise in Data Science, Machine Learning, and AI — one project at a time.",
  education: "B.E. / B.Tech in Engineering",
  university: "Your University Name",
  careerObjective:
    "To secure a role as a Data Scientist or AI Engineer where I can leverage my analytical skills, technical expertise, and continuous learning mindset to drive data-driven decisions.",
  currentFocus: "Python, Statistics, and Machine Learning foundations",
  interests: ["Data Visualization", "Natural Language Processing", "Computer Vision", "Time Series Analysis"],
  typingPhrases: [
    "Aspiring Data Scientist",
    "AI Engineer",
    "Data Analytics Enthusiast",
    "Machine Learning Explorer",
  ],
  resumeUrl: "/resume.pdf",
};
