import React, { useEffect, useState } from 'react';
import { Button, Card, TextInput, ToggleSwitch } from "flowbite-react";

const server_url = import.meta.env.VITE_SERVER_URL || '';

function AI() {
    //userprompt is what the user would put in
    const [userPrompt, setUserPrompt] = useState("");

    //message would be the response from the ai
    const [messages, setMessages] = useState([]);

    //loading is when the ai is forming a response after the user sent their prompt
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(false);

    const onClick = async (e) => {
        e.preventDefault();

        if (userPrompt == "") return;

        setLoading(true);

        const newMessages = [...messages, { role: "user", content: userPrompt }];
        setMessages(newMessages);
        setUserPrompt("");

        const url = image ? "/ai?image=true" : "/ai";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPrompt)
        }

        const response = await fetch(`${server_url}${url}`, options);
        const data = await response.json();

        setMessages([...newMessages, data]);
        setLoading(false);
    }

    const scroll = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    //scrolls to the bottom of the page everytime a value changes
    useEffect(() => {
        scroll();
    }, [messages]);

    //center is the main text area, and bottom is where the textbox is.
    //the messages.map maps the messages array to ai message and user message.
    return (
        <div className="chat pt-4">
            <div className="center">
                {messages.map(message => (
                    <div className={`flex ${message.role === "user" ? 'justify-end' : ''} m-2`}>
                        <Card className="max-w-96">
                            {message.content.startsWith("https://oaidalle") ? (
                                <img src={message.content} alt="AI generated" />
                            ) : (
                                <p>{message.content}</p>
                            )}
                        </Card>
                    </div>
                ))}
                {loading && (
                    <Card className="w-32">
                        <p>
                            <i>Thinking...</i>
                        </p>
                    </Card>
                )}
            </div>
            <div className="flex justify-center w-full absolute bottom-0 p-4 bg-slate-800">
                <form onSubmit={onClick} className="flex items-center space-x-4">
                    <label className='text-white'>Image: </label>
                    <ToggleSwitch checked={image} onClick={() => setImage(!image)} />
                    <TextInput className='w-96' type="text" placeholder="Type your message..." value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} />
                    <Button className="sendButton" isProcessing={loading}>Send</Button>
                </form>
            </div>
        </div>
    );
};

export default AI;