import { parseCookies, setCookie, destroyCookie } from "nookies";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Logout({
  setUserActionVisible,
}: {
  setUserActionVisible: (boolean: boolean) => void;
}) {
  const cookies = parseCookies();
  const router = useRouter();
  return (
    <button
      className="w-full"
      onClick={() => {
        setUserActionVisible(false);
        destroyCookie(null, "accessToken");
        router.push("/");
      }}
    >
      Logout
    </button>
  );
}
