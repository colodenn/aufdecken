import Logo from "@components/misc/logo";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="">
          <Logo />
          <Link href={"/dashboard"}>
            <div className="flex justify-center space-x-2 font-medium text-lg text-gray-500 items-center ">
              <p>Let&apos;s get started</p>
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
