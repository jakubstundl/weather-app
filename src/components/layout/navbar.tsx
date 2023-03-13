import icon from "../../../public/userIcon.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Login from "../login";
import Logout from "../logout";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const [userActionVisible, setUserActionVisible] = useState<boolean>(false);
  const ref = useRef<any>(null);
  const router = useRouter();
  const handleClickOutside = (ev: any) => {
    const element: HTMLInputElement = ev.target;
    if (ref.current && !ref.current.contains(ev.target)) {
      setUserActionVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  useEffect(() => {
    fetch(`/api/auth/loginCheck`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.email);
      });
  });
  return (
    <>
      <div className="fixed right-2 top-2 z-10">
        <div className="flex w-full justify-center">
          <button
            onClick={() => {
              setUserActionVisible(!userActionVisible);
            }}
          >
            <Image src={icon} width={50} height={50} alt="User-icon"></Image>
          </button>
        </div>
        {user ? user : `No user logged in`}
        <div ref={ref} className={`${userActionVisible ? "" : "hidden"}`}>
          {user ? (
            <Logout setUserActionVisible={setUserActionVisible} />
          ) : (
            <div>
              <Login setUserActionVisible={setUserActionVisible} />
              <button
                onClick={() => {
                  setUserActionVisible(false);
                  router.push("/register");
                }}
              >
                No Account? Register
              </button>
            </div>
          )}
        </div>
      </div>
      <h1 className="text-center text-orange-400 w-screen text-[100px]">
        Weather-App
      </h1>
      <div></div>
    </>
  );
}
