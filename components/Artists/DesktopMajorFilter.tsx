import React from "react"
import { Button } from "../ui/button"
import { MajorType } from "@/types"
import { useMajorFilter } from "@/hooks/Artists/useMajorFilter"

export const DesktopMajorFilter = () => {
  const { selectedMajor, handleMajorClick } = useMajorFilter()

  return (
    <div className="hidden space-x-2 md:block">
      <Button
        onClick={() => handleMajorClick(null)}
        className={`h-8 rounded-3xl border border-main ${!selectedMajor ? "bg-main text-white" : "bg-white text-main"} px-6 text-xs hover:bg-main hover:text-white`}
      >
        All
      </Button>
      {Object.keys(MajorType).map(key => (
        <Button
          key={key}
          className={`h-8 rounded-3xl border border-main px-6 text-xs hover:bg-main hover:text-white ${selectedMajor === key ? "bg-main text-white" : "bg-white text-main"}`}
          onClick={() => handleMajorClick(key as MajorType)}
        >
          {key}
        </Button>
      ))}
    </div>
  )
}
