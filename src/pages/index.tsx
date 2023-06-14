import ApartmentList from "@/components/Apartment/ApartmentList";
import Category from "@/components/Category";
import PageLayout from "@/layouts/PageLayout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>AirBnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <div className="sticky top-[78px] left-0 w-full z-30">
          <Category />
        </div>
        <ApartmentList />
      </PageLayout>
    </div>
  );
};

export default Home;
