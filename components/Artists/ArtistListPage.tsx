"use client"

import { MobileMajorFilter } from "./MobileMajorFilter"

import { ArtistCard } from "./ArtistCard"

import { DesktopMajorFilter } from "./DesktopMajorFilter"
import { LinkButton } from "../common/LinkButton"
import { useArtistList } from "@/hooks/Artists/useArtistList"

export const ArtistListPage = () => {
  const { artistList, ref, hasNextPage } = useArtistList()

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <MobileMajorFilter />
        <DesktopMajorFilter />
        <LinkButton text="Create" href="/artists/create" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-[20px] md:mt-[30px] md:grid-cols-3">
        {artistList?.pages.map(page =>
          page.artists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              ref={ref}
              isLastPage={!(hasNextPage && index === page.artists.length - 5)}
            />
          )),
        )}
      </div>
    </div>
  )
}
