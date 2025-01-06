import { ArtistListPage } from "@/components/Artists/ArtistListPage"
import ListSearchForm from "@/components/common/ListSearchForm"
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
  return (
    <main className="pb-20">
      <ListSearchForm placeholder="Explore Iconic musicians...">
        <h4 className="text-sm font-medium md:text-lg">
          Search the Sound of History
        </h4>
      </ListSearchForm>
      <ArtistListPage />
    </main>
  )
}

export default page
