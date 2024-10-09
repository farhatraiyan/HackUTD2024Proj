import React, { useState } from 'react';

function AI(e) {
    //userprompt is what the user would put in
    const [userPrompt, setUserPrompt] = useState("");

    //message would be the response from the ai
    const [messages, setMessages] = useState([]);

    //loading is when the ai is forming a response after the user sent their prompt
    const [loading, setLoading] = useState(false);
  
    const onClick = async (e) => {
        if(userPrompt == "")
            return;
        setLoading(true);
        let msgs = messages;
        msgs.push({ role: "user", content: userPrompt });
        setMessages(msgs);
        setUserPrompt("");
        const url = "http://127.0.0.1:8101/ai"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPrompt)
        }
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        msgs.push(data);
        setMessages(msgs);
        console.log(messages);
        setLoading(false);
        
    }
//center is the main text area, and bottom is where the textbox is.
//the messages.map maps the messages array to ai message and user message.
    return (
        <div className = 'chat'>
            <div className="center">
            <div className="message">
                    <div className="texts">
                        <p>Type your message</p>
                    </div>
            </div>
            {messages && messages.length
            ? messages.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span className={chat.role === "user" ? "user_msg" : ""}>{chat.content}</span>
              </p>
            ))
          : ""}
            </div>
            

            <div className="bottom">
                <input type='text' placeholder='Type your message...' value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
                <button onClick={onClick} className='sendButton'>Send</button>
            </div>
        </div>
    )
};

export default AI;