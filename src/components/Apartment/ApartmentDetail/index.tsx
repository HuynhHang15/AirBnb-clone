import { useRouter } from "next/router";
import { placesStore } from "@/data/placesStore";
import { IApartmentCardProps } from "@/types/types";
import Reserve from "./Reserve";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "@/components/SearchBar/Date";
import { useEffect, useState } from "react";
import { countDays } from "utils/formatDate";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, signInWithGoogle } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setWishlist } from "@/redux/wishlistSlice";

const ApartmentDetail = () => {
  const router = useRouter();
  const { idRoom } = router.query;
  const wishlist = useSelector((state: any) => state.wishlist.items);

  const room: IApartmentCardProps = placesStore.find(
    (room) => room.id === idRoom
  )!;

  const [checkIn, setCheckIn] = useState<Date>(new Date(Date.now()));
  const [checkOut, setCheckOut] = useState<Date>(new Date(Date.now()));

  const [result, setResult] = useState<number>(2);

  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const toggleWishlistItem = async (itemId: string) => {
    if (user && user.uid) {
      const wishlistRef = doc(db, "wishlist", user.uid);
      const wishlistDoc = await getDoc(wishlistRef);

      const wishlistItems = wishlistDoc.exists()
        ? wishlistDoc.data().items || []
        : [];

      let updatedItems = [];

      wishlistItems.includes(itemId)
        ? (updatedItems = wishlistItems.filter((item: any) => item !== itemId))
        : (updatedItems = [...wishlistItems, itemId]);

      await updateDoc(wishlistRef, { items: updatedItems });
      dispatch(setWishlist(updatedItems));
    } else {
      signInWithGoogle();
    }
  };

  useEffect(() => {
    setResult(Math.floor(Math.random() * 6));
  }, []);

  return (
    <div className="pt-10 px-8 md:px-16 ">
      <div className="flex flex-col gap-2 pb-4">
        <div className="text-3xl font-semibold">{room?.name}</div>
        <div className="flex justify-between">
          <div className="flex gap-1 h-6 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <div className="font-semibold">{room?.stars}</div>
          </div>
          {/* -------------------- wishlist--------------------*/}
          <div className="cursor-pointer"
            onClick={(e: any) => {
              e.preventDefault();
              toggleWishlistItem(room?.id);
            }}
          >
            {wishlist && wishlist.includes(room?.id) ? (
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff385c"
                  className="w-6 h-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>

                <p className="font-semibold underline underline-offset-2">
                  Saved
                </p>
              </div>
            ) : (
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <p className="font-semibold underline underline-offset-2">
                  Save
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --------------------images-------------------- */}
      <div className="flex justify-center items-center gap-2 w-full h-56 md:h-96 rounded-xl overflow-hidden">
        <div className="flex-1 w-full h-full">
          <img src={room?.carouselPic1} alt="" className="object-cover" />
        </div>
        <div className="hidden flex-1 w-full h-full md:grid grid-cols-2 grid-rows-2 gap-2 mx-auto overflow-hidden">
          <div className="w-full overflow-hidden">
            <img src={room?.carouselPic2} alt="" className="" />
          </div>
          <div className="w-full overflow-hidden">
            <img src={room?.carouselPic3} alt="" className="" />
          </div>
          <div className="w-full overflow-hidden">
            <img src={room?.carouselPic4} alt="" className="" />
          </div>
          <div className="w-full overflow-hidden">
            <img src={room?.carouselPic5} alt="" className="" />
          </div>
        </div>
      </div>

      <div className="flex gap-10 lg:gap-20 relative">
        <div>
          <div className="py-8 flex flex-col gap-2">
            <div className="text-2xl font-semibold">
              Private room in bungalow hosted by Gede
            </div>
            <div className="actual-features text-lg">
              {result + 3} guests . {result + 1} bedrooms . {result + 3} beds .{" "}
              {result + 3} bathrooms
            </div>
          </div>

          {/*------------------ policy ------------------*/}
          <div className="border-t-2 border-gray-200 py-8">
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">Great location</div>
                  <div className="text-gray-500 font-light">
                    100% of recent guests gave the location a 5-star rating.
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">
                    Great check-in experience
                  </div>
                  <div className="text-gray-500 font-light">
                    100% of recent guests gave the check-in process a 5-star
                    rating.
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">
                    Free cancellation before Apr 8.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*------------------ aircover ------------------*/}
          <div className="border-t-2 border-gray-200 py-8">
            <div className="flex text-4xl font-bold pb-4">
              <div className="text-primary-color-1000">air</div>cover
            </div>
            <div className="tracking-wide">
              Every booking includes free protection from Host cancellations,
              listing inaccuracies, and other issues like trouble checking in.
            </div>
            <div className="font-semibold decoration-1 text-lg pt-4">
              Learn more
            </div>
          </div>

          {/*------------------ language ------------------*/}
          <div className="border-t-2 border-gray-200 py-8">
            <div className="flex gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                />
              </svg>
              <div>Some info is shown in its original language. </div>
            </div>
            <div className="pt-8 tracking-wide">
              Modern private room set in the rice paddies of the traditional
              Balinese village of Wongaya Gede, home to Batukaru Temple and
              Jatiluwih Rice Terraces
            </div>
          </div>

          {/*------------------ booking time ------------------*/}
          <div className="border-t-2 border-gray-200 py-8">
            <div className="text-2xl font-semibold pb-4">
              {countDays(checkIn, checkOut) > 0
                ? `${countDays(checkIn, checkOut)} night`
                : "Select checkout date"}
            </div>
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
            />
          </div>
        </div>

        {/*------------------ Reserve ------------------*/}
        <div className="fixed bottom-0 left-0 md:relative w-auto h-auto z-20">
          <div className="w-screen md:w-auto md:sticky md:top-28 md:right-0">
            <Reserve room={room} checkIn={checkIn} checkOut={checkOut} />
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 py-8 w-full">
        <div className="text-2xl font-semibold pb-4">Where you'll be</div>
        <p className="pb-4">{room?.name}</p>

        {room && (
          <Map
            initialViewState={{
              latitude: Number(room.latitude),
              longitude: Number(room.longitude),
              zoom: 14,
            }}
            style={{ width: "100%", height: 480 }}
            mapStyle="mapbox://styles/huynhhang/clfytb7am000w01qfukq6yfk7"
            mapboxAccessToken="pk.eyJ1IjoiaHV5bmhoYW5nIiwiYSI6ImNsZnlzejNhODBiOWszZG1yM2Jhd3liZzYifQ.tF1p2JotTVd690Ry6PuCiA"
          >
            <Marker
              longitude={Number(room.longitude)}
              latitude={Number(room.latitude)}
              color="red"
            >
              <div className="w-16 h-16 flex justify-center items-center bg-primary-color-500 rounded-full">
                <div className="w-10 h-10 flex justify-center items-center bg-primary-color-1000 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    className="w-6 h-6"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                </div>
              </div>
            </Marker>
          </Map>
        )}
      </div>
    </div>
  );
};

export default ApartmentDetail;
