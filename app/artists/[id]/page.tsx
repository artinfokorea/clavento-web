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
