import { CityDetailData, HourlyForecast } from "../interfaces/fetchedData";
import { useEffect, useState } from "react";
import HourlyIcon from "./hourlyIcon";

export default function CityWeather({
  data,
  forecast,
}: {
  data: CityDetailData;
  forecast: HourlyForecast;
}) {
  const [timeString, setTimeString] = useState("No time");
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const transition = 800

  const indexUp = () => {
    setIndex((prev) => {
      return Math.min(forecast.list.length - 3, prev + 1);
    });
    setOffset((prev) => {
      return Math.min(11200, prev + transition);
    });
  };
  const indexDown = () => {
    setIndex((prev) => {
      return Math.max(0, prev - 1);
    });
    setOffset((prev) => {
      return Math.max(0, prev - transition);
    });
  };

  let date: Date = new Date();
  date.setSeconds(date.getSeconds() + forecast.city.timezone);
  useEffect(() => {
    setTimeString(
      `${date.toLocaleTimeString("cs", { timeZone: "UTC" }).slice(0, -3)}`
    );
  }, [date, forecast.city.timezone, timeString]);
  return (
    <>
      <div className="min-w-[1000px] max-w-[1600px] w-full">
        <h1 className="text-6xl text-center">{`${forecast.city.name}, ${data.countryLong} - ${timeString}`}</h1>
        <div className="flex">
          <button onClick={indexDown} className="text-[100px] mr-[50px]">
            {"<"}
          </button>
          {/* <HourlyIcon
            list={forecast.list[index]}
            timezone={forecast.city.timezone}
          />
          <HourlyIcon
            list={forecast.list[index + 1]}
            timezone={forecast.city.timezone}
          />
          <HourlyIcon
            list={forecast.list[index + 2]}
            timezone={forecast.city.timezone}
          /> */}
          <div className="overflow-hidden relative">
            <div className="flex relative duration-1000" style={{ left: `-${offset}px` }}>
              {forecast.list.map((timeStamp, i) => (
                <HourlyIcon
                  key={i}
                  timezone={forecast.city.timezone}
                  list={timeStamp}
                />
              ))}
            </div>
          </div>

          <button onClick={indexUp} className="text-[100px] mr-[10px] ml-[50px]">
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}
