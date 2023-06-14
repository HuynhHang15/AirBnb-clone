import Guests from "@/components/SearchBar/Guests";
import { IApartmentCardProps } from "@/types/types";
import { countDays, formatDate } from "utils/formatDate";
import { useState } from "react";

type ReserveProps = {
  room: IApartmentCardProps;
  checkIn: Date;
  checkOut: Date;
};
const Reserve = ({ room, checkIn, checkOut }: ReserveProps) => {
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [activeGuests, setActiveGuests] = useState(false);

  return (
    <div>
      <div
        className="hidden md:w-[260px] lg:w-[380px] h-min mt-14 rounded-xl border-2 border-gray-200 shadow-lg p-6 md:flex md:flex-col gap-4 bg-white"
        onClick={() => setActiveGuests(false)}
      >
        <div className="leading-7 flex gap-2 justify-between items-end">
          <div>
            <span className="text-2xl font-semibold">${room?.price}</span> night
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
            <div className="font-semibold">{room?.stars}</div>
          </div>
        </div>

        <div className="border border-gray-400 rounded-lg">
          <div className="flex text-sm border-b border-gray-400">
            <div className="flex-1 flex flex-col items-start gap-1 border-r border-gray-400 py-2 px-4">
              <div className="uppercase font-semibold">Check-in</div>
              <div className="text-base">{formatDate(checkIn)}</div>
            </div>
            <div className="flex-1 flex flex-col items-start gap-1 py-2 px-4">
              <div className="uppercase font-semibold">Check-out</div>
              <div className="text-base">
                {checkIn.getTime() === checkOut.getTime() ? (
                  <p className="text-gray-400">Add date</p>
                ) : (
                  formatDate(checkOut)
                )}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col items-start gap-1 py-2 px-4 relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveGuests(!activeGuests);
            }}
          >
            <div className="uppercase font-semibold">Guests</div>
            <div className="text-base">
              <span>{guests.adults + guests.children} guests</span>
              {guests.infants > 0 && <span>, {guests.infants} infants</span>}
              {guests.pets > 0 && <span>, {guests.pets} pets</span>}
            </div>
            <div className="absolute right-5 top-5">
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
                  d={
                    activeGuests
                      ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                      : "M19.5 8.25l-7.5 7.5-7.5-7.5"
                  }
                />
              </svg>
            </div>
            {activeGuests && (
              <div className="absolute top-16 right-0 min-w-[280px] border rounded-xl border-gray-200 drop-shadow-lg">
                <Guests guests={guests} setGuests={setGuests} />
              </div>
            )}
          </div>
        </div>

        {checkIn.getTime() !== checkOut.getTime() ? (
          <div>
            <button className="w-full p-4 bg-primary-color-1000 text-white rounded-lg text-lg">
              Reserve
            </button>

            <div className="text-base font-light w-full text-center py-2">
              You won't be charged yet
            </div>

            <div className="flex flex-col gap-4 py-4">
              <div className="w-full flex justify-between items-center">
                <div className="text-lg underline">
                  ${room?.price} x {countDays(checkIn, checkOut)} nights
                </div>
                <div className="text-lg">
                  ${room?.price * countDays(checkIn, checkOut)}
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-lg underline">Airbnb service fee</div>
                <div className="text-lg">$14</div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-400 pt-6">
              <div className="text-lg font-semibold">Total before taxes</div>
              <div className="text-lg font-semibold">
                ${room?.price * countDays(checkIn, checkOut) + 14}
              </div>
            </div>
          </div>
        ) : (
          <button className="w-full p-4 bg-primary-color-1000 text-white rounded-lg text-lg">
            Check availability
          </button>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden flex justify-between bg-white p-6 border-t border-gray-200 shadow-lg">
        {checkIn.getTime() !== checkOut.getTime() ? (
          <div className="flex justify-between w-full">
            <div>
              <span className="text-2xl font-semibold">${room?.price}</span>{" "}
              night
              <div className="flex pt-2">
                <div className="text-base">{formatDate(checkIn)}</div> -{" "}
                <div className="text-base">{formatDate(checkOut)}</div>
              </div>
            </div>
            <button className="w-auto px-4 py-2 bg-primary-color-1000 text-white rounded-lg text-lg">
              Reserve
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div>
              <span className="text-2xl font-semibold">${room?.price}</span>{" "}
              night
              <div className="flex gap-1 h-6 items-center pt-2">
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
            </div>
            <button className="w-auto px-4 py-2 bg-primary-color-1000 text-white rounded-lg text-lg">
              Check availability
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserve;
