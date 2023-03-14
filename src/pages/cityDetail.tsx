import { openWeatherData } from "@/interfaces/fetchedData";
import { prisma } from "@/functions/prisma";
import { City_db } from "@prisma/client";
import CityWeatherSmallIcon from "@/components/cityWeatherSmallIcon";
import { useRouter } from "next/router";
import { getUserIdFromToken } from "@/functions/auth";
import nookies from "nookies";

export default function CityDetail({ data, inTheList }: { data: openWeatherData, inTheList: boolean|null }) {
  const router = useRouter();
  console.log(inTheList==undefined||false);
  
  const saveCity = () => {
    const cityToSave = router.query.city;
    fetch("api/cities", {
      method: "POST", // or 'PUT'
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
      <h1>This page is under construction</h1>
      <CityWeatherSmallIcon data={data} user={null} />
      {inTheList==null?<></>:inTheList?<></>:<button onClick={saveCity}>Add the city to your cities</button>}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const city = context.query.city;
  const cookies = nookies.get(context);

  let inTheList = null;

  const userId = getUserIdFromToken(cookies.accessToken);
  if (userId) {
    const cityList = (
      await prisma.city.findMany({ where: { userId: userId } })
    ).map((city) => city.name);
   
    
    if(cityList.includes(city)){
      inTheList = true
    
    }else{
      inTheList = false
    }
  }

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
  data.name = city.split(",")[0]
  return {
    props: { data, inTheList }, // will be passed to the page component as props
  };
}
