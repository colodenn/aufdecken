import CockpitLayout from "@components/cockpit/layout";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { type NextPage } from "next";
import Link from "next/link";

const FileDashboard: NextPage = () => {
    return (
        <>
            <CockpitLayout>
                <FileTableEntry />
            </CockpitLayout>
        </>
    );
};

export default FileDashboard;


const FileTableEntry = () => {
    return (
        <Link href={"/dashboard/mobis2019"} className="p-6 bg-white shadow rounded border-[1px] flex items-center justify-between">
            <div className="font-medium">
                <span className="mr-6">🕹</span> MobIS 2019.xes
            </div>
            <div>
                <CaretDownIcon className="w-6 h-6" />
            </div>
        </Link>
    )
}