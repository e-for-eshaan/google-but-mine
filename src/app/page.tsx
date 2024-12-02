import Footer from "@/components/Footer/Footer";
import GoogleSearchInput from "@/components/Input/Input";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useRef, useState } from "react";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="min-h-screen flex justify-between items-center flex-col gap-2">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <Image src={'/assets/googlelogo_color_big.png'} width={272} height={100} alt="logo" className="brightness-[1000]" />
        <GoogleSearchInput />
      </div>
      <Footer />
    </div>
  );
}


