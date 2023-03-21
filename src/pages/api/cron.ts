import type { NextApiRequest, NextApiResponse } from "next";
import { cache } from "../../functions/cache";
import { verifyCityCache } from "@/functions/cacheValidation";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    cache.hourlyWeather.forEach((value,key) => {
        if(!verifyCityCache(Date.now(), value.timeStamp)){
            cache.hourlyWeather.delete(key)
        }
    });

    cache.smallIconWeather.forEach((value,key) => {
        if(!verifyCityCache(Date.now(), value.timeStamp)){
            cache.smallIconWeather.delete(key)
        }
    });
  res.status(200).end("Hello Cron!");
}
