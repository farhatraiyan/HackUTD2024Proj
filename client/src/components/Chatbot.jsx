import React, { useEffect, useState } from 'react';

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
        <div className="chat">
            <div className="center">
                {messages.map((chat, index) => (
                    <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                        <span className={chat.role === "user" ? "user_msg" : ""}>
                            {chat.content.startsWith("https://oaidalle") ? (
                                <img src={chat.content} alt="AI generated" />
                            ) : (
                                chat.content
                            )}
                        </span>
                    </p>
                ))}
                {loading && (
                    <div>
                        <p>
                            <i>Thinking...</i>
                        </p>
                    </div>
                )}
            </div>
            <form onSubmit={onClick}>
                <div className="bottom">
                    <label>Image:</label>
                    <button type="button" className={image ? 'imageOn': 'imageOff'} onClick={() => setImage(!image)}></button>
                    <input type='text' placeholder='Type your message...' value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
                    <button className='sendButton' disabled={loading}>Send</button>
                </div>
            </form>
        </div>
    );
};

export default AI;