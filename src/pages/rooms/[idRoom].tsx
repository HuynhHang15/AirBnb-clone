import ApartmentDetail from "@/components/Apartment/ApartmentDetail";
import PageLayout from "@/layouts/PageLayout";
import Head from "next/head";
import React from "react";

const DetailApartment = () => {
  return (
    <div>
      <Head>
        <title>Request to book - Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <ApartmentDetail />
      </PageLayout>
    </div>
  );
};

export default DetailApartment;
