import { Artist } from "@/types/artists"
import React from "react"
import FallbackImage from "../common/FallbackImage"
import Link from "next/link"

interface ArtistCardProps {
  artist: Artist
  ref: (node?: Element | null | undefined) => void
  isLastPage: boolean
}

export const ArtistCard = ({ artist, ref, isLastPage }: ArtistCardProps) => {
  return (
    <Link href={`/artists/${artist.id}`} prefetch={false}>
      <div ref={ref} className="flex flex-col">
        <div className="relative aspect-[4/3] md:aspect-[13/9]">
          <FallbackImage
            src={artist.imageUrl}
            alt={artist.name}
            fill
            sizes="84px"
            className="rounded-lg"
          />
        </div>
        <div className="mt-3 flex flex-col items-center justify-center md:flex-row md:gap-2">
          <h2 className="text-[10px] font-bold text-coolgray md:text-base">
            {artist.major}
          </h2>
          <h4 className="text-xs font-bold md:text-base">{artist.name}</h4>
        </div>

        {isLastPage && <div ref={ref} />}
      </div>
    </Link>
  )
}
