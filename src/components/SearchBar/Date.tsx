import { useEffect, useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const Calendar = ({ checkIn, checkOut, setCheckIn, setCheckOut }: any) => {
  const [windowWidth, setWindowWidth] = useState<any>();
  const handleSelect = (ranges: any) => {
    setCheckIn(ranges.selection.startDate);
    setCheckOut(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: checkIn || new Date(),
    endDate: checkOut || new Date(),
    key: "selection",
  };

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      <div>
        <DateRangePicker
          color="#ff385c"
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={["#ff385c"]}
          onChange={handleSelect}
          months={windowWidth < 787 ? 1 : 2}
          showMonthAndYearPickers={false}
          showDateDisplay={false}
          direction="horizontal"
        />
      </div>
    </div>
  );
};

export default Calendar;
