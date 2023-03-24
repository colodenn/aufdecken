import Logo from "@components/misc/logo";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="bg-[#f5f5f5] w-full h-full">
      <Promo />
      <Navbar />
      <div className="flex justify-center">
        <div className="px-96 mt-12">

          <h1 className="text-6xl text-[#1D1D1B] text-center  font-light font-space">Seamless processes start here.</h1>
          <div className="px-12 mt-8">

            <p className="text-center text-xl text-[#1D1D1B] font-light">Check your process reality as it is.
              Unbiased, objective, exact.</p>
            <div className="flex justify-center mt-14">
              <Link href={"/dashboard"} className="py-4 px-8 font-space text-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-white transition-all ease-in-out duration-500 font-medium border-[#1D1D1B] border-[1px] rounded-full flex items-center">
                Start Modelling
                <div className="ml-2"><ArrowRightIcon className="w-8 h-4" /></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-24">
        <Hero />
      </div>
      <div className="mt-24">

      <Footer />
      </div>
    </div>
  );
};

const Footer = () => {
  return ( 
    <div className="bg-[#1D1D1B] w-full h-full pt-8 pb-4 px-8">
      <div className="flex w-full justify-between ">
      <Link href={""} className="text-white font-bold font-space text-xl ">aufdecken.</Link>
<div className="text-5xl cursor-pointer transition-all duration-200 hover:text-[#00c488] font-space text-white w-1/2">
Process discovery in one place.
</div>
      </div>
<div className="flex justify-center items-center mt-20">
  <div className="">
    <ul className="flex items-center text-white  space-x-12 text-md font-light font-cal">
      <li className="hover:text-[#00c488] transition-all duration-200 ease-in-out cursor-pointer">Impressum</li>
      <li>|</li>
      <li className="hover:text-[#00c488] transition-all duration-200 ease-in-out cursor-pointer">Contact</li>
      <li>|</li>
      <li className="hover:text-[#00c488] transition-all duration-200 ease-in-out cursor-pointer">About</li>
    </ul>
  </div>
</div>
    </div>
  )
}

const Hero = () => {
  return (
    <div className="border-2 border-black rounded-xl w-3/4 h-full bg-[#fdf2e0] overflow-hidden">
      <Image src={"/images/mockup.png"} width={2000} height={2000} alt="Hero" />
    </div>
  )
}

const Navbar = () => {
  return (
    <div className="bg-[#f5f5f5] w-full h-full flex justify-between p-8 bg-[]">
      <Link href={""} className="font-bold font-space text-xl">aufdecken.</Link>
      <Link className="font-medium transition-all duration-300 ease-in-out font-space flex items-center hover:text-[#00c488]" href={"/dashboard"}>dashboard. <div className="ml-2"><ArrowRightIcon className="w-4 h-4" /></div></Link>
    </div>
  )
}

const Promo = () => {
  return (

    <div className="bg-[#ffcd5e] p-2 flex justify-center">
      <div>
        <p className="text-sm font-cal">This is just a mockup.
        </p>
      </div>
    </div>
  )
}

export default Home;
