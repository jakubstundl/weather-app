import { openWeatherData } from "@/interfaces/fetchedData";
import CityWeatherSmallIcon from "./cityWeatherSmallIcon";

export default function NoUserCities({ data }: { data: openWeatherData[] }) {
  return (
    <div>
      <div className="flex justify-center w-screen">

    <div className="flex flex-wrap max-w-screen-2xl justify-center">
      {data.map(city=>(
        <CityWeatherSmallIcon key={city.id} data={city}/>
        ))}
        </div>
    </div></div>
  );
}
