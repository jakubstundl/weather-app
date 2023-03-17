import { List } from "@/interfaces/fetchedData";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HourlyIcon({
  list,
  timezone,
}: {
  list: List;
  timezone: number;
}) {
  const [timeString, setTimeString] = useState<string>("No time");
  const [dateString, setDateString] = useState<string>("No date");
  const [dayString, setDayString] = useState<string>("No day");
  const [monthString, setMonthString] = useState<string>("No month");

  const srcWeatherIcon = `/weatherIcons/${list.weather[0].icon}.png`;
  const srcCloudiness = `/cloudiness.png`;
  const srcRain = `/water.png`;
  const srcTemp = `/thermometer.png`;
  const myLoader = ({ src, width }: { src: string; width: number }) => {
    return src;
  };

  useEffect(() => {
    let date: Date = new Date(list.dt_txt);
    date.setSeconds(date.getSeconds() + timezone);
    setTimeString(
      `${date.toLocaleTimeString("cs", { timeZone: "UTC" }).slice(0, -3)}`
    );
    setDateString(`${date.getDay()}`);
    setDayString(
      `${date.toLocaleDateString("en", { timeZone: "UTC", weekday: "long" })}`
    );
    setMonthString(
      `${date.toLocaleDateString("en", { timeZone: "UTC", month: "long" })}`
    );
  }, [list.dt_txt, timezone]);
  return (
    <div className="bg-transparent flex flex-col justify-between border-[6px] rounded-xl border-[#3CB371] m-3  p-3 pl-0 max-h-[400px]">
      <p className="text-center text-3xl">{timeString}</p>
      <p className="text-2xl text-center whitespace-nowrap m-2">
        {dayString}
        {" - "}
        {dateString}
        {" - "}
        {monthString}
      </p>
      <Image
        loader={myLoader}
        src={srcWeatherIcon}
        alt=""
        width={10}
        height={100}
        className="object-cover w-full"
      />
<div className="w-full flex justify-center">
      <div className="flex w-[80%] justify-between">

        <div className="flex w-[33%] items-center justify-center">
          <div className="w-[40%]">
            <Image
              src={srcCloudiness}
              width={100}
              height={100}
              alt="Wind direction"
              className="object-cover"
            ></Image>
          </div>
          {list.clouds.all.toFixed(0)}%
        </div>
        <div className="flex w-[33%] items-center justify-center">
          <div className="w-[20%]">
            <Image
              src={srcRain}
              width={100}
              height={100}
              alt="Wind direction"
            ></Image>
          </div>
          {(list.pop * 100).toFixed(0)}%
        </div>
        <div className="flex w-[33%] items-center justify-center">
          <div className="w-full">
            <Image
              src={srcTemp}
              width={100}
              height={100}
              alt="Wind direction"
              className="h-[25px] w-[25px]"
            ></Image>
          </div>
          {list.main.temp.toFixed(1)}°C
        </div>
      </div></div>
    </div>
  );
}
