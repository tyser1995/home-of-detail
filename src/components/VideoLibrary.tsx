"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock3, Play } from "lucide-react";
import { services, type VideoItem } from "@/lib/site";
import { CarArt } from "./CarArt";

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [playing, setPlaying] = useState(false);
  const service = services.find((s) => s.slug === video.service);

  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-panel">
      <div className="relative aspect-video bg-ink-2">
        {video.youtubeId && playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : video.youtubeId ? (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play video: ${video.title}`}>
            <Image
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-on-accent shadow-[0_0_40px_color-mix(in_srgb,var(--color-accent)_60%,transparent)] transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
          </button>
        ) : (
          <div className="absolute inset-0">
            <CarArt id={`v-${index}`} paint={video.paint} className="h-full w-full object-cover opacity-60" />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#fff]/30 bg-black/40 text-[#fff]/70 backdrop-blur">
              <Play className="ml-0.5 h-6 w-6" aria-hidden="true" />
            </span>
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-[#fff]/80">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> Coming soon
            </span>
          </div>
        )}
      </div>
      <figcaption className="p-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">{service?.name}</span>
        <span className="mt-2 block font-display text-lg font-semibold text-white">{video.title}</span>
      </figcaption>
    </figure>
  );
}

export function VideoLibrary({ videos }: { videos: VideoItem[] }) {
  const [filter, setFilter] = useState("");
  const tabs = [{ slug: "", label: "All" }, ...services.filter((s) => videos.some((v) => v.service === s.slug)).map((s) => ({ slug: s.slug, label: s.short }))];
  const shown = filter ? videos.filter((v) => v.service === filter) : videos;

  return (
    <>
      <div role="group" aria-label="Filter videos by service" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {tabs.map((t) => {
            const active = filter === t.slug;
            const count = t.slug ? videos.filter((v) => v.service === t.slug).length : videos.length;
            return (
              <button
                key={t.slug || "all"}
                type="button"
                onClick={() => setFilter(t.slug)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "border-accent bg-accent text-on-accent" : "border-white/15 text-white/80 hover:border-accent hover:text-accent"
                }`}
              >
                {t.label}
                <span className={`text-xs ${active ? "text-on-accent/70" : "text-mist"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v) => (
          <VideoCard key={v.title} video={v} index={videos.indexOf(v)} />
        ))}
      </div>
    </>
  );
}
