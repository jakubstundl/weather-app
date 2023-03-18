import { useRef } from "react";
import { userRegistrationData } from "../interfaces/userData";
import { isInput, isForm } from "@/predicates";
import validator from "validator";

export default function Register() {
  const form = useRef<HTMLFormElement>(null);
  const formWrapper = useRef<HTMLDivElement>(null);
  const errorField = useRef<HTMLDivElement>(null);
  const minPWLength = 4;

  const sendForm = () => {
    if (
      isForm(form.current) &&
      isInput(form.current.elements[0]) &&
      isInput(form.current.elements[1]) &&
      isInput(form.current.elements[2]) &&
      validator.isEmail(form.current.elements[0].value) &&
      form.current.elements[1].value == form.current.elements[2].value &&
      form.current.elements[1].value.length >= minPWLength
    ) {
      const data: userRegistrationData = {
        email: form.current.elements[0].value,
        password: form.current.elements[1].value,
      };
      console.log(data.email);

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
          if (data.message == "User has been created" && formWrapper.current) {
            formWrapper.current.innerHTML =
              `<div className="w-full flex justify-center"><div>Your account has been created, you can now login.</div></div>`;
          }else{
            if (data.message == "There has been an error while creating the user." && errorField.current){
              errorField.current.innerHTML = "Email is already registered.";
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      if (
        form.current &&
        isInput(form.current.elements[0]) &&
        isInput(form.current.elements[1]) &&
        isInput(form.current.elements[2]) &&
        errorField.current
      ) {
        if (validator.isEmail(form.current.elements[0].value) == false) {
          errorField.current.innerHTML = "Enter valid e-mail address";
        } else {
          console.log("Email is valid");
          if (
            form.current.elements[1].value !== form.current.elements[2].value
          ) {
            errorField.current.innerHTML = "Passwords do not match";
          } else {
            console.log("Passwords match");
            if (form.current.elements[1].value.length < minPWLength) {
              errorField.current.innerHTML = "Password is too short.";
            }
          }
        }
      } else {
      }
    }
  };
  return (
    <>
      <div className="w-screen flex justify-center ">
        <div className="w-[50vw] border-4 border-[#3CB371] rounded-md">
          <div ref={formWrapper} className="">
            {/* <h1>--- Under construction ---</h1> */}
            <h1 className="text-center m-5 text-2xl">Registration</h1>
            <form ref={form} className="w-full h-full flex flex-col ">
              <div className="flex justify-center">
                <div className="flex flex-col w-[80%] m-2">
                  <label className="text-xl" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    id="email"
                    className="text-xl bg-transparent border-2 mt-1 mb-1 rounded-[5px] border-[#3CB371] hover:bg-[#3CB371] focus:-translate-y-1 focus:outline-[#3CB371] focus:scale-105 focus:bg-[#3CB371] duration-300"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col w-[80%] m-2">
                  <label className="text-xl" htmlFor="password1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password1"
                    className="text-xl bg-transparent border-2 mt-1 mb-1 rounded-[5px] border-[#3CB371] hover:bg-[#3CB371] focus:-translate-y-1 focus:outline-[#3CB371] focus:scale-105 focus:bg-[#3CB371] duration-300"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col w-[80%] m-2">
                  <label className="text-xl" htmlFor="password2">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="password2"
                    className="text-xl bg-transparent border-2 mt-1 mb-1 rounded-[5px] border-[#3CB371] hover:bg-[#3CB371] focus:-translate-y-1 focus:outline-[#3CB371] focus:scale-105 focus:bg-[#3CB371] duration-300"
                    onKeyDown={(ev: React.KeyboardEvent<HTMLElement>) => {
                      if (ev.key == "Enter") {
                        sendForm();
                      }
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button
                  type="button"
                  onClick={sendForm}
                  className="w-[50%] text-xl border-2 m-2 mt-1 mb-4 rounded-[5px] border-[#3CB371] hover:-translate-y-1 focus:scale-105 hover:bg-[#3CB371] duration-300"
                >
                  Send
                </button>
              </div>
              <div className="w-full flex justify-center">
                {" "}
                <div ref={errorField} className="text-red-500"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
