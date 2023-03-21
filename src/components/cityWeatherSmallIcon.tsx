import { openWeatherData } from "../interfaces/fetchedData";
import { useEffect, useState } from "react";
import Image from "next/image";
import wind from "../../public/wind-arrow.png";
import temperatureMeter from "../../public/thermometer.png";
import pressure from "../../public/pressure-indicator.png";
import { windRotate } from "../functions/windRotate";
import { useRouter } from "next/router";

export default function CityWeatherSmallIcon({
  data,
  user,
}: {
  data: openWeatherData;
  user: string | null;
}) {
  const [timeString, setTimeString] = useState("No time");
  const src = `/weatherIcons/${data.weather[0].icon}.png`;
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
       // console.log("Success:", data);
        router.reload();
      })
      .catch((error) => {
       // console.error("Error:", error);
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
    <div className="box-content bg-transparent border-[6px] rounded-xl border-[#3CB371]  p-3 pl-0  m-10 w-[500px]">
      {user ? (
        <div className="w-full bg-white h-0 flex justify-end">
          <button onClick={deleteCity} className="right-1 top-0 font-VarelaRound ">
            X
          </button>
        </div>
      ) : (
        <></>
      )}
      <p className="text-center">
        <span
          onClick={() => {
            router.push(`/cityDetail?city=${data.name},${data.sys.country}`);
          }}
          className="text-[#333333] text-3xl cursor-pointer"
        >{`${data.name}`}</span>
      </p>
      <p className="ml-2">{`${data.sys.countryLong}, ${timeString} `}</p>
      <div className="flex w-full justify-center">
        <div className="w-1/2 h-full flex justify-center items-center">
          <Image
            loader={myLoader}
            src={src}
            alt=""
            width={10}
            height={100}
            className="object-cover w-full"
          />
        </div>
        <div className="flex flex-col justify-around">
          <p className="text-xl whitespace-nowrap">
            {data.weather[0].main.toLowerCase() ==
            data.weather[0].description.toLowerCase()
              ? data.weather[0].main
              : `${data.weather[0].main}, ${data.weather[0].description}`}
          </p>

          <div className="flex m-2 whitespace-nowrap">
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
