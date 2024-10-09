import React, { useState } from 'react';

function AI(e) {
    //userprompt is what the user would put in
    const [userPrompt, setUserPrompt] = useState("");
    
    //message would be the response from the ai
    const [messages, setMessages] = useState([]);

    //loading is when the ai is forming a response after the user sent their prompt
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async (e) => {
        setUserPrompt("");
    }
//center is the main text area, and bottom is where the textbox is.
//Temporarily added messages to test how they would look.
    return (
        <div className = 'chat'>
            <div className="center">
                <div className="message">
                    <div className="texts">
                        <p>some message</p>
                    </div>
                </div>
                <div className="message user">
                    <div className="texts">
                        <p>some message from user</p>
                    </div>
                </div>
                <div className="message">
                    <div className="texts">
                        <p>some message</p>
                    </div>
                </div>
                <div className="message user">
                    <div className="texts">
                        <p>some message from user</p>
                    </div>
                </div>
                <div className="message">
                    <div className="texts">
                        <p>some message</p>
                    </div>
                </div>
                <div className="message user">
                    <div className="texts">
                        <p>some message from user</p>
                    </div>
                </div>
                <div className="message">
                    <div className="texts">
                        <p>some message</p>
                    </div>
                </div>
            </div>
            

            <div className="bottom">
                <input type='text' placeholder='Type your message...'/>
                <button className='sendButton'>Send</button>
            </div>
        </div>
    )
};

export default AI;