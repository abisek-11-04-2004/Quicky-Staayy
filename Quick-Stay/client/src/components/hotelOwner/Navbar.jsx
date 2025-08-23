import React from "react";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle"; // Adjust the path if needed

const Navbar = ({ switchTheme }) => {
  return (
    <div
      className="flex items-center justify-between px-4 md:px-8
      border-b border-gray-200/60 py-3 text-[var(--black-one)] bg-[var(--white-one)] transition-all
      duration-300"
    >
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-9 invert opacity-80 logo-img"
        />
      </Link>

      <div className="flex justify-center items-center">
        {/* Use your custom ThemeToggle */}
        <div className="cursor-pointer mr-5 mt-1">
          <ThemeToggle switchTheme={switchTheme} />
        </div>

        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
