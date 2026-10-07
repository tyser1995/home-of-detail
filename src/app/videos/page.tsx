import type { Metadata } from "next";
import { FinalCta, PageHero } from "@/components/sections";
import { VideoLibrary } from "@/components/VideoLibrary";
import { requireEnabled } from "@/lib/menu";
import { videos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch ceramic coating, PPF and detailing work from the Home of Detail studio.",
};

export default function VideosPage() {
  requireEnabled("videos");
  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="See the work in motion"
        intro="Process videos, water-beading tests and full transformations, straight from our studio floor."
      />
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <VideoLibrary videos={videos} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
