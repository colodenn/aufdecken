import React, { type FunctionComponent } from "react";
import Navbar from "./navbar";
import SettingsBar from "./settingsBar";
import Sidebar from "./sidebar";

export type Layout = {
  children: React.ReactNode;
};

const Layout: FunctionComponent<Layout> = (props) => {


  return (
    <>
      <div className="h-screen w-screen ">
        <Navbar />
        <div className=" flex w-full">
          <Sidebar />
          <main className="w-full">
            <div className="mx-auto h-full w-full flex-1">{props.children}</div>
          </main>

          <SettingsBar />
        </div>
      </div>
    </>
  );
};

export default Layout;
