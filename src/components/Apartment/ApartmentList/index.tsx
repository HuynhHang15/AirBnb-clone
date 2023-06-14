import { placesStore } from "@/data/placesStore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApartmentCard from "../ApartmentCard";

const ApartmentList = () => {
  const selectedCategory = useSelector(
    (state: any) => state.category.selectedCategory
  );
  const apartment = placesStore.filter(
    (item: any) => item.type === selectedCategory.type
  );

  return (
    <div className="px-8 md:px-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 relative pt-6">
      {apartment &&
        apartment.map((item: any) => (
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
  );
};

export default ApartmentList;
