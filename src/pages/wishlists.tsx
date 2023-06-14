import MapComp from "@/components/Map/MapComp";
import { placesStore } from "@/data/placesStore";
import ApartmentCard from "@/components/Apartment/ApartmentCard";
import PageLayout from "@/layouts/PageLayout";
import { useSelector } from "react-redux";
import Head from "next/head";

const Wishlists = () => {
  const wishlist = useSelector((state: any) => state.wishlist.items);

  const apartments = placesStore.filter((item) => wishlist.includes(item.id));

  return (
    <div>
      <Head>
        <title>Your lists - Wishlists - Airbnb</title>
      </Head>
      <PageLayout>
        <div className="px-10 lg:px-16">
          {apartments.length > 0 ? (
            <div className="relative flex gap-8 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 relative w-full">
                {apartments.map((item: any) => (
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
              <div className="relative w-auto h-auto -mr-16 hidden lg:block">
                <MapComp apartments={apartments} top="80px" />
              </div>
            </div>
          ) : (
            <div className="min-h-screen pt-20">
              <h1 className="text-3xl font-bold">Wishlists</h1>
              <div className="pt-10 w-full md:w-6/12">
                <h1 className="text-2xl mb-4 font-semibold">
                  Create your first wishlist
                </h1>
                <p className="text-md text-gray-500 max-w-xl">
                  As you search, click the heart icon to save your favorite
                  places and Experiences to a wishlist.
                </p>
              </div>
            </div>
          )}
        </div>
      </PageLayout>
    </div>
  );
};

export default Wishlists;
