import ReactMarkdown from 'react-markdown'
import { FiMessageSquare } from 'react-icons/fi';
import { TbFidgetSpinner } from 'react-icons/tb';
import CodeHighlighter from './CodeHighlighter';

interface ChatProps {
    chats: Chat;
}

interface Chat {
    role: "user" | "model";
    parts: string;
}

const MessgeBox = ({ chats }: ChatProps) => {
    return (
        <div className='flex gap-3'>
            <div className={`h-10 w-10 rounded-full ${chats.role === "user" ? "bg-blue-500" : "bg-green-500"} flex items-center justify-center text-white text-lg`}>
                {chats.role === "user" ? <FiMessageSquare /> : <TbFidgetSpinner />}
            </div>

            <div>
                <span className='font-bold mb-1'>{chats.role === "user" ? "You" : "Gemini"}</span>
                <ReactMarkdown
                    className="flex flex-col gap-4"
                    components={{
                        code({ children, inline, className, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '')
                            let language;

                            if (match && match[1]) {
                                language = match[1]
                            } else {
                                language = "jsx"
                            }

                            return !inline && match ? (
                                <CodeHighlighter children={children} language={language} />
                            ) : (
                                <code className='bg-gray-800 text-white px-2 py-[1px] leading-loose rounded' {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {chats.parts}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default MessgeBox
