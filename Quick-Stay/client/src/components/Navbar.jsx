import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = ({ theme, switchTheme }) => {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const loaction = useLocation();

  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaction.pathname]);

  return (
    <nav
      data-theme={theme}
      className={`fixed top-0 left-0 bg-[var(--white-one)] w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-[var(--white-one)] shadow-md text-[var(--black-one)] backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 logo-img ${isScrolled && "opacity-80"}`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-[var(--black-one)]" : "text-[var(--black-one)]"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-[var(--black-one)]" : "bg-[var(--black-one)]"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}

        {user && (
          <button
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
            className={`border px-4 py-1 text-sm font-light rounded-full hover:bg-[var(--black-one)] hover:text-[var(--white-one)] transition-all duration-200 cursor-pointer ${
              isScrolled ? "text-[var(--black-one)]" : "text-[var(--black-one)]"
            } transition-all`}
          >
            {isOwner ? "DashBoard" : "List Your Hotel"}
          </button>
        )}

        {/* toggle btn */}
        <div className="cursor-pointer mt-1">
          <ThemeToggle theme={theme} switchTheme={switchTheme} />
        </div>
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`cursor-pointer h-7 transition-all duration-500 search-img ${isScrolled} `}
        />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 border border-gray-50 hover:text-[var(--black-one)] hover:bg-[var(--white-one)] transition-all duration-200 ${
              isScrolled
                ? "text-[var(--white-one)] bg-[var(--black-one)]"
                : "bg-[var(--black-one)] text-[var(--white-one)]"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt=""
          className={`menu-img ${isScrolled} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[var(--white-one)] text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-[var(--black-one)] transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={assets.closeIcon}
            alt="close-menu"
            className="h-[20px] m-1"
          />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {user && (
          <button
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all hover:text-[var(--black-one)] hover:bg-[var(--white-one)] duration-200"
          >
            {isOwner ? "DashBoard" : "List Your Hotel"}
          </button>
        )}

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-[var(--black-one)] text-[var(--white-one)] px-8 py-2.5 rounded-full border border-gray-50 hover:text-[var(--black-one)] hover:bg-[var(--white-one)] transition-all duration-200 "
          >
            Login
          </button>
        )}

        <div className="cursor-pointer mt-1">
          <ThemeToggle theme={theme} switchTheme={switchTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
