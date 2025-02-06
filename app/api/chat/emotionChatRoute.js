import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const { message, emotion } = await req.json();
        const prompt = `User is feeling ${emotion}. Respond in a supportive way: ${message}`;

        const response = await axios.post("https://api.generativeai.com/chat", {
            prompt,
            model: "gemini-pro", // Use Google AI
        });

        return NextResponse.json({ reply: response.data.choices[0].text });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
    }
}
