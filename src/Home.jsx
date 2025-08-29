import { useState } from "react";
import "./Home.css"
import { Pointer } from "lucide-react";

const Home = ({handleaibot,handlecopilot,handlegame,handlegame2,handle_weather}) =>{

    const [gamelist, setgamelist] = useState(false)

    function handlegames(){
        setgamelist(!gamelist)
    }

return(
    <>
    <header class="hero">
            <h1>🌐 All-in-One Hub</h1>
            <p>Your daily companion — play games, check the weather, chat with AI, and boost productivity all in one place.</p>
            <a href="#apps" class="cta">Explore Now</a>
        </header>
        <section id="apps" class="apps">
                <h2>What’s Inside 🚀</h2>
            <div class="app-grid">

                <div class="app-card">
                <h3>🎮 Games</h3>
                <p>Play fun and interactive games right in your browser. Relax, challenge friends, and sharpen your mind.</p>
                <a onClick={handlegames}>Play Now</a>
                <br />
                {gamelist && <a onClick={handlegame}>🕊️ Flappy Game</a>}
                <br />
                {gamelist && <a onClick={handlegame2}>🐍 Snake Game</a>}
                </div>

                <div class="app-card">
                <h3>☀️ Weather</h3>
                <p>Stay updated with real-time weather forecasts tailored to your location. Plan your day smarter.</p>
                <a onClick={handle_weather}>Check Weather</a>
                </div>

                <div class="app-card">
                <h3>💬 ChatGPT</h3>
                <p>Ask anything, learn faster, and get instant answers with AI. Your personal knowledge buddy.</p>
                <a onClick={handleaibot}>Start Chat</a>
                </div>

                <div class="app-card">
                <h3>🤖 Copilot</h3>
                <p>A powerful assistant to brainstorm, write code, and boost productivity. Always by your side.</p>
                <a onClick={handlecopilot}>Launch Copilot</a>
                </div>

            </div>
        </section>
        <section class="about">
            <h2>Why All-in-One?</h2>
            <p>
                Instead of juggling multiple tabs and apps,
                 get everything in one place.<br/>  
                Whether you want to unwind with games, plan with weather updates, or supercharge <br/> your work with AI tools — this hub is built for you.
            </p>
        </section>
        <footer>
            <p>Made with ❤️ by Gokul</p>
            <p>© 2025 All-in-One Hub. All rights reserved.</p>
        </footer>




    
    
    
    </>
)
}

export default Home;