import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { fetchWeather } from "./services/Api.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [lastCity, setLastCity] = useState("");

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      setLastCity(lastCity);
      fetchWeather(lastCity).then(({ data, error }) => {
        if (data) {
          setWeatherData(data);
        } else {
          setError(true);
        }
      });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (city) {
      fetchWeather(city)
        .then(({ data, error }) => {
          setWeatherData(data);
          setCity("");
          setLastCity(city);
          localStorage.setItem("lastCity", city);
          setError(false);
        })
        .catch((error) => {
          setError(true);
        });
    } else {
      alert("Por favor, insira o nome de uma cidade.");
    }
  }
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Previsão do Tempo
        </h1>

        {error ? (
          <p className="text-red-900 py-1">
            Cidade não encontrada. Tente novamente.{" "}
          </p>
        ) : null}
        <form className="flex gap-2 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite a cidade"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Buscar
          </button>
        </form>
        {weatherData ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">{weatherData.city.name}</h2>
            <p className="text-6xl font-bold text-blue-600 mt-2">
              {weatherData.list[0].main.temp}°C
            </p>
            <p className="text-gray-600">
              {weatherData.list[0].weather[0].description}
            </p>
          </div>
        ) : (
          <p>Procure por uma cidade usando o botão acima:</p>
        )}
      </div>
    </div>
  );
}

export default App;
