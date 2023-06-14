import SearchIcon from "@/assets/_svgs/SearchIcon";
import React from "react";
import { formatDateSearch } from "utils/formatDate";

type HeaderLayoutSearchProps = {
  setOverlay: any;
  headerSearch: any;
  setHeaderSearch: any;
  setSelection: any;
  place: any;
  checkIn: any;
  checkOut: any;
  guests: any;
};

const HeaderLayoutSearch = ({
  setOverlay,
  headerSearch,
  setHeaderSearch,
  setSelection,
  place,
  checkIn,
  checkOut,
  guests,
}: HeaderLayoutSearchProps) => {
  console.log(place)
  return (
    <div
      className={`${
        headerSearch
          ? "header_layout_search_active"
          : "header_layout_search_inactive"
      } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max bg-white border border-gray-300 rounded-full shadow px-2 py-2 flex items-center justify-center mx-auto`}
    >
      <div
        className="px-4 border-r border-gray-300 font-semibold cursor-pointer"
        onClick={() => {
          setOverlay(true);
          setSelection("place");
          setHeaderSearch((prev: any) => !prev);
        }}
      >
        {place || "Anywhere"}
      </div>
      <div
        className="px-4 border-r border-gray-300 font-semibold cursor-pointer"
        onClick={() => {
          setOverlay(true);
          setSelection("check-in");
          setHeaderSearch((prev: any) => !prev);
        }}
      >
        {checkIn.getTime() !== checkOut.getTime() ? formatDateSearch(checkIn, checkOut) : "Any week"}
      </div>
      <div
        className="px-4 text-gray-400 cursor-pointer max-w-[110px]"
        onClick={() => {
          setOverlay(true);
          setSelection("guests");
          setHeaderSearch((prev: any) => !prev);
        }}
      >
        {guests.adults > 1 ? (
          <div>
            {guests.adults > 1 && (
              <span>{guests.adults + guests.children} guests</span>
            )}
          </div>
        ) : (
          "Add Guests"
        )}
      </div>
      <button
        className="w-9 h-9 bg-primary-color-1000 text-white rounded-full flex justify-center items-center"
        onClick={() => {
          setOverlay(true);
          setSelection("place");
          setHeaderSearch((prev: any) => !prev);
        }}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default HeaderLayoutSearch;
