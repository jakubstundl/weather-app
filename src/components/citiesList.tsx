import { useEffect, useRef, useState } from "react";
import { isInput } from "../predicates";

export default function CitiesList({ hidden }: { hidden: boolean }) {
  const [cities, setCities] = useState<string[]>([]);
  console.log("city list");

  const getCities = () => {
    fetch("api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data.cities));
  };
  const removeCity = (name: string) => {

    const data = { name: name };

    fetch("api/cities", {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
       // console.log("Success:", data);
        getCities();
      })
      .catch((error) => {
        //console.error("Error:", error);
      });
  };

  const addCity = (name: string) => {

    const data = { name: name };

    fetch("api/cities", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data);
        getCities();
      })
      .catch((error) => {
        //console.error("Error:", error);
      });
  };
  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      <div className={hidden?"hidden":"block"}>
        <p>List of the cities</p>
        {cities.map((city) => (
          <City key={city} name={city} removeSelf={removeCity} />
        ))}
        <AddCity addCity={addCity} />
      </div>
    </>
  );
}

const City = ({
  name,
  removeSelf,
}: {
  name: string;
  removeSelf: (name: string) => void;
}) => {
  return (
    <div>
      <button
        onClick={() => {
          removeSelf(name);
        }}
      >
        Remove
      </button>
      <p>{name}</p>
    </div>
  );
};

const AddCity = ({ addCity }: { addCity: (name: string) => void }) => {
  const input = useRef<HTMLInputElement>(null);
  return (
    <>
      <label htmlFor="newCity">New City</label>
      <input
        ref={input}
        type="text"
        id="newCity"
        className="border-2 border-indigo-600 focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        onClick={() => {
          if (isInput(input.current)) {
            addCity(input.current.value);
          }
        }}
      >
        Add
      </button>
    </>
  );
};
