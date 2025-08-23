import React, { useEffect } from "react";
import experienceVdo from "../assets/experienceVdo.mp4";
import Title from "../components/Title";
import Footer from "../components/Footer";
import Testmonial from "../components/Testmonial";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = ({ theme }) => {
  useEffect(() => {
    gsap.fromTo(
      ".experience",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-header",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <>
      <div className="bg-[var(--white-one)] experience-header">
        <section className="relative h-screen w-full text-[var(--black-one)] bg-[var(--white-one)] mt-[77px]">
          <video
            className="absolute inset-0 w-full h-[calc(100vh-70px)] object-cover rounded-[50px] p-3"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={experienceVdo} type="video/mp4" />
          </video>

          {/* for dark effect */}
          <div className="absolute inset-0 h-[calc(100vh-93px)] bg-black/40 ] m-3 rounded-[40px]"></div>

          <div className="relative z-10 flex flex-col justify-center items-center h-[calc(100vh-70px)] px-6 experience">
            <Title
              title="Experience More Than Just a Stay"
              subTitle="Discover comfort, culture, and unforgettable memories at QuickStay."
              style={{ color: "white" }}
            />
          </div>
        </section>

        <section className="p-20 px-6 md:px-20 text-center flex justify-center items-center flex-col relative bg-[var(--white-one)] bg-[url('/src/assets/map.png')] bg-no-repeat bg-center bg-cover">
          <div
            className={`absolute inset-0 ${
              theme === "dark" ? "block" : "hidden"
            } bg-black/80`}
          ></div>
          {/* Top fade */}

          <div className="absolute top-0 left-0 w-full h-[550px] bg-gradient-to-b from-[var(--white-one)] to-transparent"></div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-[550px] bg-gradient-to-t from-[var(--white-one)] to-transparent"></div>

          <Title title="Why Stay With Us?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--white-one)] mt-10 w-[60%] z-20">
            <div className="p-6 rounded-2xl shadow hover:shadow-xl bg-blue-500/10 transition border border-gray-400">
              <img
                src="https://img.icons8.com/ios-filled/50/4a90e2/bed.png"
                alt="Comfortable Rooms"
                className="mx-auto mb-4 h-[40px] w-[40px]"
              />
              <h3 className="text-xl font-semibold text-[var(--black-one)]">
                Comfortable Rooms
              </h3>
              <p className="mt-2 text-gray-500">
                Relax in spacious, well-designed rooms with modern amenities.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow hover:shadow-xl bg-blue-500/10 transition border border-gray-400">
              <img
                src="https://img.icons8.com/ios-filled/50/4a90e2/restaurant.png"
                alt="Local Flavors"
                className="mx-auto mb-4 h-[40px] w-[40px]"
              />
              <h3 className="text-xl font-semibold text-[var(--black-one)]">
                Local Flavors
              </h3>
              <p className="mt-2 text-gray-500">
                Enjoy authentic cuisine prepared by our in-house chefs.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow hover:shadow-xl bg-blue-500/10 transition border border-gray-400">
              <img
                src="https://img.icons8.com/ios-filled/50/4a90e2/marker.png"
                alt="Perfect Location"
                className="mx-auto mb-4 h-[40px] w-[40px]"
              />
              <h3 className="text-xl font-semibold text-[var(--black-one)]">
                Perfect Location
              </h3>
              <p className="mt-2 text-gray-500">
                Stay close to attractions, transport, and city highlights.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow hover:shadow-xl bg-blue-500/10 transition border border-gray-400">
              <img
                src="https://img.icons8.com/ios-filled/50/4a90e2/customer-support.png"
                alt="Personalized Service"
                className="mx-auto mb-4 h-[40px] w-[40px]"
              />
              <h3 className="text-xl font-semibold text-[var(--black-one)]">
                Personalized Service
              </h3>
              <p className="mt-2 text-gray-500">
                Hospitality tailored to make you feel truly at home.
              </p>
            </div>
          </div>
        </section>

        <Testmonial />

        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Experience;
