import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="z-50 w-full border-b-[1px] bg-white py-3 px-4">
      <div className="my-auto flex justify-between">
        <div className="flex items-center">
          <div className="mr-4 inline-block cursor-pointer">
            <Link href="/dashboard">
              <Image
                className="my-auto mt-0 rounded-full bg-gray-100 p-3 hover:cursor-pointer "
                style={{ width: "40px", height: "40px" }}
                src="/layout/arrow.svg"
                alt="Back Arrow"
                width={40}
                height={40}
              />
            </Link>
          </div>
          <div className="inline-block">
            <h1 className="text-base font-medium" style={{ color: "#393C44" }}>
              Dashboard
            </h1>
            <p
              className="text-sm font-medium text-gray-400"
              style={{ color: "#808292" }}
            >
              Return to cockpit
            </p>
          </div>
        </div>
        <div className="flex">
          <p className="m-auto font-medium ">MobIS 2019</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="rounded  border px-2 py-2 text-sm font-medium  text-gray-400 hover:border-gray-100 hover:text-gray-300 focus:outline-none ">
            Discard
          </button>
          <button className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none">
            Publish & export
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
