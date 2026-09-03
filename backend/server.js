// -------------------------------------------------------------
// TARUN LAKKOJU - PORTFOLIO BACKEND & AI COMMAND CENTER
// Express.js + SQLite3 + Groq AI / Smart Fallback Engine
// -------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config();

// Initialize App
const app = express();
app.use(cors());
app.use(express.json());

const startTime = Date.now();

// -------------------------------------------------------------
// SQLITE DATABASE SETUP
// -------------------------------------------------------------
const dbPath = path.resolve(__dirname, "portfolio.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ SQLite connection error:", err.message);
    } else {
        console.log("✔ Connected to SQLite database at:", dbPath);
    }
});

// Create tables if they do not exist
db.serialize(() => {
    // Projects Table
    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            description TEXT,
            tech TEXT,
            bullets TEXT,
            architecture TEXT,
            github TEXT,
            demo TEXT
        )
    `);

    // Inquiries / Messages Table
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // AI Chat Logs Table
    db.run(`
        CREATE TABLE IF NOT EXISTS ai_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_query TEXT,
            bot_reply TEXT,
            source TEXT DEFAULT 'smart_engine',
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Seed default projects from resume if empty
    db.get("SELECT COUNT(*) as count FROM projects", (err, row) => {
        if (!err && row && row.count === 0) {
            console.log("🌱 Seeding projects into SQLite...");
            const insertStmt = db.prepare(`
                INSERT INTO projects (title, category, description, tech, bullets, architecture, github, demo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);

            insertStmt.run(
                "FinPulse – Real-Time Banking & Account Management App",
                "Backend / Java",
                "Developed a full-stack online banking system using Spring Boot and Android (Java). Designed and implemented RESTful APIs for account management and transaction processing. Integrated MySQL database using JPA/Hibernate for persistent data storage.",
                "Java, Spring Boot, Android, MySQL, JPA/Hibernate, RESTful APIs, Postman",
                JSON.stringify([
                    "Developed a full-stack online banking system using Spring Boot backend and Android (Java) client.",
                    "Designed and implemented RESTful APIs for account management, balance inquiries, and transaction processing.",
                    "Integrated MySQL database using JPA/Hibernate for persistent and resilient financial data storage.",
                    "Implemented secure login authentication and real-time transaction updates.",
                    "Applied layered architecture using the Controller-Service-Repository pattern for modular, testable code.",
                    "Designed a normalized relational database schema for financial operations ensuring ACID compliance."
                ]),
                "Controller ➔ Service ➔ Repository ➔ JPA/Hibernate ➔ MySQL Database",
                "https://github.com/Tarun9491",
                ""
            );

            insertStmt.run(
                "Autonomous AI Agent & n8n Workflow Automation",
                "AI & Automation",
                "Built automated data processing pipelines and autonomous AI agent workflows using n8n, orchestrating third-party APIs, webhooks, and LLM reasoning steps.",
                "n8n, AI Agents, LLM APIs, REST APIs, Webhooks, JSON Automation",
                JSON.stringify([
                    "Created multi-step automated workflows in n8n integrating external REST APIs and webhook listeners.",
                    "Integrated LLM reasoning capabilities into automation flows for intelligent text parsing and structured output extraction.",
                    "Automated alerting, reporting, and transaction validation hooks with zero manual intervention."
                ]),
                "Webhook Trigger ➔ Data Transformation ➔ LLM Agent Reasoning ➔ External Action Dispatch",
                "https://github.com/Tarun9491",
                ""
            );

            insertStmt.run(
                "Portfolio & AI Command Center Dashboard",
                "Full-Stack",
                "Interactive Next.js full-stack portfolio & live command center dashboard featuring real-time health telemetry, intelligent chat agent, and SQLite persistence.",
                "Next.js, React 19, Express.js, SQLite, Groq AI / Llama 3, Tailwind CSS",
                JSON.stringify([
                    "Built with Next.js 16, React 19, Tailwind CSS v4, Express.js backend, and SQLite database.",
                    "Engineered dual-engine AI assistant with comprehensive resume knowledge and instant fallback.",
                    "Implemented live system telemetry monitoring latency, database metrics, and incoming inquiries."
                ]),
                "Next.js Client ➔ Express REST API ➔ SQLite Engine & AI Recruiter Assistant",
                "https://github.com/Tarun9491",
                ""
            );

            insertStmt.finalize();
        }
    });
});

// -------------------------------------------------------------
// RESUME KNOWLEDGE BASE FOR AI
// -------------------------------------------------------------
const TARUN_RESUME_CONTEXT = `
Name: Lakkoju Tarun
Title: Backend Developer & AI Automation Engineer (Java, Spring Boot, AI Agents, n8n)
Email: tarunlakkoju925@gmail.com
Phone: +91 9491623293
Location: Chennai, India
LinkedIn: https://www.linkedin.com/in/tarun-lakkoju (in/tarun-lakkoju)
GitHub: https://github.com/Tarun9491 (Tarun9491)

Profile Summary:
Computer Science Engineering (Data Science) undergraduate at Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai (2023 - 2027) with strong foundations in backend and full-stack development. Experienced in building scalable applications, designing RESTful APIs, and working with SQL/NoSQL databases. Skilled in Java, Spring Boot, database management, automation using n8n, and creating AI agents. Familiar with server-side logic, basic distributed systems, performance optimization, and AWS/cloud fundamentals. Committed to writing clean, maintainable code and collaborating effectively in agile teams.

Education:
1. Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai, India
   - Bachelor of Technology (B.Tech) – Computer Science and Engineering, CGPA: 7.28* / 10 (2023 – 2027)
2. Sri Chaitanya Junior College, Vijayawada, India
   - Higher Secondary Education (Class XII – MPC), Percentage: 78% (2021 – 2023)
3. Prathibha E.M School, Andhra Pradesh, India
   - Secondary Education (Class X), GPA: 9.0 / 10 (2021)

Technical Skills:
- Programming Languages: Java, Python (Basic), JavaScript
- Backend Development: Java, Spring Boot, RESTful APIs, Node.js (Basics), Controller-Service-Repository pattern
- Frontend Development: HTML5, CSS3, JavaScript (Basics), Tailwind CSS
- Databases: MySQL, SQL, Relational Data Modeling, CRUD operations, NoSQL, JPA/Hibernate
- Automation: n8n, Workflow Automation, API Automation
- AI: AI Agent Creation, AI Workflow Automation, LLM Integration (Basic)
- Cloud: AWS Fundamentals, EC2, S3, IAM
- Tools: Git, GitHub, Postman, Excel, Jupyter Notebook, Power BI
- Soft Skills: Problem Solving, Analytical Thinking, Team Collaboration, Communication Skills, Time Management

Key Project: FinPulse – Real-Time Banking & Account Management App
- Developed a full-stack online banking system using Spring Boot backend and Android (Java) client.
- Designed and implemented RESTful APIs for account management, balance checks, and transaction processing.
- Integrated MySQL database using JPA/Hibernate for persistent, ACID-compliant data storage.
- Implemented secure login authentication and real-time transaction updates.
- Applied layered architecture using the Controller-Service-Repository pattern.
- Designed a normalized relational database schema for financial operations.
- Thoroughly tested APIs using Postman.

Key Project: Autonomous AI Agent & n8n Workflow Automation
- Created automated multi-step workflows using n8n to integrate APIs, process webhook triggers, and invoke LLMs for intelligent data classification and automation.

Achievements:
- Successfully tested APIs using Postman and ensured database consistency and relational integrity.
- Possess foundational knowledge of cloud computing concepts and AWS services including EC2, S3, and IAM.
`;

// Smart Fallback Knowledge Matcher when Groq API key is unavailable or rate limited
function smartFallbackResponse(query) {
    const q = (query || "").toLowerCase();

    if (q.includes("finpulse") || q.includes("banking") || (q.includes("project") && (q.includes("main") || q.includes("best") || q.includes("key")))) {
        return "Tarun built **FinPulse**, a full-stack real-time online banking and account management system. It is powered by a **Java & Spring Boot** backend and an Android client. Key highlights include:\n\n" +
            "• **Layered Architecture**: Controller-Service-Repository pattern ensuring high modularity and clean separation of concerns.\n" +
            "• **RESTful APIs**: Secure endpoints for account management, transaction processing, and balance auditing.\n" +
            "• **Database**: MySQL integrated with **JPA/Hibernate** with normalized relational modeling.\n" +
            "• **Security**: Robust login authentication and real-time transaction updates.\n" +
            "• **Testing**: Rigorously validated with Postman for database consistency.";
    }

    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("java") || q.includes("spring")) {
        return "Tarun's technical skill set includes:\n\n" +
            "• **Backend**: Java, Spring Boot, RESTful APIs, Node.js (Basics), Controller-Service-Repository pattern.\n" +
            "• **Databases**: MySQL, Relational Modeling, CRUD, JPA/Hibernate, NoSQL.\n" +
            "• **AI & Automation**: AI Agent Creation, n8n Workflow Automation, API Automation, LLM Integration.\n" +
            "• **Cloud & DevOps**: AWS Fundamentals (EC2, S3, IAM).\n" +
            "• **Tools**: Git, GitHub, Postman, Power BI, Jupyter Notebook, Excel.\n" +
            "• **Frontend**: HTML5, CSS3, JavaScript, Tailwind CSS.";
    }

    if (q.includes("education") || q.includes("college") || q.includes("cgpa") || q.includes("school") || q.includes("degree") || q.includes("gpa")) {
        return "Tarun's educational background:\n\n" +
            "1. **B.Tech in Computer Science and Engineering (Data Science)**\n" +
            "   • *Institution*: Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai (2023 – 2027)\n" +
            "   • *Score*: **7.28* / 10 CGPA**\n\n" +
            "2. **Higher Secondary (Class XII – MPC)**\n" +
            "   • *Institution*: Sri Chaitanya Junior College, Vijayawada (2021 – 2023)\n" +
            "   • *Percentage*: **78%**\n\n" +
            "3. **Secondary Education (Class X)**\n" +
            "   • *Institution*: Prathibha E.M School, Andhra Pradesh (2021)\n" +
            "   • *Score*: **9.0 / 10 GPA**";
    }

    if (q.includes("n8n") || q.includes("ai agent") || q.includes("automation") || q.includes("llm")) {
        return "Tarun specializes in **AI Agent Creation & Workflow Automation** using **n8n**. He builds autonomous workflows connecting REST APIs, webhooks, and LLMs for intelligent routing, automated validation, and task orchestration without human friction.";
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
        return "You can get in touch with Tarun Lakkoju directly via:\n\n" +
            "• **Email**: [tarunlakkoju925@gmail.com](mailto:tarunlakkoju925@gmail.com)\n" +
            "• **Phone**: [+91 9491623293](tel:+919491623293)\n" +
            "• **LinkedIn**: [linkedin.com/in/tarun-lakkoju](https://www.linkedin.com/in/tarun-lakkoju)\n" +
            "• **GitHub**: [github.com/Tarun9491](https://github.com/Tarun9491)\n" +
            "• **Location**: Chennai, India\n\n" +
            "He is currently open to Software Engineer / Backend Developer internships and full-time roles!";
    }

    if (q.includes("aws") || q.includes("cloud")) {
        return "Tarun has foundational knowledge of **AWS Cloud Services**, specifically **EC2** (virtual compute instances), **S3** (scalable object storage), and **IAM** (identity and access management policies), with understanding of distributed server concepts.";
    }

    if (q.includes("who are you") || q.includes("about") || q.includes("introduce") || q.includes("tarun")) {
        return "I am **Tarun's AI Portfolio Assistant**! Tarun Lakkoju is a Computer Science Engineering (Data Science) undergraduate at Vel Tech, Chennai. He specializes in backend engineering with **Java and Spring Boot**, cloud fundamentals with **AWS**, database modeling with **MySQL/Hibernate**, and intelligent automation with **n8n and AI agents**. Feel free to ask me about his projects, skills, education, or contact details!";
    }

    return `Tarun Lakkoju is a Computer Science Engineering (Data Science) student at Vel Tech (CGPA 7.28/10) specializing in Java, Spring Boot, MySQL, RESTful APIs, AWS, and n8n AI agent automation. Notable projects include FinPulse (a real-time banking app with Controller-Service-Repository architecture). 

Would you like to learn more about his:
1. **FinPulse Banking System**
2. **Spring Boot & Backend Skills**
3. **AI & n8n Automation Experience**
4. **Education & Contact Details**?`;
}

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// 1. Health / Status Check
app.get("/api/health", (req, res) => {
    const uptimeSec = Math.floor((Date.now() - startTime) / 1000);
    res.json({
        status: "healthy",
        uptimeSeconds: uptimeSec,
        uptimeFormatted: `${Math.floor(uptimeSec / 60)}m ${uptimeSec % 60}s`,
        timestamp: new Date().toISOString(),
        database: "SQLite3 (Connected)",
        aiEngine: process.env.GROQ_API_KEY ? "Groq (Llama 3) + Smart Local Fallback" : "Smart Local Fallback"
    });
});

app.get("/", (req, res) => {
    res.send("✔ Tarun's Portfolio & AI Command Center Backend is Active.");
});

// 2. Projects Route
app.get("/api/projects", (req, res) => {
    db.all("SELECT * FROM projects ORDER BY id ASC", (err, rows) => {
        if (err) {
            console.error("Error fetching projects:", err);
            return res.status(500).json({ error: "Failed to fetch projects" });
        }
        // Parse bullets JSON if stored as string
        const parsed = rows.map((p) => {
            let bullets = [];
            try {
                bullets = p.bullets ? JSON.parse(p.bullets) : [];
            } catch (e) {
                bullets = [p.bullets];
            }
            return {
                ...p,
                bullets,
                techList: p.tech ? p.tech.split(",").map(t => t.trim()) : []
            };
        });
        res.json(parsed);
    });
});

// Add project endpoint
app.post("/api/projects", (req, res) => {
    const { title, category, description, tech, bullets, architecture, github, demo } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description required" });
    }

    const bulletsStr = Array.isArray(bullets) ? JSON.stringify(bullets) : bullets || "";
    db.run(
        `INSERT INTO projects (title, category, description, tech, bullets, architecture, github, demo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, category || "Backend / Java", description, tech || "", bulletsStr, architecture || "", github || "", demo || ""],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

// 3. Command Center Dashboard Metrics
app.get("/api/dashboard", (req, res) => {
    db.get("SELECT COUNT(*) as projectCount FROM projects", (err, pRow) => {
        db.get("SELECT COUNT(*) as messageCount FROM messages", (err2, mRow) => {
            db.get("SELECT COUNT(*) as aiCount FROM ai_logs", (err3, aRow) => {
                const uptimeSec = Math.floor((Date.now() - startTime) / 1000);
                res.json({
                    projectCount: pRow ? pRow.projectCount : 0,
                    messageCount: mRow ? mRow.messageCount : 0,
                    aiQueriesCount: aRow ? aRow.aiCount : 0,
                    uptimeSeconds: uptimeSec,
                    uptimeFormatted: `${Math.floor(uptimeSec / 60)}m ${uptimeSec % 60}s`,
                    status: "Operational",
                    skillsCount: 28,
                    serverTime: new Date().toISOString(),
                    memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
                });
            });
        });
    });
});

// 4. Contact Inquiries Route
app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
    }

    db.run(
        `INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`,
        [name, email, subject || "General Inquiry", message],
        function (err) {
            if (err) {
                console.error("Database insert error:", err);
                return res.status(500).json({ error: "Database error saving message" });
            }
            console.log(`📩 New message from ${name} (${email}): ${message}`);
            res.json({
                success: true,
                id: this.lastID,
                message: "Thank you! Your message has been sent directly to Tarun Lakkoju."
            });
        }
    );
});

app.get("/api/contact", (req, res) => {
    db.all("SELECT * FROM messages ORDER BY id DESC LIMIT 20", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 5. Dual-Engine AI Assistant Route
app.post("/api/ai", async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === "") {
        return res.json({ reply: "Please provide a question or topic to discuss with Tarun's AI assistant." });
    }

    let botReply = "";
    let source = "fallback_engine";

    // Attempt Groq API if key is set
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.startsWith("gsk_")) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    temperature: 0.7,
                    messages: [
                        {
                            role: "system",
                            content: `You are Tarun Lakkoju's personal AI Assistant embedded in his modern portfolio and Command Center. Answer questions politely, accurately, and professionally based on his resume data below:\n\n${TARUN_RESUME_CONTEXT}\n\nHighlight his strengths in Java, Spring Boot, MySQL, RESTful API architecture, FinPulse, n8n automation, and AWS fundamentals. Keep responses crisp and well-formatted with markdown.`
                        },
                        { role: "user", content: message }
                    ]
                })
            });
            clearTimeout(timeoutId);

            if (groqRes.ok) {
                const groqData = await groqRes.json();
                if (groqData.choices && groqData.choices[0] && groqData.choices[0].message) {
                    botReply = groqData.choices[0].message.content;
                    source = "groq_cloud";
                }
            }
        } catch (err) {
            console.log("ℹ Groq API call skipped/failed, smoothly switching to Smart Knowledge Engine:", err.message);
        }
    }

    // If Groq was not used or failed, use smart local engine
    if (!botReply) {
        botReply = smartFallbackResponse(message);
        source = "smart_local_engine";
    }

    // Record interaction in SQLite
    db.run(
        `INSERT INTO ai_logs (user_query, bot_reply, source) VALUES (?, ?, ?)`,
        [message, botReply, source],
        (err) => {
            if (err) console.error("Error logging AI query:", err.message);
        }
    );

    res.json({
        reply: botReply,
        source: source,
        timestamp: new Date().toISOString()
    });
});

// -------------------------------------------------------------
// START SERVER
// -------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Portfolio Backend running on http://localhost:${PORT}`);
    console.log(`📡 Endpoints: /api/health | /api/projects | /api/dashboard | /api/contact | /api/ai`);
});