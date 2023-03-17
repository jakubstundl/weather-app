import { CityDetailData, HourlyForecast } from "@/interfaces/fetchedData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import HourlyIcon from "./hourlyIcon";

export default function CityWeather({
  data,
  forecast,
}: {
  data: CityDetailData;
  forecast: HourlyForecast;
}) {
  const [timeString, setTimeString] = useState("No time");
  let date: Date = new Date();
  date.setSeconds(date.getSeconds() + forecast.city.timezone);
  useEffect(() => {
    setTimeString(
      `${date.toLocaleTimeString("cs", { timeZone: "UTC" }).slice(0, -3)}`
    );
  }, [date, forecast.city.timezone, timeString]);
  return (
    <>
    <div>

      <h1>{`${forecast.city.name}, ${data.countryLong} - ${timeString}`}</h1>
      <div className="flex flex-wrap">

       {forecast.list.map((f:any,i:number)=>(
        <HourlyIcon key={i} list={f}  timezone={forecast.city.timezone} />
        ))} 
               {/*  <HourlyIcon  list={forecast.list[0]}  timezone={forecast.city.timezone} />
 */}
        </div>
    </div>
    </>
  );
}
