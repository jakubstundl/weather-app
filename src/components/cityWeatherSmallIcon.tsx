import { openWeatherData } from "@/interfaces/fetchedData";
import { useEffect, useState } from "react";
import Image from "next/image";
import wind from "../../public/wind-arrow.png";
import temperatureMeter from "../../public/thermometer.png";
import pressure from "../../public/pressure-indicator.png";
import { windRotate } from "@/functions/windRotate";

export default function CityWeatherSmallIcon({
  data,
}: {
  data: openWeatherData;
}) {
  const [timeString, setTimeString] = useState("No time");
  const src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const picSize = 25;
  const myLoader = ({ src, width }: { src: string, width:number }) => {
    return src;
  };
  useEffect(() => {
    
    let date: Date = new Date();
    date.setSeconds(date.getSeconds() + data.timezone);
    console.log("timezone",data.timezone);
    
    setTimeString(`${date.toLocaleTimeString("cs",{timeZone: "UTC"}).slice(0, -3)}`);
  }, [data.timezone, timeString]);
  return (
    <div className="box-content bg-transparent border-4 rounded-xl border-orange-600  p-3 m-10 w-[400px]">
      <p className="text-center">
        <span className="text-orange-600 text-3xl">{`${data.name}`}</span>
      </p>
      <p>{`${data.sys.countryLong}, ${timeString} `}</p>
      <div className="flex">
        <Image loader={myLoader} src={src} alt="" width={100} height={100} style={{objectFit:"cover"}} />
        <div>
          <p className="text-xl">
            {data.weather[0].main.toLowerCase() ==
            data.weather[0].description.toLowerCase()
              ? data.weather[0].main
              : `${data.weather[0].main}, ${data.weather[0].description}`}
          </p>

          <div className="flex m-2">
            <Image
              src={temperatureMeter}
              width={picSize}
              height={picSize}
              alt="Wind direction"
            ></Image>
            &nbsp;&nbsp; {data.main.temp.toFixed(1)}°C (Feels like:{" "}
            {data.main.feels_like.toFixed(1)}°C)
          </div>

          <div className="flex m-2">
            <Image
              src={wind}
              width={picSize}
              height={picSize}
              alt="Wind direction"
              className={windRotate[`${data.wind.deg}`]}
            ></Image>
            &nbsp;&nbsp; {data.wind.speed}m/s
          </div>
          <div className="flex m-2">
            <Image
              src={pressure}
              width={picSize}
              height={picSize}
              alt="Wind direction"
            ></Image>
            &nbsp;&nbsp; {data.main.pressure}hPa
          </div>
        </div>
      </div>
    </div>
  );
}
