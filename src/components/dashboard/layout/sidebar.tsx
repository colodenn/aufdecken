import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  DragHandleDots2Icon,
  MagnifyingGlassIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { clsx } from "clsx";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="" style={{height: "calc(100vh - 69px)"}}>

      {sidebarOpen ? (
        <ExpandedMenu setOpen={setSidebarOpen} open={sidebarOpen} />
      ) : (
        <CollapsedMenu setOpen={setSidebarOpen} open={sidebarOpen} />
      )}
      </div>
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
    <div className="relative mt-0 h-full w-16 border-r-[1px] bg-white">
      <div
        onClick={() => props.setOpen(!props.open)}
        className="absolute  z-30 -right-12 top-24 flex h-12 w-12  cursor-pointer   items-center justify-center rounded-r border-[1px] border-l-0 bg-white"
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
    <div className="relative mt-0 h-full w-96 border-r-[1px] bg-white">
      <div
        onClick={() => props.setOpen(!props.open)}
        className="absolute  z-30 -right-12 top-24 flex h-12 w-12  cursor-pointer   items-center justify-center rounded-r border-[1px] border-l-0 bg-white"
      >
        <DoubleArrowLeftIcon className="h-4 w-4" />
      </div>
      <div className="">
        <div className="block">
          <div className="first-step px-4 py-2">
            <h2 className="mb-4 mt-2 text-2xl font-medium">Blocks</h2>
            <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute ml-2 mt-5 text-gray-400 " />
                  <input
                    type="text"
                    className=" h-10 w-full mt-2  rounded align-middle focus:outline-none"
                    style={{
                      textIndent: "32px",
                      border: "1px solid #E8E8EF",
                      boxShadow: "0px 2px 8px rgb(34 34 87 / 5%)",
                    }}
                    placeholder="Search blocks"
                  />
            </div>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
};


const Tabs = () => {
  return (
    <TabsPrimitive.Root defaultValue="tab1" className=" ">
       <TabsPrimitive.List
        className={"flex mt-4  px-2 border-b-[1px]"}
      >
                  <TabsPrimitive.Trigger
                    className="mx-auto text-center font-medium text-sm  px-4 pb-2 border-b-4 cursor-pointer  data-[state=active]:border-[#aaa]"
                    style={{ color: "#393c44" }}
                    key={`tab-trigger-1`}
                    value="tab1"
                  >
                    AI
                  </TabsPrimitive.Trigger>
                  <TabsPrimitive.Trigger
                    className="mx-auto text-center font-medium text-sm  px-4 pb-2 border-b-4 cursor-pointer data-[state=active]:border-[#aaa]"
                    style={{ color: "#393c44" }}
                    key={`tab-trigger-2`}
                    value="tab2"
                  >
                   Algorithm
                  </TabsPrimitive.Trigger>
                  <TabsPrimitive.Trigger
                    className="mx-auto text-center font-medium text-sm  px-4 pb-2 border-b-4 cursor-pointer data-[state=active]:border-[#aaa]"
                    style={{ color: "#393c44" }}
                    key={`tab-trigger-3`}
                    value="tab3"
                  >
                   Other 
                  </TabsPrimitive.Trigger>
            
      </TabsPrimitive.List>
      <TabsPrimitive.Content
          key={`tab-content-1`}
          value={"tab1"}
          className="p-4"
        >
          {
            AI.map(( item, index) => {

              return <div key={index}><Block title={item.title} description={item.description} /></div>
            })
          }
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
        className="p-4"
          key={`tab-content-2`}
          value={"tab2"}
        >
          {
            Algorithm.map((item, index) => {
              return <div key={index}><Block title={item.title} description={item.description} /></div>
            })
          }
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
        className="p-4"
          key={`tab-content-3`}
          value={"tab3"}
        >
 {
            Other.map((item, index) => {
              return <div key={index}><Block title={item.title} description={item.description} /></div>
            })
          }
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
  )
}

const Block = (props: { title: string, description: string }) => {
  return (
    <div
    key={props.title}
    className="hover:shadow rounded p-5 flex cursor-pointer droppable-element items-center text-gray-700 "
    draggable={true}
    unselectable="on"
  >
    <DragHandleDots2Icon className="w-5 h-5" />
    <div className="flex">
      <div className="p-2 bg-gray-100 rounded my-auto ml-4">
        <RocketIcon className="w-5 h-5 text-gray-500" />
      </div>
    </div>
    <div className="ml-4">
      <p className="font-medium text-md">{props.title}</p>
      <p className="font-regular text-md">
        {props.description}
      </p>
    </div>
  </div>
  )
}

const AI = [
  {title: "WilNet", description: "Transformer architecture"},
  {title: "MPPN", description: "CNN architecture"},
  {title: "LSTM", description: "Classic RNN architecture"},
]

const Algorithm = [
  {title: "Alpha-Algorithm", description: "Alpha algorithm"},
  {title: "Heuristic Miner", description: "Heuristic algorithm"},
]

const Other = [
  {title: "Randomforest", description: "Decision tree algorithm"},
]