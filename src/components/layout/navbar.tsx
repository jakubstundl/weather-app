import icon from "../../../public/userIcon.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Login from "../login";
import Logout from "../logout";
import { useRouter } from "next/router";
import Link from "next/link";

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
      <div className="fixed p-[5px] right-2 top-2 z-10 backdrop-blur-sm  border-4 rounded-[5px] border-orange-500">
        <div className="flex w-full justify-center">
          <button className="hover:invert-0"
            onClick={() => {
              setUserActionVisible(true);
            }}
            
          >
            <Image  src={icon} width={50} height={50} alt="User-icon"></Image>
          </button>
        </div>
        {user ? user : `No user logged in`}
        <div ref={ref} className={`${userActionVisible ? "" : "hidden"}`}>
          {user ? (
            <Logout setUserActionVisible={setUserActionVisible} />
          ) : (
            <div>
              <Login setUserActionVisible={setUserActionVisible} />
              <button className="w-full border-2 mb-1 rounded-[5px] border-orange-500 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500 duration-300"
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
      <div className="flex justify-center ">
      <Link href={"/"} className="text-center text-orange-400 w-screen text-[100px]">
        Weather-App
      </Link>
      </div>
      <div></div>
    </>
  );
}
