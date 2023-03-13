import Image from "next/image";
import bg1 from "../../../public/bg1.jpg";

export default function Background() {
  return (
    <>
      <div className="fixed w-screen h-screen -z-10">
        <Image
          src={bg1}
          alt="Picture of the author"
          width={1920}
          height={1280}
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
}
