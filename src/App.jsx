import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api_key = "032a2c6602b65c5b3648ec11c0d87e94"

  

  const getBackgroundImage = (type) => {
    switch (type) {
      case "Clear":
        return "url('https://images.unsplash.com/photo-1592210454359-9043f067919b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D')"

      case "Clouds":
        return "url('https://images.unsplash.com/photo-1566010503302-2564ae0d47b6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"

      case "Rain":
        return "url('https://static.vecteezy.com/system/resources/thumbnails/042/146/565/small_2x/ai-generated-beautiful-rain-day-view-photo.jpg')"

      case "Thunderstorm":
        return "url('https://images.unsplash.com/photo-1643119222678-131a90659e0e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"

      case "Snow":
        return "url('https://plus.unsplash.com/premium_photo-1726741803202-b64e92eb8b45?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"

      default:
        return "url('https://plus.unsplash.com/premium_photo-1669809948017-518b5d800d73?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }
  }

  const getBackgroundCard = (type) => {
    switch (type) {
      case "Clear":
        return "linear-gradient(135deg, #fff176, #fff59d)"

      case "Clouds":
        return "linear-gradient(135deg, #90a4ae, #607d8b)"

      case "Rain":
        return "linear-gradient(135deg, #4fc3f7, #0288d1)"

      case "Thunderstorm":
        return "linear-gradient(135deg, #616161, #212121)"

      case "Snow":
        return"linear-gradient(135deg, #e1f5fe, #81d4fa)"

      default:
        return "linear-gradient(135deg, #74b9ff, #a29bfe)";
    }
  }

  const fetchWeather = async () => {
    if (!city.trim()) return;
    console.log(city);

    setLoading(true)
    setWeather(null)
    setError("")


    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)

    const data = await response.json()
    console.log(data);

    if (data.cod == 200) {
      setWeather(data)
    }
    else {
      setError("City not Found")
    }
  }

  return (
    <>
      <div style={{ backgroundImage: getBackgroundImage(weather?.weather[0]?.main), backgroundSize: "cover", minHeight: "100vh", }}>
        <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", textAlign: "center", flexDirection: "column" }}>
          <Typography variant="h3" sx={{ mt: 8 , fontSize: "bold"}}>Weather</Typography>

          <div style={{ display: "flex", gap: "16px", marginTop: "9px" }}>
            <TextField id="outlined-basic" value={city} label="Enter City" color='white' variant="outlined" onChange={(e) => setCity(e.target.value)} sx={{ flex: 1, }} />

            <Button variant="contained" onClick={fetchWeather}>Search</Button>

          </div>

          {weather && (
            <Card sx={{ mt: 3, color: "black", borderRadius: "16px", boxShadow: 3,backgroundImage: getBackgroundCard(weather?.weather[0]?.main), backgroundSize: "cover",width:"55%" }}>
              <CardContent>
                <Typography variant='h4' gutterBottom>
                  {weather.weather[0].main}
                </Typography>
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" width="80%" />
                <Typography variant="h3" >
                   {weather.main.temp}°C
                </Typography>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  Feels_like: {weather.main.feels_like}
                </Typography>
                <Typography variant="h6">
                  Humidity: {weather.main.humidity}
                </Typography>
                <Typography variant='h6'>
                  Wind: {weather.wind.speed} m/s
                </Typography>
              </CardContent>
            </Card>
          )}
        </Container>
      </div>
    </>
  )
}

export default App
