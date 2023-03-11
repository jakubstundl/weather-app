import { useRef } from "react";
import Image from "next/image";
import { userRegistrationData } from "../interfaces/userData";
import { isInput, isForm } from "@/predicates";
import clouds from "../../public/clouds.jpg";
import { useRouter } from "next/router";

export default function Register() {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const sendForm = () => {
    if (
      isForm(form.current) &&
      isInput(form.current.elements[0]) &&
      isInput(form.current.elements[1]) &&
      isInput(form.current.elements[2]) &&
      form.current.elements[1].value == form.current.elements[2].value
    ) {
      const data: userRegistrationData = {
        email: form.current.elements[0].value,
        password: form.current.elements[1].value,
      };

      fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server reached:", data);
          if (data.message == "User has been created") {
            router.push("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <>
      <div className="fixed w-screen h-screen -z-10">
        <Image
          src={clouds}
          alt="Picture of the author"
          width={1920}
          height={1280}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="">
          <h1>Registration</h1>
          <form ref={form} className="w-full h-full flex flex-col ">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
            <label htmlFor="password1">Password</label>
            <input type="password" id="password1" />
            <label htmlFor="password2">Confirm password</label>
            <input type="password" id="password2" />
            <button type="button" onClick={sendForm}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
