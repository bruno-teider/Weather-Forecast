import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";


function App() {
  console.log(process.env.REACT_APP_API_KEY)

  // Where the data will be stored
  const [data, setData] = useState({});
  const [city, setCity] = useState("");

  // For error management
  const [error, setError] = useState(false);

  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  // Trying to get the user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sucess, fail);
    }
    // In case it can get the location
    function sucess(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      // Uses the coords to get the city name
      const cityUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=6&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

      axios.get(cityUrl).then((response) => {
        axios.get(cityUrl).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
        setCity("");
      });
    }
    // In case it can not get the location
    function fail() {
      console.log("Unable to get user location");
    }
  }, []);

  // Calls the function to get the data when pressing enter in the input
  const searchCity = (event) => {
    if (event.key === "Enter") {
      axios
        .get(weatherUrl)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          setError(true);
        });
      setCity("");
    }
  };

  // To close the error message
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  function getBackgroundImg(weather) {
    const images = {
      Clear: "https://c.wallhere.com/photos/9d/bf/grass_nature_landscape_clear_sky_mountains_trees_field_spring-1759323.jpg!d",
      Rain: "https://media.macphun.com/img/uploads/customer/blog/2688/1701705276656df63c094696.01244667.jpg?q=85&w=1680",
      Clouds: "https://casa-florenca.com/wp-content/uploads/2022/05/Design-sem-nome-4-1536x918.png",
      Thunderstorm: "https://wallpapers.com/images/featured/thunderstorm-pictures-97rx4g6v02r11rnj.jpg",
      Snow: "https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/MFQHQM4DGVHENDXT6TTGAOQ7KU.JPG",
      Mist: "https://www.saopaulo.sp.gov.br/wp-content/uploads/2017/06/galeria1-1-4.jpg",
      Fog: "https://www.saopaulo.sp.gov.br/wp-content/uploads/2017/06/galeria1-1-4.jpg",
      Drizzle: "https://www.saopaulo.sp.gov.br/wp-content/uploads/2017/06/galeria1-1-4.jpg",
    };
    return images[weather] || "null";
  }

  function getDay(i) {
    const weekday = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    let day = weekday[d.getDay()];

    return day;
  }

  // Return the icon for the future weather
  function getWeatherIcon(weather) {
    const icons = {
      Clear: "https://i.ibb.co/bz475TP/yellow-sun-16526-2.png",
      Rain: "https://i.ibb.co/72qKznB/downpour-rainy-day-16531.png",
      Clouds: "https://i.ibb.co/qYfKS83/blue-cloud-and-weather-16527.png",
      Thunderstorm: "https://i.ibb.co/ws3J8Ys/lightning-and-blue-rain-cloud-16533.png",
      Snow: "https://i.ibb.co/qshF3Tj/snowfall-and-blue-cloud-16541.png",
      Mist: "https://cdn-icons-png.freepik.com/512/7946/7946234.png",
      Fog: "https://cdn-icons-png.freepik.com/512/7946/7946234.png",
      Drizzle: "https://cdn-icons-png.freepik.com/512/7946/7946234.png",
    };
    return icons[weather] || null;
  }

  return (
    <div className="App">
      <div className="container">
        {
          /* In case of error, show error message */
          error && (
            <Snackbar
              open={error}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              TransitionComponent={Slide}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                City not found
              </Alert>
            </Snackbar>
          )
        }

        <div className="top">
          <input
            placeholder="Enter City Name Here"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={searchCity}
            type="text"
          ></input>

          <div className="name-temp">
            {data.city?.name ? (
              <h1 className="cityName">{data.city?.name} ‎ ‎ ‎ </h1>
            ) : null}
            {data.list ? (
              <h1 className="temp">{data.list[0].temp.day.toFixed()}°C</h1>
            ) : null}
          </div>

          {data.list ? (
            <h2 className="state">{data.list[0].weather[0].main}</h2>
          ) : null}
        </div>

        {data.city?.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.list ? (
                <h2>{data.list[0].feels_like.day.toFixed()}°C</h2>
              ) : null}
              <h3>Feels Like</h3>
            </div>
            <div className="humidity">
              {data.list ? <h2>{data.list[0].humidity}%</h2> : null}
              <h3>Humidity</h3>
            </div>
            <div className="wind">
              {data.list ? <h2>{data.list[0].speed} km/h</h2> : null}
              <h3>Wind Speed</h3>
            </div>
          </div>
        )}
      </div>

      <div className="bottom-container">
        <div className="background-img">
          {data.list ? (
            <img
              src={getBackgroundImg(data.list[0].weather[0].main)}
              alt="background-image"
            />
          ) : (
            <img
              src="https://i.ibb.co/qDKJ0Gx/Sem-t-tulo.png"
              alt="background-image"
            />
          )}
        </div>

        <div className="card-list">
          {/* Map the contents of data to render the cards */}
          {data.list &&
            data.list.slice(1).map((item, i) => (
              <div className="card">
                <h1 className="weekday">{getDay(i)}</h1>
                <div className="max-min">
                  {data.list ? (
                    <h2>{data.list[i].temp.max.toFixed()}°</h2>
                  ) : null}
                  {data.list ? (
                    <h2 className="min">{data.list[i].temp.min.toFixed()}°</h2>
                  ) : null}
                </div>
                <img
                  className="weather-icon"
                  src={getWeatherIcon(data.list[i].weather[0].main)}
                  alt="weather-icon"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
