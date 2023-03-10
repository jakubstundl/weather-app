import { openWeatherData } from "@/interfaces/fetchedData";
import { useEffect, useState } from "react";
import Image from "next/image";
import wind from "../../public/wind-arrow.png";
import temperatureMeter from "../../public/thermometer.png";
import pressure from "../../public/pressure-indicator.png";
import { windRotate } from "@/functions/windRotate";
import { useRouter } from "next/router";

export default function CityWeatherSmallIcon({
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
  const deleteCity = () => {
    fetch("api/cities", {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityNameForDb }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        router.reload()
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    let date: Date = new Date();
    date.setSeconds(date.getSeconds() + data.timezone);
    setTimeString(
      `${date.toLocaleTimeString("cs", { timeZone: "UTC" }).slice(0, -3)}`
    );
  }, [data.timezone, timeString]);
  return (
    <div className="box-content bg-transparent border-4 rounded-xl border-orange-600  p-3 m-10 w-[400px]">
      {user?<div className="w-full bg-white h-0 flex justify-end"><button 
          onClick={deleteCity}
          className="right-1 top-0"
        >
          X
        </button></div>:<></>
      }
      <p className="text-center">
        <span
          onClick={() => {
            router.push(`/cityDetail?city=${data.name},${data.sys.country}`);
          }}
          className="text-orange-600 text-3xl cursor-pointer"
        >{`${data.name}`}</span>
      </p>
      <p>{`${data.sys.countryLong}, ${timeString} `}</p>
      <div className="flex">
        <Image
          loader={myLoader}
          src={src}
          alt=""
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
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
            &nbsp;&nbsp; {data.main.temp.toFixed(1)}??C (Feels like:{" "}
            {data.main.feels_like.toFixed(1)}??C)
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
