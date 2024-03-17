"use client"

import React, { useState } from 'react'
import { FiMessageSquare } from 'react-icons/fi';
import { TbFidgetSpinner } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface MessageBoxProps {
    chats: Chat;
    i: number
}

interface Chat {
    role: "user" | "model";
    parts: string;
}

const MessageBox = ({ chats, i }: MessageBoxProps) => {
    const [copied, setCopied] = useState(false);

    const copyTextOnClick = (textToCopy: string) => {
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 3000);
                })
                .catch(err => {
                    console.error('Unable to copy text to clipboard: ', err);
                });
        }
    };

    return (
        <div className="flex gap-3" key={i}>
            <div className={`h-10 min-w-10 rounded-full ${chats.role === "user" ? "bg-blue-500" : "bg-green-500"} flex items-center justify-center text-white text-lg`}>
                {chats.role === "user" ? <FiMessageSquare /> : <TbFidgetSpinner />}
            </div>
            <div>
                <span className='font-bold mb-1'>{chats.role === "user" ? "You" : "Gemini"}</span>
                <ReactMarkdown
                    className="flex flex-col gap-4"
                    components={{
                        code({ children, inline, className, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            let language;

                            if (match && match[1]) {
                                language = match[1];
                            } else {
                                language = "jsx"
                            }

                            return !inline && match ? (
                                <div className="bg-[#1e1e1e] my-2 overflow-hidden w-full">
                                    <div className=" rounded-t-lg flex items-center justify-between p-3 bg-[#1e1e1e] border border-white text-white">
                                        <span>{language}</span>
                                        <button
                                            onClick={() => {
                                                copyTextOnClick(children);
                                            }}
                                            disabled={copied}
                                        >
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className='-mt-1'>
                                        <SyntaxHighlighter language={language} style={xonokai} className="border-none rounded-t-none">
                                            {children}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            ) : (
                                <code className="bg-gray-800 text-white px-2 py-[1px] leading-loose rounded" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {chats.parts}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default MessageBox
