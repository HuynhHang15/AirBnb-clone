import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode, useState } from "react";

type LayoutProps = {
  children?: ReactNode;
};
const PageLayout = (props: LayoutProps) => {
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);

  return (
    <div className="max-w-screen min-h-screen relative">
      <Header
        setOverlay={setOverlay}
        selection={selection}
        setSelection={setSelection}
        headerSearch={headerSearch}
        setHeaderSearch={setHeaderSearch}
      />
      <main className="pb-10 relative w-full">
        {overlay && (
          <div
            className="fixed top-0 left-0 w-full h-full z-30 bg-black bg-opacity-40"
            onClick={() => {
              setSelection(null);
              setOverlay(false);
              setHeaderSearch(false);
            }}
          ></div>
        )}
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
