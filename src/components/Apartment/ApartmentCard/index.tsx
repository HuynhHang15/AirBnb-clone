import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IApartmentCardProps } from "@/types/types";
import { auth, db, signInWithGoogle } from "@/firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { setWishlist } from "@/redux/wishlistSlice";
import { doc, getDoc,  updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

const ApartmentCard = (props: IApartmentCardProps) => {
  const {
    id,
    homeMainPic,
    name,
    price,
    type,
    stars,
    carouselPic1,
    carouselPic2,
    carouselPic3,
    carouselPic4,
    carouselPic5,
    location,
    pets,
  } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // const [wishlist, setWishlist] = useState<string[]>([]);
  const wishlist = useSelector((state: any) => state.wishlist.items)
  const [user] = useAuthState(auth);
  const dispatch = useDispatch()

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
    } else{
      signInWithGoogle()
    }
  };

  return (
    <Link
      href={`/rooms/${id}`}
      className="apartment-cart w-auto h-full flex flex-col justify-between gap-2 relative cursor-pointer"
    >
      <div className="">
        {/* <Image src={homeMainPic} alt="" fill /> */}
        <Slider {...settings}>
          <div className="w-full h-72 relative rounded-xl overflow-hidden">
            <img src={homeMainPic} alt="" className="w-full h-full" />
          </div>
          <div className="w-full h-72 relative rounded-xl overflow-hidden">
            <img src={carouselPic1} alt="" className="w-full h-full" />
          </div>
          <div className="w-full h-72 relative rounded-xl overflow-hidden">
            <img src={carouselPic2} alt="" className="w-full h-full" />
          </div>
          <div className="w-full h-72 relative rounded-xl overflow-hidden">
            <img src={carouselPic3} alt="" className="w-full h-full" />
          </div>
          <div className="w-full h-72 relative rounded-xl overflow-hidden">
            <img src={carouselPic4} alt="" className="w-full h-full" />
          </div>
          <div className="w-full h-72 relative rounded-xl overflow-hidden">
            <img src={carouselPic5} alt="" className="w-full h-full" />
          </div>
        </Slider>
      </div>
      <div className="flex justify-between align-top">
        <div className="flex flex-col gap-1">
          <div className="font-bold">{name}</div>
          {/* <div className="text-gray-500">{type}</div> */}
          {/* <div className="text-gray-500">Apr 11-16</div> */}
          <div className="flex gap-2">
            <div className="font-semibold">${price}</div>
            <div>night</div>
          </div>
        </div>
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
          <div>{stars}</div>
        </div>
      </div>
      <div
        className="absolute right-4 top-4 text-white cursor-pointer"
        onClick={(e: any) => {
          e.preventDefault();
          toggleWishlistItem(id);
        }}
      >
        {wishlist && wishlist.includes(id) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ff385c"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#00000080"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        )}
      </div>
    </Link>
  );
};

export default ApartmentCard;
