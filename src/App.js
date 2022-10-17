import axios from "axios";
import { useEffect, useState } from "react";
import winter from "./img/winter.jpg";
import autumn from "./img/autumn.jpg";
import summer from "./img/sunset.jpg";
import spring from "./img/spring.jpg";
import allseasons from "./img/allseasons.jpg";
import styled from "styled-components";

const AppDiv = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  &:before {
    content: "";
    background: url(${(props) => props.weather}) no-repeat center center/cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [weather, setWeather] = useState(allseasons);
  AppDiv.defaultProps = {
    weather: weather,
  };
  const changeWeather = (temp) => {
    temp > 25 && setWeather(summer);
    temp > 7 && temp < 17 && setWeather(autumn);
    temp < 7 && setWeather(winter);
    temp > 17 && temp < 25 && setWeather(spring);
  };

  const API_KEY = "ab92eb196cb4315bdef9a92e38a91964";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ab92eb196cb4315bdef9a92e38a91964`;
  const [backgroundImage, setBackgroundImage] = useState("");
  const searchLocation = async (e) => {
    if (e.key === "Enter") {
      const res = await axios.get(url);
      const resData = await res.data;
      setData(resData);
      console.log(resData);
      changeWeather(resData.main.temp.toFixed());
      setLocation("");
    }
  };
  return (
    <AppDiv>
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.sys ? data.sys.country : null}</p>
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
          </div>
          <div className="description">
            <p>{data.weather?.[0].description}</p>
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? data.main.feels_like + " °F" : null}
              </p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main ? data.main.humidity + "%" : null}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? data.wind.speed + "MPH" : null}
              </p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </AppDiv>
  );
}

export default App;
