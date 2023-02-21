import { type NextPage } from "next";
import Dashboard from "@components/dashboard";
import Layout from "@components/dashboard/layout/index";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export default Home;
