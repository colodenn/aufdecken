import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {sidebarOpen ? (
        <ExpandedMenu setOpen={setSidebarOpen} open={sidebarOpen} />
      ) : (
        <CollapsedMenu setOpen={setSidebarOpen} open={sidebarOpen} />
      )}
    </>
  );
};

export default Sidebar;

type SidebarMenu = {
  setOpen: (open: boolean) => void;
  open: boolean;
};

const CollapsedMenu = (props: SidebarMenu) => {
  return (
    <div className="relative mt-0 h-screen w-16 border-r-[1px] bg-white">
      <div
        onClick={() => props.setOpen(!props.open)}
        className="absolute -right-12 top-24 flex h-12 w-12  cursor-pointer   items-center justify-center rounded-r border-[1px] border-l-0 bg-white"
      >
        <DoubleArrowRightIcon className="h-4 w-4" />
      </div>
      <div className="">
        <div className="block">
          <div className="first-step px-4 py-2"></div>
        </div>
      </div>
    </div>
  );
};

const ExpandedMenu = (props: SidebarMenu) => {
  return (
    <div className="relative mt-0 h-screen w-96 border-r-[1px] bg-white">
      <div
        onClick={() => props.setOpen(!props.open)}
        className="absolute -right-12 top-24 flex h-12 w-12  cursor-pointer   items-center justify-center rounded-r border-[1px] border-l-0 bg-white"
      >
        <DoubleArrowLeftIcon className="h-4 w-4" />
      </div>
      <div className="">
        <div className="block">
          <div className="first-step px-4 py-2">
            <h2 className="mb-4 mt-2 text-2xl font-medium">Blocks</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
