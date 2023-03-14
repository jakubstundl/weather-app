import { openWeatherData } from "@/interfaces/fetchedData";
import CityWeatherSmallIcon from "./cityWeatherSmallIcon";

export default function userCities({
  data,
  user,
}: {
  data: openWeatherData[];
  user: string | null;
}) {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-wrap max-w-[1800px] justify-center">
          {data.length > 0 ? (
            data.map((city) => (
              <CityWeatherSmallIcon key={city.id} data={city} user={user} />
            ))
          ) : (
            <h1>You have no cities in your list, search some and add them.</h1>
          )}
        </div>
      </div>
    </div>
  );
}
