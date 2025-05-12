import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

export async function fetchWeather(lastCity) {
  const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${lastCity}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await axios.get(baseUrl);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { data: null, error: true };
  }
}
