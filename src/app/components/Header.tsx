"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { logo } from "../../../public";

export default function Header() {
  const [visible, setVisible] = useState(true);

  return (
    <header
      className={`z-50 bg-white flex justify-between py-5 items-center px-[10%] ${
        visible
          ? ""
          : "fixed top-0 w-full shadow-lg opacity-100 transition-opacity duration-300"
      }`}
    >
      <Link href="/" className="logo-container">
        <Image src={logo} alt="logo safeout" />
      </Link>
      <Link href="/accueil/#contact" className="demo-container">
        <button className="bg-gradient-to-l from-btn-purple-light to-btn-purple px-5 py-2 font-bold rounded-[4px]">
          Book your demo
        </button>
      </Link>
    </header>
  );
}
