import { placesArray } from "@/data/placeArray";
import { useState } from "react";

type props = {
  place: string
  setPlace: Function;
}

const Place = ({place, setPlace}: props) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(place);

  const inputValueHandler = (e: any) => {
    setInputValue(e.target.value);
  };

  const handlePlace = (value: string) => {
    setSelected(value)
    setPlace(value);
  }
  

  return (
    <div className="bg-white px-8 py-6 rounded-3xl shadow-xl">
      {/* <div className="border border-gray-300 py-2 px-4 my-4 w-96 rounded-xl mx-auto">
        <input
          className="w-full h-full"
          type="text"
          placeholder="Search for your destination"
          onChange={inputValueHandler}
          value={inputValue}
        />
      </div> */}
      {inputValue !=="" && (
        <div className="w-96 h-96 overflow-y-auto text-center mx-auto">
          <div className="flex flex-col mt-4">
            {placesArray
              .filter((item) => {
                if (inputValue === "") {
                  return "";
                } else if (
                  item.place.toLocaleLowerCase().includes(inputValue)
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <div key={item.id} className={`flex gap-4 items-center hover:bg-gray-100 p-2 rounded-xl cursor-pointer ${selected===item.place && "bg-gray-100"}`} onClick={() => handlePlace(item.place)}>
                      <div className="p-4 bg-gray-200 rounded-xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
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
                      <p
                        // onMouseOver={(e) =>
                        //   setLinkClickedValue(e.target.innerText)
                        // }
                        className="text-lg capitalize font-medium"
                      >
                        {item.place}
                      </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {inputValue==="" && (
        <div className="grid grid-cols-3 grid-rows-2 gap-6 pt-4 w-fit m-auto">
          <div onClick={() => handlePlace("usa")}>
            <img
              className={`w-32 h-32 rounded-lg border border-gray-300 hover:border-gray-800 cursor-pointer ${selected==="usa" && "border-gray-800"}`}
              src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg"
            />
            <p className="font-light pt-2">I'm flexible</p>
          </div>
          <div onClick={() => handlePlace("Europe")}>
            <img
              className={`w-32 h-32 rounded-lg border border-gray-300 hover:border-gray-800 cursor-pointer ${selected==="Europe" && "border-gray-800"}`}
              src="https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320"
            />
            <p className="font-light pt-2">Europe</p>
          </div>
          <div onClick={() => handlePlace("United Kingdom")}>
            <img
              className={`w-32 h-32 rounded-lg border border-gray-300 hover:border-gray-800 cursor-pointer ${selected==="United Kingdom" && "border-gray-800"}`}
              src="https://a0.muscache.com/im/pictures/dbb2b5ef-2efe-4099-81ac-c7b957f384ed.jpg?im_w=320"
            />
            <p className="font-light pt-2">United Kingdom</p>
          </div>
          <div onClick={() => handlePlace("SouthEast Asia")}>
            <img
              className={`w-32 h-32 rounded-lg border border-gray-300 hover:border-gray-800 cursor-pointer ${selected==="SouthEast Asia" && "border-gray-800"}`}
              src="https://a0.muscache.com/im/pictures/d77de9f5-5318-4571-88c7-e97d2355d20a.jpg?im_w=320"
            />
            <p className="font-light pt-2">SouthEast Asia</p>
          </div>
          <div onClick={() => handlePlace("Indonesia")}>
            <img
              className={`w-32 h-32 rounded-lg border border-gray-300 hover:border-gray-800 cursor-pointer ${selected==="Indonesia" && "border-gray-800"}`}
              src="https://a0.muscache.com/im/pictures/ebc5a343-8b76-4ae5-8700-eb5e9cec9243.jpg?im_w=320"
            />
            <p className="font-light pt-2">Indonesia</p>
          </div>
          <div onClick={() => handlePlace("MiddleEast")}>
            <img
              className={`w-32 h-32 rounded-lg border border-gray-300 hover:border-gray-800 cursor-pointer ${selected==="MiddleEast" && "border-gray-800"}`}
              src="https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320"
            />
            <p className="font-light pt-2">MiddleEast</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Place;
