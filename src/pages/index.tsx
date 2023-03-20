import Head from "next/head";
import nookies from "nookies";
import {
  getUserIdFromToken,
} from "@/functions/auth";
import { Inter } from "next/font/google";
import UserCities from "@/components/userCities";
import { getRandomCitiesData } from "@/functions/randomCitiesData";
import { cityForFE, openWeatherData } from "@/interfaces/fetchedData";
import CitySearch from "@/components/citySearch";
import { prisma } from "@/functions/prisma";
import { City } from "@prisma/client";
import { stringify } from "querystring";
import { verifyCityCache } from "@/functions/cacheValidation";
import { cache } from "@/functions/cache";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  data,
  user,
}: {
  data: openWeatherData[];
  user: string | null;
}) {
  console.log(data[0]);

  return (
    <>
      <Head>
        <title>Weather-App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <CitySearch />
        <UserCities data={data} user={user} />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  //ctx.res.setHeader('Cache-Control', 's-maxage=900')
  // Parse
  const cookies = nookies.get(ctx);
  let cities: cityForFE[] | null | City[];
  let user: string | null;
  let data: openWeatherData[] = [];
  try {
    user = getUserIdFromToken(cookies.accessToken);
  } catch (error) {
    cities = null;
    user = null;
  }
  if (user) {
    cities = await prisma.city.findMany({ where: { userId: user } });
    for (let i = 0; i < cities.length; i++) {
      const dataFromDB = await prisma.cache_city_weather.findUnique({
        where: { city: cities[i].name },
      });
    //  if (dataFromDB && verifyCityCache(Number(dataFromDB.timeStamp),Date.now())) {
      if (cache.smallIconWeather.get(cities[i].name) && verifyCityCache(cache.smallIconWeather.get(cities[i].name)!.timeStamp,Date.now())) {

       // data.push(JSON.parse(dataFromDB.data));
        data.push(cache.smallIconWeather.get(cities[i].name)!.data);       
      } else {
        const weather = await (
          await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cities[i].name}&units=metric&APPID=84fe0ab7b8e1da2d85374181442b3639`
          )
        ).json();
        data.push(weather);
       /*  await prisma.cache_city_weather.upsert({
          where: {
            city: cities[i].name,
          },
          update: { timeStamp: `${Date.now()}` },

          create: {
            city: cities[i].name,
            timeStamp: `${Date.now()}`,
            data: JSON.stringify(weather),
          },
        });
        await prisma.cache_city_weather.update({
          where: { city: cities[i].name },
          data: {
            data: JSON.stringify(weather),
          },
        }); */
        cache.smallIconWeather.set(cities[i].name,{timeStamp:Date.now(),data:weather})
      }

      const country = await prisma.city_db.findMany({
        where: {
          owm_city_name: cities[i].name?.split(",")[0],
          country_short: cities[i].name?.split(",")[1],
        },
      });
      if (country[0].country_long) {
        data[i].sys = { ...data[i].sys, countryLong: country[0].country_long };
        data[i].name =
          country[0].owm_city_name || cities[i].name?.split(",")[0] || "";
      }
    }
  } else {
    cities = await getRandomCitiesData(12);
    
    for (let i = 0; i < cities.length; i++) {
      const dataFromDB = await prisma.cache_city_weather.findUnique({
        where: { city: cities[i].city },
      });
      if (cache.smallIconWeather.get(cities[i].city) && verifyCityCache(cache.smallIconWeather.get(cities[i].city)!.timeStamp,Date.now())) {

      //if (dataFromDB && verifyCityCache(Number(dataFromDB.timeStamp), Date.now())) {
       // data.push(JSON.parse(dataFromDB.data));
       data.push(cache.smallIconWeather.get(cities[i].city)!.data);       
console.log("got from cache");

      }else {
        const weather = await (
          await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cities[i].city}&units=metric&APPID=84fe0ab7b8e1da2d85374181442b3639`
          )
        ).json();
        data.push(weather);
        /* console.log(Date.now());
        
        await prisma.cache_city_weather.upsert({
          where: {
            city: cities[i].city,
          },
          update: { timeStamp: `${Date.now()}` },

          create: {
            city: cities[i].city,
            timeStamp: `${Date.now()}`,
            data: JSON.stringify(weather),
          },
        });
        await prisma.cache_city_weather.update({
          where: { city: cities[i].city },
          data: {
            data: JSON.stringify(weather),
          },
        }); */
        cache.smallIconWeather.set(cities[i].city,{timeStamp:Date.now(),data:weather})
console.log("from api");

      }
      data[i].sys = { ...data[i].sys, countryLong: cities[i].country_long };
      data[i].name = cities[i].city.split(",")[0];
    }
  }

  return {
    props: { user, data }, // will be passed to the page component as props
  };
}
