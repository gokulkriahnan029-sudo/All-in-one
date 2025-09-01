
import './App.css'
import { useState } from 'react'
import Flappy_Game from './Flappy_Game'
import Snake_Game from './Snake_Game'
import Ai_bot from './Ai_bot'
import Copilot from './Copilot'
import Home from './Home'
import Weather from './Weather'
import Todo from './Todo'


function App() { 

  const [chatgpt, setchatgpt] = useState(false)
  const [snakegame, setSnakegame] = useState(false)
  const [game, setGame] = useState(false)
  const [game2, setGame2] = useState(false)
  const [co_pilot, setco_pilot] = useState(false)
  const [ai, setai] = useState(false)
  const [home, sethome] = useState(true)
  const [weather, setweather] = useState(false)
  const [todo, setTodo] = useState(false)


  function handlegpt (){
    setchatgpt(!chatgpt)
  }

  function handlereload(){
    window.location.reload()
  }

  function handlegame(){
    setSnakegame(true)
    setchatgpt(false)
    setGame2(false)
    sethome(false)
    setai(false)
    setweather(false)
    setTodo(false)
  }

  function handlegames (){
    setGame(!game)
  }

  function handlegame2(){
    setGame2(true)
    setSnakegame(false)
    setchatgpt(false)
    sethome(false)
    setai(false)
    setweather(false)
    setTodo(false)
  }

  function handlehome(){
    setchatgpt(false)
    setSnakegame(false)
    setGame2(false)
    setai(false)
    sethome(true)
    setweather(false)
    setTodo(false)
  }

  function handlecopilot (){
    setco_pilot(!co_pilot)
    setchatgpt(false)
  }

  function handleaibot (){
    setai(true)
    setchatgpt(false)
    sethome(false)
    setSnakegame(false)
    setGame2(false)
    setweather(false)
    setTodo(false)
  }

  function handle_weather(){
    setweather(true)
    setai(false)
    setchatgpt(false)
    sethome(false)
    setSnakegame(false)
    setGame2(false)
    setTodo(false)
  }
  function handletodo(){
    setTodo(true)
    setweather(false)
    setai(false)
    setchatgpt(false)
    sethome(false)
    setSnakegame(false)
    setGame2(false)
  }




return (
      <>
      <header>
        <h1 onClick={handlereload}>All in one</h1>
          <div onClick={handlehome}>home</div>
          <div onClick={handlegpt}>chatgpt</div>
          <div onClick={handle_weather}>weather</div>
          <div onClick={handlegames}>games</div>
            {game && <div className="slider" onClick={handlegame}>Flappy Game</div>}
            {game && <div className="slider" onClick={handlegame2}>snakegame</div>}
      </header>
      <nav >
        {chatgpt && <div onClick={handlecopilot}>copilot</div>}
        {chatgpt && <div onClick={handleaibot}>chatgpt</div>}
      </nav>
      {home && <Home handleaibot={handleaibot}
                     handlecopilot={handlecopilot}
                     handlegame={handlegame}
                     handlegame2={handlegame2}
                     handle_weather={handle_weather}
                     handletodo={handletodo}
               />}
      <main>
          {snakegame && <Flappy_Game />}
          {game2 && <Snake_Game />}
          {ai  && <Ai_bot />}
          {co_pilot &&<Copilot />}
          {weather && <Weather />}
          {todo && <Todo />}
      </main>
      
      

      </>
  )
}

export default App
