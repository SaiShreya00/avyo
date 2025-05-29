
import { config } from '@/config/environment';

export interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  icon: string;
  location: string;
}

export const fetchWeatherData = async (lat?: number, lon?: number): Promise<WeatherData> => {
  try {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${config.weather.apiKey}&units=metric`;
    
    if (lat && lon) {
      weatherUrl += `&lat=${lat}&lon=${lon}`;
    } else {
      // Default to New York if no location provided
      weatherUrl += `&q=New York,US`;
    }

    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      location: `${data.name}, ${data.sys.country}`
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    // Return fallback data
    return {
      temperature: 22,
      condition: "Clear",
      description: "clear sky",
      icon: "01d",
      location: "Your Location"
    };
  }
};

export const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        console.warn('Geolocation error:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};
