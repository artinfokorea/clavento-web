import { ArtistListPage } from "@/components/Artists/ArtistListPage"
import { ArtistSkeleton } from "@/components/Artists/ArtistSkeleton"
import ListSearchForm from "@/components/common/ListSearchForm"
import { Suspense } from "react"

const page = async () => {
  return (
    <main className="mx-auto max-w-screen-lg pb-20">
      <ListSearchForm placeholder="Explore Iconic musicians...">
        <h4 className="text-sm font-medium md:text-lg">
          Search the Sound of History
        </h4>
      </ListSearchForm>
      <Suspense fallback={<ArtistSkeleton />}>
        <ArtistListPage />
      </Suspense>
    </main>
  )
}

export default page
