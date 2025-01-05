import { ArtistListPage } from "@/components/Artists/ArtistListPage"
import { ListRequest, ListResponse } from "@/interface"
import { Artist } from "@/types/artists"
import React from "react"

export const getArtists = async (
  request: ListRequest,
): Promise<ListResponse<Artist>> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const queryParams = new URLSearchParams()
  Object.entries(request).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString())
  })

  const response = await fetch(`${API_URL}/artists?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["artists"],
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch artists")
  }

  return response.json()
}

const page = async () => {
  const artists = await getArtists({ page: 1, size: 10 })

  console.log("artists", artists)

  return (
    <main>
      <ArtistListPage artists={artists.data} />
    </main>
  )
}

export default page
