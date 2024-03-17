"use client"

import { useState } from "react";
import Chats from "@/components/Chats";
import Typing from "@/components/Typing";
import InitialUI from "@/components/InitialUI";
import { run } from "@/utils/action";

interface Chat {
    role: "user" | "model";
    parts: string;
}

export default function Home() {
    const [userPrompt, setUserPrompt] = useState("");
    const [typing, setTyping] = useState(false);
    const [history, setHistory] = useState<Chat[]>([]);

    const addChat = (role: Chat["role"], parts: string) => {
        const newChat: Chat = { role, parts };
        setHistory((prevHistory) => [...prevHistory, newChat]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTyping(true)
        addChat("user", userPrompt);
        const response = await run(userPrompt, history);
        setUserPrompt("")
        addChat("model", response);
        setTyping(false)
    }

    return (
        <div className="max-w-[50%] mx-auto h-screen relative flex flex-col">
            {/* Chats */}
            <div className="p-5 w-full max-h-[calc(100vh-100px)] overflow-y-auto scroll-bar flex flex-col gap-4 flex-1 relative">
                {history.length > 0 ? (
                    <Chats history={history} />
                ) : (
                    <InitialUI />
                )}
                <Typing typing={typing} />
            </div>
            <div className="w-[50%] h-20 fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full">
                    <textarea
                        autoFocus
                        value={userPrompt}
                        rows={2}
                        onChange={e => setUserPrompt(e.target.value)}
                        className="w-full p-2 border rounded bg-[#212121] outline-none"
                        placeholder="Type here..."
                        disabled={typing}
                    />
                </form>
            </div>
        </div>
    );
}
