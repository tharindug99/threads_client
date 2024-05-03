import "../globals.css";
import type { Metadata } from "next";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import LeftSideBar from "@/components/LeftSideBar";
import React from "react";

export const metadata: Metadata = {
  title: "Scholalify: Master English Speaking with Daily Practice",
  description:
    "Unlock fluent English speaking with Scholalify! Dive into daily practice sessions, personalized feedback, and innovative methods designed to boost your confidence and proficiency. Start your journey to fluency today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <Navigation />
      <div style={{ display: "flex" }}>
        <LeftSideBar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
