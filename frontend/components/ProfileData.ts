// -------------------------------------------------------------
// PROFILE DATA - TARUN LAKKOJU
// Extracted and synchronized with official resume
// -------------------------------------------------------------

export interface EducationItem {
    degree: string;
    college: string;
    location: string;
    year: string;
    score: string;
    scoreType: "CGPA" | "Percentage" | "GPA";
}

export interface ProjectItem {
    id: number;
    title: string;
    subtitle?: string;
    category: "Backend / Java" | "AI & Automation" | "Full-Stack";
    description: string;
    bullets: string[];
    tech: string[];
    architecture?: string;
    github?: string;
    demo?: string;
    featured?: boolean;
}

export interface SkillCategory {
    category: string;
    icon?: string;
    skills: { name: string; level?: string }[];
}

export const profile = {
    name: "LAKKOJU TARUN",
    tagline: "Backend Developer & AI Automation Engineer",
    role: "Backend Developer | Full-Stack (Java / Spring Boot) | AI Agent Automation",
    summary: "Computer Science Engineering (Data Science) undergraduate with strong foundations in backend and full-stack development. Experienced in building scalable applications, designing RESTful APIs, and working with SQL/NoSQL databases. Skilled in Java, Spring Boot, database management, automation using n8n, and creating AI agents. Familiar with server-side logic, basic distributed systems, performance optimization, and AWS/cloud fundamentals. Committed to writing clean, maintainable code and collaborating effectively in agile teams.",
    
    // Contact Information (Matched with Resume)
    contact: {
        phone: "+91 9491623293",
        email: "tarunlakkoju925@gmail.com",
        location: "Chennai, India",
        linkedin: "https://www.linkedin.com/in/tarun-lakkoju",
        linkedinUsername: "in/tarun-lakkoju",
        github: "https://github.com/Tarun9491",
        githubUsername: "Tarun9491",
        status: "Open for Opportunities (Internships & Full-Time)"
    },

    // Education
    education: [
        {
            degree: "Bachelor of Technology (B.Tech) – Computer Science and Engineering (Data Science)",
            college: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
            location: "Chennai, India",
            year: "2023 – 2027",
            score: "7.28* / 10",
            scoreType: "CGPA"
        },
        {
            degree: "Higher Secondary Education (Class XII – MPC)",
            college: "Sri Chaitanya Junior College",
            location: "Vijayawada, India",
            year: "2021 – 2023",
            score: "78%",
            scoreType: "Percentage"
        },
        {
            degree: "Secondary Education (Class X)",
            college: "Prathibha E.M School",
            location: "Andhra Pradesh, India",
            year: "2021",
            score: "9.0 / 10",
            scoreType: "GPA"
        }
    ] as EducationItem[],

    // Categorized Technical Skills (From Resume)
    skillCategories: [
        {
            category: "Backend Development",
            skills: [
                { name: "Java", level: "Advanced" },
                { name: "Spring Boot", level: "Advanced" },
                { name: "RESTful APIs", level: "Advanced" },
                { name: "Node.js (Basics)", level: "Familiar" },
                { name: "Server-side Architecture", level: "Intermediate" }
            ]
        },
        {
            category: "AI & Automation",
            skills: [
                { name: "AI Agent Creation", level: "Proficient" },
                { name: "n8n Workflow Automation", level: "Proficient" },
                { name: "API Automation", level: "Proficient" },
                { name: "LLM Integration (Basics)", level: "Intermediate" }
            ]
        },
        {
            category: "Databases & Storage",
            skills: [
                { name: "MySQL", level: "Advanced" },
                { name: "SQL & Relational Modeling", level: "Advanced" },
                { name: "NoSQL", level: "Familiar" },
                { name: "JPA / Hibernate", level: "Proficient" },
                { name: "CRUD Operations", level: "Advanced" }
            ]
        },
        {
            category: "Cloud & DevOps",
            skills: [
                { name: "AWS Fundamentals", level: "Intermediate" },
                { name: "Amazon EC2", level: "Intermediate" },
                { name: "Amazon S3", level: "Intermediate" },
                { name: "AWS IAM", level: "Intermediate" }
            ]
        },
        {
            category: "Frontend Development",
            skills: [
                { name: "HTML5", level: "Proficient" },
                { name: "CSS3", level: "Proficient" },
                { name: "JavaScript (Basics)", level: "Intermediate" },
                { name: "Tailwind CSS", level: "Intermediate" }
            ]
        },
        {
            category: "Programming Languages",
            skills: [
                { name: "Java", level: "Advanced" },
                { name: "Python (Basic)", level: "Intermediate" },
                { name: "JavaScript", level: "Intermediate" }
            ]
        },
        {
            category: "Tools & Analytics",
            skills: [
                { name: "Git & GitHub", level: "Proficient" },
                { name: "Postman API Testing", level: "Advanced" },
                { name: "Power BI", level: "Intermediate" },
                { name: "Jupyter Notebook", level: "Intermediate" },
                { name: "Excel", level: "Proficient" }
            ]
        },
        {
            category: "Soft Skills",
            skills: [
                { name: "Problem Solving" },
                { name: "Analytical Thinking" },
                { name: "Team Collaboration" },
                { name: "Communication Skills" },
                { name: "Time Management" }
            ]
        }
    ] as SkillCategory[],

    // Project Roles & Responsibilities (Direct from Resume)
    rolesAndResponsibilities: [
        "Hands-on experience with MySQL database design, CRUD operations, and relational data modeling.",
        "Experience in developing and testing robust RESTful APIs using Spring Boot and Postman.",
        "Experience creating automated workflows using n8n and integrating APIs with automation workflows.",
        "Familiarity with creating AI agents and integrating AI capabilities into application workflows.",
        "Strong presentation and communication skills with the ability to explain technical concepts clearly."
    ],

    // Detailed Projects
    projects: [
        {
            id: 1,
            title: "FinPulse – Real-Time Banking & Account Management App",
            subtitle: "Full-Stack Enterprise Banking & Transaction Solution",
            category: "Backend / Java",
            featured: true,
            description: "Developed a full-stack online banking system using Spring Boot and Android (Java). Designed and implemented RESTful APIs for account management and transaction processing with JPA/Hibernate persistent storage.",
            bullets: [
                "Developed a full-stack online banking system using Spring Boot backend and Android (Java) client.",
                "Designed and implemented RESTful APIs for account management, balance inquiries, and transaction processing.",
                "Integrated MySQL database using JPA/Hibernate for persistent and resilient financial data storage.",
                "Implemented secure login authentication and real-time transaction updates.",
                "Applied layered architecture using the Controller-Service-Repository pattern for modular, testable code.",
                "Designed a normalized relational database schema for financial operations ensuring ACID compliance."
            ],
            tech: ["Java", "Spring Boot", "Android", "MySQL", "JPA / Hibernate", "RESTful APIs", "Postman"],
            architecture: "Controller ➔ Service ➔ Repository ➔ JPA/Hibernate ➔ MySQL Database",
            github: "https://github.com/Tarun9491",
            demo: ""
        },
        {
            id: 2,
            title: "Autonomous AI Agent & n8n Workflow Automation",
            subtitle: "API Orchestration & Automated Intelligence Pipeline",
            category: "AI & Automation",
            featured: true,
            description: "Built automated data processing pipelines and autonomous AI agent workflows using n8n, orchestrating third-party APIs, webhooks, and LLM reasoning steps.",
            bullets: [
                "Created multi-step automated workflows in n8n integrating external REST APIs and webhook listeners.",
                "Integrated LLM reasoning capabilities into automation flows for intelligent text parsing and structured output extraction.",
                "Automated alerting, reporting, and transaction validation hooks with zero manual intervention.",
                "Tested and optimized workflow execution pipelines for low latency and high reliability."
            ],
            tech: ["n8n", "AI Agents", "LLM APIs", "REST APIs", "Webhooks", "JSON Automation"],
            architecture: "Webhook Trigger ➔ Data Transformation ➔ LLM Agent Reasoning ➔ External Action Dispatch",
            github: "https://github.com/Tarun9491",
            demo: ""
        },
        {
            id: 3,
            title: "PulseStack – Engineering Portfolio & AI Assistant",
            subtitle: "Next.js Full-Stack Platform & Dual-Engine AI Agent",
            category: "Full-Stack",
            featured: false,
            description: "Interactive full-stack portfolio platform featuring an ATS-compliant interactive resume engine, dual-engine AI recruiter assistant, and SQLite database persistence.",
            bullets: [
                "Built with Next.js 16, React 19, Tailwind CSS v4, Express.js backend, and SQLite database.",
                "Engineered AI assistant with comprehensive knowledge of Tarun's resume with instant fallback intelligence.",
                "Interactive ATS-friendly resume export and print capability directly within the web application.",
                "Normalized SQLite schema capturing inquiries and recruiter messages."
            ],
            tech: ["Next.js", "React 19", "Express.js", "SQLite", "Groq AI / Llama 3", "Tailwind CSS"],
            architecture: "Next.js Client ➔ Express REST API ➔ SQLite Engine & Groq AI Agent",
            github: "https://github.com/Tarun9491",
            demo: ""
        }
    ] as ProjectItem[],

    // Achievements & Additional Information
    achievements: [
        "Successfully tested APIs using Postman and ensured rigorous database consistency and data validation.",
        "Possess foundational knowledge of cloud computing concepts and AWS services including EC2, S3, and IAM.",
        "Consistently maintained strong academic standing with a 7.28* / 10 CGPA in Computer Science Engineering (Data Science) and 9.0 / 10 in Secondary Education.",
        "Extensive practical experience in Controller-Service-Repository architecture and normalized relational schema design."
    ],

    // Quick Stats for Hero
    stats: [
        { label: "B.Tech CGPA", value: "7.28", sub: "Vel Tech Institute" },
        { label: "Class X GPA", value: "9.0", sub: "Prathibha School" },
        { label: "Core Project", value: "FinPulse", sub: "Full-Stack Banking" },
        { label: "Cloud & APIs", value: "AWS & REST", sub: "EC2, S3, IAM, Postman" }
    ]
};

export default profile;
