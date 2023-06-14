import Profile from "@/components/Profile";
import Link from "next/link";
import Logo from "@/assets/_svgs/Logo";
import LogoIcon from "@/assets/_svgs/LogoIcon";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";

const Header = ({
  setOverlay,
  selection,
  setSelection,
  headerSearch,
  setHeaderSearch,
}: any) => {

  let hasRendered = false;
  useEffect(() => {
    if (headerSearch) {
      hasRendered = true;
    }
  }, [headerSearch]);

  return (
    <header className="block sticky top-0 left-0 w-full z-40 bg-white px-8 md:px-16 border-b border-gray-200">
      <div className="w-full relative mx-auto py-5 flex justify-between items-center">
        <Link href="/" className="lg:w-80">
          <div className="hidden xl:block">
            <Logo />
          </div>
          <div className="block xl:hidden">
            <LogoIcon />
          </div>
        </Link>

        <div
          className={`${
            headerSearch ? "semi_header_active" : "semi_header_inactive"
          }`}
        >
          <div className="flex h-full gap-4 mx-auto">
            <button className="p-2 border-b-2 border-black">Stays</button>
            <button className="p-2">Experiences</button>
            <button className="p-2">Online Experiences</button>
          </div>
        </div>

        <SearchBar setOverlay={setOverlay} selection={selection} setSelection={setSelection} headerSearch={headerSearch} setHeaderSearch={setHeaderSearch}/>

        <Profile />
      </div>
      <div
        onClick={() => {
          setSelection(null);
        }}
        className={`bg-white w-full absolute top-full left-0 z-20 white-box ${
          headerSearch ? "animation-on" : hasRendered && "animation-off"
        }`}
      ></div>
    </header>
  );
};

export default Header;
