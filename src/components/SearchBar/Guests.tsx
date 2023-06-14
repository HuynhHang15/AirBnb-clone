import React, { useState, useEffect } from "react";
import QuantityPicker from "utils/QuantityPicker";

const Guests = (props: any) => {
  const { guests, setGuests } = props;
  
  
  return (
    <div className="flex flex-col bg-white py-3 px-4 rounded-xl max-w-96 w-full">
      <div className="flex justify-between items-center text-lg w-full mx-auto py-8 border-b border-gray-200">
        <div>
          <p className="font-semibold">Adults</p>
          <p className="text-gray-400 text-base">Ages 13 or above</p>
        </div>
        <QuantityPicker
          min={1}
          max={16}
          quantity={guests.adults}
          setQuantity={(quantity: number) =>
            setGuests({ ...guests, adults: quantity })
          }
        />
      </div>
      <div className="flex justify-between items-center text-lg w-full mx-auto py-4 border-b border-gray-200">
        <div>
          <p className="font-semibold">Children</p>
          <p className="text-gray-400 text-base">Ages 2-12</p>
        </div>
        <QuantityPicker
          min={0}
          max={16}
          quantity={guests.children}
          setQuantity={(quantity: number) =>
            setGuests({ ...guests, children: quantity })
          }
        />
      </div>
      <div className="flex justify-between items-center text-lg w-full mx-auto py-4 border-b border-gray-200">
        <div>
          <p className="font-semibold">Infants</p>
          <p className="text-gray-400 text-base">Under 2</p>
        </div>
        <QuantityPicker
          min={0}
          max={16}
          quantity={guests.infants}
          setQuantity={(quantity: number) =>
            setGuests({ ...guests, infants: quantity })
          }
        />
      </div>
      <div className="flex justify-between items-center text-lg w-full mx-auto py-4">
        <div>
          <p className="font-semibold">Pets</p>
          <p className="text-gray-400 text-base decoration-inherit">
            Bringing a service animal?
          </p>
        </div>
        <QuantityPicker
          min={0}
          max={16}
          quantity={guests.pets}
          setQuantity={(quantity: number) =>
            setGuests({ ...guests, pets: quantity })
          }
        />
      </div>
    </div>
  );
};

export default Guests;
