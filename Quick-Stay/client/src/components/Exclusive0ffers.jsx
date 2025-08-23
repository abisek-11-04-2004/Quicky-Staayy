import React, { useEffect } from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Exclusive0ffers = () => {
  useEffect(() => {
  gsap.fromTo(
    ".card",
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2, // animate one by one
      scrollTrigger: {
        trigger: ".exclusive-offer-section", // use parent container
        start: "top 85%",
      },
    }
  );
}, []);


  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-32 h-full bg-[var(--white-one)] exclusive-offer-section">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <Title
            align="left"
            title="Exclusive Offers"
            subTitle="Take advantage of our limites-time offers and special packages to enhance your stay and create unforgettable memories."
          />
          <button className="group border border-gray-300 flex items-center gap-2 font-medium cursor-pointer max-md:mt-12 bg-[var(--black-one)] text-[var(--white-one)] py-2 px-5 rounded-3xl hover:text-[var(--black-one)] hover:bg-[var(--white-one)] transition-all duration-200">
            View All Offers
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {exclusiveOffers.map((item) => (
            <div
              key={item._id}
              className="group relative shadow-xl flex flex-col items-start card justify-between gap-1 pt-12 md:pt-16 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
                {item.priceOff}% OFF
              </p>
              <div>
                <p className="text-2xl font-medium">{item.title}</p>
                <p>{item.description}</p>
                <p className="text-xs text-white/70 mt-3">
                  Expires {item.expiryDate}
                </p>
              </div>
              <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                View Offers
                <img
                  className="invert group-hover:translate-x-1 transition-all"
                  src={assets.arrowIcon}
                  alt="arrow-icon"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exclusive0ffers;
