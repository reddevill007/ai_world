import React from 'react'
import MessageBox from './MessageBox'

interface ChatsProps {
    history: Chat[]
}

interface Chat {
    role: "user" | "model";
    parts: string;
}

const Chats = ({ history }: ChatsProps) => {
    return (
        <>
            {
                history.map((chats, i) => (
                    <div>
                        <MessageBox chats={chats} i={i} />
                        <div className='bg-gray-600 bg-opacity-40 w-[90%] h-[1px] mx-auto my-6' />
                    </div>
                ))
            }
        </>
    )
}

export default Chats
