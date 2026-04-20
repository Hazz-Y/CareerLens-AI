import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { studentData } = await req.json();

    const prompt = `You are an AI placement risk analyst for education loan borrowers. Analyze this student profile and generate a comprehensive risk assessment.

STUDENT DATA:
${JSON.stringify(studentData, null, 2)}

Generate a JSON response with this exact structure (no markdown, just raw JSON):
{
  "riskScore": <number 0-100>,
  "riskLevel": "<Low|Medium|High|Critical>",
  "confidence": <number 0-100>,
  "summary": "<2-3 sentence AI-generated summary explaining the risk assessment>",
  "placementProbability": {
    "threeMonth": <number 0-100>,
    "sixMonth": <number 0-100>,
    "twelveMonth": <number 0-100>
  },
  "salaryRange": {
    "min": <number in LPA>,
    "max": <number in LPA>,
    "median": <number in LPA>
  },
  "topRiskDrivers": ["<driver1>", "<driver2>", "<driver3>"],
  "recommendations": [
    {
      "title": "<action title>",
      "reason": "<why this matters>",
      "impact": "<High|Medium|Critical>",
      "category": "<Skill|Resume|Interview|Internship|Certification>"
    }
  ],
  "lenderInsight": "<1-2 sentence insight for lenders about this student's repayment risk>"
}`;

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a precise AI risk analyst. Always respond with valid JSON only. No markdown formatting." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 1024,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json({ error: "AI analysis unavailable" }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    try {
      const analysis = JSON.parse(content);
      return NextResponse.json(analysis);
    } catch {
      console.error("Failed to parse AI response:", content);
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
    }
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
