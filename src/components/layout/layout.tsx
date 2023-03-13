import Background from "./background";
import Navbar from "./navbar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Background />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
