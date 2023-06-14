import Map, { FullscreenControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getCenter from "geolib/es/getCenter";
import { useEffect, useState } from "react";
import ApartmentCard from "@/components/Apartment/ApartmentCard";
import { IApartmentCardProps } from "@/types/types";

const MapComp = ({ apartments, top }: any) => {
  const [viewFullMap, setViewFullMap] = useState(false);
  const [mapWidth, setMapWidth] = useState("500px");
  const [selectedLocation, setSelectedLocation] = useState<
    IApartmentCardProps | undefined
  >(undefined);

  const coordinates =
    apartments &&
    apartments.map((item: any) => ({
      longitude: item.longitude,
      latitude: item.latitude,
    }));

  const center = getCenter(coordinates);

  const handleViewFullMap = () => {
    setViewFullMap(!viewFullMap);
  };

  useEffect(() => {
    viewFullMap ? setMapWidth("100vw") : setMapWidth("500px");
  }, [viewFullMap]);

  return (
    <div className={`w-[500px] sticky top-[${top}] right-0`}
    >
      {center && (
        <Map
          initialViewState={{
            latitude: center.latitude,
            longitude: center.longitude,
            zoom: viewFullMap ? 15 : 10,
          }}
          style={{
            width: mapWidth,
            height: "calc(100vh - 100px)",
            right: 0,
            top: 0,
          }}
          mapStyle="mapbox://styles/huynhhang/clfytb7am000w01qfukq6yfk7"
          mapboxAccessToken="pk.eyJ1IjoiaHV5bmhoYW5nIiwiYSI6ImNsZnlzejNhODBiOWszZG1yM2Jhd3liZzYifQ.tF1p2JotTVd690Ry6PuCiA"
        >
          <FullscreenControl/>
          {apartments?.map((item: any) => (
            <div key={item.id}>
              <Marker
                longitude={item.longitude}
                latitude={item.latitude}
                color="red"
              >
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLocation(item);
                  }}
                  className="bg-primary-color-1000 text-white rounded-xl p-1 drop-shadow-xl font-semibold cursor-pointer"
                >
                  ${item.price}
                </p>
              </Marker>
              {selectedLocation?.longitude === item.longitude ? (
                <Popup
                  onClose={() => setSelectedLocation(item)}
                  closeOnClick={true}
                  latitude={item.latitude}
                  longitude={item.longitude}
                >
                  <ApartmentCard
                    key={item.id}
                    id={item.id}
                    homeMainPic={item.homeMainPic}
                    name={item.name}
                    price={item.price}
                    type={item.type}
                    stars={item.stars}
                    carouselPic1={item.carouselPic1}
                    carouselPic2={item.carouselPic2}
                    carouselPic3={item.carouselPic3}
                    carouselPic4={item.carouselPic4}
                    carouselPic5={item.carouselPic5}
                    location={""}
                    pets={false}
                    latitude=""
                    longitude=""
                  />
                </Popup>
              ) : (
                false
              )}
            </div>
          ))}
        </Map>
      )}

      {/* <div className="absolute top-28 left-3 z-10">
        {viewFullMap ? (
          <button
            className="w-48 h-12 bg-white rounded-xl drop-shadow-xl flex justify-center items-center"
            // onClick={handleViewFullMap}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <p className="font-semibold">Hiển thị danh sách</p>
          </button>
        ) : (
          <button
            className="w-12 h-12 bg-white rounded-xl drop-shadow-xl flex justify-center items-center"
            // onClick={handleViewFullMap}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
      </div> */}
    </div>
  );
};

export default MapComp;
