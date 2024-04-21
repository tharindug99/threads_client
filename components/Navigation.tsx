"use client";
import React from "react";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import Dropdown from "./Dropdown";
import { HiMenu, HiOutlineViewGrid } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
export default function Navigation() {
  const {
    user: { isLoggedIn },
  } = useAuth();
  return (
    <div className="flex justify-center ">
      <nav className="px-10 p-5 flex  justify-between  z-10 w-full items-center max-w-screen-xl">
        <Logo className="text-3xl" />
        {isLoggedIn ? (
          <Dropdown
            openBtn={
              <div className="bg-gray-50 p-1 rounded-lg hover:bg-gray-100">
                <HiOutlineViewGrid className="text-2xl text-gray-500" />
              </div>
            }
          />
        ) : (
          <LinkButton
            href="/?modal=auth"
            variant="primary"
            className="hidden sm:inline px-10"
          >
            Log In
          </LinkButton>
        )}
      </nav>
    </div>
  );
}

export const AuthNavigation = () => {
  return (
    <nav className="sticky bg-transparent top-0 z-10 z-50  backdrop-filter bg-opacity-30 backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <Dropdown
            openBtn={
              <div className="bg-gray-50 p-1 rounded-lg hover:bg-gray-100">
                <HiOutlineViewGrid className="text-2xl text-gray-500" />
              </div>
            }
          />
        </div>
      </div>
    </nav>
  );
};
