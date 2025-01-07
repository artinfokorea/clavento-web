import { useMajorFilter } from "@/hooks/Artists/useMajorFilter"
import { MajorSelect } from "../common/MajorSelect"

export const MobileMajorFilter = ({ detail }: { detail?: boolean }) => {
  const { selectedMajor, isOpen, handleMajorClick, handleOpen } =
    useMajorFilter(detail)

  return (
    <MajorSelect
      isOpen={isOpen}
      handleOpen={handleOpen}
      value={selectedMajor}
      setValue={handleMajorClick}
      className="md:hidden"
    />
  )
}
