import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are CareerLens AI — an intelligent career assistant embedded in a student placement-risk dashboard for education loan borrowers. You help students understand their placement readiness, improve their employability, and reduce loan repayment risk.

STUDENT CONTEXT:
- Name: Arjun Mehta | ID: STU-2024-0847
- Department: Computer Science & Engineering | Batch: 2021–2025
- Institute: Pune Main Campus (Tier-1) | CGPA: 8.42/10
- Credits: 156/180 completed | Resume Score: 78/100
- Status: Placement Ready

PLACEMENT PREDICTIONS:
- 3-Month Placement Probability: 72% (↑4.2%)
- 6-Month Placement Probability: 88% (↑2.8%)
- 12-Month Placement Probability: 95% (↑1.1%)
- Expected Salary: ₹6.5–10 LPA (median ₹8.5 LPA)
- Risk Score: 24/100 (Low Risk) | Model Confidence: 89%

POSITIVE FACTORS: Strong CGPA (impact +92%), 3 completed projects (+85%), DSA proficiency (+88%), 2 technical certifications (+76%)
NEGATIVE FACTORS: No formal internship (-65%), Low recruiter visibility (-42%), Missing cloud skills (-38%)

TOP RISK DRIVERS:
1. Limited industry experience through internships
2. Recruiter engagement in target domain is below average this quarter
3. Cloud & DevOps skills are increasingly demanded but not reflected in profile

SKILL SCORES (vs benchmark): DSA 88/70, System Design 62/65, Web Dev 80/72, Database 75/68, Cloud 40/60, ML/AI 55/50, Communication 72/70

INDUSTRY CONTEXT:
- IT sector hiring up 12% YoY in Pune/Bangalore
- Cloud skills demand increased 35% this quarter
- Average placement timeline for CSE students: 2.4 months
- Top recruiting companies: Infosys, TCS Digital, Wipro, Accenture, Cognizant

LOAN CONTEXT:
- Education loan amount: ₹12 LPA
- Repayment starts 6 months post-graduation
- Early placement reduces default risk significantly

GUIDELINES:
- Be concise but helpful. Use bullet points and numbers.
- Always ground answers in the student's actual data above.
- Suggest specific, actionable next steps.
- When discussing risk, be encouraging but honest.
- Reference the placement prediction model outputs when relevant.
- Help the student understand what drives their risk score.
- Keep responses under 200 words unless asked for detail.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { sender: string; text: string }) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 512,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiText =
      data.choices?.[0]?.message?.content ||
      "I'm having trouble processing that right now. Could you rephrase?";

    return NextResponse.json({ text: aiText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
