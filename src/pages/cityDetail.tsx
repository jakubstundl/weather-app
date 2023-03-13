import { openWeatherData } from "@/interfaces/fetchedData";
import { prisma } from "@/functions/prisma";
import { City_db } from "@prisma/client";
import CityWeatherSmallIcon from "@/components/cityWeatherSmallIcon";

export default function CityDetail({ data }: { data: openWeatherData }) {
  return <CityWeatherSmallIcon data={data}/>
  
}

export async function getServerSideProps(context: any) {
  const city = context.query.city;
  const data: openWeatherData = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=84fe0ab7b8e1da2d85374181442b3639`
    )
  ).json();
  const state: City_db[] = await prisma.city_db.findMany({
    where: {
      owm_city_name: city.split(",")[0],
      country_short: city.split(",")[1],
    },
    take: 1,
  });
  let result: string = state[0].country_long || "";
  data.sys = { ...data.sys, countryLong: result };
  return {
    props: { data }, // will be passed to the page component as props
  };
}
