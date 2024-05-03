import React from 'react';
import Link from "next/link";
import { FaHome,FaCompass,FaUserCircle,FaBookmark } from "react-icons/fa";
// import HomeIcon from '../public/assets/icons/HomeIcon.png';

export default function LeftSideBar() {

    const NavBarItems = [
        { label: "Home", icon: FaHome, href: "home" },
        { label: "Explore", icon: FaCompass, href: "explore" },
        { label: "Profile", icon: FaUserCircle, href: "profile" },
        { label: "Bookmarks", icon: FaBookmark, href: "bookmarks" }
    ];

    return (
        <div className="container w-24 lg:min-w-[300px] md:w-[250px] bg-white text-black border-r ">
            <div className="sidebar">
                <ul className="ml-0 sm:ml-6 ">
                    {NavBarItems.map((item, index) => (
                       <li key={index} className="flex items-center border-b hover:text-primary">
                       <Link href={item.href}>
                           <div className="flex items-center gap-x-5 ml-6 sm:ml-0 mr-15 bg-white p-4">
                               <div className="material-icons mr-2 md:flex ">
                                   <item.icon />
                               </div>
                               <div className="hidden md:flex ">{item.label}</div>
                           </div>
                       </Link>
                   </li>
                    ))}
                </ul>   
            </div>
        </div>
    );
}
