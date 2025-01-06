import { ArtistDetailPage } from "@/components/Artists/ArtistDetailPage"
import ListSearchForm from "@/components/common/ListSearchForm"
import { DetailResponse } from "@/interface"
import { Artist } from "@/types/artists"
import { Metadata } from "next"
import React from "react"

const getArtist = async (artistId: string): Promise<DetailResponse<Artist>> => {
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

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> => {
  const resolvedParams = await Promise.resolve(params)
  const { id } = resolvedParams

  const { data } = await getArtist(id)

  const pageTitle = data.name
  const pageImage = data?.imageUrl
  const defaultImage = "/clavento.png"

  return {
    title: `Clavento | ${pageTitle}`,
    description: `Clavento | ${data.contents}`,
    openGraph: {
      title: pageTitle,
      description: `Clavento | ${data.contents}`,
      images: {
        url: pageImage || defaultImage,
        alt: "Clavento",
      },
    },
  }
}

const page = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await Promise.resolve(params)
  const { id } = resolvedParams
  const { data: artist } = await getArtist(id)

  return (
    <main className="pb-20">
      <ListSearchForm placeholder="Explore Iconic musicians...">
        <h4 className="text-sm font-medium md:text-lg">
          Search the Sound of History
        </h4>
      </ListSearchForm>
      <ArtistDetailPage artist={artist} />
    </main>
  )
}

export default page
