import { MajorType } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useMajorFilter = (detail?: boolean) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const majorType = searchParams.get("major")
  const [selectedMajor, setSelectedMajor] = useState<MajorType | null>(
    majorType as MajorType,
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleMajorClick = (major: MajorType | null) => {
    setSelectedMajor(major)
    setIsOpen(false)
  }

  const handleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    const locationParams = new URLSearchParams(window.location.search)
    const currentMajorType = locationParams.get("major")
    if (currentMajorType !== selectedMajor) {
      locationParams.delete("major")
      if (selectedMajor) locationParams.append("major", selectedMajor)
      if (detail) {
        const newUrl = `/?${locationParams.toString()}`
        router.push(newUrl, {
          scroll: false,
        })
      } else {
        const newUrl = `${window.location.pathname}?${locationParams.toString()}`
        router.push(newUrl, {
          scroll: false,
        })
      }
    }
  }, [selectedMajor, router, detail])

  return {
    selectedMajor,
    isOpen,
    handleMajorClick,
    handleOpen,
  }
}
