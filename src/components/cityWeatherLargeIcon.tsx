import { openWeatherData } from "@/interfaces/fetchedData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CityWeatherLargeIcon({
  data,
  user,
}: {
  data: openWeatherData;
  user: string | null;
}) {
  const [timeString, setTimeString] = useState("No time");
  const src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const picSize = 25;
  const router = useRouter();
  const cityNameForDb = `${data.name},${data.sys.country}`;
  const myLoader = ({ src, width }: { src: string; width: number }) => {
    return src;
  };

  useEffect(() => {
    let date: Date = new Date();
    date.setSeconds(date.getSeconds() + data.timezone);
    setTimeString(
      `${date.toLocaleTimeString("cs", { timeZone: "UTC" }).slice(0, -3)}`
    );
  }, [data.timezone, timeString]);
  return (
    <div className="box-content bg-transparent">
      <p>{`${data.name}, ${data.sys.countryLong}, ${timeString} `}</p>
      <div className="flex">
        {/* <Image
          loader={myLoader}
          src={src}
          alt=""
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        /> */}
        <div>
          <p>Weather: {data.weather[0].main}</p>
          <p>Weather desc: {data.weather[0].description}</p>
          <p>Temperature: {data.main.temp}</p>
          <p>feels like: {data.main.feels_like}</p>
          <p>Wind speed: {data.wind.speed}</p>
          <p>Wind direction: {data.wind.deg}</p>
          <p>Pressure:{data.main.pressure}hPa</p>
          <p>Longitude: {data.coord.lon}</p>
          <p>Latitude: {data.coord.lat}</p>
          <p>Temp min: {data.main.temp_min}</p>
          <p>Temp max: {data.main.temp_max}</p>
          <p>Humidity: {data.main.humidity}</p>
          <p>Visibility: {data.visibility}</p>
          <p>Clouds: {data.clouds.all}</p>
          <p>dt: {data.dt}</p>
          <p>Sunrise: {data.sys.sunrise}</p>
          <p>Sunset: {data.sys.sunset}</p>
        </div>
      </div>
    </div>
  );
}
