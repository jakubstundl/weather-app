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
    <div className="box-content bg-transparent border-[6px] rounded-xl border-[#3CB371]  p-3 pl-0  m-10 w-[300px]">
      <p>
        {dayString}
        {" - "}
        {dateString}
        {" - "}
        {monthString}
      </p>
      <p>{timeString}</p>
        <Image
          loader={myLoader}
          src={srcWeatherIcon}
          alt=""
          width={10}
          height={100}
          className="object-cover w-full"
        />
        <div className="flex w-full justify-between">
      <div className="flex">
        <Image
          src={srcCloudiness}
          width={25}
          height={25}
          alt="Wind direction"
        ></Image>
        {list.clouds.all}%
      </div>
      <div className="flex">
        <Image
          src={srcRain}
          width={25}
          height={25}
          alt="Wind direction"
        ></Image>
        {list.pop * 100}%
      </div>
      <div className="flex">
        <Image
          src={srcTemp}
          width={25}
          height={25}
          alt="Wind direction"
        ></Image>
        {list.main.temp }°C
      </div>
      </div>
    </div>
  );
}
