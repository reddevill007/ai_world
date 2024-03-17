import { GoogleGenerativeAI } from "@google/generative-ai";

interface Chat {
    role: "user" | "model";
    parts: string;
}

const genAI = new GoogleGenerativeAI("AIzaSyDBC1MSmPqTQVsMuw-7SBZ0ps-kokuxcC0");

export async function run(prompt: string, history: Chat[]) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: history,
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}