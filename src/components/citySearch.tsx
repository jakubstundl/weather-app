import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function CitySearch() {
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();
  const ref = useRef<any>(null);
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
    <div className="flex w-screen justify-center absolute">
      <div className="flex">
        <label htmlFor="citySearch">Search:</label>
        <div>
          <input
            className="bg-transparent border-4 w-[500px]"
            type="text"
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
          <div ref={ref} className="border-2 border-blue-800">
            {cities.map((city, index) => (
              <div
                className="relative bg-transparent backdrop-blur-sm hover:backdrop-blur-3xl hover:border-2	"
               
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
