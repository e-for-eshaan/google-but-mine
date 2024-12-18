import Footer from "@/components/Footer/Footer";
import GoogleSearchInput from "@/components/Input/Input";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { Mic } from '@/components/Input/Input';
import useVoiceOverStore from "@/stores/exampleStore";
import VoiceOver from "@/components/VoiceOver";

export default async function Home() {



  return (
    <div className="relative min-h-screen flex justify-between items-center flex-col gap-2">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <Image src={'/assets/googlelogo_color_big.png'} width={272} height={100} alt="logo" className="brightness-[1000]" />
        <GoogleSearchInput />
      </div>
      <Footer />
      <VoiceOver />
    </div>
  );
}
