import Family from "@/components/Family";
import Hero from "@/components/Hero";
import Marriage from "@/components/Marriage";
import Sagai from "@/components/Sagai";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <img src="/images/grass.png" className='fixed bottom-[59vh]  left-0 h-[60vh]' alt="" />
      <img src="/images/grass.png" className='fixed bottom-0  left-0 h-[60vh]' alt="" />
      <img src="/images/grass.png" className='fixed bottom-[59vh] right-0 h-[60vh] transform rotate-180' alt="" />
      <img src="/images/grass.png" className='fixed bottom-0 right-0 h-[60vh] transform rotate-180' alt="" />
      <div className="relative mx-10  ">
        <Hero />
        <Sagai />
        <Marriage />
        <Family />
      </div>
    </div>
  );
}
