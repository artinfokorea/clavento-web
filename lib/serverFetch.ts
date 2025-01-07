"use server"

import { DetailResponse } from "@/interface"
import { Artist } from "@/types/artists"

export const getArtist = async (
  artistId: string,
): Promise<DetailResponse<Artist>> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const response = await fetch(`${API_URL}/artists/${artistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ["artists", artistId],
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch artists")
  }

  return response.json()
}
