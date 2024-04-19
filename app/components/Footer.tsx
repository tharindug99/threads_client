import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-10">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            {/* <Logo className="text-3xl" /> */}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div className="">
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Resources
              </h2>
              <ul className=" text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/pricing" className="hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.scholalify.com/contact"
                    target="_blank"
                    className="hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="mb-6 text-sm font-semibold  uppercase">
                Contact us
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://www.facebook.com/scholalify?mibextid=LQQJ4d"
                    target="_blank"
                    className="hover:underline "
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/scholalify/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase">Legal</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sm:flex mt-10 sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center text-gray-500">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:underline">
              Scholalify
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <Link
              href="https://www.instagram.com/scholalify/"
              className="text-gray-500 hover:text-gray-900 dark:hover"
              target="_blank"
            >
              <FaInstagram className="text-2xl hover:text-gray-700" />
              <span className="sr-only">Facebook page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
