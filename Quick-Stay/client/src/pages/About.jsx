import React from "react";
import Title from "../components/Title";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <div className="bg-[var(--white-one)] text-[var(--black-one)] h-screen w-full">
        {/* Content Section */}
        <div className="mx-auto py-52 px-6 md:px-20 flex justify-center items-center flex-col">
          <Title
            title="Welcome to QuickStay"
            subTitle="At QuickStay, we believe that a stay is more than just a place to
            sleep. It’s about creating memories, feeling at home, and enjoying
            unique experiences. Our hotel combines modern comfort with warm
            hospitality, ensuring every guest leaves with a smile."
          />

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center mt-9 w-[70%]">
            <div className="p-6 rounded-2xl shadow hover:shadow-lg bg-blue-500/10 transition border border-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Our Mission
              </h3>
              <p className="text-[var(--black-one)]">
                To provide exceptional hospitality with personalized experiences
                for every guest.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow hover:shadow-lg bg-blue-500/10 transition border border-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Our Vision
              </h3>
              <p className="text-[var(--black-one)]">
                To be the go-to destination for travelers seeking comfort,
                convenience, and care.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow hover:shadow-lg bg-blue-500/10 transition border border-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Our Values
              </h3>
              <p className="text-[var(--black-one)]">
                Integrity, customer focus, and a commitment to making every stay
                unforgettable.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
