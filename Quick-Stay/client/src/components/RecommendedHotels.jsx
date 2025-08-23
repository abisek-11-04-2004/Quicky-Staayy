import React, { useEffect, useState } from "react";
import Title from "./Title";
import HotelCard from "./HotelCard";
import { useAppContext } from "../context/AppContext";

const RecommendedHotels = () => {
  const { rooms = [], searchCities = [] } = useAppContext(); // default to empty arrays
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    if (!rooms.length || !searchCities.length) {
      setRecommended([]); // no rooms or no search cities => empty recommended
      return;
    }

    const filteredHotels = rooms.filter((room) =>
      searchCities.includes(room.hotel.city)
    );
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchCities]);

  return (
    <div className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 bg-[var(--white-one)]">
      <Title
        title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      {recommended.length === 0 ? (
        <p className="text-center text-[var(--black-one)] mt-10 z-10">
          No recommended hotels found.
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-7 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedHotels;
