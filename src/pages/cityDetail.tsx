import {
  CityDetailData,
  HourlyForecast,
  openWeatherData,
} from "@/interfaces/fetchedData";
import { prisma } from "@/functions/prisma";
import { City_db } from "@prisma/client";
import CityWeather from "@/components/cityWeather";
import { useRouter } from "next/router";
import { getUserIdFromToken } from "@/functions/auth";
import nookies from "nookies";
import CityWeatherMap from "@/components/Map/leaflet";
import { useState } from "react";
import Legend from "@/components/Map/legend";
import { verifyCityCache } from "@/functions/cacheValidation";
import { cache } from "@/functions/cache";

export default function CityDetail({
  data,
  inTheList,
  forecast,
}: {
  data: CityDetailData;
  inTheList: boolean | null;
  forecast: HourlyForecast;
}) {
  const router = useRouter();
  const weatherLayer = {
    Clouds: "clouds_new",
    Rain: "precipitation_new",
    Pressure: "pressure_new",
    Wind: "wind_new",
    Temperature: "temp_new",
  };
  const [layer, setLayer] = useState<string>(weatherLayer.Temperature);
  const [markedButton, setMarkedButton] = useState<boolean[]>(
    Object.values(weatherLayer).map((layerIterator) => {
      return layerIterator == layer;
    })
  );
  const markedButtonTW =
    "border-[4px] border-[#3CB371] rounded-xl p-2 w-[18%] bg-[#3CB371]";
  const buttonTW =
    "border-[4px] border-[#3CB371] rounded-xl p-2 w-[18%] hover:bg-[#3CB371]";
  const saveCity = () => {
    const cityToSave = router.query.city;
    fetch("api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityToSave }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        router.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="w-full flex justify-center">
        {inTheList == null ? (
          <></>
        ) : inTheList ? (
          <></>
        ) : (
          <button
            onClick={saveCity}
            className="border-[4px] border-[#3CB371] rounded-xl p-2 mb-10 hover:bg-[#3CB371]"
          >
            Add the city to your cities
          </button>
        )}
      </div>
      <div className="w-screen flex justify-center">
        <CityWeather data={data} forecast={forecast} />
      </div>

      <div className="w-screen flex justify-center">
        <div className="min-w-[1000px] max-w-[1600px] w-full">
          <div className="flex justify-between m-5">
            {Object.entries(weatherLayer).map((layer: any, index: number) => (
              <button
                className={markedButton[index] ? markedButtonTW : buttonTW}
                onClick={(ev: any) => {
                  setLayer(layer[1]);
                  setMarkedButton((prev) => {
                    let temp = Object.keys(weatherLayer).map(() => false);
                    temp[index] = true;
                    return temp;
                  });
                }}
                key={index}
              >
                {layer[0]}
              </button>
            ))}
          </div>
          <CityWeatherMap coords={{ x: data.lat, y: data.lon }} layer={layer} />
          <Legend layer={layer} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  //context.res.setHeader('Cache-Control', 's-maxage=900')
  const city = context.query.city;
  const cookies = nookies.get(context);
  let inTheList = null;

  const userId = getUserIdFromToken(cookies.accessToken);
  if (userId) {
    const cityList = (
      await prisma.city.findMany({ where: { userId: userId } })
    ).map((city) => city.name);
    if (cityList.includes(city)) {
      inTheList = true;
    } else {
      inTheList = false;
    }
  }

  const cityData: City_db[] = await prisma.city_db.findMany({
    where: {
      owm_city_name: city.split(",")[0],
      country_short: city.split(",")[1],
    },
    take: 1,
  });

  let country: string = cityData[0].country_long || "";
  const data: CityDetailData = {
    countryLong: country,
    lat: cityData[0].owm_latitude || 0,
    lon: cityData[0].owm_longitude || 0,
  };

  const dataFromDB = await prisma.cache_city_weather_hourly.findUnique({
    where: { city: city },
  });
  let forecast: HourlyForecast;
 // if (dataFromDB && verifyCityCache(Number(dataFromDB.timeStamp), Date.now())) {
    if (cache.hourlyWeather.get(city) && verifyCityCache(cache.hourlyWeather.get(city)?.timeStamp||0, Date.now())) {
      //    forecast = JSON.parse(dataFromDB.data);
    forecast = cache.hourlyWeather.get(city)!.data;
    console.log(cache.hourlyWeather.get(city)!.timeStamp);
    console.log("got from cache");
    

  } else {
    console.log("got from api");    
    forecast = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&appid=84fe0ab7b8e1da2d85374181442b3639`
      )
    ).json();
    /* await prisma.cache_city_weather_hourly.upsert({
      where: {
        city: city,
      },
      update: { timeStamp: `${Date.now()}` },

      create: {
        city: city,
        timeStamp: `${Date.now()}`,
        data: JSON.stringify(forecast),
      },
    });
    await prisma.cache_city_weather_hourly.update({
      where: { city: city },
      data: {
        data: JSON.stringify(forecast),
      },
    }); */
    cache.hourlyWeather.set(city,{timeStamp:Date.now(),data:forecast})
  }

  return {
    props: { data, inTheList, forecast },
  };
}
