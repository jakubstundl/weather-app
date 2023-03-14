import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function CitySearch() {
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();
  const ref = useRef<any>(null);
  const datalist = useRef<HTMLDataListElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const handleClickOutside = (ev: any) => {
    const element: HTMLInputElement = ev.target;
    if (ref.current && input.current && !ref.current.contains(ev.target)) {
      setCities([]);
      if (input.current) {
        input.current.value = "";
      }
    }
  };
  const handleChange = (text: string) => {
    if (text.length > 0) {
      fetch(`/api/citySearch?q=${text}`)
        .then((res) => res.json())
        .then((data) => {
          setCities(data.cities);
        });
    } else {
      setCities([]);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div className="flex w-screen justify-center relative mb-[50px] text-[2em]">
      <div className="flex">
        <label htmlFor="citySearch">Search: &nbsp;</label>
        <div className="min-w-[500px] w-[50vw]">
          <input
            className="bg-transparent outline-none border-4 border-b-0 w-full h-[4vh] border-orange-500"
            list="cities"
            id="citySearch"
            autoComplete="off"
            ref={input}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => {
              if (ev.key == "Escape") {
                setCities([]);
                if (input.current) {
                  input.current.value = "";
                }
              }
            }}
          />
          <div
            ref={ref}
            className="border-4 border-t-0 absolute border-orange-500 min-w-[500px] w-[50vw]"
          >
            {cities.map((city, index) => (
              <div
                className="w-full bg-transparent backdrop-blur-sm hover:backdrop-blur-3xl hover:border-2 border-orange-500"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  const div: HTMLDivElement = e.target as HTMLDivElement;
                  router.push(`/cityDetail?city=${div.innerHTML}`);
                }}
                key={index}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
