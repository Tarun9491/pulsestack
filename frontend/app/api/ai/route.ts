import { NextResponse } from "next/server";
import profile from "@/components/ProfileData";

const TARUN_RESUME_CONTEXT = `
Name: Lakkoju Tarun
Title: Backend Developer & AI Automation Engineer (Java, Spring Boot, AI Agents, n8n)
Email: tarunlakkoju925@gmail.com
Phone: +91 9491623293
Location: Chennai, India
LinkedIn: https://www.linkedin.com/in/tarun-lakkoju
GitHub: https://github.com/Tarun9491

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

function smartFallbackResponse(query: string): string {
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
            "He is actively open to Software Engineer & Java Backend Developer opportunities!";
    }

    if (q.includes("aws") || q.includes("cloud")) {
        return "Tarun has foundational knowledge of **AWS Cloud Services**, specifically **EC2** (compute), **S3** (object storage), and **IAM** (identity and access management policies), with understanding of distributed server concepts.";
    }

    return `Tarun Lakkoju is a Computer Science Engineering undergraduate at Vel Tech (CGPA 7.28/10) specializing in Java, Spring Boot, MySQL, RESTful APIs, AWS, and n8n AI agent automation. Notable projects include FinPulse (a real-time banking app with Controller-Service-Repository architecture). 

Feel free to ask about his:
1. **FinPulse Banking System**
2. **Spring Boot & Backend Architecture**
3. **AI & n8n Automation Workflows**
4. **Education & Contact Details**`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message } = body;

        if (!message || message.trim() === "") {
            return NextResponse.json({ reply: "Please provide a question about Tarun's portfolio or resume." });
        }

        let botReply = "";
        let source = "smart_local_engine";

        const groqApiKey = process.env.GROQ_API_KEY;

        if (groqApiKey && groqApiKey.startsWith("gsk_")) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 6000);

                const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${groqApiKey}`,
                    },
                    body: JSON.stringify({
                        model: "llama-3.1-8b-instant",
                        temperature: 0.7,
                        messages: [
                            {
                                role: "system",
                                content: `You are Tarun Lakkoju's personal AI Recruiter Assistant on his portfolio PULSESTACK. Answer politely, accurately, and professionally based on his resume:\n\n${TARUN_RESUME_CONTEXT}\n\nHighlight his strengths in Java, Spring Boot, MySQL, RESTful API architecture, FinPulse, n8n automation, and AWS.`
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
            } catch (err: any) {
                // Smooth fallback
            }
        }

        if (!botReply) {
            botReply = smartFallbackResponse(message);
        }

        return NextResponse.json({
            reply: botReply,
            source,
            timestamp: new Date().toISOString()
        });
    } catch (err: any) {
        return NextResponse.json({
            reply: "Tarun Lakkoju is a Computer Science Engineering student at Vel Tech University (CGPA 7.28/10). Skilled in Java, Spring Boot, MySQL, REST APIs, and n8n automation. You can contact him at tarunlakkoju925@gmail.com.",
            source: "offline_fallback"
        });
    }
}
