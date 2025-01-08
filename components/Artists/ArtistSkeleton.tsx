import React from "react"

export const ArtistSkeleton = () => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="block h-[34px] w-[154px] animate-pulse rounded-3xl bg-gray-200 md:hidden" />
        <div className="hidden h-[34px] w-[400px] animate-pulse rounded-3xl bg-gray-200 md:block" />
        <div className="h-6 w-16 animate-pulse rounded-3xl bg-gray-200 md:h-[34px]" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-[20px] md:mt-[30px] md:grid-cols-3">
        {Array.from({ length: 10 }, (_, index) => index).map(index => (
          <div key={index}>
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-gray-200 md:aspect-[13/9]" />
            <div className="mt-3 flex flex-col items-center justify-center gap-2 md:flex-row">
              <div className="h-[10px] w-16 animate-pulse rounded-3xl bg-gray-200 md:h-4 md:w-24" />
              <div className="h-3 w-16 animate-pulse rounded-3xl bg-gray-200 md:h-4 md:w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
