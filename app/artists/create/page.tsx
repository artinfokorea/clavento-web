import { ArtistForm } from "@/components/Artists/ArtistForm"
import React from "react"

const page = () => {
  return (
    <main className="mx-auto max-w-screen-md px-4 pb-20">
      <h2 className="text-center text-xl font-bold md:mt-16">아티스트 등록</h2>
      <ArtistForm />
    </main>
  )
}

export default page
