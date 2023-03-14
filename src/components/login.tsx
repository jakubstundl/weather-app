import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRef } from "react";
import { userLoginData } from "../interfaces/userData";
import { isInput, isForm } from "@/predicates";
import { useRouter } from "next/router";

export default function Login({
  setUserActionVisible,
}: {
  setUserActionVisible: (boolean: boolean) => void;
}) {
  const form = useRef<HTMLFormElement>(null);
  const errorField = useRef<HTMLParagraphElement>(null);
  const cookies = parseCookies();
  const router = useRouter();

  const sendForm = () => {
    if (
      isForm(form.current) &&
      isInput(form.current.elements[0]) &&
      isInput(form.current.elements[1])
    ) {
      const data: userLoginData = {
        email: form.current.elements[0].value,
        password: form.current.elements[1].value,
      };

      fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server reached:", data);
          if (data.token) {
            setCookie(null, "accessToken", data.token, {
              maxAge: 8 * 24 * 60 * 60,
              path: "/",
            });
            setUserActionVisible(false);
            router.push("/");
          } else {
            if (errorField && errorField.current) {
              errorField.current.innerHTML =
                "<span>This E-mail has not</span><br><span> been registered.</span>";
            }
          }
        })
        .catch((error) => {
          console.log("here", error);
        });
    }
  };
  return (
    <>
      <div>
        <form ref={form} className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            className="bg-transparent border-2 border-orange-500 rounded-[5px] focus::-translate-y-1 focus:scale-105 hover:bg-blue-500 duration-300 focus:outline-orange-800"
          />
          <label htmlFor="password">Password:</label>
          <input
            onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => {
              if (ev.key == "Enter") {
                sendForm();
              }
            }}
            type="password"
            id="password"
            className="bg-transparent border-2 border-orange-500 rounded-[5px] focus::-translate-y-1 focus:scale-105 hover:bg-blue-500 duration-300 focus:outline-orange-800"
          />
          <button
            className="border-2 m-2 rounded-[5px] border-orange-500 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500 duration-300"
            type="button"
            onClick={() => {
              sendForm();
            }}
          >
            Send
          </button>
          <p className="text-red-800" ref={errorField}></p>
        </form>
      </div>
    </>
  );
}
