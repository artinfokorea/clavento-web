"use client"

import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import ListSearchForm from "../common/ListSearchForm"
import { Artist } from "@/types/artists"
import { Button } from "../ui/button"
import { MobileMajorFilter } from "./MobileMajorFilter"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getInfiniteArtists } from "@/services/artists"
import { ScrollApiResponse } from "@/interface"

interface ArtistListPageProps {
  artists: Artist[]
}

export const ArtistListPage = ({ artists }: ArtistListPageProps) => {
  const filters = {
    size: 10,
  }

  const [ref, inView] = useInView({
    delay: 100,
    threshold: 0.5,
  })

  const {
    data: artistList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ScrollApiResponse<Artist, "artists">>({
    queryKey: ["artists", filters],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteArtists({ ...filters, page: pageParam as number }),
    getNextPageParam: lastPage => {
      if (lastPage && !lastPage.isLast) return lastPage.nextPage
      return null
    },
    initialPageParam: 1,
    initialData: {
      pages: [
        {
          artists,
          nextPage: 2,
          isLast: false,
        },
      ],
      pageParams: [1],
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="px-4">
      <ListSearchForm placeholder="Explore Iconic musicians...">
        <h4 className="text-sm font-medium md:text-lg">
          Search the Sound of History
        </h4>
      </ListSearchForm>
      <div className="flex items-center justify-between">
        <MobileMajorFilter />
        <Button className="h-6 w-16 rounded-2xl bg-main text-xs font-semibold md:h-8">
          List
        </Button>
      </div>
      {artistList.pages.map(page =>
        page.artists.map(artist => <div key={artist.id}>{artist.name}</div>),
      )}
      {/* <div ref={ref}></div> */}
    </div>
  )
}
