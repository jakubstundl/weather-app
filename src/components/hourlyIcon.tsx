import { List } from "@/interfaces/fetchedData";
import { useEffect, useState } from "react";

export default function HourlyIcon({ list ,timezone}: { list: List, timezone:number }) {
    const [timeString, setTimeString] = useState<string>("No time");
    const [dateString, setDateString] = useState<string>("No date")
  useEffect(() => {
    let date: Date = new Date(list.dt_txt);
    date.setSeconds(date.getSeconds()+timezone);
    setTimeString(
      `${date.toLocaleTimeString("cs", { timeZone: "UTC" }).slice(0, -3)}`
    );
    setDateString(
        `${date.toLocaleDateString("cs", { timeZone: "UTC" })}`
      );
  }, [list.dt_txt, timezone]);
  return (
    <>
      <div>{timeString},{dateString}</div>
      <p>Cloudiness:{list.clouds.all}%</p>
      <p>Probability of rain:{list.pop*100}%</p>
      <p>Temperature:{list.main.temp}</p>
      <p>Feels like:{list.main.feels_like}</p>
      <p>Temp min: {list.main.temp_min}</p>
      <p>Temp max: {list.main.temp_max}</p>
      <p></p>

    </>
  );
}
