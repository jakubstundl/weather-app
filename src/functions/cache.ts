import { HourlyForecast, openWeatherData } from "@/interfaces/fetchedData";

export class Cache {
hourlyWeather  = new Map<string,{timeStamp:number, data: HourlyForecast}>();
smallIconWeather = new Map<string,{timeStamp:number, data: openWeatherData}>();
}

export const cache = new Cache();