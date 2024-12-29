import React, { useState } from 'react';
import styled from 'styled-components';

const ChatApp = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello, how are you?', sender: 'user',flag:false },
        { id: 2, text: 'Congratulations! You\'ve won a free gift card. Click here to claim your prize!', sender: 'bot',flag:true },
        { id: 3, text: 'Hello, how are you?', sender: 'user',flag:false },
        { id: 4, text: 'I\'m good, thanks for asking!', sender: 'bot',flag: false },
        { id: 5, text: 'You have been selected for a once-in-a-lifetime investment opportunity. Contact us today!', sender: 'user',flag:true },
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            try {
                // Send the message to FastAPI endpoint and get the flag
                const response = await fetch(`http://127.0.0.1:8000/predict?msg=${encodeURIComponent(input)}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ msg: input }),  // Sending the input as body
                });

                const data = await response.json();  // Parse JSON response
                const { flag } = data;  // Extract the flag from the response

                // Update the messages state with the received flag
                setMessages([
                    ...messages,
                    { id: messages.length + 1, text: input, sender: 'user', flag: flag }
                ]);
                setInput('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };
    return (
        <ChatContainer>
            <ChatHeader>Chat</ChatHeader>
            <MessagesContainer>
                {messages.map((message) => (
                    <MessageBox key={message.id} sender={message.sender}>
                        <MessageText sender={message.sender}>{message.text}</MessageText>
                        {message.flag ? (
                            <div style={{ top: 0, fontSize: 12, color: "red" }}>may be this is a spam!</div>
                        ) :(<></>)}
                    </MessageBox>
                ))}
            </MessagesContainer>


            <MessageInput>
                <form onSubmit={handleSendMessage}>
                    <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <Button type="submit">Send</Button>
                </form>
            </MessageInput>
        </ChatContainer>
    );
};

export default ChatApp;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80svw;
    height: 80svh;
    margin: 0 auto;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: gray;
`;

const ChatHeader = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 16px;
`;

const MessagesContainer = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 16px;
    padding: 8px;
    height: 60svh;
    background-color:white;
    border-radius: 8px;
`;

const MessageBox = styled.div<{ sender: string }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
    margin: 8px 0;
`;

const MessageText = styled.div<{ sender: string }>`
    padding: 10px;
    border-radius: 8px;
    background-color: ${(props) => {
        return (props.sender === 'user' ? '#1591ea' : '#27a567');
    }};
    width: 40%;
    word-wrap: break-word;
`;

const MessageInput = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    form {
        width: 100%;
        display: flex;
    }
`;

const Input = styled.input`
    width: 90%;
    padding: 8px;
    margin-right: 8px;
    border: 1px solid #ddd;
    background: antiquewhite;
    border-radius: 4px;
    font-size: 14px;
    color: #1a1a1a;
`;

const Button = styled.button`
    padding: 8px 16px;
    background-color: deeppink;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #0056b3;
    }
`;
