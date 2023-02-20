import React, { type FunctionComponent } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type Layout = {
  children: React.ReactNode;
};

const Layout: FunctionComponent<Layout> = (props) => {
  return (
    <>
      <div className="disableScroll h-screen overflow-hidden ">
        <Navbar />
        <div className="items-cent flex w-full">
          <Sidebar />
          <main className="w-full">
            <div className="mx-auto h-full w-full flex-1">{props.children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
