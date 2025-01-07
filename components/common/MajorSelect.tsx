import React from "react"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import { Transition } from "@headlessui/react"
import { MajorType } from "@/types"

interface MajorSelectProps {
  isOpen: boolean
  handleOpen: () => void
  value: MajorType | null
  setValue: (value: MajorType | null) => void
  className?: string
}

export const MajorSelect = ({
  isOpen,
  handleOpen,
  value,
  setValue,
  className,
}: MajorSelectProps) => {
  return (
    <div
      className={`relative block w-[154px] border border-main px-2 py-[6px] duration-200 ${className} ${
        isOpen ? "border-b-none rounded-t-3xl" : "rounded-3xl"
      }`}
    >
      <button
        className="flex w-full cursor-pointer justify-between rounded-3xl bg-main px-2 py-[2px] text-xs font-semibold text-white"
        onClick={handleOpen}
      >
        <p>{value || "All"}</p>

        {isOpen ? (
          <ChevronDownIcon className="h-4 w-4 transform transition-transform duration-200 ease-in-out" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 transform transition-transform duration-200 ease-in-out" />
        )}
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute left-[-1px] top-[100%] z-40 flex w-[154px] flex-col gap-3 rounded-b-3xl border-b border-l border-r border-main bg-white p-2 shadow-md">
          <button
            onClick={() => setValue(null)}
            className="px-2 text-left text-xs font-semibold"
          >
            All
          </button>
          {Object.keys(MajorType).map(key => (
            <button
              key={key}
              onClick={() => setValue(key as MajorType)}
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
