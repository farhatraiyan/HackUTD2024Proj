import React, { useState } from 'react';

function AI(e) {
    const [userPrompt, setUserPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async (e) => {
        setUserPrompt("");
    }

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
    
    /*
    <div>
        <h2>ChatBot</h2>
        <div class="aiText">
            <p class="toUser">Hey, talk to me please</p>
            </div>
        <div class="userText">
            <p class="fromUser">Hey</p>
            <p class="fromUser">Hey asdf aa</p>
        </div>
        <form>
            <input type = "text" id = "userPrompt" value = {userPrompt} onChange = {(e) => setUserPrompt(e.target.value)}></input>
        </form>
    </div>*/
};

export default AI;