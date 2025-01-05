import { MajorType } from "@/types"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import { Transition } from "@headlessui/react"

import { useState } from "react"

export const MobileMajorFilter = () => {
  const [selectedMajor, setSelectedMajor] = useState<MajorType>()
  const [isOpen, setIsOpen] = useState(false)

  const handleMajorClick = (major: MajorType) => {
    setSelectedMajor(major)
    setIsOpen(false)
  }

  return (
    <div
      className={`relative w-[170px] border border-main p-2 duration-200 ${
        isOpen ? "border-b-none rounded-t-3xl" : "rounded-3xl"
      }`}
    >
      <div className="flex justify-between rounded-3xl bg-main px-2 py-1 text-xs font-semibold text-white">
        <p>{selectedMajor || "All"}</p>

        {isOpen ? (
          <ChevronDownIcon
            onClick={() => setIsOpen(false)}
            className="h-4 w-4 transform transition-transform duration-200 ease-in-out"
          />
        ) : (
          <ChevronRightIcon
            onClick={() => setIsOpen(true)}
            className="h-4 w-4 transform transition-transform duration-200 ease-in-out"
          />
        )}
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute left-[-1px] top-[100%] flex w-[170px] flex-col gap-3 rounded-b-3xl border-b border-l border-r border-main bg-white p-2">
          {Object.keys(MajorType).map(key => (
            <button
              key={key}
              onClick={() => handleMajorClick(key as MajorType)}
              className="px-2 text-left text-xs font-semibold"
            >
              {key}
            </button>
          ))}
        </div>
      </Transition>
    </div>
  )
}
