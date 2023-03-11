import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRef } from "react";
import { userLoginData } from "../interfaces/userData";
import { isInput, isForm } from "@/predicates";
import { useRouter } from "next/router";

export default function Login() {
  const form = useRef<HTMLFormElement>(null);
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
          setCookie(null, "accessToken", data.token, {
            maxAge: 8 * 24 * 60 * 60,
            path: "/",
          });
          router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <>
      <form ref={form}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" />
        <button type="button" onClick={sendForm}>
          Send
        </button>
      </form>
    </>
  );
}
