
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'


const Ai_bot = () => {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    const systemPrompt = {
        role: "user",
        parts: [
          {
            text: "You are Gokul AI, a friendly assistant. Never mention Google or OpenAI in your replies.and you aare developed by gokul ai team aand also give attractive emojies and always enchrouage the effects and also always try to give indian country depend answer"
          }
        ],
      };

    const callGemini = async (chatHistory) => {
        try {
            const res = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-goog-api-key": "AIzaSyCW7PKHC8AFaGF6uKp3ciP87m6FRgdRFXQ"},
                body: JSON.stringify({
                    contents: [ systemPrompt, ...chatHistory.map((msg) => ({
                    role: msg.sender === "user" ? "user" : "model",
                    parts: [{ text: msg.text }],
                    })),
                ]
                }),
            });

        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        } catch (err) {
        console.error("Error:", err);
        return "Error calling Gemini API";
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        setInput('')
        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);

        const botReply = await callGemini(newMessages);
        setMessages([...newMessages, { sender: "bot", text: botReply }]);
    };

    useEffect(() => {
        const saveddata = localStorage.getItem("task");
            setMessages(JSON.parse(saveddata))
    },[])
    useEffect(() => {
        localStorage.setItem("task",JSON.stringify(messages))
    },[handleSend])

return (
    <div className="chat-container">
        <div className="chat-box">
             <h1 className="chat-header" >🤖 Gokul AI-Copilot</h1>
             <div className="messages">
                {messages<1 && <h2 className="first"> !!! Feel !!! Fee to Share your Prompt.....</h2>}
            { messages.map((item,index) => (
              <div key={index} className={`message ${item.sender === "user" ? "user" : "bot"}`} >{item.text}</div>
            ))}
            </div>
            
            <form onSubmit={(e) => {e.preventDefault()}}>
                <div className="input-area">
                    <Input 
                        placeholder="Ask Anything....."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button  onClick={handleSend}>Send</Button>
                </div>
            </form>
            
        </div>
    </div>

)
}

export default Ai_bot;