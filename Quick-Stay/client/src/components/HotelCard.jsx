import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <>
      <Link
        to={"/rooms/" + room._id}
        onClick={() => scrollTo(0, 0)}
        key={room._id}
        className="relative max-w-72 w-full rounded-xl overflow-hidden bg-[var(--white-one)] text-gray-500/90 shadow-lg hover:scale-105 transition-all duration-300"
      >
        <img src={room.images[0]} alt="" />
        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-[var(--black-one)] text-[var(--white-one)] font-medium rounded-full ">
            Best Seller
          </p>
        )}
        
        <div className="p-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-medium text-[var(--black-one)]">
              {room.hotel.name}
            </p>
            <div className="flex items-center gap-1">
              <img src={assets.starIconFilled} alt="star-icon" /> 4.5
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <img src={assets.locationIcon} alt="location-icon" />
            <span>{room.hotel.address}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p>
              <span className="text-xl text-[var(--black-one)]">
                ${room.pricePerNight}
              </span>
              /night
            </p>
            <button className="text-[var(--black-one)] bg-[var(--white-one)] px-4 py-2 text-sm font-medium border border-gray-300 rounded-3xl hover:bg-[var(--black-one)] hover:text-[var(--white-one)] transition-all cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HotelCard;