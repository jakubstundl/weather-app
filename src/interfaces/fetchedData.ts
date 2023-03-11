export interface cityForFE {
  city: string;
  country_long: string;
  country_short: string;
}

export interface openWeatherData  {
  coord: { lon: number, lat: number },
  weather: [{ id: number, main: string, description: string, icon: string }],
  base: string,
  main: {
    temp:number,
    feels_like:number,
    temp_min:number,
    temp_max:number,
    pressure:number,
    humidity:number,
  },
  visibility: number,
  wind: { speed: number, deg: number },
  snow: { "1h": number },
  clouds: { all: number },
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    countryLong: string,
    sunrise: number,
    sunset: number,
  },
  timezone: number,
  id: number,
  name: string,
  cod: number,
};
