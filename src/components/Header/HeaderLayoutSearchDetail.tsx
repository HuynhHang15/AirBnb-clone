import SearchIcon from "@/assets/_svgs/SearchIcon";
import { useRef, useEffect } from "react";
import { formatDate } from "utils/formatDate";
import Place from "../SearchBar/Place";
import Calendar from "../SearchBar/Date";
import Guests from "../SearchBar/Guests";
import { useRouter } from "next/router";

type HeaderLayoutSearchDetailProps = {
  setOverlay: any;
  headerSearch: any;
  setHeaderSearch: any;
  selection: any;
  setSelection: any;
  place: any;
  checkIn: any;
  checkOut: any;
  guests: any;
  setPlace: any;
  setCheckIn: any;
  setCheckOut: any;
  setGuests: any;
};

const HeaderLayoutSearchDetail = ({
  setOverlay,
  headerSearch,
  setHeaderSearch,
  selection,
  setSelection,
  place,
  checkIn,
  checkOut,
  guests,
  setPlace,
  setCheckIn,
  setCheckOut,
  setGuests,
}: HeaderLayoutSearchDetailProps) => {
  const inputElement = useRef<any>(null);
  const route = useRouter()

  const handleSearch = () => {
    route.push({
      pathname: "/search",
      query: {
        place: place,
        checkIn: checkIn.toString(),
        checkOut: checkOut.toString(),
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        pets: guests.pets,
      },
    });
    setOverlay(false)
  };

  useEffect(() => {
    if (inputElement && inputElement.current && selection === "place") {
      setTimeout(() => {
        inputElement.current?.focus();
      }, 500);
    }
  }, [headerSearch]);

  useEffect(() => {
    if (selection === "place" && inputElement && inputElement.current)
      inputElement.current.focus();
  }, [selection]);

  return (
    <div
      className={`${
        headerSearch
          ? "header_layout_search_detail_active"
          : "header_layout_search_detail_inactive"
      } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-screen py-4 z-30`}
    >
      <div className="relative w-max flex rounded-full border border-neutral-300 bg-neutral-200">
        <div
          onClick={() => {
            setSelection("place");
          }}
          className={`rounded-full px-6 flex-4 py-3 w-max cursor-pointer select-none ${
            selection === "place"
              ? "bg-white shadow-xl"
              : "bg-transparent hover:bg-neutral-300"
          }`}
        >
          <label htmlFor="place" className="text-sm mb-1 font-semibold pl-2">
            Where
          </label>
          <input
            type="text"
            ref={inputElement}
            name="place"
            id="place"
            autoComplete="off"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Search Destinations"
            className="outline-none w-max block px-2 text-md rounded-full bg-transparent"
          />
        </div>

        <div
          onClick={() => {
            setSelection((prev: any) =>
              prev === "check-in" ? null : "check-in"
            );
          }}
          className={`rounded-full relative px-6 min-w-[144px] py-3 cursor-pointer select-none flex flex-col justify-start ${
            selection === "check-in"
              ? "bg-white shadow-xl"
              : "bg-transparent hover:bg-neutral-300"
          }`}
        >
          <p className="font-semibold text-sm mb-1 whitespace-nowrap">
            Check in
          </p>
          <p className="text-neutral-500 text-md w-max">
            {checkIn ? formatDate(checkIn) : "Add dates"}
          </p>
        </div>

        <div
          onClick={() => {
            setSelection((prev: any) =>
              prev === "check-out" ? null : "check-out"
            );
          }}
          className={`rounded-full relative px-6 min-w-[144px] py-3 cursor-pointer select-none flex flex-col justify-start ${
            selection === "check-out"
              ? "bg-white shadow-xl"
              : "bg-transparent hover:bg-neutral-300"
          }`}
        >
          <p className="font-semibold text-sm mb-1 whitespace-nowrap">
            Check out
          </p>
          <p className="text-neutral-500 text-md w-max">
            {checkIn ? formatDate(checkOut) : "Add dates"}
          </p>
        </div>

        <div
          className={`flex items-center justify-between gap-6 rounded-full pr-3 pl-6 flex-2 py-3 cursor-pointer select-none ${
            selection === "guests"
              ? "bg-white shadow-xl"
              : "bg-transparent hover:bg-neutral-300"
          }`}
        >
          <div
            className="w-[84px] flex flex-col justify-start"
            onClick={() => {
              setSelection((prev: any) =>
                prev === "guests" ? null : "guests"
              );
            }}
          >
            <p className="text-sm mb-1 font-semibold">Who</p>
            <div className="text-neutral-500 text-md w-max">
              {guests.adults > 0 ? (
                <div>
                  {guests.adults > 0 && (
                    <span>{guests.adults + guests.children} guests</span>
                  )}
                  {guests.infants > 0 && (
                    <span>, {guests.infants} infants</span>
                  )}
                  {guests.pets > 0 && <span>, {guests.pets} pets</span>}
                </div>
              ) : (
                "Add Guests"
              )}
            </div>
          </div>

          <button
            className="w-auto py-3 px-4 bg-primary-color-1000 text-white rounded-full flex justify-center items-center"
            onClick={() => {
              setOverlay(true);
              setSelection("place");
              setHeaderSearch((prev: any) => !prev);
              handleSearch()
            }}
          >
            <SearchIcon />
            <p className="font-semibold pl-2">Search</p>
          </button>
        </div>

        {selection === "place" && (
          <div className="absolute shadow-xl top-20 left-0">
            <Place place={place} setPlace={setPlace} />
          </div>
        )}

        {(selection === "check-in" || selection === "check-out") && (
          <div className="absolute shadow-xl top-20 left-10 bg-white p-4 rounded-3xl">
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
            />
          </div>
        )}

        {selection === "guests" && (
          <div className="absolute shadow-xl top-20 right-0 w-96 text-left mx-auto">
            <Guests guests={guests} setGuests={setGuests} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderLayoutSearchDetail;
