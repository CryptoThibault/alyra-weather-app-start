import { useState, useEffect } from "react"
import Icon from "./Icon"
import Description from "./Description"
import Temperature from "./Temperature"
import Humidity from "./Humidity"

const WeatherApp = ({ city }) => {
  const [conditions, setConditions] = useState({})
  const [description, setDescription] = useState("")
  const [iconID, setIconID] = useState("")
  const [location, setLocation] = useState("")
  const { feelsLike, mainTemp, humidity } = conditions

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("météo untrouvable")
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setLocation(`${data.name}, ${data.sys.country}`)
        setConditions({
          feelsLike: Math.round(data.main.feels_like - 273.15),
          mainTemp: Math.round(data.main.temp - 273.15),
          humidity: data.main.humidity
        })
        setDescription(data.weather[0].description)
        setIconID(data.weather[0].icon)
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [city])
  return (
    <>
      {!!location && (
        <section className="text-center">
          <Icon iconID={iconID} />
          <h2 className="mb-4">Conditions météo à {location}</h2>
          <Description description={description} />
          <Temperature mainTemp={mainTemp} feelsLike={feelsLike} />
          <Humidity humidity={humidity} />
        </section>
      )}
    </>
  )
}

export default WeatherApp