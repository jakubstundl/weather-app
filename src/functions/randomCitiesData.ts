import { id } from "./cityIDs";
import { prisma } from "./prisma";
import { cityForFE } from "../interfaces/fetchedData";

export const getRandomCitiesData = async (
  n: number
): Promise<cityForFE[]> => {
  let indexes: number[] = [];
  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * id.length);
    if (indexes.includes(randomNumber)) {
      i--;
    } else {
      indexes.push(randomNumber);
    }
  }
  let data: cityForFE[] =
    [];
  for (let i = 0; i < indexes.length; i++) {
    const city_db = await prisma.city_db.findUnique({
      where: { id: id[indexes[i]] },
    });
    if (
      city_db &&
      city_db.owm_city_name &&
      city_db.country_long &&
      city_db.country_short
    ) {
      data.push({
        city: city_db.owm_city_name,
        country_long: city_db.country_long,
        country_short: city_db.country_short,
      });
    }
  }
  return data;
};
