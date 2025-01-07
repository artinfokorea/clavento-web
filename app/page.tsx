import { ArtistListPage } from "@/components/Artists/ArtistListPage"
import ListSearchForm from "@/components/common/ListSearchForm"
import { Suspense } from "react"

const page = async () => {
  return (
    <main className="pb-20">
      <ListSearchForm placeholder="Explore Iconic musicians...">
        <h4 className="text-sm font-medium md:text-lg">
          Search the Sound of History
        </h4>
      </ListSearchForm>
      <Suspense>
        <ArtistListPage />
      </Suspense>
    </main>
  )
}

export default page
