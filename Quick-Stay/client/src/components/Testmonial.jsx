import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testmonial = () => {
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-[var(--white-one)] pt-14 pb-20">
        <Title
          title="What Our Guests Say"
          subTitle="Discover why discrening travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-7 pb-28 bg-[var(--white-one)] px-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-[var(--white-one)] p-6 rounded-2xl shadow-md max-w-sm border border-gray-500 hover:bg-[#80808026] hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-[var(--black-one)] text-xl">
                  {testimonial.name}
                </p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <StarRating />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testmonial;
