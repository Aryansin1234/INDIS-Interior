import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import ProjectRail from "@/components/sections/ProjectRail";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";
import Transformation from "@/components/sections/Transformation";
import MaterialAtelier from "@/components/sections/MaterialAtelier";
import WhyChoose from "@/components/sections/WhyChoose";
import ProcessLine from "@/components/sections/ProcessLine";
import Studio from "@/components/sections/Studio";
import JournalPreview from "@/components/sections/JournalPreview";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata: Metadata = {
  title: "Interior Designers in Hyderabad",
  description:
    "Explore INDIS Interiors, a Hyderabad-based studio creating thoughtful full-home interiors, modular kitchens, wardrobes, lighting, and custom design solutions."
};

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ProjectRail />
      <CollectionsShowcase />
      <Transformation />
      <MaterialAtelier />
      <WhyChoose />
      <ProcessLine />
      <Studio />
      <JournalPreview />
      <ConsultationCTA />
    </>
  );
}
