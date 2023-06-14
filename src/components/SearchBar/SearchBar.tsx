import { useState } from "react";
import HeaderLayoutSearch from "../Header/HeaderLayoutSearch";
import HeaderLayoutSearchDetail from "../Header/HeaderLayoutSearchDetail";

type SearchBarProps = {
  setOverlay: any;
  selection: string;
  setSelection: any;
  headerSearch: boolean;
  setHeaderSearch: any;
};

const SearchBar = ({
  setOverlay,
  selection,
  setSelection,
  headerSearch,
  setHeaderSearch,
}: SearchBarProps) => {
  const [place, setPlace] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  return (
    <div className="absolute z-30 hidden lg:block w-full">
      <HeaderLayoutSearch
        setOverlay={setOverlay}
        headerSearch={headerSearch}
        setHeaderSearch={setHeaderSearch}
        setSelection={setSelection}
        place={place}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
      />
      <HeaderLayoutSearchDetail
        setOverlay={setOverlay}
        headerSearch={headerSearch}
        setHeaderSearch={setHeaderSearch}
        selection={selection}
        setSelection={setSelection}
        place={place}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        setPlace={setPlace}
        setCheckIn={setCheckIn}
        setCheckOut={setCheckOut}
        setGuests={setGuests}
      />
    </div>
  );
};

export default SearchBar;
