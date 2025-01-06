import { ArtistForm } from "@/components/Artists/ArtistForm"
import React from "react"

const page = () => {
  return (
    <main className="px-4">
      <h2 className="mt-8 text-center text-xl font-bold">아티스트 등록</h2>
      <ArtistForm />
    </main>
  )
}

export default page
