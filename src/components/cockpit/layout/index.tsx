import type { Layout } from "@components/dashboard/layout";
import Logo from "@components/misc/logo";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const CockpitLayout = (props: Layout) => {
    return (<div className="flex justify-center w-screen h-screen overflow-hidden">
        <CockpitSidebar />
        <main className="w-full h-full p-8 bg-[#fafafa]">
            <div>

                <Link href={"/dashboard"} style={{ width: "fit-content" }} className="flex items-center  hover:bg-[#d9d9d94a] rounded p-2 mb-8">
                    <CaretLeftIcon className="w-8 h-8" />
                    <p className="mx-2 font-medium">back to dashboard</p>
                </Link>
                {props.children}
            </div>
        </main>
    </div>)
}

export default CockpitLayout;


const CockpitSidebar = () => {
    return (
        <div className=" w-72 border-r-[1px] h-full p-8">
            <Logo />
        </div>
    )
}