import { useInfiniteQuery } from "@tanstack/react-query"
import { getInfiniteArtists } from "@/services/artists"
import { ScrollApiResponse } from "@/interface"
import { useInView } from "react-intersection-observer"
import { Artist } from "@/types/artists"
import { useSearchParams } from "next/navigation"
import { MajorType } from "@/types"
import { useEffect } from "react"

export const useArtistList = () => {
  const searchParams = useSearchParams()
  const major = searchParams.get("major")
  const keyword = searchParams.get("keyword") as string

  const filters = {
    size: 10,
    major: major as MajorType | undefined,
    keyword,
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
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return { artistList, ref, hasNextPage }
}
