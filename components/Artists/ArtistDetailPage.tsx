"use client"

import { getArtist } from "@/services/artists"
import { Artist } from "@/types/artists"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { LinkButton } from "../common/LinkButton"
import FallbackImage from "../common/FallbackImage"
import { MobileMajorFilter } from "./MobileMajorFilter"

interface ArtistDetailPageProps {
  artist: Artist
}

export const ArtistDetailPage = ({ artist }: ArtistDetailPageProps) => {
  const { data: artistDetail } = useQuery({
    queryKey: ["artists", artist.id],
    queryFn: () => getArtist(artist.id),
    initialData: artist,
  })

  return (
    <div className="mx-auto max-w-screen-md px-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="hidden w-full gap-2 md:flex md:basis-1/3">
          <h2 className="text-xl font-bold text-coolgray">
            {artistDetail.major}
          </h2>
          <h2 className="text-xl font-bold">{artistDetail.name}</h2>
        </div>
        <MobileMajorFilter detail />
        <LinkButton text="List" href="/" />
      </div>
      <article className="flex flex-col gap-8 md:flex-row">
        <div>
          <div className="relative mx-auto aspect-[26/17] w-[266px] md:mx-0">
            <FallbackImage
              src={artistDetail.imageUrl}
              alt={artistDetail.name}
              fill
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            <h2 className="text-sm font-bold text-coolgray">
              {artistDetail.major}
            </h2>
            <h2 className="text-sm font-bold">{artistDetail.name}</h2>
          </div>
        </div>

        <div className="flex justify-center md:justify-start">
          <div
            className="text-xs font-bold"
            dangerouslySetInnerHTML={{ __html: artistDetail.contents }}
          />
        </div>
      </article>
    </div>
  )
}
