import { ListRequest } from "@/interface"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getArtists = async (request: ListRequest) => {
  const queryParams = new URLSearchParams()
  Object.entries(request).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString())
  })

  const response = await fetch(`${API_URL}/artists?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch artists")
  }

  return response.json()
}

export const getArtist = async (id: number) => {
  const response = await fetch(`${API_URL}/artists/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch artist")
  }

  return response.json()
}

export const getInfiniteArtists = async (request: ListRequest) => {
  const response = await getArtists(request)
  return {
    artists: response.data,
    nextPage: request.page ? request.page + 1 : 2,
    isLast: response.data.length < request.size,
  }
}
