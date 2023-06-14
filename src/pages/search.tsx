import MapComp from "@/components/Map/MapComp";
import { placesStore } from "@/data/placesStore";
import ApartmentCard from "@/components/Apartment/ApartmentCard";
import Category from "@/components/Category";
import PageLayout from "@/layouts/PageLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";

const Search = () => {
  const route = useRouter();
  const { place, checkIn, checkOut, adults, children, infants, pets } =
    route.query;

  const apartments: any =
    place &&
    placesStore.filter((item) =>
      item.location.toLowerCase().includes(place.toString().toLowerCase())
    );

  return (
    <div>
      <Head>
        <title>AirBnb | {place} - Vacation Rentals & Places to stay - Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="sticky top-[78px] left-0 w-screen z-30">
          <Category />
        </div>
        <div className="px-10 lg:px-16 ">
          <div className="relative flex gap-8 max-w-screen pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 relative w-full">
              {apartments &&
                apartments.map((item: any) => (
                  <ApartmentCard
                    key={item.id}
                    id={item.id}
                    homeMainPic={item.homeMainPic}
                    name={item.name}
                    price={item.price}
                    type={item.type}
                    stars={item.stars}
                    carouselPic1={item.carouselPic1}
                    carouselPic2={item.carouselPic2}
                    carouselPic3={item.carouselPic3}
                    carouselPic4={item.carouselPic4}
                    carouselPic5={item.carouselPic5}
                    location={""}
                    pets={false}
                    latitude=""
                    longitude=""
                  />
                ))}
            </div>
            <div className="relative w-auto h-auto -mt-6 -mr-16 hidden lg:block">
              <MapComp apartments={apartments} top="150px" />
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Search;
