import { openWeatherData } from "@/interfaces/fetchedData";
import CityWeatherSmallIcon from "./cityWeatherSmallIcon";

export default function NoUserCities({ data }: { data: openWeatherData[] }) {
  return (
    <div>
      <h1 className="text-center text-yellow-200 text-[100px]">Weather in the world</h1>
    <div className="flex flex-wrap max-w-screen-2xl justify-center">
      {data.map(city=>(
        <CityWeatherSmallIcon key={city.id} data={city}/>
      ))}
    </div></div>
  );
}
