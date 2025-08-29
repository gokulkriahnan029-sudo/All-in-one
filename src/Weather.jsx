import { useEffect, useState } from "react";


const Weather = () =>{

//     const [weather_data, setWeather_data] = useState([])

//     const fetch_weather = async()  => {

//         const apiKey = "d86a0baf2f852657f9242e77c3493879";
//         const city = "Chennai";

//         try{
//             const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
//             const data = await response.json();
//             setWeather_data(data)
//         }
//         catch(err){
//             console.log(err.message)
//         }
//     }

// useEffect(()=>{
//     fetch_weather();
// },[])

// console.log(weather_data)




const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "d86a0baf2f852657f9242e77c3493879";

  const getWeather = async () => {
    if (!city) {
      setError("⚠️ Please enter a city!");
      setWeather(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        setError("❌ " + data.message);
        setWeather(null);
        return;
      }

      setWeather(data);
      setError(null);
    } catch (err) {
      setError("⚠️ Error fetching weather!");
      setWeather(null);
    }
  };
return (
    <>

    <div style={styles.container}>
      <h1 style={styles.title}>🌦 Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          style={styles.input}
        />
        <button onClick={getWeather} style={styles.button}>
          Search
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.card}>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            style={{ width: "80px" }}
          />
          <div style={styles.temp}>{weather.main.temp}°C</div>
          <p>{weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
    
    </>
)
}

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    marginRight: "10px",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black"
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#ffdd57",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    marginTop: "15px",
    color: "#ffcccc",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "16px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  temp: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
};
export default Weather;