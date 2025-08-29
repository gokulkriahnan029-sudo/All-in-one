
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useRef } from 'react'
import "./Copilot.css"

const Copilot = () => {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const chatRef = useRef();
    const [isMinimized, setisMinimized] = useState(false);
    useDraggable(chatRef);

    function useDraggable(ref) {
  useEffect(() => {
    const el = ref.current;
    let offsetX, offsetY, isDown = false;

    const onMouseDown = (e) => {
      isDown = true;
      offsetX = e.clientX - el.getBoundingClientRect().left;
      offsetY = e.clientY - el.getBoundingClientRect().top;
      el.classList.add("dragging");
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
      el.style.right = "auto"; // allow free move
      el.style.bottom = "auto";
      el.style.position = "fixed";
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("dragging");
    };

    el.querySelector(".chat-header").addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.querySelector(".chat-header").removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref]);
}



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
        const saveddata = localStorage.getItem("co");
            setMessages(JSON.parse(saveddata))
    },[])
    useEffect(() => {
        localStorage.setItem("co",JSON.stringify(messages))
    },[handleSend])

    function toggleMinimize(){
        setisMinimized(!isMinimized)
    }


return (
    <div className={`chat-widget ${isMinimized ? "minimized" : ""}`} ref={chatRef}>
      <div className="chat-header">
    {isMinimized && "🤖 G-AI-Copilot" || "🤖 Gokul-AI-Copilot 🤖" }
    <div className="controls">
      <button onClick={toggleMinimize}>
        {isMinimized ? "⬆" : "⬇"}
      </button>
    </div>
  </div>


             {!isMinimized && (
                 <div className="chat-body">
                    <div className="messages">
                {messages<1 && <h2 className="first"> !!! Feel !!! Fee to Share your Prompt.....</h2>}
            {messages.map((item,index) => (
              <div key={index} className={`message ${item.sender === "user" ? "user" : "bot"}`} >{item.text}</div>
            ))}
            </div>
            <div className="input-area">
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
        )}
    </div>

)
}

export default Copilot;