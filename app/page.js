// import dynamic from 'next/dynamic';
import Address from "@/components/Address";
import FamilyDetailsList from "@/components/Family";
import Footer from "@/components/Footer";
// const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

import Hero from "@/components/Hero";
import Marriage from "@/components/Marriage";
import PhotoSlider from "@/components/PhotoSlider";
import RoyalLetter from "@/components/RoyalLetter";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="relative mx-10">
        {/* <Sagai /> */}
        <RoyalLetter />
        {/* <Marriage /> */}
        <FamilyDetailsList />
        <PhotoSlider />
        {/* <Address /> */}
        <Footer />
      </div>
    </div>
  );
}
