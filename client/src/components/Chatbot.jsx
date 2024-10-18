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

        let msgs = messages;
        msgs.push({ role: "user", content: userPrompt });

        setMessages(msgs);
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

        msgs.push(data);
        setMessages(msgs);
        setLoading(false);
    }

    const scroll = () => {
        setTimeout(scrollTo(0, 1e10), 10000); 
    }

    //scrolls to the bottom of the page everytime a value changes
    useEffect(() => {scroll()});

    //center is the main text area, and bottom is where the textbox is.
    //the messages.map maps the messages array to ai message and user message.
    return (
        <div className = 'chat'>
            <div className="center">
                {messages && messages.length ? messages.map((chat, index) => (
                    <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                        {/* Checks if the ai returned an image link or not. If it did, it sends the image as a response, and if not, it returns the ai's text response*/}
                        <span className={chat.role === "user" ? "user_msg" : ""}><img src = {chat.content.substring(0, 16) === "https://oaidalle" ?  chat.content : ""} onError = {chat.content}/>{chat.content.substring(0, 16) === "https://oaidalle" ?  "" : chat.content}</span>
                    </p>
                )) : ""}
                <div className={loading ? "" : "hide"}>
                    <p>
                        <i>{loading ? "Thinking" : ""}</i>
                    </p>
                </div>
            </div>
            <form onSubmit={onClick}>
                <div className="bottom">
                    <label>Image:</label>
                    <button type = "button" className={image == true ? 'imageOn': 'imageOff'} onClick={() => setImage(!image)}></button>
                    <input type='text' placeholder='Type your message...' value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
                    <button className='sendButton' disabled={loading}>Send</button>
                </div>
            </form>
        </div>
    );
};

export default AI;