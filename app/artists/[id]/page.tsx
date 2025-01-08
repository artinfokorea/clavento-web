import { ArtistDetailPage } from "@/components/Artists/ArtistDetailPage"
import ListSearchForm from "@/components/common/ListSearchForm"
import { getArtist } from "@/lib/serverFetch"

import { Metadata } from "next"
import React from "react"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> => {
  const { id } = await params

  const { data } = await getArtist(id)

  const artistName = data.name
  const artistMajor = data.major
  const pageImage = data?.imageUrl
  const defaultImage = "/clavento.png"

  return {
    title: `${artistMajor} ${artistName}`,
    description: `Clavento | ${artistName}`,
    openGraph: {
      title: `${artistMajor} ${artistName}`,
      description: `Clavento | ${artistName}`,
      images: {
        url: pageImage || defaultImage,
        alt: "Clavento",
      },
    },
  }
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
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
