import React, { useEffect, useState } from 'react';

function AI() {
    //userprompt is what the user would put in
    const [userPrompt, setUserPrompt] = useState("");

    //message would be the response from the ai
    const [messages, setMessages] = useState([]);

    //loading is when the ai is forming a response after the user sent their prompt
    const [loading, setLoading] = useState(false);
  
    const onClick = async (e) => {
        e.preventDefault();
        if(userPrompt == "")
            return;
        setLoading(true);
        let msgs = messages;
        msgs.push({ role: "user", content: userPrompt });
        setMessages(msgs);
        setUserPrompt("");
        const url = "/ai"
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
    const scroll = () => {
        setTimeout(scrollTo(0, 1e10), 10000); 
    }

    //scrolls to the bottom of the page everytime a value changes
    useEffect(() => {scroll()});
//center is the main text area, and bottom is where the textbox is.
//the messages.map maps the messages array to ai message and user message.
    return (
        <form onSubmit={onClick}>
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
                {/* Checks if the ai returned an image link or not. If it did, it sends the image as a response, and if not, it returns the ai's text response*/}
                <span className={chat.role === "user" ? "user_msg" : ""}><img src = {chat.content.substring(0, 16) === "https://oaidalle" ?  chat.content : ""} onError = {chat.content}/>{chat.content.substring(0, 16) === "https://oaidalle" ?  "" : chat.content}</span>
              </p>
            ))
          : ""}

            <div className={loading ? "" : "hide"}>
                <p>
                    <i>{loading ? "Thinking" : ""}</i>
                </p>
            </div>
            </div>
            

            <div className="bottom">
                <input type='text' disabled={loading} placeholder='Type your message...' value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
                <button className='sendButton'>Send</button>
            </div>
        </div>
        </form>
    )
};

export default AI;